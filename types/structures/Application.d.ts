import type { APIApplication } from 'discord-api-types/v10';
import Client from './Client';
import PartialApplication from './PartialApplication';
import Team from './Team';
import User from './User';
import ApplicationFlags from '../util/ApplicationFlags';
export default class Application extends PartialApplication {
    public: boolean;
    description: string;
    flags: ApplicationFlags;
    icon?: string;
    name: string;
    owner?: User;
    team?: Team;
    constructor(client: Client, data: APIApplication);
}
//# sourceMappingURL=Application.d.ts.map