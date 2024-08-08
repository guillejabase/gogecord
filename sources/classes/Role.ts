import { APIRole } from 'discord-api-types/v10';

import Guild from './Guild';
import Member from './Member';

import Collection from '../util/Collection';
import Permissions, { Permission } from '../util/Permissions';
import Snowflake from '../util/Snowflake';

export default class Role {
    public color: number;
    public created: {
        at: Date;
        timestamp: number;
    };
    public hoist: boolean;
    public guild: Guild;
    public id: string;
    public mentionable: boolean;
    public name: string;
    public permissions: Permission[];
    public position: number;

    public members = new Collection<string, Member>();

    constructor (data: APIRole, guild: Guild) {
        this.color = data.color;
        this.id = data.id;

        const created = new Snowflake(this.id).timestamp;

        this.created = {
            at: new Date(created),
            timestamp: created
        };
        this.hoist = data.hoist;
        this.guild = guild;
        this.mentionable = data.mentionable;
        this.name = data.name;
        this.permissions = new Permissions(BigInt(data.permissions)).toArray() as Permission[];
        this.position = data.position;

        Object.defineProperty(this, 'members', { enumerable: false });
    }
}