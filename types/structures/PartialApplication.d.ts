import ApplicationEmojiManager from '../managers/ApplicationEmojiManager';
import Application from './Application';
import Client from './Client';
export default class PartialApplication {
    private client;
    emojis: ApplicationEmojiManager;
    constructor(client: Client);
    fetch(): Promise<Application>;
}
//# sourceMappingURL=PartialApplication.d.ts.map