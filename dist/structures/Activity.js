"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityTypes = void 0;
var ActivityTypes;
(function (ActivityTypes) {
    ActivityTypes[ActivityTypes["Playing"] = 0] = "Playing";
    ActivityTypes[ActivityTypes["Streaming"] = 1] = "Streaming";
    ActivityTypes[ActivityTypes["Listening"] = 2] = "Listening";
    ActivityTypes[ActivityTypes["Watching"] = 3] = "Watching";
    ActivityTypes[ActivityTypes["Custom"] = 4] = "Custom";
    ActivityTypes[ActivityTypes["Competing"] = 5] = "Competing";
})(ActivityTypes || (exports.ActivityTypes = ActivityTypes = {}));
;
class Activity {
    created;
    details;
    id;
    name;
    started;
    state;
    type;
    url;
    constructor(data) {
        this.created = {
            at: new Date(data.created_at),
            timestamp: data.created_at
        };
        this.details = data.details || undefined;
        this.id = data.id;
        this.name = data.name;
        this.started = {
            at: data.timestamps?.start ? new Date(data.timestamps.start) : undefined,
            timestamp: data.timestamps?.start
        };
        this.state = data.state || undefined;
        this.type = Object
            .keys(ActivityTypes)
            .find((key) => {
            return ActivityTypes[key] === data.type;
        });
        this.url = data.url || undefined;
    }
}
exports.default = Activity;
//# sourceMappingURL=Activity.js.map