import { type APIUser } from 'discord-api-types/v10';
import Client from './Client';
import type { ImageFormat, ImageSize } from '../util/Image';
import UserFlags from '../util/UserFlags';
export default class User {
    client: Client;
    avatar?: string;
    bot: boolean;
    created: {
        at: Date;
        timestamp: number;
    };
    discriminator?: string;
    flags: UserFlags;
    globalName?: string;
    id: string;
    system: boolean;
    username: string;
    constructor(client: Client, data: APIUser);
    avatarURL(options: {
        format?: ImageFormat;
        size?: ImageSize;
    }): string | undefined;
    toString(): string;
}
//# sourceMappingURL=User.d.ts.map