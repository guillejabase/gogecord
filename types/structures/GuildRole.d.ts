import { type APIRole } from 'discord-api-types/v10';
import Client from './Client';
import Guild from './Guild';
import GuildMember from './GuildMember';
import Collection from '../util/Collection';
import GuildRoleFlags from '../util/GuildRoleFlags';
import type { ImageFormat, ImageSize } from '../util/Image';
import Permissions from '../util/Permissions';
export default class GuildRole {
    client: Client;
    guild: Guild;
    color: {
        decimal: number;
        hex: string;
    };
    created: {
        at: Date;
        timestamp: number;
    };
    flags: GuildRoleFlags;
    hoist: boolean;
    icon?: string;
    id: string;
    managed: boolean;
    mentionable: boolean;
    name: string;
    permissions: Permissions;
    position: number;
    members: Collection<string, GuildMember>;
    constructor(client: Client, guild: Guild, data: APIRole);
    iconURL(options: {
        format?: ImageFormat;
        size?: Exclude<ImageSize, 'gif'>;
    }): string | undefined;
    toString(): string;
}
//# sourceMappingURL=GuildRole.d.ts.map