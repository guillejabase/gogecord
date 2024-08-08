import Client from '../classes/Client';
import Guild from '../classes/Guild';
import Member from '../classes/Member';

import Collection from '../util/Collection';

export default class MemberManager {
    private client: Client;
    private guild: Guild;

    public cache = new Collection<string, Member>();

    constructor (client: Client, guild: Guild) {
        this.client = client;
        this.guild = guild;

        Object.defineProperties(this, {
            client: { enumerable: false },
            guild: { enumerable: false }
        });
    }

    private path(member: Member): string {
        return `/guilds/${this.guild.id}/members/${member.user.id}`;
    }

    public async deafen(member: Member, reason?: string): Promise<void> {
        return await this.client.request('patch', this.path(member), {
            deaf: true
        }, reason);
    }
    public async mute(member: Member, reason?: string): Promise<void> {
        return await this.client.request('patch', this.path(member), {
            mute: true
        }, reason);
    }
    public async kick(member: Member, reason?: string): Promise<void> {
        return await this.client.request('delete', this.path(member), undefined, reason);
    }
    public async timeout(member: Member, time: number, reason?: string): Promise<void> {
        return await this.client.request('patch', this.path(member), {
            communication_disabled_until: new Date(Date.now() + time).toISOString()
        }, reason);
    }
    public async undeafen(member: Member): Promise<void> {
        return await this.client.request('patch', this.path(member), {
            deaf: false
        });
    }
    public async unmute(member: Member): Promise<void> {
        return await this.client.request('patch', this.path(member), {
            mute: false
        });
    }
    public async untimeout(member: Member): Promise<void> {
        return await this.client.request('patch', this.path(member), {
            communication_disabled_until: null
        });
    }
}