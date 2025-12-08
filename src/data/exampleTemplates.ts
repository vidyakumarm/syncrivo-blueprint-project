import { ChannelPayload } from '@/types/channel';

export const EXAMPLE_TEMPLATES: Record<string, ChannelPayload> = {
    'google-teams': {
        channel_id: 'google-example-001',
        name: 'Google to Teams Example',
        provider: 'google',
        outgoing_space: 'spaces/EXAMPLE_SPACE_001',
        routes: {
            to: 'teams',
            provider: 'teams',
            graph_channel_id: '19:exampleGoogleTeams@thread.tacv2',
        },
    },
    'teams-slack': {
        channel_id: 'teams-example-001',
        name: 'Teams to Slack Example',
        provider: 'teams',
        graph_team_id: 'example-team-uuid-001',
        graph_channel_id: '19:exampleTeamsSlack@thread.tacv2',
        routes: {
            to: 'slack',
            provider: 'slack',
            channel_id: 'CEXAMPLE001',
        },
    },
    'google-slack': {
        channel_id: 'google-example-002',
        name: 'Google to Slack Example',
        provider: 'google',
        outgoing_space: 'spaces/EXAMPLE_SPACE_002',
        routes: {
            to: 'slack',
            provider: 'slack',
            channel_id: 'CEXAMPLE002',
            slack_signing_secret: 'xxxxx_example_secret',
        },
    },
    'slack-google': {
        channel_id: 'slack-example-001',
        name: 'Slack to Google Example',
        provider: 'slack',
        team_id: 'TEXAMPLE001',
        slack_signing_secret: 'xxxxx_example_secret',
        routes: {
            to: 'google',
            provider: 'google',
            outgoing_space: 'spaces/EXAMPLE_DESTINATION_001',
        },
    },
    'slack-teams': {
        channel_id: 'slack-example-002',
        name: 'Slack to Teams Example',
        provider: 'slack',
        team_id: 'TEXAMPLE002',
        slack_signing_secret: 'xxxxx_example_secret',
        routes: {
            to: 'teams',
            provider: 'teams',
            graph_channel_id: '19:exampleSlackTeams@thread.tacv2',
        },
    },
};

export const TEMPLATE_LABELS: Record<string, string> = {
    'google-teams': 'Google Chat → Teams',
    'teams-slack': 'Teams → Slack',
    'google-slack': 'Google Chat → Slack',
    'slack-google': 'Slack → Google Chat',
    'slack-teams': 'Slack → Teams',
};
