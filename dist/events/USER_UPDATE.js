"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GatewayEvent_1 = __importDefault(require("../structures/GatewayEvent"));
const User_1 = __importDefault(require("../structures/User"));
exports.default = new GatewayEvent_1.default({
    name: 'USER_UPDATE',
    run: (client, data) => {
        client.emit('UserUpdate', client.users.cache.get(data.id), new User_1.default(client, data));
    }
});
//# sourceMappingURL=USER_UPDATE.js.map