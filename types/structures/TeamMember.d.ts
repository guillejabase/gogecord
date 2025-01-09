import type { APITeamMember } from 'discord-api-types/v10';
import Client from './Client';
import User from './User';
export declare enum TeamMemberRoles {
    Admin = "admin",
    Developer = "developer",
    ReadOnly = "read_only"
}
export declare enum TeamMemberStates {
    Invited = 1,
    Accepted = 2
}
export type TeamMemberRole = keyof typeof TeamMemberRoles;
export type TeamMemberState = keyof typeof TeamMemberStates;
export default class TeamMember {
    client: Client;
    role: TeamMemberRole;
    state: TeamMemberState;
    user: User;
    constructor(client: Client, data: APITeamMember);
}
//# sourceMappingURL=TeamMember.d.ts.map