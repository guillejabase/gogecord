"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GatewayEvent_1 = __importDefault(require("../structures/GatewayEvent"));
exports.default = new GatewayEvent_1.default({
    name: 'READY',
    run: (client, data) => {
        const ready = Date.now();
        client.ready = {
            at: new Date(ready),
            timestamp: ready
        };
        client.emit('Ready', client);
    }
});
//# sourceMappingURL=READY.js.map