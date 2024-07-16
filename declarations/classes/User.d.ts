import types from 'discord-api-types/v10';
import { UserFlag } from '../util/UserFlags';
export default class User {
    avatar?: string;
    banner: {
        hash?: string;
        color?: number;
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
    mention: string;
    username: string;
    constructor(data: types.APIUser);
}
