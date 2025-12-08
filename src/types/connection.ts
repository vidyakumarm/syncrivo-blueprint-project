/**
 * TypeScript types for MongoDB Connections schema
 * Preserves exact schema structure as defined in requirements
 */

export type Provider = "google" | "slack" | "teams";

export interface Routes {
    to: Provider;
    provider: Provider;
    channel_id?: string;
    graph_channel_id?: string;
    outgoing_space?: string;
    slack_signing_secret?: string;
}

export interface ConversationReference {
    channelId: string;
    serviceUrl: string;
    conversation: { id: string };
    bot: { id: string };
    tenant: { id: string };
}

export interface Connection {
    _id?: string;
    provider: Provider;
    channel_id: string;
    outgoing_space?: string;
    graph_team_id?: string;
    graph_channel_id?: string;
    team_id?: string;
    slack_signing_secret?: string;
    routes: Routes;
    conversation_reference?: ConversationReference;
    createdAt?: Date;
    updatedAt?: Date;
}

// Filter types for API queries
export interface ConnectionFilters {
    sourceProvider?: Provider;
    targetProvider?: Provider;
    search?: string;
}

// Form state type
export interface ConnectionFormData extends Omit<Connection, '_id'> { }

// Route combination type for UI logic
export type RouteType =
    | 'google-teams'
    | 'teams-slack'
    | 'google-slack'
    | 'slack-google'
    | 'slack-teams'
    | 'teams-google';

export function getRouteType(source: Provider, target: Provider): RouteType {
    return `${source}-${target}` as RouteType;
}

export function parseRouteType(routeType: RouteType): { source: Provider; target: Provider } {
    const [source, target] = routeType.split('-') as [Provider, Provider];
    return { source, target };
}
