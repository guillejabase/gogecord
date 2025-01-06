"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PresenceStatuses = exports.PresenceActivityTypes = void 0;
var PresenceActivityTypes;
(function (PresenceActivityTypes) {
    PresenceActivityTypes[PresenceActivityTypes["Playing"] = 0] = "Playing";
    PresenceActivityTypes[PresenceActivityTypes["Streaming"] = 1] = "Streaming";
    PresenceActivityTypes[PresenceActivityTypes["Listening"] = 2] = "Listening";
    PresenceActivityTypes[PresenceActivityTypes["Watching"] = 3] = "Watching";
    PresenceActivityTypes[PresenceActivityTypes["Custom"] = 4] = "Custom";
    PresenceActivityTypes[PresenceActivityTypes["Competing"] = 5] = "Competing";
})(PresenceActivityTypes || (exports.PresenceActivityTypes = PresenceActivityTypes = {}));
;
class Activity {
    created;
    details;
    id;
    name;
    started;
    state;
    type;
    url;
    constructor(data) {
        this.created = {
            at: new Date(data.created_at),
            timestamp: data.created_at
        };
        this.details = data.details || undefined;
        this.id = data.id;
        this.name = data.name;
        this.started = {
            at: data.timestamps?.start ? new Date(data.timestamps.start) : undefined,
            timestamp: data.timestamps?.start
        };
        this.state = data.state || undefined;
        this.type = Object
            .keys(PresenceActivityTypes)
            .find((key) => {
            return PresenceActivityTypes[key] === data.type;
        });
        this.url = data.url || undefined;
    }
}
var PresenceStatuses;
(function (PresenceStatuses) {
    PresenceStatuses["DoNotDisturb"] = "dnd";
    PresenceStatuses["Idle"] = "idle";
    PresenceStatuses["Offline"] = "offline";
    PresenceStatuses["Online"] = "online";
})(PresenceStatuses || (exports.PresenceStatuses = PresenceStatuses = {}));
class Presence {
    activities;
    custom;
    client;
    status;
    constructor(data) {
        this.activities = data?.activities
            ?.filter((activity) => {
            PresenceActivityTypes['Custom'] !== activity.type;
        })
            .map((activity) => {
            return new Activity(activity);
        }) || [];
        const custom = data?.activities?.find((activity) => {
            PresenceActivityTypes['Custom'] === activity.type;
        });
        let emoji;
        if (custom?.emoji) {
            if (custom.emoji.id) {
                emoji = `<${custom.emoji.animated ? 'a' : ''}:${custom.emoji.name}:${custom.emoji.id}>`;
            }
            else {
                emoji = custom.emoji.name || undefined;
            }
        }
        else {
            emoji = undefined;
        }
        this.custom = {
            text: custom?.state || undefined,
            emoji
        };
        const client = data?.client_status;
        this.client = {
            desktop: (Object
                .keys(PresenceStatuses)
                .find((key) => {
                PresenceStatuses[key] === client?.desktop;
            }) ?? 'Offline'),
            mobile: (Object
                .keys(PresenceStatuses)
                .find((key) => {
                PresenceStatuses[key] === client?.mobile;
            }) ?? 'Offline'),
            web: (Object
                .keys(PresenceStatuses)
                .find((key) => {
                PresenceStatuses[key] === client?.web;
            }) ?? 'Offline')
        };
        this.status = (Object
            .keys(PresenceStatuses)
            .find((key) => {
            PresenceStatuses[key] === data?.status;
        }) ?? 'Offline');
    }
}
exports.default = Presence;
//# sourceMappingURL=Presence.js.map