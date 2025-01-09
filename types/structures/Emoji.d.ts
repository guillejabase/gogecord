import type { APIEmoji } from 'discord-api-types/v10';
import Client from './Client';
import User from './User';
export default class Emoji {
    client: Client;
    animated: boolean;
    available: boolean;
    id: string;
    managed: boolean;
    name: string;
    user: User;
    constructor(client: Client, data: APIEmoji);
    toString(): string;
}
//# sourceMappingURL=Emoji.d.ts.map