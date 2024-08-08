import { APIBan } from 'discord-api-types/v10';
import Guild from './Guild';
import User from './User';
export default class Ban {
    guild: Guild;
    reason?: string;
    user: User;
    constructor(data: APIBan, guild: Guild);
}
