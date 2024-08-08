import Listener from '../classes/Listener';
import User from '../classes/User';

export default new Listener({
    name: 'Ready',

    run(client, data) {
        client.user = new User(data.user);

        const ready = Date.now();

        client.ready = {
            at: new Date(ready),
            timestamp: ready
        };

        if (client.events.get(this.name)) {
            client.emit(this.name, client);
        }
    }
});