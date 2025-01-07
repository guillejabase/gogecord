import GatewayEvent from '../structures/GatewayEvent';

export default new GatewayEvent({
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