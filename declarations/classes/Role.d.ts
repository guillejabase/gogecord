import types from 'discord-api-types/v10';
import Client from './Client';
import Guild from './Guild';
import { Permission } from '../util/Permissions';
export default class Role {
    private client;
    private guildId;
    private permissionsBitField;
    created: {
        at: Date;
        timestamp: number;
    };
    color: number;
    id: string;
    mention: string;
    name: string;
    position: number;
    constructor(client: Client, data: types.APIRole | types.GatewayGuildRoleModifyDispatchData['role'], guild: Guild);
    get guild(): Guild | undefined;
    get permissions(): Permission[];
}
