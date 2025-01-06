"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GatewayEvent_1 = __importDefault(require("../structures/GatewayEvent"));
const Guild_1 = __importDefault(require("../structures/Guild"));
exports.default = new GatewayEvent_1.default({
    name: 'GUILD_CREATE',
    run: (client, data) => {
        client.emit('GuildCreate', new Guild_1.default(client, data));
    }
});
//# sourceMappingURL=GUILD_CREATE.js.map