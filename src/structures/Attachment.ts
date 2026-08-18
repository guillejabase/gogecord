import { type APIAttachment } from 'discord-api-types/v10';

import { AttachmentFlags } from '../util/AttachmentFlags';
import { Snowflake } from '../util/Snowflake';

export class Attachment {
  public createdTimestamp: number;
  public description: string | null;
  public filename: string;
  public flags: AttachmentFlags;
  public height: number | null;
  public id: string;
  public proxyUrl: string;
  public size: number;
  public title: string | null;
  public type: string | null;
  public url: string;
  public width: number | null;

  public constructor(data: APIAttachment) {
    this.createdTimestamp = new Snowflake(data.id).timestamp;
    this.description = data.description ?? null;
    this.filename = data.filename;
    this.flags = new AttachmentFlags(data.flags);
    this.height = data.height ?? null;
    this.id = data.id;
    this.proxyUrl = data.proxy_url;
    this.size = data.size;
    this.title = data.title ?? null;
    this.type = data.content_type ?? null;
    this.url = data.url;
    this.width = data.width ?? null;
  }
}
