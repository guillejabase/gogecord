import { APIUser } from 'discord-api-types/v10';
import { UserFlag } from '../util/UserFlags';
export default class User {
    avatar?: string;
    banner: {
        color?: number;
        hash?: string;
    };
    bot: boolean;
    created: {
        at: Date;
        timestamp: number;
    };
    discriminator?: string;
    flags: UserFlag[];
    globalName?: string;
    id: string;
    username: string;
    constructor(data: APIUser);
}
