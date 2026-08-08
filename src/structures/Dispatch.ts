import type {
  GatewayGuildCreateDispatchData,
  GatewayGuildDeleteDispatchData,
  GatewayGuildMemberAddDispatchData,
  GatewayGuildMemberRemoveDispatchData,
  GatewayGuildMemberUpdateDispatchData,
  GatewayGuildRoleCreateDispatchData,
  GatewayGuildRoleDeleteDispatchData,
  GatewayGuildRoleUpdateDispatchData,
  GatewayGuildUpdateDispatchData,
  GatewayPresenceUpdateDispatchData,
  GatewayReadyDispatchData
} from 'discord-api-types/v10';

import { type Client } from './Client';

export type Dispatches = {
  GUILD_CREATE: GatewayGuildCreateDispatchData;
  GUILD_DELETE: GatewayGuildDeleteDispatchData;
  GUILD_MEMBER_ADD: GatewayGuildMemberAddDispatchData;
  GUILD_MEMBER_REMOVE: GatewayGuildMemberRemoveDispatchData;
  GUILD_MEMBER_UPDATE: GatewayGuildMemberUpdateDispatchData;
  GUILD_ROLE_CREATE: GatewayGuildRoleCreateDispatchData;
  GUILD_ROLE_DELETE: GatewayGuildRoleDeleteDispatchData;
  GUILD_ROLE_UPDATE: GatewayGuildRoleUpdateDispatchData;
  GUILD_UPDATE: GatewayGuildUpdateDispatchData;
  PRESENCE_UPDATE: GatewayPresenceUpdateDispatchData;
  READY: GatewayReadyDispatchData;
};
export type DispatchOptions<K extends keyof Dispatches> = {
  name: K,
  run: (client: Client<true>, data: Dispatches[K]) => void;
};

export class Dispatch<K extends keyof Dispatches = keyof Dispatches> {
  public name: DispatchOptions<K>['name'];
  public run: DispatchOptions<K>['run'];

  public constructor(options: DispatchOptions<K>) {
    const { name, run } = options;

    this.name = name;
    this.run = run;
  }
}
