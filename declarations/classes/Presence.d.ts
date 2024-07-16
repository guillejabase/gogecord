import types from 'discord-api-types/v10';
export declare const ActivityTypes: {
    Playing: number;
    Streaming: number;
    Listening: number;
    Watching: number;
    Custom: number;
    Competing: number;
};
type ActivityType = keyof typeof ActivityTypes;
declare class Activity {
    created: {
        at: Date;
        timestamp: number;
    };
    id: string;
    name: string;
    type: ActivityType;
    constructor(data: types.GatewayActivity);
}
export declare const Statuses: {
    DoNotDisturb: string;
    Idle: string;
    Offline: string;
    Online: string;
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
    constructor(data?: types.GatewayPresenceUpdateDispatchData);
}
export {};
