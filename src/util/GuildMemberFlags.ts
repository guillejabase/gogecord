import { GuildMemberFlags as Flags } from 'discord-api-types/v10';

import { BitField, type BitFieldResolvable } from './BitField';

export type GuildMemberFlagsString = keyof typeof Flags;
export type GuildMemberFlagsResolvable = BitFieldResolvable<GuildMemberFlagsString, number>;

export class GuildMemberFlags extends BitField<GuildMemberFlagsString, number> {
  public constructor(bits?: GuildMemberFlagsResolvable) {
    super(bits, Flags);
  }
}
