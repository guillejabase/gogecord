import type { GatewayActivity } from 'discord-api-types/v10';
export declare enum ActivityTypes {
    Playing = 0,
    Streaming = 1,
    Listening = 2,
    Watching = 3,
    Custom = 4,
    Competing = 5
}
export type ActivityType = keyof typeof ActivityTypes;
export default class Activity {
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
    type: ActivityType;
    url?: string;
    constructor(data: GatewayActivity);
}
//# sourceMappingURL=Activity.d.ts.map