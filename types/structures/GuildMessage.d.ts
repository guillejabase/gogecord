import type { GatewayMessageCreateDispatchData, GatewayMessageUpdateDispatchData } from 'discord-api-types/v10';
import BasedMessage from './BasedMessage';
import Guild from './Guild';
import GuildMember from './GuildMember';
export default class GuildMessage extends BasedMessage {
    guild: Guild;
    member: GuildMember;
    constructor(guild: Guild, data: GatewayMessageCreateDispatchData | GatewayMessageUpdateDispatchData);
}
//# sourceMappingURL=GuildMessage.d.ts.map