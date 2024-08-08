import Client from '../classes/Client';
import Guild from '../classes/Guild';
import Member from '../classes/Member';
import Collection from '../util/Collection';
export default class MemberManager {
    private client;
    private guild;
    cache: Collection<string, Member>;
    constructor(client: Client, guild: Guild);
    private path;
    deafen(member: Member, reason?: string): Promise<void>;
    mute(member: Member, reason?: string): Promise<void>;
    kick(member: Member, reason?: string): Promise<void>;
    timeout(member: Member, time: number, reason?: string): Promise<void>;
    undeafen(member: Member): Promise<void>;
    unmute(member: Member): Promise<void>;
    untimeout(member: Member): Promise<void>;
}
