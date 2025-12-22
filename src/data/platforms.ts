import {
    Building,
    Code,
    Earth,
    Headphones,
} from 'lucide-react';

import discordOfficial from '@/assets/brands/discord-official.png';
import driftOfficial from '@/assets/brands/drift-official.svg';
import flockOfficial from '@/assets/brands/flock-official.svg';
import freshchatOfficial from '@/assets/brands/freshchat-official.svg';
import gitterOfficial from '@/assets/brands/gitter-official.svg';
import googleMeet from '@/assets/brands/google-meet.svg';
import intercomOfficial from '@/assets/brands/intercom-official.svg';
import kakaotalkOfficial from '@/assets/brands/kakaotalk-official.svg';
import lineOfficial from '@/assets/brands/line-official.svg';
import livechatOfficial from '@/assets/brands/livechat-official.svg';
import mattermostOfficial from '@/assets/brands/mattermost-official.svg';
import rocketchatOfficial from '@/assets/brands/rocketchat-official.svg';
import signalOfficial from '@/assets/brands/signal-official.svg';
import slackOfficial from '@/assets/brands/slack-official.svg';
import tawkOfficial from '@/assets/brands/tawk-official.svg';
import teamsOfficial from '@/assets/brands/teams-official.svg';
import telegramOfficial from '@/assets/brands/telegram-official.svg';
import wechatOfficial from '@/assets/brands/wechat-official.svg';
import whatsappOfficial from '@/assets/brands/whatsapp-official.svg';
import zendeskOfficial from '@/assets/brands/zendesk-official.svg';
import webexIcon from '@/assets/webex-icon.png';
import zoomIcon from '@/assets/zoom-icon.png';

export interface Platform {
    name: string;
    logoUrl: string;
    color: string;
    borderColor: string;
    integration: string;
    capabilities: string[];
    category: string;
    popular?: boolean;
}

export interface PlatformCategory {
    id: string;
    title: string;
    description: string;
    icon: any;
    color: string;
    platforms: Platform[];
}

export const platformCategories: PlatformCategory[] = [
    {
        id: 'collaboration',
        title: 'Team Collaboration & Internal Messaging',
        description:
            'Enterprise communication platforms for internal team coordination and collaboration workflows',
        icon: Building,
        color: 'blue',
        platforms: [
            {
                name: 'Slack',
                logoUrl: slackOfficial,
                color:
                    'bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/50 dark:hover:bg-purple-900/50',
                borderColor:
                    'border-purple-200 hover:border-purple-300 dark:border-purple-800 dark:hover:border-purple-700',
                integration: 'Real-time sync',
                capabilities: ['Channel mapping', 'File transfer', 'Thread sync'],
                category: 'collaboration',
                popular: true,
            },
            {
                name: 'Microsoft Teams',
                logoUrl: teamsOfficial,
                color: 'bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/50 dark:hover:bg-blue-900/50',
                borderColor:
                    'border-blue-200 hover:border-blue-300 dark:border-blue-800 dark:hover:border-blue-700',
                integration: 'Deep integration',
                capabilities: ['Meeting sync', 'File sharing', 'Presence status'],
                category: 'collaboration',
                popular: true,
            },
            {
                name: 'Google Chat',
                logoUrl: googleMeet,
                color: 'bg-green-50 hover:bg-green-100 dark:bg-green-950/50 dark:hover:bg-green-900/50',
                borderColor:
                    'border-green-200 hover:border-green-300 dark:border-green-800 dark:hover:border-green-700',
                integration: 'Workspace sync',
                capabilities: ['Space mapping', 'Bot integration', 'Calendar sync'],
                category: 'collaboration',
                popular: true,
            },
            {
                name: 'Zoom Team Chat',
                logoUrl: zoomIcon,
                color: 'bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/50 dark:hover:bg-blue-900/50',
                borderColor:
                    'border-blue-200 hover:border-blue-300 dark:border-blue-800 dark:hover:border-blue-700',
                integration: 'Meeting bridge',
                capabilities: ['Video integration', 'Recording sync', 'Transcript sharing'],
                category: 'collaboration',
                popular: true,
            },
            {
                name: 'Webex by Cisco',
                logoUrl: webexIcon,
                color: 'bg-green-50 hover:bg-green-100 dark:bg-green-950/50 dark:hover:bg-green-900/50',
                borderColor:
                    'border-green-200 hover:border-green-300 dark:border-green-800 dark:hover:border-green-700',
                integration: 'Enterprise ready',
                capabilities: ['Security compliant', 'Admin controls', 'Analytics'],
                category: 'collaboration',
            },
            {
                name: 'Mattermost',
                logoUrl: mattermostOfficial,
                color:
                    'bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/50 dark:hover:bg-indigo-900/50',
                borderColor:
                    'border-indigo-200 hover:border-indigo-300 dark:border-indigo-800 dark:hover:border-indigo-700',
                integration: 'Self-hosted sync',
                capabilities: ['Open source', 'Custom plugins', 'On-premise'],
                category: 'collaboration',
            },
            {
                name: 'Rocket.Chat',
                logoUrl: rocketchatOfficial,
                color: 'bg-red-50 hover:bg-red-100 dark:bg-red-950/50 dark:hover:bg-red-900/50',
                borderColor:
                    'border-red-200 hover:border-red-300 dark:border-red-800 dark:hover:border-red-700',
                integration: 'API integration',
                capabilities: ['Omnichannel', 'Live chat', 'Video calls'],
                category: 'collaboration',
            },
            {
                name: 'Flock',
                logoUrl: flockOfficial,
                color:
                    'bg-yellow-50 hover:bg-yellow-100 dark:bg-yellow-950/50 dark:hover:bg-yellow-900/50',
                borderColor:
                    'border-yellow-200 hover:border-yellow-300 dark:border-yellow-800 dark:hover:border-yellow-700',
                integration: 'Team sync',
                capabilities: ['Project management', 'To-do integration', 'Polls & notes'],
                category: 'collaboration',
            },
        ],
    },
    {
        id: 'developer',
        title: 'Developer-Focused Messaging',
        description: 'Communication platforms designed for development teams and tech communities',
        icon: Code,
        color: 'purple',
        platforms: [
            {
                name: 'Discord',
                logoUrl: discordOfficial,
                color:
                    'bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/50 dark:hover:bg-indigo-900/50',
                borderColor:
                    'border-indigo-200 hover:border-indigo-300 dark:border-indigo-800 dark:hover:border-indigo-700',
                integration: 'Community sync',
                capabilities: ['Voice channels', 'Bot integration', 'Server management'],
                category: 'developer',
                popular: true,
            },
            {
                name: 'Gitter',
                logoUrl: gitterOfficial,
                color: 'bg-green-50 hover:bg-green-100 dark:bg-green-950/50 dark:hover:bg-green-900/50',
                borderColor:
                    'border-green-200 hover:border-green-300 dark:border-green-800 dark:hover:border-green-700',
                integration: 'GitHub integration',
                capabilities: ['Repository chat', 'Code snippets', 'Markdown support'],
                category: 'developer',
            },
        ],
    },
    {
        id: 'customer',
        title: 'Customer Communication & Support',
        description: 'Customer-facing messaging platforms for support, sales, and client engagement',
        icon: Headphones,
        color: 'green',
        platforms: [
            {
                name: 'Intercom',
                logoUrl: intercomOfficial,
                color: 'bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/50 dark:hover:bg-blue-900/50',
                borderColor:
                    'border-blue-200 hover:border-blue-300 dark:border-blue-800 dark:hover:border-blue-700',
                integration: 'Customer sync',
                capabilities: ['Live chat', 'Help desk', 'Customer data'],
                category: 'customer',
                popular: true,
            },
            {
                name: 'Zendesk Messaging',
                logoUrl: zendeskOfficial,
                color: 'bg-green-50 hover:bg-green-100 dark:bg-green-950/50 dark:hover:bg-green-900/50',
                borderColor:
                    'border-green-200 hover:border-green-300 dark:border-green-800 dark:hover:border-green-700',
                integration: 'Ticket sync',
                capabilities: ['Support tickets', 'Knowledge base', 'Agent tools'],
                category: 'customer',
                popular: true,
            },
            {
                name: 'Freshchat',
                logoUrl: freshchatOfficial,
                color: 'bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/50 dark:hover:bg-blue-900/50',
                borderColor:
                    'border-blue-200 hover:border-blue-300 dark:border-blue-800 dark:hover:border-blue-700',
                integration: 'CRM integration',
                capabilities: ['Lead scoring', 'Campaign tracking', 'Multi-channel'],
                category: 'customer',
            },
            {
                name: 'Tawk.to',
                logoUrl: tawkOfficial,
                color: 'bg-green-50 hover:bg-green-100 dark:bg-green-950/50 dark:hover:bg-green-900/50',
                borderColor:
                    'border-green-200 hover:border-green-300 dark:border-green-800 dark:hover:border-green-700',
                integration: 'Website chat',
                capabilities: ['Free live chat', 'Visitor monitoring', 'File sharing'],
                category: 'customer',
            },
            {
                name: 'Drift',
                logoUrl: driftOfficial,
                color:
                    'bg-orange-50 hover:bg-orange-100 dark:bg-orange-950/50 dark:hover:bg-orange-900/50',
                borderColor:
                    'border-orange-200 hover:border-orange-300 dark:border-orange-800 dark:hover:border-orange-700',
                integration: 'Sales sync',
                capabilities: ['Conversational marketing', 'Lead qualification', 'Meeting booking'],
                category: 'customer',
            },
            {
                name: 'LiveChat',
                logoUrl: livechatOfficial,
                color:
                    'bg-yellow-50 hover:bg-yellow-100 dark:bg-yellow-950/50 dark:hover:bg-yellow-900/50',
                borderColor:
                    'border-yellow-200 hover:border-yellow-300 dark:border-yellow-800 dark:hover:border-yellow-700',
                integration: 'Support integration',
                capabilities: ['Chat widget', 'Ticketing', 'Analytics'],
                category: 'customer',
            },
        ],
    },
    {
        id: 'regional',
        title: 'Region-Specific Business Messaging',
        description:
            'Regional messaging platforms popular in specific markets and business environments',
        icon: Earth,
        color: 'orange',
        platforms: [
            {
                name: 'WeCom (WeChat Work)',
                logoUrl: wechatOfficial,
                color: 'bg-green-50 hover:bg-green-100 dark:bg-green-950/50 dark:hover:bg-green-900/50',
                borderColor:
                    'border-green-200 hover:border-green-300 dark:border-green-800 dark:hover:border-green-700',
                integration: 'China business',
                capabilities: ['Enterprise features', 'Mini programs', 'API integration'],
                category: 'regional',
                popular: true,
            },
            {
                name: 'LINE Works',
                logoUrl: lineOfficial,
                color: 'bg-green-50 hover:bg-green-100 dark:bg-green-950/50 dark:hover:bg-green-900/50',
                borderColor:
                    'border-green-200 hover:border-green-300 dark:border-green-800 dark:hover:border-green-700',
                integration: 'Japan business',
                capabilities: ['Stickers', 'Video calls', 'File sharing'],
                category: 'regional',
            },
            {
                name: 'Kakao Work',
                logoUrl: kakaotalkOfficial,
                color:
                    'bg-yellow-50 hover:bg-yellow-100 dark:bg-yellow-950/50 dark:hover:bg-yellow-900/50',
                borderColor:
                    'border-yellow-200 hover:border-yellow-300 dark:border-yellow-800 dark:hover:border-yellow-700',
                integration: 'Korea business',
                capabilities: ['Enterprise chat', 'Calendar sync', 'Drive integration'],
                category: 'regional',
            },
            {
                name: 'Telegram for Business',
                logoUrl: telegramOfficial,
                color: 'bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/50 dark:hover:bg-blue-900/50',
                borderColor:
                    'border-blue-200 hover:border-blue-300 dark:border-blue-800 dark:hover:border-blue-700',
                integration: 'Secure messaging',
                capabilities: ['Bot API', 'Channels', 'File sharing'],
                category: 'regional',
                popular: true,
            },
            {
                name: 'WhatsApp Business',
                logoUrl: whatsappOfficial,
                color: 'bg-green-50 hover:bg-green-100 dark:bg-green-950/50 dark:hover:bg-green-900/50',
                borderColor:
                    'border-green-200 hover:border-green-300 dark:border-green-800 dark:hover:border-green-700',
                integration: 'Customer support',
                capabilities: ['Business profiles', 'Catalogs', 'Quick replies'],
                category: 'regional',
                popular: true,
            },
            {
                name: 'Signal for Work',
                logoUrl: signalOfficial,
                color: 'bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/50 dark:hover:bg-blue-900/50',
                borderColor:
                    'border-blue-200 hover:border-blue-300 dark:border-blue-800 dark:hover:border-blue-700',
                integration: 'Secure enterprise',
                capabilities: ['End-to-end encryption', 'Group management', 'File sharing'],
                category: 'regional',
            },
        ],
    },
];
