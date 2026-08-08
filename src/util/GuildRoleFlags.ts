import { RoleFlags as Flags } from 'discord-api-types/v10';

import { BitField, type BitFieldResolvable } from './BitField';

export type GuildRoleFlagsString = keyof typeof Flags;
export type GuildRoleFlagsResolvable = BitFieldResolvable<GuildRoleFlagsString, number>;

export class GuildRoleFlags extends BitField<GuildRoleFlagsString, number> {
  public constructor(bits?: GuildRoleFlagsResolvable) {
    super(bits, Flags);
  }
}
