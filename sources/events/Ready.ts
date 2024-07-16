import Event from '../classes/Event';
import User from '../classes/User';
import { ActivityTypes, Statuses } from '../classes/Presence';

export default new Event({
    name: 'Ready',

    async run(client, data) {
        client.owner = new User((await client.api.get('/oauth2/applications/@me')).data.owner);
        client.user = new User(data.user);

        client.webSocket?.send(JSON.stringify({
            op: 3,
            d: {
                since: Date.now(),
                activities: client.presence.activities.map((activity) => ({ ...activity, type: ActivityTypes[activity.type] })),
                status: Statuses[client.presence.status],
                afk: false
            }
        }));

        client.emit(this.name, client);
    }
});