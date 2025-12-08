export type Provider = 'google' | 'slack' | 'teams';

export interface RouteConfig {
    to: Provider;
    provider: Provider;
    channel_id?: string; // for Slack
    graph_channel_id?: string; // for Teams
    outgoing_space?: string; // for Google
    slack_signing_secret?: string;
}

export interface ConversationReference {
    channelId: string;
    serviceUrl: string;
    conversation: { id: string };
    bot: { id: string };
    tenant: { id: string };
}

export interface ChannelPayload {
    _id?: {
        $oid: string;
    };
    channel_id: string;
    name?: string; // Optional channel name
    provider: Provider;
    outgoing_space?: string;
    graph_team_id?: string;
    graph_channel_id?: string;
    team_id?: string;
    slack_signing_secret?: string;
    routes: RouteConfig;
    conversation_reference?: ConversationReference;
}

export interface ValidationError {
    field: string;
    message: string;
}
