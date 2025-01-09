import type { GatewayPresenceUpdateDispatchData } from 'discord-api-types/v10';
import Activity from './Activity';
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
//# sourceMappingURL=Presence.d.ts.map