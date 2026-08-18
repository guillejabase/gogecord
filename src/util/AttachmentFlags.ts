import { AttachmentFlags as Flags } from 'discord-api-types/v10';

import { BitField, type BitFieldResolvable } from './BitField';

export type AttachmentFlagsString = keyof typeof Flags;
export type AttachmentFlagsResolvable = BitFieldResolvable<AttachmentFlagsString, number>;

export class AttachmentFlags extends BitField<AttachmentFlagsString, number> {
  public constructor(bits?: AttachmentFlagsResolvable) {
    super(bits, Flags);
  }
}
