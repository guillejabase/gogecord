import { APIBan } from 'discord-api-types/v10';

import Guild from './Guild';
import User from './User';

export default class Ban {
    public guild: Guild;
    public reason?: string;
    public user: User;

    constructor (data: APIBan, guild: Guild) {
        this.guild = guild;
        this.reason = data.reason || undefined;
        this.user = new User(data.user);
    }
}