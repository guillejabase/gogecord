import Client from '../classes/Client';
import Member from '../classes/Member';
import Role from '../classes/Role';
import Collection from '../util/Collection';
export default class MemberRoleManager {
    private client;
    private member;
    cache: Collection<string, Role>;
    constructor(client: Client, member: Member);
    private path;
    add(role: Role, reason?: string): Promise<void>;
    remove(role: Role, reason?: string): Promise<void>;
}
