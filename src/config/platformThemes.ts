import teamsIcon from '@/assets/brands/teams-official.svg';
import slackIcon from '@/assets/brands/slack-official.svg';
import googleChatIcon from '@/assets/google-chat-icon.png';
import zoomIcon from '@/assets/zoom-icon.png';

export interface PlatformTheme {
    id: 'teams' | 'slack' | 'googlechat' | 'zoom';
    name: string;
    icon: string;
    gradient: string;
    textColor: string;
    bgColor: string;
}

export const platformThemes: Record<string, PlatformTheme> = {
    teams: {
        id: 'teams',
        name: 'Microsoft Teams',
        icon: teamsIcon,
        gradient: 'from-[#5558AF] to-[#6264A7]',
        textColor: 'text-white',
        bgColor: 'bg-white dark:bg-slate-900',
    },
    slack: {
        id: 'slack',
        name: 'Slack',
        icon: slackIcon,
        gradient: 'from-[#4A154B] to-[#611f69]',
        textColor: 'text-white',
        bgColor: 'bg-white dark:bg-slate-900',
    },
    googlechat: {
        id: 'googlechat',
        name: 'Google Chat',
        icon: googleChatIcon,
        gradient: 'from-[#0F9D58] to-[#0B8043]',
        textColor: 'text-white',
        bgColor: 'bg-white dark:bg-slate-900',
    },
    zoom: {
        id: 'zoom',
        name: 'Zoom',
        icon: zoomIcon,
        gradient: 'from-[#2D8CFF] to-[#0B5CFF]',
        textColor: 'text-white',
        bgColor: 'bg-white dark:bg-slate-900',
    },
};
