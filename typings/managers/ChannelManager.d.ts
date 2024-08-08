import Channel, { ChannelType } from '../classes/Channel';
import Client from '../classes/Client';
import Guild from '../classes/Guild';
import Message from '../classes/Message';
import Collection from '../util/Collection';
import Embed from '../util/Embed';
import { Permission } from '../util/Permissions';
export default class ChannelManager {
    private client;
    private guild;
    cache: Collection<string, Channel>;
    constructor(client: Client, guild: Guild);
    private path;
    create(options: {
        name: string;
        permissionOverwrites?: {
            [key in Permission]?: boolean;
        };
        position?: number;
        rateLimitPerUser?: number;
        type?: ChannelType;
    }, reason?: string): Promise<Channel>;
    delete(channel: Channel, reason?: string): Promise<void>;
    edit(channel: Channel, options: {
        name?: string;
        permissionOverwrites?: {
            [key in Permission]?: boolean;
        };
        position?: number;
        rateLimitPerUser?: number;
    }, reason?: string): Promise<Channel>;
    send(channel: Channel, options: {
        content?: string;
        embeds?: Embed[];
        reference?: string;
    }): Promise<Message>;
}
