import type { GatewayActivity, GatewayPresenceUpdateDispatchData } from 'discord-api-types/v10';

export enum PresenceActivityTypes {
    Playing = 0,
    Streaming = 1,
    Listening = 2,
    Watching = 3,
    Custom = 4,
    Competing = 5
};

export type PresenceActivityType = keyof typeof PresenceActivityTypes;

class Activity {
    public created: {
        at: Date;
        timestamp: number;
    };
    public details?: string;
    public id: string;
    public name: string;
    public started: {
        at?: Date;
        timestamp?: number;
    };
    public state?: string;
    public type: PresenceActivityType;
    public url?: string;

    constructor(data: GatewayActivity) {
        this.created = {
            at: new Date(data.created_at),
            timestamp: data.created_at
        };
        this.details = data.details || undefined;
        this.id = data.id;
        this.name = data.name;
        this.started = {
            at: data.timestamps?.start ? new Date(data.timestamps.start) : undefined,
            timestamp: data.timestamps?.start
        };
        this.state = data.state || undefined;
        this.type = Object
            .keys(PresenceActivityTypes)
            .find((key) => {
                return PresenceActivityTypes[key as PresenceActivityType] as number === data.type;
            }) as PresenceActivityType;
        this.url = data.url || undefined;
    }
}

export enum PresenceStatuses {
    DoNotDisturb = 'dnd',
    Idle = 'idle',
    Offline = 'offline',
    Online = 'online'
}

export type PresenceStatus = keyof typeof PresenceStatuses;

export default class Presence {
    public activities: Activity[];
    public custom: {
        text?: string;
        emoji?: string;
    };
    public client: {
        desktop: PresenceStatus;
        mobile: PresenceStatus;
        web: PresenceStatus;
    };
    public status: PresenceStatus;

    constructor(data?: GatewayPresenceUpdateDispatchData) {
        this.activities = data?.activities
            ?.filter((activity) => {
                PresenceActivityTypes['Custom'] as number !== activity.type;
            })
            .map((activity) => {
                return new Activity(activity);
            }) || [];

        const custom = data?.activities?.find((activity) => {
            PresenceActivityTypes['Custom'] as number === activity.type;
        });
        let emoji: string | undefined;

        if (custom?.emoji) {
            if (custom.emoji.id) {
                emoji = `<${custom.emoji.animated ? 'a' : ''}:${custom.emoji.name}:${custom.emoji.id}>`;
            } else {
                emoji = custom.emoji.name || undefined;
            }
        } else {
            emoji = undefined;
        }

        this.custom = {
            text: custom?.state || undefined,
            emoji
        };

        const client = data?.client_status;
        this.client = {
            desktop: (Object
                .keys(PresenceStatuses)
                .find((key) => {
                    PresenceStatuses[key as PresenceStatus] as string === client?.desktop;
                }) ?? 'Offline') as PresenceStatus,
            mobile: (Object
                .keys(PresenceStatuses)
                .find((key) => {
                    PresenceStatuses[key as PresenceStatus] as string === client?.mobile;
                }) ?? 'Offline') as PresenceStatus,
            web: (Object
                .keys(PresenceStatuses)
                .find((key) => {
                    PresenceStatuses[key as PresenceStatus] as string === client?.web;
                }) ?? 'Offline') as PresenceStatus
        };

        this.status = (Object
            .keys(PresenceStatuses)
            .find((key) => {
                PresenceStatuses[key as PresenceStatus] as string === data?.status;
            }) ?? 'Offline') as PresenceStatus;
    }
}