import { type GatewayPresenceUpdateDispatchData, type PresenceUpdateReceiveStatus } from 'discord-api-types/v10';

import { Activity } from './Activity';
import { type Client } from './Client';
import { type User } from './User';

export type PresenceStatus = `${PresenceUpdateReceiveStatus}`;

export interface ClientStatus {
  desktop: PresenceStatus;
  mobile: PresenceStatus;
  web: PresenceStatus;
}

export class Presence {
  private userId: string;

  public activities: Activity[];
  public clientStatus: ClientStatus;
  public status: PresenceStatus;

  public constructor(public client: Client<true>, data: GatewayPresenceUpdateDispatchData) {
    this.activities = data.activities?.map((a) => new Activity(a)) ?? [];
    this.clientStatus = {
      desktop: data.client_status?.desktop ?? 'offline',
      mobile: data.client_status?.mobile ?? 'offline',
      web: data.client_status?.web ?? 'offline'
    };
    this.status = data.status ?? 'offline';
    this.userId = data.user.id;

    this.client.presences.set(this.userId, this);
  }

  public get user(): User {
    const user = this.client.users.get(this.userId);

    if (!user) {
      throw new Error(`User ${this.userId} was not found in cache.`);
    }

    return user;
  }
}
