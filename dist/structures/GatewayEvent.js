"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GatewayEvent {
    name;
    run;
    constructor(options) {
        const { name, run } = options;
        this.name = name;
        this.run = run;
    }
}
exports.default = GatewayEvent;
//# sourceMappingURL=GatewayEvent.js.map