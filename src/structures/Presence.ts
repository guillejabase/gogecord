import type { GatewayPresenceUpdateDispatchData } from 'discord-api-types/v10';

import Activity, { ActivityTypes } from './Activity';

export enum PresenceStatuses {
    DoNotDisturb = 'dnd',
    Idle = 'idle',
    Offline = 'offline',
    Online = 'online'
}

export type PresenceStatus = keyof typeof PresenceStatuses;

export default class Presence {
    public activities: Activity[];
    public custom: {
        text?: string;
        emoji?: string;
    };
    public client: {
        desktop: PresenceStatus;
        mobile: PresenceStatus;
        web: PresenceStatus;
    };
    public status: PresenceStatus;

    constructor(data?: GatewayPresenceUpdateDispatchData) {
        this.activities = data?.activities
            ?.filter((activity) => {
                ActivityTypes['Custom'] as number !== activity.type;
            })
            .map((activity) => {
                return new Activity(activity);
            }) || [];

        const custom = data?.activities?.find((activity) => {
            ActivityTypes['Custom'] as number === activity.type;
        });
        let emoji: string | undefined;

        if (custom?.emoji) {
            if (custom.emoji.id) {
                emoji = `<${custom.emoji.animated ? 'a' : ''}:${custom.emoji.name}:${custom.emoji.id}>`;
            } else {
                emoji = custom.emoji.name || undefined;
            }
        } else {
            emoji = undefined;
        }

        this.custom = {
            text: custom?.state || undefined,
            emoji
        };

        const client = data?.client_status;
        this.client = {
            desktop: (Object
                .keys(PresenceStatuses)
                .find((key) => {
                    PresenceStatuses[key as PresenceStatus] as string === client?.desktop;
                }) ?? 'Offline') as PresenceStatus,
            mobile: (Object
                .keys(PresenceStatuses)
                .find((key) => {
                    PresenceStatuses[key as PresenceStatus] as string === client?.mobile;
                }) ?? 'Offline') as PresenceStatus,
            web: (Object
                .keys(PresenceStatuses)
                .find((key) => {
                    PresenceStatuses[key as PresenceStatus] as string === client?.web;
                }) ?? 'Offline') as PresenceStatus
        };

        this.status = (Object
            .keys(PresenceStatuses)
            .find((key) => {
                PresenceStatuses[key as PresenceStatus] as string === data?.status;
            }) ?? 'Offline') as PresenceStatus;
    }
}