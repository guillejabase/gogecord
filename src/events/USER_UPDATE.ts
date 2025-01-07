import GatewayEvent from '../structures/GatewayEvent';
import User from '../structures/User';

export default new GatewayEvent({
    name: 'USER_UPDATE',

    run: (client, data) => {
        client.emit('UserUpdate', client.users.cache.get(data.id)!, new User(client, data));
    }
});