import types from 'discord-api-types/v10';
import Snowflake from '../util/Snowflake';
import UserFlags, { UserFlag } from '../util/UserFlags';

export default class User {
    avatar?: string;
    banner: {
        hash?: string,
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

    constructor (data: types.APIUser) {
        this.avatar = data.avatar || undefined;
        this.banner = {
            hash: data.banner || undefined,
            color: data.accent_color || undefined
        };
        this.bot = !!data.bot;
        this.discriminator = (data.discriminator != '0') ? data.discriminator : undefined;
        this.id = data.id;

        const created = new Snowflake(this.id).timestamp;

        this.created = {
            at: new Date(created),
            timestamp: created
        };
        this.flags = new UserFlags(data.public_flags!).toArray() as UserFlag[];
        this.globalName = data.global_name || undefined;
        this.mention = `<@${this.id}>`;
        this.username = data.username;
    }
}