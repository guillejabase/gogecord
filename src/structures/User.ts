import { type APIUser, CDNRoutes, RouteBases, type UserAvatarFormat } from 'discord-api-types/v10';

import Client from './Client';

import type { ImageFormat, ImageSize } from '../util/Image';
import Snowflake from '../util/Snowflake';
import UserFlags from '../util/UserFlags';

export default class User {
    public avatar?: string;
    public bot: boolean;
    public created: {
        at: Date;
        timestamp: number;
    };
    public discriminator?: string;
    public flags: UserFlags;
    public globalName?: string;
    public id: string;
    public system: boolean;
    public username: string;

    public constructor(public client: Client, data: APIUser) {
        this.avatar = data.avatar || undefined;
        this.bot = !!data.bot;
        this.id = data.id;

        const created = new Snowflake(this.id).timestamp;
        this.created = {
            at: new Date(created),
            timestamp: created
        };

        this.discriminator = data.discriminator != '0' ? data.discriminator : undefined;
        this.flags = new UserFlags(data.flags!);
        this.globalName = data.global_name || undefined;
        this.system = !!data.system;
        this.username = data.username;

        Object.defineProperty(this, 'client', { enumerable: false });
    }

    public avatarURL(options: {
        format?: ImageFormat;
        size?: ImageSize;
    }): string | undefined {
        if (!this.avatar) {
            return undefined;
        }

        options.format = options.format || (this.avatar.startsWith('a_') ? 'gif' : 'png');

        return RouteBases.cdn +
            CDNRoutes.userAvatar(this.id, this.avatar, options.format as UserAvatarFormat) +
            (options.size ? `?size=${options.size}` : '');
    }
    public toString(): string {
        return `<@${this.id}>`;
    }
}