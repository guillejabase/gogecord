import { GatewayIntentBits } from 'discord-api-types/v10';

import { BitField, type BitFieldResolvable } from './BitField';

export type IntentsString = keyof typeof GatewayIntentBits;
export type IntentsResolvable = BitFieldResolvable<IntentsString, number>;

export class Intents extends BitField<IntentsString, number> {
  public constructor(bits?: IntentsResolvable) {
    super(bits, GatewayIntentBits);
  }
}
