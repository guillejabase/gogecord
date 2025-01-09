import type { APIApplication } from 'discord-api-types/v10';

import Client from './Client';
import PartialApplication from './PartialApplication';
import Team from './Team';
import User from './User';

import ApplicationFlags from '../util/ApplicationFlags';

export default class Application extends PartialApplication {
    public public: boolean;
    public description: string;
    public flags: ApplicationFlags;
    public icon?: string;
    public name: string;
    public owner?: User;
    public team?: Team;

    constructor(client: Client, data: APIApplication) {
        super(client);

        this.public = data.bot_public;
        this.description = data.description;
        this.flags = new ApplicationFlags(data.flags);
        this.icon = data.icon || undefined;
        this.name = data.name;
        this.owner = data.owner ? new User(client, data.owner) : undefined;
        this.team = data.team ? new Team(client, data.team) : undefined;
    }
}