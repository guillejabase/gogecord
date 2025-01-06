"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BitField_1 = __importDefault(require("./BitField"));
class Permissions extends BitField_1.default {
    static bits = {
        CreateInstantInvite: 1,
        KickMembers: 2,
        BanMembers: 4,
        Administrator: 8,
        ManageChannels: 16,
        ManageGuild: 32,
        AddReactions: 64,
        ViewAuditLog: 128,
        PrioritySpeaker: 256,
        Stream: 512,
        ViewChannel: 1024,
        SendMessages: 2048,
        SendTTSMessages: 4096,
        ManageMessages: 8192,
        EmbedLinks: 16384,
        AttachFiles: 32768,
        ReadMessageHistory: 65536,
        MentionEveryone: 131072,
        UseExternalEmojis: 262144,
        ViewGuildInsights: 524288,
        Connect: 1048576,
        Speak: 2097152,
        MuteMembers: 4194304,
        DeafenMembers: 8388608,
        MoveMembers: 16777216,
        UseVAD: 33554432,
        ChangeNickname: 67108864,
        ManageNicknames: 134217728,
        ManageRoles: 268435456,
        ManageWebhooks: 536870912,
        ManageGuildExpressions: 1073741824,
        UseApplicationCommands: 2147483648,
        RequestToSpeak: 4294967296,
        ManageEvents: 8589934592,
        ManageThreads: 17179869184,
        CreatePublicThreads: 34359738368,
        CreatePrivateThreads: 68719476736,
        UseExternalStickers: 137438953472,
        SendMessagesInThreads: 274877906944,
        UseEmbeddedActivities: 549755813888,
        ModerateMembers: 1099511627776,
        ViewCreatorMonetizationAnalytics: 2199023255552,
        UseSoundboard: 4398046511104,
        CreateGuildExpressions: 8796093022208,
        CreateEvents: 17592186044416,
        UseExternalSounds: 35184372088832,
        SendVoiceMessages: 70368744177664,
        SendPolls: 562949953421312,
        UseExternalApps: 1125899906842624
    };
    constructor(...bits) {
        super(...bits);
        if (this.has('Administrator')) {
            this.bitField = Permissions.bits.Administrator;
        }
    }
    has(bit) {
        if (this.bitField == Permissions.bits.Administrator) {
            return true;
        }
        return super.has(bit);
    }
    toArray() {
        return super.toArray();
    }
}
exports.default = Permissions;
//# sourceMappingURL=Permissions.js.map