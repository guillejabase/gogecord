import { UserFlags as Flags } from 'discord-api-types/v10';

import { BitField, type BitFieldResolvable } from './BitField';

export type UserFlagsString = keyof typeof Flags;
export type UserFlagsResolvable = BitFieldResolvable<UserFlagsString, number>;

export class UserFlags extends BitField<UserFlagsString, number> {
  public constructor(bits?: UserFlagsResolvable) {
    super(bits, Flags);
  }
}
