import Client from '../classes/Client';
import Member from '../classes/Member';
import Role from '../classes/Role';

import Collection from '../util/Collection';

export default class MemberRoleManager {
    private client: Client;
    private member: Member;

    public cache = new Collection<string, Role>();

    constructor (client: Client, member: Member) {
        this.client = client;
        this.member = member;

        Object.defineProperties(this, {
            client: { enumerable: false },
            member: { enumerable: false }
        });
    }

    private path(role: Role): string {
        return `/guilds/${this.member.guild.id}/members/${this.member.user.id}/roles/${role.id}`;
    }

    public async add(role: Role, reason?: string): Promise<void> {
        return await this.client.request('put', this.path(role), undefined, reason);
    }
    public async remove(role: Role, reason?: string): Promise<void> {
        return await this.client.request('delete', this.path(role), undefined, reason);
    }
}