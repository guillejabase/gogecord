import types from 'discord-api-types/v10';
import Client from './Client';
import Guild from './Guild';
import Permissions, { Permission } from '../util/Permissions';
import Snowflake from '../util/Snowflake';

export default class Role {
    private client: Client;
    private guildId: string;
    private permissionsBitField: bigint;

    created: {
        at: Date;
        timestamp: number;
    };
    color: number;
    id!: string;
    mention: string;
    name: string;
    position: number;

    constructor (
        client: Client,
        data: types.APIRole | types.GatewayGuildRoleModifyDispatchData['role'],
        guild: Guild
    ) {
        this.client = client;
        this.id = data.id;

        const created = new Snowflake(this.id).timestamp;

        this.created = {
            at: new Date(created),
            timestamp: created
        };
        this.color = data.color;
        this.guildId = guild.id;
        this.mention = `<@&${this.id}>`;
        this.name = data.name;
        this.permissionsBitField = BigInt(data.permissions);
        this.position = data.position;

        Object.defineProperties(this, {
            client: { enumerable: false },
            guildId: { enumerable: false },
            permissionsBitField: { enumerable: false }
        });
    }

    get guild() {
        return this.client.guilds.get(this.guildId);
    }

    get permissions() {
        return new Permissions(this.permissionsBitField).toArray() as Permission[];
    }
}