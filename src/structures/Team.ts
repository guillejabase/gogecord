import type { APITeam } from 'discord-api-types/v10';

import Client from './Client';
import TeamMember from './TeamMember';
import User from './User';

import Collection from '../util/Collection';

export default class Team {
    public icon?: string;
    public id: string;
    public name: string;
    public owner: User;

    public members = new Collection<string, TeamMember>();

    public constructor(public client: Client, data: APITeam) {
        this.icon = data.icon || undefined;
        this.id = data.id;

        for (const apiTeamMember of data.members) {
            const teamMember = new TeamMember(client, apiTeamMember);

            this.members.set(teamMember.user.id, teamMember);
        }

        this.name = data.name;
        this.owner = this.members.get(data.owner_user_id)!.user;
    }
}