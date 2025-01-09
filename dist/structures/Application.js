"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PartialApplication_1 = __importDefault(require("./PartialApplication"));
const Team_1 = __importDefault(require("./Team"));
const User_1 = __importDefault(require("./User"));
const ApplicationFlags_1 = __importDefault(require("../util/ApplicationFlags"));
class Application extends PartialApplication_1.default {
    public;
    description;
    flags;
    icon;
    name;
    owner;
    team;
    constructor(client, data) {
        super(client);
        this.public = data.bot_public;
        this.description = data.description;
        this.flags = new ApplicationFlags_1.default(data.flags);
        this.icon = data.icon || undefined;
        this.name = data.name;
        this.owner = data.owner ? new User_1.default(client, data.owner) : undefined;
        this.team = data.team ? new Team_1.default(client, data.team) : undefined;
    }
}
exports.default = Application;
//# sourceMappingURL=Application.js.map