import { ActivityFlags as Flags } from 'discord-api-types/v10';

import { BitField, type BitFieldResolvable } from './BitField';

export type ActivityFlagsString = keyof typeof Flags;
export type ActivityFlagsResolvable = BitFieldResolvable<ActivityFlagsString, number>;

export class ActivityFlags extends BitField<ActivityFlagsString, number> {
  public constructor(bits?: ActivityFlagsResolvable) {
    super(bits, Flags);
  }
}
