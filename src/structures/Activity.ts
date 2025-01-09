import type { GatewayActivity } from 'discord-api-types/v10';

export enum ActivityTypes {
    Playing = 0,
    Streaming = 1,
    Listening = 2,
    Watching = 3,
    Custom = 4,
    Competing = 5
};

export type ActivityType = keyof typeof ActivityTypes;

export default class Activity {
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
    public type: ActivityType;
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
            .keys(ActivityTypes)
            .find((key) => {
                return ActivityTypes[key as ActivityType] as number === data.type;
            }) as ActivityType;
        this.url = data.url || undefined;
    }
}