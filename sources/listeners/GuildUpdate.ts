import { ChannelTypes } from '../classes/Channel';
import Guild from '../classes/Guild';
import Listener from '../classes/Listener';
import { ActivityTypes, Statuses } from '../classes/Presence';

import UserFlags from '../util/UserFlags';

export default new Listener({
    name: 'GuildUpdate',

    run(client, data) {
        const oldGuild = client.guilds.get(data.id)!;
        const newGuild = new Guild(client, {
            ...data,
            channels: oldGuild.channels.cache.map((channel) => ({
                id: channel.id,
                name: channel.name,
                type: ChannelTypes[channel.type]
            })),
            members: oldGuild.members.cache.map((member) => ({
                avatar: member.avatar,
                communication_disabled_until: member.timedOut.until?.toISOString(),
                deaf: member.deaf,
                joined_at: member.joined.at.toISOString(),
                mute: member.muted,
                nick: member.nickname,
                premium_since: member.boosting.since?.toISOString(),
                roles: member.roles.cache.map((role) => role.id),
                user: {
                    avatar: member.user.avatar,
                    banner: member.user.banner.hash,
                    bot: member.user.bot,
                    color: member.user.banner.color,
                    discriminator: member.user.discriminator,
                    global_name: member.user.globalName,
                    id: member.user.id,
                    public_flags: UserFlags.resolve(member.user.flags),
                    username: member.user.username
                }
            })),
            presences: oldGuild.members.cache.map((member) => ({
                activities: member.presence.activities.map((activity) => ({
                    created_at: activity.created.timestamp,
                    name: activity.name,
                    type: ActivityTypes[activity.type]
                })),
                client_status: {
                    desktop: Statuses[member.presence.client.desktop],
                    mobile: Statuses[member.presence.client.mobile],
                    web: Statuses[member.presence.client.web]
                },
                status: Statuses[member.presence.status],
                user: {
                    id: member.user.id
                }
            }))
        } as any);

        client.guilds.set(newGuild.id, newGuild);

        if (client.events.get(this.name)) {
            client.emit(this.name, client, oldGuild, newGuild);
        }
    }
});