import { ActivityType as Type, type GatewayActivity } from 'discord-api-types/v10';

import { ActivityFlags } from '../util/ActivityFlags';

export type ActivityType = keyof typeof Type;

export interface ActivityEmoji {
  animated?: boolean;
  id?: string | null;
  name: string | null;
}
export interface ActivityTimestamps {
  end?: number | undefined;
  start?: number | undefined;
}

export class Activity {
  public createdAt: number;
  public details?: string | null | undefined;
  public emoji?: ActivityEmoji | undefined;
  public flags: ActivityFlags;
  public id: string;
  public name: string;
  public state?: string | null | undefined;
  public timestamps?: ActivityTimestamps | undefined;
  public type: ActivityType;
  public url?: string | null | undefined;

  public constructor(data: GatewayActivity) {
    this.createdAt = data.created_at;
    this.details = data.details;
    this.emoji = data.emoji;
    this.flags = new ActivityFlags(data.flags);
    this.id = data.id;
    this.name = data.name;
    this.state = data.state;
    this.timestamps = data.timestamps;
    this.type = Type[data.type] as ActivityType;
    this.url = data.url;
  }
}
