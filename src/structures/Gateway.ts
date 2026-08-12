import { ActivityType as Type, GatewayOpcodes, GatewayVersion, PresenceUpdateStatus, type APIGatewayInfo, type GatewayReceivePayload, type GatewaySendPayload } from 'discord-api-types/v10';

import { type ActivityType } from './Activity';
import { type Client } from './Client';
import { type Dispatch } from './Dispatch';
import { type PresenceStatus } from './Presence';

export interface PresenceOptions {
  activities?: {
    name: string;
    type: ActivityType;
    url?: string;
  }[];
  afk?: boolean;
  since?: number | null;
  status?: PresenceStatus;
}

const ActivityTypeValues: Record<ActivityType, Type> = {
  Competing: Type.Competing,
  Custom: Type.Custom,
  Listening: Type.Listening,
  Playing: Type.Playing,
  Streaming: Type.Streaming,
  Watching: Type.Watching
};

export class Gateway {
  private dispatches = new Map<string, Dispatch | null>();
  private heartbeatInterval: Timer | null = null;
  private sequence: number | null = null;
  private ws: WebSocket | null = null;

  public presence: PresenceOptions = {
    activities: [],
    afk: false,
    since: null,
    status: 'online'
  };

  public constructor(private client: Client) { }

  private stopHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);

      this.heartbeatInterval = null;
    }
  }
  private send(payload: GatewaySendPayload): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(payload));
    }
  }
  private sendHeartbeat(): void {
    this.send({
      op: GatewayOpcodes.Heartbeat,
      d: this.sequence
    });
  }

  public async connect(): Promise<void> {
    const data = await this.client.request<APIGatewayInfo>({
      method: 'GET',
      endpoint: '/gateway/bot'
    });

    this.ws = new WebSocket(`${data.url}/?v=${GatewayVersion}&encoding=json`);

    this.ws.onmessage = async (e) => {
      const { op, d, s, t }: GatewayReceivePayload = JSON.parse(e.data.toString());

      if (s !== null && s !== undefined) {
        this.sequence = s;
      }

      switch (op) {
        case GatewayOpcodes.Hello:
          this.stopHeartbeat();

          this.heartbeatInterval = setInterval(() => {
            this.sendHeartbeat();
          }, d.heartbeat_interval);

          if (!this.client.token) {
            throw new Error('Cannot connect to Gateway without a valid token');
          }

          this.send({
            op: GatewayOpcodes.Identify,
            d: {
              token: this.client.token,
              intents: this.client.intents.bitField,
              properties: {
                os: process.platform,
                browser: 'chrome',
                device: 'chrome',
              },
            },
          });
          break;
        case GatewayOpcodes.Dispatch:
          if (t) {
            let dispatch = this.dispatches.get(t);

            if (dispatch === undefined) {
              try {
                dispatch = (await import(`../dispatches/${t}`)).default as Dispatch;
                this.dispatches.set(t, dispatch);
              } catch {
                this.dispatches.set(t, null);
              }
            }
            if (dispatch && dispatch.name === t) {
              dispatch.run(this.client as Client<true>, d);
            }
          }
          break;
        case GatewayOpcodes.Heartbeat:
          this.sendHeartbeat();
          break;
      }
    };
    this.ws.onclose = () => {
      this.stopHeartbeat();
    };
  }
  public setPresence(options: PresenceOptions): void {
    this.presence = { ...this.presence, ...options };

    this.send({
      op: GatewayOpcodes.PresenceUpdate,
      d: {
        activities: (this.presence.activities ?? []).map((a) => ({
          name: a.name,
          type: ActivityTypeValues[a.type] ?? Type.Playing,
          ...(a.url ? { url: a.url } : {})
        })),
        afk: this.presence.afk ?? false,
        since: this.presence.since ?? null,
        status: (this.presence.status as PresenceUpdateStatus) ?? PresenceUpdateStatus.Online
      }
    });
  }
  public disconnect(): void {
    this.stopHeartbeat();

    if (this.ws) {
      this.ws.close(1000);
    }
  }
}
