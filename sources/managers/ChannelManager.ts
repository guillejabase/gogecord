import { APIMessage } from 'discord-api-types/v10';

import Channel, { ChannelType, ChannelTypes } from '../classes/Channel';
import Client from '../classes/Client';
import Guild from '../classes/Guild';
import Message from '../classes/Message';

import Collection from '../util/Collection';
import Embed from '../util/Embed';
import Permissions, { Permission } from '../util/Permissions';

export default class ChannelManager {
    private client: Client;
    private guild: Guild;

    public cache = new Collection<string, Channel>();

    constructor (client: Client, guild: Guild) {
        this.client = client;
        this.guild = guild;

        Object.defineProperties(this, {
            client: { enumerable: false },
            guild: { enumerable: false }
        });
    }

    private path(channel?: Channel): string {
        return `/guilds/${this.guild.id}/channels${channel ? `/${channel.id}` : ''}`;
    }

    public async create(options: {
        name: string;
        permissionOverwrites?: {
            [key in Permission]?: boolean;
        };
        position?: number;
        rateLimitPerUser?: number;
        type?: ChannelType;
    }, reason?: string): Promise<Channel> {
        return new Channel(await this.client.request('post', this.path(), {
            name: options.name,
            position: options.position || 0,
            permission_overwrites: options.permissionOverwrites || [],
            rate_limit_per_user: options.rateLimitPerUser,
            type: ChannelTypes[options.type!] || 0
        }, reason), this.guild);
    }
    public async delete(channel: Channel, reason?: string): Promise<void> {
        return await this.client.request('delete', this.path(channel), undefined, reason);
    }
    public async edit(channel: Channel, options: {
        name?: string;
        permissionOverwrites?: {
            [key in Permission]?: boolean;
        };
        position?: number;
        rateLimitPerUser?: number;
    }, reason?: string): Promise<Channel> {
        let permissions: {
            id: string;
            type: number;
            allow: string;
            deny: string;
        }[] = [];

        if (options.permissionOverwrites) {
            permissions = Object.entries(options.permissionOverwrites).map(([key, value]) => ({
                id: key,
                type: ChannelTypes[channel.type],
                allow: value ? Permissions.bits[key as Permission].toString() : '0',
                deny: value ? '0' : Permissions.bits[key as Permission].toString()
            }));
        }

        return new Channel(await this.client.request('patch', this.path(channel), {
            ...options,
            permissionOverwrites: permissions.length ? permissions : undefined
        }, reason), this.guild);
    }
    public async send(channel: Channel, options: {
        content?: string;
        embeds?: Embed[];
        reference?: string;
    }): Promise<Message> {
        return await this.client.request('post', `/channels/${channel.id}/messages`, {
            content: options.content || undefined,
            embeds: options.embeds || undefined,
            message_reference: options.reference ? {
                message_id: options.reference
            } : undefined
        }).then((response: APIMessage) => {
            return new Message(response, this.guild);
        });
    }
}