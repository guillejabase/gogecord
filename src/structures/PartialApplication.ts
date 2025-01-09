import { Routes } from 'discord-api-types/v10';

import ApplicationEmojiManager from '../managers/ApplicationEmojiManager';

import Application from './Application';
import Client from './Client';

export default class PartialApplication {
    public emojis = new ApplicationEmojiManager(this);

    constructor(private client: Client) {
        Object.defineProperty(this, 'client', { enumerable: false });
    }

    public async fetch(): Promise<Application> {
        return new Application(this.client, await this.client.request({
            method: 'get',
            path: Routes.currentApplication()
        }));
    }
}