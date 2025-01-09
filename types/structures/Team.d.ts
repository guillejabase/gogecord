import type { APITeam } from 'discord-api-types/v10';
import Client from './Client';
import TeamMember from './TeamMember';
import User from './User';
import Collection from '../util/Collection';
export default class Team {
    client: Client;
    icon?: string;
    id: string;
    name: string;
    owner: User;
    members: Collection<string, TeamMember>;
    constructor(client: Client, data: APITeam);
}
//# sourceMappingURL=Team.d.ts.map