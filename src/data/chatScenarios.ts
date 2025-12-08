import { PlatformTheme, platformThemes } from '@/config/platformThemes';
import sergeyPhoto from '@/assets/profiles/sergey-kizunov.jpeg';
import kumarPhoto from '@/assets/profiles/kumar-makala.jpg';
import alicePhoto from '@/assets/profiles/alice-sre.jpg';
import bobPhoto from '@/assets/profiles/bob-oncall.jpg';
import priyaPhoto from '@/assets/profiles/priya-pm.jpg';
import leoPhoto from '@/assets/profiles/leo-marketing.jpg';

export interface MessageConfig {
    id: number;
    sender: string;
    role: string;
    photo: string;
    text: string;
    from: 'left' | 'right';
}

export interface Scenario {
    id: string;
    label: string;
    leftPlatform: PlatformTheme;
    rightPlatform: PlatformTheme;
    messages: MessageConfig[];
}

export const chatScenarios: Scenario[] = [
    {
        id: 'teams-slack',
        label: 'Teams ↔ Slack',
        leftPlatform: platformThemes.teams,
        rightPlatform: platformThemes.slack,
        messages: [
            {
                id: 1,
                sender: 'Sergey Kizunov',
                role: 'Engineering',
                photo: sergeyPhoto,
                text: 'Morning team — can everyone review the Q4 proposal draft?',
                from: 'left',
            },
            {
                id: 2,
                sender: 'Kumar Makala',
                role: 'Product',
                photo: kumarPhoto,
                text: 'Got it! Opening it now. Will share comments shortly.',
                from: 'right',
            },
            {
                id: 3,
                sender: 'Sergey Kizunov',
                role: 'Engineering',
                photo: sergeyPhoto,
                text: 'Thanks Kumar. Let me know if any section needs clarification.',
                from: 'left',
            },
            {
                id: 4,
                sender: 'Kumar Makala',
                role: 'Product',
                photo: kumarPhoto,
                text: "Overall looks good. I'll finalize the customer insights section by EOD.",
                from: 'right',
            },
            {
                id: 5,
                sender: 'Sergey Kizunov',
                role: 'Engineering',
                photo: sergeyPhoto,
                text: 'Perfect — appreciate the quick turnaround!',
                from: 'left',
            },
        ],
    },
    {
        id: 'googlechat-zoom',
        label: 'Google Chat ↔ Zoom',
        leftPlatform: platformThemes.googlechat,
        rightPlatform: platformThemes.zoom,
        messages: [
            {
                id: 1,
                sender: 'Alice',
                role: 'SRE',
                photo: alicePhoto,
                text: '🚨 Seeing API latency spike in the EU region. Anyone else noticing this?',
                from: 'left',
            },
            {
                id: 2,
                sender: 'Bob',
                role: 'On-call',
                photo: bobPhoto,
                text: 'Yes, got the alert too. Checking service logs now.',
                from: 'right',
            },
            {
                id: 3,
                sender: 'Alice',
                role: 'SRE',
                photo: alicePhoto,
                text: 'Thanks. Spawning a Zoom bridge for quick coordination.',
                from: 'left',
            },
            {
                id: 4,
                sender: 'Bob',
                role: 'On-call',
                photo: bobPhoto,
                text: "Found the issue — a config flag from yesterday's deploy. Rolling back now.",
                from: 'right',
            },
            {
                id: 5,
                sender: 'Alice',
                role: 'SRE',
                photo: alicePhoto,
                text: 'Rollback confirmed on my end. Latency returning to normal.',
                from: 'left',
            },
        ],
    },
    {
        id: 'teams-googlechat',
        label: 'Teams ↔ Google Chat',
        leftPlatform: platformThemes.teams,
        rightPlatform: platformThemes.googlechat,
        messages: [
            {
                id: 1,
                sender: 'Priya',
                role: 'PM',
                photo: priyaPhoto,
                text: "Hey Leo — the UX content for tomorrow's release is ready. Can you review?",
                from: 'left',
            },
            {
                id: 2,
                sender: 'Leo',
                role: 'Marketing',
                photo: leoPhoto,
                text: 'Reviewing now. The headline looks strong — minor tone tweaks needed.',
                from: 'right',
            },
            {
                id: 3,
                sender: 'Priya',
                role: 'PM',
                photo: priyaPhoto,
                text: "Sounds good. Add your suggestions directly. I'll merge them.",
                from: 'left',
            },
            {
                id: 4,
                sender: 'Leo',
                role: 'Marketing',
                photo: leoPhoto,
                text: 'Done! Updated intro paragraph and CTA wording.',
                from: 'right',
            },
            {
                id: 5,
                sender: 'Priya',
                role: 'PM',
                photo: priyaPhoto,
                text: 'Perfect — publishing to the release notes now!',
                from: 'left',
            },
        ],
    },
];
