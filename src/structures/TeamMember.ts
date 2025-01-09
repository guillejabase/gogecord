import type { APITeamMember } from 'discord-api-types/v10';

import Client from './Client';
import User from './User';

export enum TeamMemberRoles {
    Admin = 'admin',
    Developer = 'developer',
    ReadOnly = 'read_only'
}
export enum TeamMemberStates {
    Invited = 1,
    Accepted = 2
}

export type TeamMemberRole = keyof typeof TeamMemberRoles;
export type TeamMemberState = keyof typeof TeamMemberStates;

export default class TeamMember {
    public role: TeamMemberRole;
    public state: TeamMemberState;
    public user: User;

    constructor(public client: Client, data: APITeamMember) {
        this.role = Object
            .keys(TeamMemberRoles)
            .find((key) => {
                TeamMemberRoles[key as TeamMemberRole] as string === data.role;
            }) as TeamMemberRole;
        this.state = Object
            .keys(TeamMemberStates)
            .find((key) => {
                TeamMemberStates[key as TeamMemberState] as number === data.membership_state;
            }) as TeamMemberState;
        this.user = new User(client, data.user);
    }
}