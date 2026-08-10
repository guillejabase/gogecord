import { ActivityType as Type, type GatewayActivity } from 'discord-api-types/v10';

import { ActivityFlags } from '../util/ActivityFlags';

export type ActivityType = keyof typeof Type;

export interface ActivityEmoji {
  animated: boolean;
  id: string | null;
  name: string | null;
}
export interface ActivityTimestamps {
  end: number | null;
  start: number | null;
}

export class Activity {
  public createdTimestamp: number;
  public details: string | null;
  public emoji: ActivityEmoji | null;
  public flags: ActivityFlags;
  public id: string;
  public name: string;
  public state: string | null;
  public timestamps: ActivityTimestamps | null;
  public type: ActivityType;
  public url: string | null;

  public constructor(data: GatewayActivity) {
    this.createdTimestamp = data.created_at;
    this.details = data.details ?? null;
    this.emoji = data.emoji ? {
      animated: data.emoji.animated ?? false,
      id: data.emoji.id ?? null,
      name: data.emoji.name
    } : null;
    this.flags = new ActivityFlags(data.flags);
    this.id = data.id;
    this.name = data.name;
    this.state = data.state ?? null;
    this.timestamps = data.timestamps ? {
      end: data.timestamps.end ?? null,
      start: data.timestamps.start ?? null
    } : null;
    this.type = Type[data.type] as ActivityType;
    this.url = data.url ?? null;
  }
}
