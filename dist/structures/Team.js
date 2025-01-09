"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TeamMember_1 = __importDefault(require("./TeamMember"));
const Collection_1 = __importDefault(require("../util/Collection"));
class Team {
    client;
    icon;
    id;
    name;
    owner;
    members = new Collection_1.default();
    constructor(client, data) {
        this.client = client;
        this.icon = data.icon || undefined;
        this.id = data.id;
        for (const apiTeamMember of data.members) {
            const teamMember = new TeamMember_1.default(client, apiTeamMember);
            this.members.set(teamMember.user.id, teamMember);
        }
        this.name = data.name;
        this.owner = this.members.get(data.owner_user_id).user;
    }
}
exports.default = Team;
//# sourceMappingURL=Team.js.map