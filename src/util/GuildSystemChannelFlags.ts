import { GuildSystemChannelFlags as Flags } from 'discord-api-types/v10';

import { BitField, type BitFieldResolvable } from './BitField';

export type GuildSystemChannelFlagsString = keyof typeof Flags;
export type GuildSystemChannelFlagsResolvable = BitFieldResolvable<GuildSystemChannelFlagsString, number>;

export class GuildSystemChannelFlags extends BitField<GuildSystemChannelFlagsString, number> {
  public constructor(bits?: GuildSystemChannelFlagsResolvable) {
    super(bits, Flags);
  }
}
