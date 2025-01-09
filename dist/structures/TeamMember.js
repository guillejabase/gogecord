"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamMemberStates = exports.TeamMemberRoles = void 0;
const User_1 = __importDefault(require("./User"));
var TeamMemberRoles;
(function (TeamMemberRoles) {
    TeamMemberRoles["Admin"] = "admin";
    TeamMemberRoles["Developer"] = "developer";
    TeamMemberRoles["ReadOnly"] = "read_only";
})(TeamMemberRoles || (exports.TeamMemberRoles = TeamMemberRoles = {}));
var TeamMemberStates;
(function (TeamMemberStates) {
    TeamMemberStates[TeamMemberStates["Invited"] = 1] = "Invited";
    TeamMemberStates[TeamMemberStates["Accepted"] = 2] = "Accepted";
})(TeamMemberStates || (exports.TeamMemberStates = TeamMemberStates = {}));
class TeamMember {
    client;
    role;
    state;
    user;
    constructor(client, data) {
        this.client = client;
        this.role = Object
            .keys(TeamMemberRoles)
            .find((key) => {
            TeamMemberRoles[key] === data.role;
        });
        this.state = Object
            .keys(TeamMemberStates)
            .find((key) => {
            TeamMemberStates[key] === data.membership_state;
        });
        this.user = new User_1.default(client, data.user);
    }
}
exports.default = TeamMember;
//# sourceMappingURL=TeamMember.js.map