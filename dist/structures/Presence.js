"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PresenceStatuses = void 0;
const Activity_1 = __importStar(require("./Activity"));
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
            Activity_1.ActivityTypes['Custom'] !== activity.type;
        })
            .map((activity) => {
            return new Activity_1.default(activity);
        }) || [];
        const custom = data?.activities?.find((activity) => {
            Activity_1.ActivityTypes['Custom'] === activity.type;
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