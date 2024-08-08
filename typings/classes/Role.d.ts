import { APIRole } from 'discord-api-types/v10';
import Guild from './Guild';
import Member from './Member';
import Collection from '../util/Collection';
import { Permission } from '../util/Permissions';
export default class Role {
    color: number;
    created: {
        at: Date;
        timestamp: number;
    };
    hoist: boolean;
    guild: Guild;
    id: string;
    mentionable: boolean;
    name: string;
    permissions: Permission[];
    position: number;
    members: Collection<string, Member>;
    constructor(data: APIRole, guild: Guild);
}
