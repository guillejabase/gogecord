import types from 'discord-api-types/v10';

export const ActivityTypes = {
    Playing: 0,
    Streaming: 1,
    Listening: 2,
    Watching: 3,
    Custom: 4,
    Competing: 5
};

type ActivityType = keyof typeof ActivityTypes;

class Activity {
    created: {
        at: Date;
        timestamp: number;
    };
    id: string;
    name: string;
    type: ActivityType;

    constructor (data: types.GatewayActivity) {
        this.created = {
            at: new Date(data.created_at),
            timestamp: data.created_at
        };
        this.id = data.id;
        this.name = data.name;
        this.type = Object.keys(ActivityTypes).find((key) => ActivityTypes[key as ActivityType] == data.type) as ActivityType;
    }
}

export const Statuses = {
    DoNotDisturb: 'dnd',
    Idle: 'idle',
    Offline: 'offline',
    Online: 'online'
};

type Status = keyof typeof Statuses;

export default class Presence {
    activities: Activity[];
    custom: {
        text?: string;
        emoji?: string;
    };
    client: {
        desktop: Status;
        mobile: Status;
        web: Status;
    };
    status: Status;

    constructor (data?: types.GatewayPresenceUpdateDispatchData) {
        this.activities = data?.activities
            ?.filter((activity) => activity.type != ActivityTypes.Custom)
            .map((activity) => new Activity(activity)) || [];

        const custom = data?.activities?.find((activity) => activity.type == ActivityTypes.Custom);

        this.custom = {
            text: custom?.state || undefined,
            emoji: custom?.emoji
                ? (custom.emoji.id ? `<${custom.emoji.animated ? 'a' : ''}:${custom.emoji.name}:${custom.emoji.id}>` : custom.emoji.name!)
                : undefined
        };

        const client = data?.client_status;

        this.client = {
            desktop: Object.keys(Statuses).find((key) => Statuses[key as Status] == client?.desktop) as Status || 'Offline',
            mobile: Object.keys(Statuses).find((key) => Statuses[key as Status] == client?.mobile) as Status || 'Offline',
            web: Object.keys(Statuses).find((key) => Statuses[key as Status] == client?.web) as Status || 'Offline'
        };
        this.status = Object.keys(Statuses).find((key) => Statuses[key as Status] == data?.status) as Status || 'Offline';
    }
}