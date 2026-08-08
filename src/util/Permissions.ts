import { PermissionFlagsBits } from 'discord-api-types/v10';

import { BitField, type BitFieldResolvable } from './BitField';

export type PermissionsString = keyof typeof PermissionFlagsBits;
export type PermissionsResolvable = BitFieldResolvable<PermissionsString, bigint>;

export class Permissions extends BitField<PermissionsString, bigint> {
  public static readonly All = Object.values(PermissionFlagsBits).reduce((a, b) => a | b, 0n);

  public constructor(bits?: PermissionsResolvable) {
    super(bits, PermissionFlagsBits);
  }
}
