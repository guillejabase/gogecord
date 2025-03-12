import GatewayEvent from '../structures/GatewayEvent';
import User from '../structures/User';

export default new GatewayEvent({
    name: 'READY',

    run(client, data) {
        client.user = new User(client, data.user);

        const ready = Date.now();
        client.ready = {
            at: new Date(ready),
            timestamp: ready
        };

        client.emit(this.name, client);
    }
});