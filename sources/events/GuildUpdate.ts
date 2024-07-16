import { PresenceUpdateReceiveStatus } from 'discord-api-types/v10';
import Event from '../classes/Event';
import { ChannelTypes } from '../classes/Channel';
import MemberFlags from '../util/MemberFlags';
import UserFlags from '../util/UserFlags';
import { ActivityTypes, Statuses } from '../classes/Presence';
import Guild from '../classes/Guild';

export default new Event({
    name: 'GuildUpdate',

    run(client, data) {
        const oldGuild = client.guilds.get(data.id)!;
        const additional = {
            ...data,
            channels: oldGuild.channels.map((channel) => ({
                ...channel,
                type: ChannelTypes[channel.type]
            })),
            members: oldGuild.members.map((member) => ({
                avatar: member.avatar,
                deaf: member.deaf,
                flags: MemberFlags.resolve(member.flags),
                guild_id: oldGuild.id,
                joined_at: member.joined.at.toISOString(),
                mute: member.mute,
                nick: member.nickname,
                premium_since: member.boosting?.since.toISOString(),
                roles: member.roles.map((role) => role.id),
                user: {
                    avatar: member.user.avatar! || null,
                    banner: member.user.banner?.hash,
                    bot: member.user.bot,
                    discriminator: member.user.discriminator! || '0',
                    global_name: member.user.globalName! || null,
                    id: member.user.id,
                    public_flags: UserFlags.resolve(member.user.flags),
                    username: member.user.username
                }
            })),
            presences: oldGuild.members.map((member) => {
                type Status = PresenceUpdateReceiveStatus | undefined;

                return {
                    activities: member.presence.activities.map((activity) => ({
                        created_at: activity.created.timestamp,
                        id: activity.id,
                        name: activity.name,
                        type: ActivityTypes[activity.type]
                    })) || undefined,
                    client_status: {
                        desktop: Statuses[member.presence.client.desktop] as Status,
                        mobile: Statuses[member.presence.client.mobile] as Status,
                        web: Statuses[member.presence.client.web] as Status
                    },
                    guild_id: oldGuild.id,
                    status: Statuses[member.presence.status] as Status,
                    user: {
                        id: member.user.id
                    }
                };
            })
        };

        const newGuild = new Guild(client, additional);

        client.guilds.set(newGuild.id, newGuild);

        client.emit(this.name, client, oldGuild, newGuild);
    }
});