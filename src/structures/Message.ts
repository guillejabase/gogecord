import type { GatewayMessageCreateDispatchData, GatewayMessageUpdateDispatchData } from 'discord-api-types/v10';

import Client from './Client';
import Guild from './Guild';
import GuildMember from './GuildMember';
import User from './User';

import MessageFlags from '../util/MessageFlags';

export default class Message {
    public author: User;
    public content: string;
    public created: {
        at: Date;
        timestamp: number;
    };
    public edited: {
        since?: Date;
        timestamp?: number;
    };
    public flags: MessageFlags;
    public guild?: Guild;
    public id: string;
    public member?: Omit<GuildMember, 'user'>;

    constructor(public client: Client, data: GatewayMessageCreateDispatchData | GatewayMessageUpdateDispatchData) {
        this.author = client.users.cache.get(data.author.id)!;
        this.content = data.content;

        data.flags;

        const created = Date.parse(data.timestamp);
        this.created = {
            at: new Date(created),
            timestamp: created
        };

        const edited = Date.parse(data.edited_timestamp!) || undefined;
        this.edited = edited ? {
            since: new Date(edited),
            timestamp: edited
        } : {};

        this.flags = new MessageFlags(data.flags!);

        if (data.guild_id) {
            this.guild = client.guilds.cache.get(data.guild_id)!;
            this.member = this.guild.members.cache.get(data.author.id)!;
        }

        this.id = data.id;

        Object.defineProperty(this, 'client', { enumerable: false });
    }
}