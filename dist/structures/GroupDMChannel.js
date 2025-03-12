"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BasedChannel_1 = __importDefault(require("./BasedChannel"));
const Collection_1 = __importDefault(require("../util/Collection"));
class GroupDMChannel extends BasedChannel_1.default {
    icon;
    name;
    type = 'GroupDM';
    recipients = new Collection_1.default();
    constructor(client, data) {
        super(client, data);
        this.icon = data.icon || undefined;
        this.name = data.name || undefined;
    }
}
exports.default = GroupDMChannel;
//# sourceMappingURL=GroupDMChannel.js.map