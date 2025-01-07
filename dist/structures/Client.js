"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v10_1 = require("discord-api-types/v10");
const ws_1 = __importDefault(require("ws"));
const ChannelManager_1 = __importDefault(require("../managers/ChannelManager"));
const GuildManager_1 = __importDefault(require("../managers/GuildManager"));
const UserManager_1 = __importDefault(require("../managers/UserManager"));
const Emitter_1 = __importDefault(require("./Emitter"));
const Presence_1 = require("./Presence");
const Intents_1 = __importDefault(require("../util/Intents"));
class Client extends Emitter_1.default {
    requestQueue = [];
    isProcessingQueue = false;
    retryAfter = 0;
    intents;
    mentions;
    presence;
    ready;
    token;
    webSocket;
    channels = new ChannelManager_1.default(this);
    guilds = new GuildManager_1.default(this);
    users = new UserManager_1.default(this);
    constructor(options) {
        super();
        this.intents = new Intents_1.default(options.intents);
        this.mentions = !!options.mentions;
        this.presence = {
            activities: [],
            afk: false,
            status: 'Online'
        };
        Object.defineProperties(this, {
            requestQueue: { enumerable: false },
            isProcessingQueue: { enumerable: false },
            retryAfter: { enumerable: false },
            token: { enumerable: false },
            webSocket: { enumerable: false },
            channels: { enumerable: false },
            guilds: { enumerable: false },
            users: { enumerable: false }
        });
    }
    async processQueue() {
        if (this.isProcessingQueue) {
            return;
        }
        this.isProcessingQueue = true;
        while (this.requestQueue.length > 0) {
            const now = Date.now();
            if (this.retryAfter > now) {
                await new Promise((resolve) => {
                    setTimeout(resolve, this.retryAfter - now);
                });
            }
            const options = this.requestQueue.shift();
            if (!options) {
                return;
            }
            try {
                options.resolve(await this.processRequest(options));
            }
            catch (error) {
                if (error.status === 429) {
                    this.retryAfter = Date.now() + error.headers['retry-after'] * 1000;
                    this.requestQueue.unshift(options);
                }
                else {
                    options.reject(error);
                }
            }
        }
        this.isProcessingQueue = false;
    }
    async processRequest(options) {
        const headers = {
            Authorization: `Bot ${this.token}`,
            'Content-Type': 'application/json'
        };
        if (options.reason) {
            headers['X-Audit-Log-Reason'] = options.reason;
        }
        const response = await fetch(`${v10_1.RouteBases.api}${options.path}`, {
            method: options.method,
            headers: headers,
            body: JSON.stringify(options.body) ?? undefined
        });
        if (!response.ok) {
            const error = new Error(`HTTP Error. Status: ${response.status}`);
            error.status = response.status;
            error.headers = response.headers;
            throw error;
        }
        return await response.json();
    }
    async login(token) {
        this.token = token;
        try {
            const data = await this.request({
                method: 'get',
                path: '/gateway/bot'
            });
            this.webSocket = new ws_1.default(data.url);
            this.webSocket.on('open', () => {
                this.webSocket.send(JSON.stringify({
                    op: 2,
                    d: {
                        intents: this.intents.bitField,
                        token: this.token,
                        properties: {
                            os: 'windows',
                            browser: 'chrome',
                            device: 'chrome'
                        }
                    }
                }));
            });
            this.webSocket.on('message', async (data) => {
                const payload = JSON.parse(data.toString());
                if (payload.op === 10) {
                    setInterval(() => {
                        this.webSocket.send(JSON.stringify({
                            op: 1,
                            d: null
                        }));
                    }, payload.d.heartbeat_interval);
                }
                if (!payload.t) {
                    return;
                }
                const event = require(`../events/${payload.t}`).default;
                if (event.name != payload.t) {
                    return;
                }
                event.run(this, payload.d);
            });
            this.webSocket.on('error', (error) => {
                throw new Error(`WebSocket error: ${error.message}`);
            });
        }
        catch (error) {
            throw new Error(`Failed to login: ${error.message}`);
        }
    }
    async request(options) {
        return new Promise((resolve, reject) => {
            this.requestQueue.push({ ...options, resolve, reject });
            this.processQueue();
        });
    }
    async setPresence(options) {
        this.presence = {
            activities: options.activities?.map((activity) => ({
                ...activity,
                type: activity.type || 'Playing'
            })) || [],
            afk: !!options.afk,
            status: options.status || 'Online'
        };
        this.webSocket.send(JSON.stringify({
            op: 3,
            d: {
                activities: this.presence.activities.map((activity) => ({
                    ...activity,
                    type: Presence_1.PresenceActivityTypes[activity.type]
                })),
                afk: this.presence.afk,
                since: Date.now(),
                status: Presence_1.PresenceStatuses[this.presence.status]
            }
        }));
    }
}
exports.default = Client;
//# sourceMappingURL=Client.js.map