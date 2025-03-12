import GatewayEvent from '../structures/GatewayEvent';
import Guild from '../structures/Guild';

export default new GatewayEvent({
    name: 'GUILD_CREATE',

    run(client, data) {
        client.emit(this.name, new Guild(client, data));
    }
});