import type { GatewayMessageCreateDispatchData, GatewayMessageUpdateDispatchData } from 'discord-api-types/v10';

import BasedMessage from './BasedMessage';
import Guild from './Guild';
import GuildMember from './GuildMember';

export default class GuildMessage extends BasedMessage {
    public member: GuildMember;

    public constructor(public guild: Guild, data: GatewayMessageCreateDispatchData | GatewayMessageUpdateDispatchData) {
        super(guild.client, data);

        this.member = guild.members.cache.get(data.author.id)!;
    }
}