import type { GatewayActivity, GatewayPresenceUpdateDispatchData } from 'discord-api-types/v10';
export declare enum PresenceActivityTypes {
    Playing = 0,
    Streaming = 1,
    Listening = 2,
    Watching = 3,
    Custom = 4,
    Competing = 5
}
export type PresenceActivityType = keyof typeof PresenceActivityTypes;
declare class Activity {
    created: {
        at: Date;
        timestamp: number;
    };
    details?: string;
    id: string;
    name: string;
    started: {
        at?: Date;
        timestamp?: number;
    };
    state?: string;
    type: PresenceActivityType;
    url?: string;
    constructor(data: GatewayActivity);
}
export declare enum PresenceStatuses {
    DoNotDisturb = "dnd",
    Idle = "idle",
    Offline = "offline",
    Online = "online"
}
export type PresenceStatus = keyof typeof PresenceStatuses;
export default class Presence {
    activities: Activity[];
    custom: {
        text?: string;
        emoji?: string;
    };
    client: {
        desktop: PresenceStatus;
        mobile: PresenceStatus;
        web: PresenceStatus;
    };
    status: PresenceStatus;
    constructor(data?: GatewayPresenceUpdateDispatchData);
}
export {};
//# sourceMappingURL=Presence.d.ts.map