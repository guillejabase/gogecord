import { APIUser } from 'discord-api-types/v10';

import Snowflake from '../util/Snowflake';
import UserFlags, { UserFlag } from '../util/UserFlags';

export default class User {
    public avatar?: string;
    public banner: {
        color?: number;
        hash?: string;
    };
    public bot: boolean;
    public created: {
        at: Date;
        timestamp: number;
    };
    public discriminator?: string;
    public flags: UserFlag[];
    public globalName?: string;
    public id: string;
    public username: string;

    constructor (data: APIUser) {
        this.avatar = data.avatar || undefined;
        this.banner = {
            color: data.accent_color || undefined,
            hash: data.banner || undefined
        };
        this.bot = !!data.bot;
        this.id = data.id;

        const created = new Snowflake(this.id).timestamp;

        this.created = {
            at: new Date(created),
            timestamp: created
        };
        this.discriminator = data.discriminator != '0' ? data.discriminator : undefined;
        this.flags = new UserFlags(data.public_flags!).toArray() as UserFlag[];
        this.globalName = data.global_name || undefined;
        this.username = data.username;
    }
}