import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Lock, Shield, Check, FileText, Activity, Video, Phone, Paperclip, Smile, AtSign, Type
} from "lucide-react";
import { useTranslation } from "react-i18next";

// Assets
import googleChatIcon from "@/assets/brands/google-chat-update.png";
import teamsIcon from "@/assets/brands/teams-official.svg";
import slackIcon from "@/assets/brands/slack-official.svg";
import zoomIcon from "@/assets/zoom-icon.png";
import webexIcon from "@/assets/webex-icon.png";

// Profile Photos
import alicePhoto from "@/assets/profiles/alice-sre.jpg";
import bobPhoto from "@/assets/profiles/bob-oncall.jpg";
import kumarPhoto from "@/assets/profiles/kumar-makala.jpg";
import leoPhoto from "@/assets/profiles/leo-marketing.jpg";
import priyaPhoto from "@/assets/profiles/priya-pm.jpg";
import sergeyPhoto from "@/assets/profiles/sergey-kizunov.jpeg";

// --- Types & Configuration ---

type Platform = "google-chat" | "teams" | "slack" | "zoom" | "webex";

interface Message {
    id: string;
    sender: string;
    role?: string;
    avatarUrl?: string; // Using string | undefined
    text: React.ReactNode;
    timestamp: string;
    type: "user" | "system" | "engine";
    status?: "sending" | "sent" | "delivered" | "read";
    attachment?: {
        name: string;
        size: string;
        type: string;
        secure?: boolean;
    };
    reactions?: string[];
    personId?: string;
    personName?: string;
    platformType?: Platform;
}

interface Scenario {
    id: number;
    source: {
        platform: Platform;
        person: { name: string; role: string; avatar: string };
    };
    dest: {
        platform: Platform;
        person: { name: string; role: string; avatar: string };
    };
    conversation: {
        msg1: { text: string; attachment?: Message['attachment'] };
        msg2: { text: string; attachment?: Message['attachment'] };
        msg3?: { text: string; attachment?: Message['attachment'] };
        msg4?: { text: string; attachment?: Message['attachment'] };
        msg5?: { text: string; attachment?: Message['attachment'] };
        msg6?: { text: string; attachment?: Message['attachment'] };
        msg7?: { text: string; attachment?: Message['attachment'] };
        msg8?: { text: string; attachment?: Message['attachment'] };
        msg9?: { text: string; attachment?: Message['attachment'] };
        msg10?: { text: string; attachment?: Message['attachment'] };
    };
    simultaneous?: boolean;
}

// SCENARIOS & SECURITY_MESSAGES moved inside component for i18n support

// --- Helpers ---

// Generate a random delay between min and max (inclusive)
const randomDelay = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

// Calculate typing duration based on text length
// Short message: ~0.8-1.2s -> roughly 30-50 chars? No, short is like "Hey".
// Let's say base 600ms + 60ms per character, capped at 3500ms.
const calculateTypingDuration = (text: string) => {
    const base = 800; // Base reaction time
    const perChar = 60;
    const duration = base + (text.length * perChar);
    // Clamp between 1000ms and 3500ms
    const clamped = Math.max(1000, Math.min(3500, duration));
    // Add jitter
    return clamped + randomDelay(-200, 200);
};

// Wait function
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// --- Components ---

const EngineSystemMessage = ({ text }: { text: string }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-1.5 mx-auto my-3 w-fit px-3 py-1 rounded-full bg-indigo-500/5 border border-indigo-500/10"
    >
        <Shield className="w-2.5 h-2.5 text-indigo-400" />
        <span className="text-[10px] font-medium text-indigo-300/90 tracking-wide">
            SyncRivo Security: {text}
        </span>
    </motion.div>
);

const Attachment = ({ name, size, type }: { name: string, size: string, type: string }) => {
    const { t } = useTranslation();
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }} // Appears slightly after text
            className="group relative mt-2 flex items-center gap-3 p-3 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/15 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 w-[260px] cursor-pointer overflow-hidden"
        >
            {/* Subtle shimmer effect on appearance */}
            <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{ duration: 1.5, delay: 0.6, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
            />

            <div className="shrink-0 w-9 h-9 rounded bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                <FileText className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <p className="text-[13px] font-medium text-slate-200 truncate">{name}</p>
                    <Lock className="w-3 h-3 text-emerald-500/90 drop-shadow-[0_0_5px_rgba(16,185,129,0.4)]" />
                </div>
                <p className="text-[11px] text-slate-500 font-medium">{size} • {type}</p>
            </div>
            <div className="absolute -top-9 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-900/95 backdrop-blur-md border border-slate-700 text-slate-200 text-[10px] font-medium rounded-md shadow-xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-20">
                {t('demo.ui.encrypted_synced', 'Encrypted & synced via SyncRivo')}
                <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 border-r border-b border-slate-700 rotate-45"></div>
            </div>
        </motion.div>
    );
};

const PlatformConfig: Record<Platform, { name: string; icon: string; headerBg: string; headerBorder: string }> = {
    'google-chat': { name: 'Google Chat', icon: googleChatIcon, headerBg: 'bg-[#202124]', headerBorder: 'border-[#3c4043]' },
    'teams': { name: 'Microsoft Teams', icon: teamsIcon, headerBg: 'bg-[#464775]', headerBorder: 'border-[#5b5fc7]' },
    'slack': { name: 'Slack', icon: slackIcon, headerBg: 'bg-[#4A154B]', headerBorder: 'border-[#611f69]' },
    'zoom': { name: 'Zoom', icon: zoomIcon, headerBg: 'bg-[#0b5cff]', headerBorder: 'border-[#387dff]' },
    'webex': { name: 'Webex', icon: webexIcon, headerBg: 'bg-[#005073]', headerBorder: 'border-[#007aa3]' },
};

const ChatInterface = ({
    platform,
    messages,
    personName,
    personRole,
    personAvatar,
    typingUser,
    typingUserAvatar,
    typingText,
    typingPlatform,
    securityText
}: {
    platform: Platform,
    messages: Message[],
    personName: string,
    personRole: string,
    personAvatar?: string,
    typingUser?: string,
    typingUserAvatar?: string,
    typingText?: string,
    typingPlatform?: Platform,
    securityText: string
}) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const config = PlatformConfig[platform];
    const { t } = useTranslation();
    const [revealedText, setRevealedText] = useState("");

    // Progressive text reveal animation
    useEffect(() => {
        if (!typingText) {
            setRevealedText("");
            return;
        }

        let currentIndex = 0;
        setRevealedText("");

        const intervalId = setInterval(() => {
            if (currentIndex < typingText.length) {
                setRevealedText(typingText.slice(0, currentIndex + 1));
                currentIndex++;
            } else {
                clearInterval(intervalId);
            }
        }, 60); // Type each character every 60ms

        return () => clearInterval(intervalId);
    }, [typingText]);

    // Auto-scroll
    useEffect(() => {
        if (scrollRef.current) {
            // Smooth scroll to bottom
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages, typingUser]);

    const avatar = personAvatar || alicePhoto;

    return (
        <div className="flex flex-col h-[580px] w-full bg-[#1e2124] border border-white/5 rounded-xl overflow-hidden shadow-2xl relative font-sans">
            {/* 1. Platform Header */}
            <div className={`h-[54px] px-5 flex items-center justify-between shrink-0 border-b ${config.headerBg} ${config.headerBorder} transition-colors duration-500 z-20`}>
                <div className="flex items-center gap-3">
                    <img src={config.icon} alt={config.name} className="w-5 h-5 object-contain opacity-95" />
                    <span className="text-[13px] font-semibold text-white/95 tracking-wide">{config.name}</span>
                </div>
                {/* Secondary Security Indicator */}
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/20 border border-white/5">
                    <Lock className="w-2.5 h-2.5 text-emerald-400" />
                    <span className="text-[10px] text-white/90 font-medium tracking-tight">E2EE</span>
                </div>
            </div>

            {/* 2. Persistent Participant Header */}
            <div className="h-[68px] px-5 flex items-center justify-between bg-[#2f3136] border-b border-white/5 z-10 shrink-0">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <img src={avatar} alt={personName} className="w-10 h-10 rounded-full object-cover border border-white/10 shadow-sm" />
                        <motion.div
                            animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-[2.5px] border-[#2f3136]"
                        />
                    </div>
                    <div>
                        <div className="text-[14px] font-bold text-white leading-tight">{personName}</div>
                        <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[11px] text-slate-400 font-medium">{personRole}</span>
                            <span className="text-[10px] text-emerald-500/90 font-medium flex items-center gap-1">
                                ● {t('demo.ui.active_now', 'Active Now')}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Call Control Icons */}
                <div className="flex items-center gap-2">
                    <button className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all duration-200 group">
                        <Phone className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 transition-colors" />
                    </button>
                    <button className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all duration-200 group">
                        <Video className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 transition-colors" />
                    </button>
                </div>
            </div>

            {/* 3. Messages Area - Fixed Height with Auto-Scroll */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-6 bg-[#25272b] scroll-smooth relative h-[420px] max-h-[420px]">

                {/* Secure Empty State */}
                <AnimatePresence>
                    {messages.length <= 1 && (!messages.some(m => m.type === 'user')) && !typingUser && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 pointer-events-none"
                        >
                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                                <Lock className="w-6 h-6 text-slate-500" />
                            </div>
                            <h3 className="text-sm font-semibold text-slate-300 mb-1">{t('demo.ui.encrypted_conversation', 'Encrypted Conversation')}</h3>
                            <p className="text-xs text-slate-500 max-w-[220px] leading-relaxed">
                                <span dangerouslySetInnerHTML={{ __html: t('demo.ui.encrypted_conversation_desc', { name: personName, interpolation: { escapeValue: false } }).replace('<1>', '<span class="text-slate-400 font-medium">').replace('</1>', '</span>') }} />
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence mode="popLayout" initial={false}>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 15, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="w-full"
                        >
                            {msg.type === "engine" ? (
                                <EngineSystemMessage text={msg.text as string} />
                            ) : (
                                <div className="flex gap-3 relative group pl-1">
                                    {/* Inline Avatar */}
                                    <div className="shrink-0 pt-0.5">
                                        <img src={msg.avatarUrl} alt={msg.sender} className="w-8 h-8 rounded-full object-cover shadow-sm ring-1 ring-white/5" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-baseline gap-2 mb-1">
                                            <span className="text-[13px] font-bold text-slate-200">{msg.sender}</span>
                                            <span className="text-[10px] text-slate-500">{msg.timestamp}</span>
                                        </div>

                                        <div className="inline-block relative max-w-[85%]">
                                            <div className="text-[14px] leading-relaxed text-slate-200 bg-[#36393f] px-4 py-2.5 rounded-2xl rounded-tl-sm shadow-sm border border-white/5">
                                                {msg.text}
                                            </div>
                                            {msg.attachment && (
                                                <Attachment name={msg.attachment.name} size={msg.attachment.size} type={msg.attachment.type} />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* 4. Typing Indicator */}
                <AnimatePresence>
                    {typingUser && (
                        <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            className="flex gap-3 pl-1 mb-2 mt-2"
                        >
                            <img src={typingUserAvatar || avatar} alt="Typing" className="w-8 h-8 rounded-full object-cover opacity-80" />
                            <div className="flex flex-col justify-center gap-1">
                                <div className="flex items-center gap-1 h-[34px] px-3.5 rounded-2xl rounded-tl-sm bg-[#36393f] border border-white/5 w-fit">
                                    {[0, 0.2, 0.4].map((delay, i) => (
                                        <motion.div
                                            key={i}
                                            animate={{
                                                y: [0, -4, 0],
                                                opacity: [0.4, 1, 0.4]
                                            }}
                                            transition={{
                                                duration: 1.2,
                                                repeat: Infinity,
                                                delay: delay,
                                                ease: "easeInOut"
                                            }}
                                            className="w-1.5 h-1.5 bg-slate-400 rounded-full"
                                        />
                                    ))}
                                </div>
                                <span className="text-[10px] text-slate-500 ml-1 font-medium">
                                    {typingUser.split(' ')[0]} {t('demo.ui.is_typing', 'is typing')}{typingPlatform ? ` ${t('demo.ui.via', 'via')} ${PlatformConfig[typingPlatform].name}` : '...'}
                                </span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* 5. Input Field */}
            <div className="p-4 bg-[#2f3136] border-t border-white/5 shrink-0 z-20">
                <div className="relative">
                    <div className="h-11 rounded-lg border border-white/10 bg-[#202225] flex items-center px-3 shadow-inner">
                        {/* Left Icons */}
                        <div className="flex items-center gap-1 mr-2">
                            <button className="w-7 h-7 rounded hover:bg-white/10 flex items-center justify-center transition-colors group">
                                <Paperclip className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
                            </button>
                        </div>

                        {/* Input Text - Shows typing animation OR placeholder */}
                        <div className="flex-1 text-sm select-none">
                            {revealedText ? (
                                <span className="text-white font-medium">
                                    {revealedText}
                                    <motion.span
                                        animate={{ opacity: [0, 1, 0] }}
                                        transition={{ duration: 0.8, repeat: Infinity }}
                                        className="inline-block w-[3px] h-5 bg-white ml-1 align-middle"
                                    />
                                </span>
                            ) : (
                                <span className="text-slate-500 cursor-not-allowed">
                                    {t('demo.ui.input_placeholder', { name: personName, defaultValue: `Message ${personName}...` })}
                                </span>
                            )}
                        </div>

                        {/* Right Icons */}
                        <div className="flex items-center gap-1 ml-2">
                            <button className="w-7 h-7 rounded hover:bg-white/10 flex items-center justify-center transition-colors group">
                                <Type className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
                            </button>
                            <button className="w-7 h-7 rounded hover:bg-white/10 flex items-center justify-center transition-colors group">
                                <Smile className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
                            </button>
                            <button className="w-7 h-7 rounded hover:bg-white/10 flex items-center justify-center transition-colors group">
                                <AtSign className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SecureEngineCore = ({ active }: { active: boolean }) => {
    return (
        <div className="relative flex items-center justify-center w-36 h-36">
            {/* Ambient Background Glow */}
            <motion.div
                animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-indigo-500/20 rounded-full blur-3xl"
            />
            <AnimatePresence>
                {active && (
                    <>
                        {/* Ethereal Rings */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, borderColor: "rgba(99, 102, 241, 0)" }}
                            animate={{ scale: 2.2, opacity: [0, 0.5, 0], borderColor: "rgba(99, 102, 241, 0.3)" }}
                            transition={{ duration: 2, ease: "easeOut", repeat: Infinity }}
                            className="absolute inset-0 rounded-full border border-indigo-400"
                        />
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1.8, opacity: [0, 0.4, 0] }}
                            transition={{ duration: 2, delay: 0.5, ease: "easeOut", repeat: Infinity }}
                            className="absolute inset-0 rounded-full border border-emerald-400/30"
                        />
                    </>
                )}
            </AnimatePresence>

            {/* Core Shield */}
            <div className="relative z-10 drop-shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                <div className="relative w-20 h-24">
                    <svg viewBox="0 0 24 24" className="w-full h-full overflow-visible">
                        <defs>
                            <linearGradient id="shieldGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#1e293b" stopOpacity="0.95" />
                                <stop offset="100%" stopColor="#0f172a" stopOpacity="0.98" />
                            </linearGradient>
                            <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>
                        <motion.path
                            d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                            fill="url(#shieldGradient)"
                            stroke={active ? "#818cf8" : "#334155"}
                            strokeWidth="1.5"
                            initial={false}
                            animate={{ stroke: active ? "#818cf8" : "#334155", filter: active ? "url(#neonGlow)" : "none" }}
                            transition={{ duration: 0.5 }}
                        />
                    </svg>

                    {/* Inner Icons */}
                    <div className="absolute inset-0 flex items-center justify-center pb-1">
                        <svg width="28" height="38" viewBox="0 0 24 32" className="overflow-visible">
                            <motion.path
                                d="M7 14V7a5 5 0 0 1 10 0v7"
                                fill="none"
                                stroke={active ? "#818cf8" : "#64748b"}
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                initial={{ y: 0 }}
                                animate={{ y: active ? -4 : 0 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            />
                            <motion.path
                                d="M6 14h12c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V16c0-1.1.9-2 2-2z"
                                fill={active ? "#0f172a" : "#1e293b"}
                                stroke={active ? "#34d399" : "#475569"}
                                strokeWidth="2"
                            />
                            {active && (
                                <motion.circle
                                    cx="12" cy="21" r="2.5"
                                    fill="#34d399"
                                    animate={{ opacity: [0.4, 1, 0.4] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                />
                            )}
                        </svg>
                    </div>
                </div>
            </div>

            {/* Connecting Beam */}
            {active && (
                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: [0, 0.8, 0], scaleX: [0.2, 1.2, 0.2] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute h-[2px] w-20 bg-gradient-to-r from-transparent via-indigo-400 to-transparent blur-[1px] z-20 rounded-full"
                    style={{ top: "50%", marginTop: "-1px" }}
                />
            )}
        </div>
    );
};

// --- Main Demo Component ---

export function LiveSyncDemoSection() {
    const { t } = useTranslation();

    // State
    const [scenarioIndex, setScenarioIndex] = useState(0);
    const [scenarioVisible, setScenarioVisible] = useState(true);
    const [messagesLeft, setMessagesLeft] = useState<Message[]>([]);
    const [messagesRight, setMessagesRight] = useState<Message[]>([]);
    const [typingLeft, setTypingLeft] = useState<string | undefined>();
    const [typingRight, setTypingRight] = useState<string | undefined>();
    const [typingLeftText, setTypingLeftText] = useState<string | undefined>();
    const [typingRightText, setTypingRightText] = useState<string | undefined>();
    const [engineActive, setEngineActive] = useState(false);
    const [packetLeftToRight, setPacketLeftToRight] = useState(false);
    const [packetRightToLeft, setPacketRightToLeft] = useState(false);

        const SCENARIOS = useMemo<Scenario[]>(() => [
        {
            id: 1,
            source: { platform: 'zoom', person: { name: 'Sergey Kizunov', role: t('demo.roles.product_owner', 'Product Owner'), avatar: sergeyPhoto } },
            dest: { platform: 'teams', person: { name: 'Kumar Makala', role: t('demo.roles.devops_lead', 'DevOps Lead'), avatar: kumarPhoto } },
            conversation: {
                msg1: { text: t('demo.scenarios.1.msg1', "Can we finalize the sprint scope today? Need to lock by 3pm for stakeholder review.") },
                msg2: { text: t('demo.scenarios.1.msg2', "Yes, I've reviewed the backlog. Should we include the API migration task?") },
                msg3: { text: t('demo.scenarios.1.msg3', "Good question. What's the complexity estimate?") },
                msg4: { text: t('demo.scenarios.1.msg4', "About 5 story points. But dependency on auth service upgrade.") },
                msg5: { text: t('demo.scenarios.1.msg5', "Hmm, too risky. Let's defer to Sprint 24. What else is critical?") },
                msg6: { text: t('demo.scenarios.1.msg6', "Database schema changes and the new dashboard UI.") },
                msg7: { text: t('demo.scenarios.1.msg7', "Perfect. Those are P0. Add them to committed scope.") },
                msg8: { text: t('demo.scenarios.1.msg8', "Done! I'll update Jira and ping the team in 15 mins.") },
                msg9: { text: t('demo.scenarios.1.msg9', "Excellent work Kumar! See you at standup.") }
            }
        },
        {
            id: 2,
            source: { platform: 'google-chat', person: { name: 'Priya Nair', role: t('demo.roles.product_lead', 'Product Lead'), avatar: priyaPhoto } },
            dest: { platform: 'zoom', person: { name: 'Daniel Wong', role: t('demo.roles.sales_director', 'Sales Director'), avatar: leoPhoto } },
            conversation: {
                msg1: { text: t('demo.scenarios.2.msg1', "Hey Daniel! Product demo deck ready for Thursday's Acme Corp call."), attachment: { name: "Product_Demo_v3.pdf", size: "4.2 MB", type: "application/pdf" } },
                msg2: { text: t('demo.scenarios.2.msg2', "Perfect! Which use cases did you highlight?") },
                msg3: { text: t('demo.scenarios.2.msg3', "Frontline workforce sync, M&A integration, and regulatory compliance.") },
                msg4: { text: t('demo.scenarios.2.msg4', "Excellent choices. Do we have the ROI calculator handy?") },
                msg5: { text: t('demo.scenarios.2.msg5', "Yes! Attaching now. Shows 40% productivity gains and 6-month break-even."), attachment: { name: "ROI_Calculator_2024.xlsx", size: "2.1 MB", type: "application/xlsx" } },
                msg6: { text: t('demo.scenarios.2.msg6', "Love it. Can you also send the security whitepaper? They're VERY compliance-focused.") },
                msg7: { text: t('demo.scenarios.2.msg7', "Absolutely. Here you go - covers SOC2, ISO, and GDPR certifications."), attachment: { name: "Security_Whitepaper_v2.pdf", size: "1.8 MB", type: "application/pdf" } },
                msg8: { text: t('demo.scenarios.2.msg8', "You're a star! This is going to close. High confidence.") },
                msg9: { text: t('demo.scenarios.2.msg9', "Let's do this! Good luck on Thursday!") }
            }
        },
        {
            id: 3,
            source: { platform: 'google-chat', person: { name: 'Kumar Makala', role: t('demo.roles.devops_lead', 'DevOps Lead'), avatar: kumarPhoto } },
            dest: { platform: 'slack', person: { name: 'Sarah Collins', role: t('demo.roles.cto', 'CTO'), avatar: alicePhoto } },
            conversation: {
                msg1: { text: t('demo.scenarios.3.msg1', "Morning Sarah! v2.4.0 production deployment completed at 6:47 AM EST.") },
                msg2: { text: t('demo.scenarios.3.msg2', "Fantastic! Any issues during the rollout?") },
                msg3: { text: t('demo.scenarios.3.msg3', "Zero. Canary deployment showed green for 30 mins before full rollout.") },
                msg4: { text: t('demo.scenarios.3.msg4', "What about database migrations?") },
                msg5: { text: t('demo.scenarios.3.msg5', "All schema changes applied successfully. Zero downtime achieved.") },
                msg6: { text: t('demo.scenarios.3.msg6', "Monitoring dashboards?") },
                msg7: { text: t('demo.scenarios.3.msg7', "All green. CPU at 34%, latency actually improved by 15ms average.") },
                msg8: { text: t('demo.scenarios.3.msg8', "User-facing impact?") },
                msg9: { text: t('demo.scenarios.3.msg9', "Response times dropped from 240ms to 210ms. Users should notice snappier UI.") },
                msg10: { text: t('demo.scenarios.3.msg10', "Outstanding work! Send the postmortem report when you're ready.") }
            }
        },
        {
            id: 4,
            source: { platform: 'google-chat', person: { name: 'Ravi Patel', role: t('demo.roles.sre', 'SRE'), avatar: bobPhoto } },
            dest: { platform: 'webex', person: { name: 'Priya Nair', role: t('demo.roles.product_lead', 'Product Lead'), avatar: priyaPhoto } },
            conversation: {
                msg1: { text: t('demo.scenarios.4.msg1', "Incident #0421 resolved at 11:34 AM. Full RCA attached."), attachment: { name: "RCA_Incident_0421.docx", size: "1.1 MB", type: "application/docx" } },
                msg2: { text: t('demo.scenarios.4.msg2', "Thanks Ravi! What was the root cause?") },
                msg3: { text: t('demo.scenarios.4.msg3', "Database connection pool exhaustion during traffic spike. Pool size was 50, spike needed 120.") },
                msg4: { text: t('demo.scenarios.4.msg4', "Customer impact?") },
                msg5: { text: t('demo.scenarios.4.msg5', "15 minutes of elevated latency (2-5 seconds). No data loss or corruption.") },
                msg6: { text: t('demo.scenarios.4.msg6', "Which customers were affected?") },
                msg7: { text: t('demo.scenarios.4.msg7', "Primarily APAC region during business hours. About 340 active users impacted.") },
                msg8: { text: t('demo.scenarios.4.msg8', "What's the mitigation plan?") },
                msg9: { text: t('demo.scenarios.4.msg9', "Increased pool to 200, added auto-scaling rules. Mitigation doc attached."), attachment: { name: "Mitigation_Plan.pdf", size: "850 KB", type: "application/pdf" } },
                msg10: { text: t('demo.scenarios.4.msg10', "Perfect. Let's review in tomorrow's incident postmortem. Great response time!") }
            }
        },
        {
            id: 5,
            source: { platform: 'teams', person: { name: 'Sarah Collins', role: t('demo.roles.cto', 'CTO'), avatar: alicePhoto } },
            dest: { platform: 'slack', person: { name: 'Ravi Patel', role: t('demo.roles.sre', 'SRE'), avatar: bobPhoto } },
            conversation: {
                msg1: { text: t('demo.scenarios.5.msg1', "Q4 cloud cost analysis complete. Found $840K annual savings opportunity!"), attachment: { name: "Cloud_Cost_Analysis.xlsx", size: "8.5 MB", type: "application/xlsx" } },
                msg2: { text: t('demo.scenarios.5.msg2', "Wow! What's driving the savings?") },
                msg3: { text: t('demo.scenarios.5.msg3', "3 main areas: unused dev environments ($320K), oversized RDS instances ($280K), unattached EBS volumes ($240K).") },
                msg4: { text: t('demo.scenarios.5.msg4', "Can we action these without impacting prod?") },
                msg5: { text: t('demo.scenarios.5.msg5', "Yes. Dev cleanup is zero-risk. RDS right-sizing needs 2-week migration window.") },
                msg6: { text: t('demo.scenarios.5.msg6', "Timeline?") },
                msg7: { text: t('demo.scenarios.5.msg7', "I can start dev environment cleanup next week. RDS in Q1 2025.") },
                msg8: { text: t('demo.scenarios.5.msg8', "Let me draft the implementation roadmap. ETA Friday morning."), attachment: { name: "Cost_Optimization_Roadmap.pptx", size: "3.2 MB", type: "application/pptx" } },
                msg9: { text: t('demo.scenarios.5.msg9', "Perfect! Let's present this at Monday's engineering leadership sync.") }
            },
            simultaneous: true
        },
        {
            id: 6,
            source: { platform: 'slack', person: { name: 'Daniel Wong', role: t('demo.roles.sales_director', 'Sales Director'), avatar: leoPhoto } },
            dest: { platform: 'webex', person: { name: 'Sergey Kizunov', role: t('demo.roles.product_owner', 'Product Owner'), avatar: sergeyPhoto } },
            conversation: {
                msg1: { text: t('demo.scenarios.6.msg1', "HUGE NEWS! Acme Corp signed the enterprise contract!") },
                msg2: { text: t('demo.scenarios.6.msg2', "That's fantastic! What's the contract value?") },
                msg3: { text: t('demo.scenarios.6.msg3', "$2.4M ARR with 20% year-over-year growth commitment for 3 years.") },
                msg4: { text: t('demo.scenarios.6.msg4', "Incredible! When do they want to onboard?") },
                msg5: { text: t('demo.scenarios.6.msg5', "January 15th hard start. 500 users, need SSO and custom integrations.") },
                msg6: { text: t('demo.scenarios.6.msg6', "What integrations specifically?") },
                msg7: { text: t('demo.scenarios.6.msg7', "Salesforce, Workday, and their legacy HR system. Plus SAML 2.0 authentication.") },
                msg8: { text: t('demo.scenarios.6.msg8', "That's doable. I'll prioritize the SSO work starting Monday.") },
                msg9: { text: t('demo.scenarios.6.msg9', "They're also interested in our analytics module for Q2.") },
                msg10: { text: t('demo.scenarios.6.msg10', "Perfect upsell opportunity! I'll get engineering ramped up this week. Amazing close Daniel!") }
            }
        }
    ], [t]);

    const SECURITY_MESSAGES = useMemo(() => [
        t('demo.ui.security_messages.secure_dm', "Secure direct message"),
        t('demo.ui.security_messages.e2e_encrypted', "End-to-end encrypted"),
        t('demo.ui.security_messages.identity_verified', "Identity verified"),
        t('demo.ui.security_messages.context_sealed', "Context sealed"),
        t('demo.ui.security_messages.zero_persistence', "Zero data persistence")
    ], [t]);

    const [securityText, setSecurityText] = useState(SECURITY_MESSAGES[0]);

    // Helper: Extract all messages from a scenario's conversation into an array
    const extractMessages = (conversation: Scenario['conversation']) => {
        const messages: Array<{ text: string; attachment?: Message['attachment'] }> = [];
        if (conversation.msg1) messages.push(conversation.msg1);
        if (conversation.msg2) messages.push(conversation.msg2);
        if (conversation.msg3) messages.push(conversation.msg3);
        if (conversation.msg4) messages.push(conversation.msg4);
        if (conversation.msg5) messages.push(conversation.msg5);
        if (conversation.msg6) messages.push(conversation.msg6);
        if (conversation.msg7) messages.push(conversation.msg7);
        if (conversation.msg8) messages.push(conversation.msg8);
        if (conversation.msg9) messages.push(conversation.msg9);
        if (conversation.msg10) messages.push(conversation.msg10);
        return messages;
    };

    // Async control ref
    const mountedRef = useRef(true);

    useEffect(() => {
        let active = true;

        let localIndex = 0; // Local tracking for the loop

        const loop = async () => {
            while (active) {
                // Update State to show current scenario
                setScenarioIndex(localIndex);
                const currentScenario = SCENARIOS[localIndex];

                // --- RESET STATE ---
                setMessagesLeft([]);
                setMessagesRight([]);
                setTypingLeft(undefined);
                setTypingRight(undefined);
                setTypingLeftText(undefined);
                setTypingRightText(undefined);
                setEngineActive(false);
                setPacketLeftToRight(false);
                setPacketRightToLeft(false);
                setSecurityText(SECURITY_MESSAGES[localIndex % SECURITY_MESSAGES.length]);
                setScenarioVisible(true);

                // --- START SEQUENCE ---

                // 1. Initial Pause (Enter/Fade In)
                await wait(800);
                if (!active) break;

                // 2. System Connect Message
                const sysMsg: Message = { id: 'sys-boot', type: 'engine', sender: 'System', text: t('demo.ui.system_connect_message', 'Secure person-to-person sync established. Identity verified.'), timestamp: 'Now' };
                setMessagesLeft([sysMsg]);
                setMessagesRight([sysMsg]);

                await wait(1000);
                if (!active) break;

                if (currentScenario.simultaneous) {
                    // --- SIMULTANEOUS FLOW ---
                    const messages = extractMessages(currentScenario.conversation);
                    const msg1 = messages[0];
                    const msg2 = messages[1];
                    
                    if (!msg1 || !msg2) {
                        console.warn('Simultaneous mode requires at least 2 messages');
                        continue;
                    }

                    const tDuration1 = calculateTypingDuration(msg1.text);
                    const tDuration2 = calculateTypingDuration(msg2.text);
                    const overlapDelay = randomDelay(500, 1500);

                    // 1. Left User starts typing
                    setTypingLeft(currentScenario.source.person.name);
                    setTypingLeftText(msg1.text);
                    await wait(overlapDelay);
                    if (!active) break;

                    // 2. Right User starts typing (Both typing)
                    setTypingRight(currentScenario.dest.person.name);
                    setTypingRightText(msg2.text);

                    // 3. Wait for Left to finish
                    const remainingA = Math.max(0, tDuration1 - overlapDelay);
                    if (remainingA > 0) await wait(remainingA);
                    if (!active) break;

                    // 4. Left sends
                    setTypingLeft(undefined);
                    setTypingLeftText(undefined);
                    setMessagesLeft(prev => [...prev, {
                        id: `msg-0-${localIndex}`,
                        type: 'user',
                        sender: currentScenario.source.person.name,
                        role: currentScenario.source.person.role,
                        avatarUrl: currentScenario.source.person.avatar,
                        text: msg1.text,
                        timestamp: 'Now',
                        attachment: msg1.attachment,
                        personName: currentScenario.source.person.name
                    }]);

                    // 5. Sync
                    setEngineActive(true);
                    setPacketLeftToRight(true);
                    const syncTime = randomDelay(800, 1200);
                    await wait(syncTime);
                    if (!active) break;

                    // 6. Right receives
                    setEngineActive(false);
                    setPacketLeftToRight(false);
                    setMessagesRight(prev => [...prev, {
                        id: `msg-0-sync-${localIndex}`,
                        type: 'user',
                        sender: currentScenario.source.person.name,
                        role: currentScenario.source.person.role,
                        avatarUrl: currentScenario.source.person.avatar,
                        text: msg1.text,
                        timestamp: 'Now',
                        attachment: msg1.attachment,
                        personName: currentScenario.source.person.name
                    }]);

                    // 7. Wait for Right to finish typing
                    const timeElapsed = tDuration1 + syncTime;
                    const rightFinishTime = overlapDelay + tDuration2;
                    const remainingB = Math.max(0, rightFinishTime - timeElapsed);
                    if (remainingB > 0) await wait(remainingB);
                    if (!active) break;

                    // 8. Right sends
                    setTypingRight(undefined);
                    setTypingRightText(undefined);
                    setMessagesRight(prev => [...prev, {
                        id: `msg-1-${localIndex}`,
                        type: 'user',
                        sender: currentScenario.dest.person.name,
                        role: currentScenario.dest.person.role,
                        avatarUrl: currentScenario.dest.person.avatar,
                        text: msg2.text,
                        timestamp: 'Now',
                        attachment: msg2.attachment,
                        personName: currentScenario.dest.person.name
                    }]);

                    // 9. Sync back
                    setEngineActive(true);
                    setPacketRightToLeft(true);
                    await wait(randomDelay(800, 1200));
                    if (!active) break;

                    // 10. Left receives
                    setEngineActive(false);
                    setPacketRightToLeft(false);
                    setMessagesLeft(prev => [...prev, {
                        id: `msg-1-sync-${localIndex}`,
                        type: 'user',
                        sender: currentScenario.dest.person.name,
                        role: currentScenario.dest.person.role,
                        avatarUrl: currentScenario.dest.person.avatar,
                        text: msg2.text,
                        timestamp: 'Now',
                        attachment: msg2.attachment,
                        personName: currentScenario.dest.person.name
                    }]);

                    // Handle remaining messages (msg3-msg10) in sequential mode
                    for (let i = 2; i < messages.length; i++) {
                        const msg = messages[i];
                        const isLeftSender = i % 2 === 0;
                        
                        await wait(randomDelay(1000, 1800));
                        if (!active) break;

                        const sender = isLeftSender ? currentScenario.source : currentScenario.dest;

                        // Typing
                        if (isLeftSender) {
                            setTypingLeft(sender.person.name);
                            setTypingLeftText(msg.text);
                        } else {
                            setTypingRight(sender.person.name);
                            setTypingRightText(msg.text);
                        }

                        const typingDuration = calculateTypingDuration(msg.text);
                        await wait(typingDuration);
                        if (!active) break;

                        // Send
                        if (isLeftSender) {
                            setTypingLeft(undefined);
                            setTypingLeftText(undefined);
                            setMessagesLeft(prev => [...prev, {
                                id: `msg-${i}-${localIndex}`,
                                type: 'user',
                                sender: sender.person.name,
                                role: sender.person.role,
                                avatarUrl: sender.person.avatar,
                                text: msg.text,
                                timestamp: 'Now',
                                attachment: msg.attachment,
                                personName: sender.person.name
                            }]);

                            setEngineActive(true);
                            setPacketLeftToRight(true);
                            await wait(randomDelay(800, 1200));
                            if (!active) break;

                            setEngineActive(false);
                            setPacketLeftToRight(false);
                            setMessagesRight(prev => [...prev, {
                                id: `msg-${i}-sync-${localIndex}`,
                                type: 'user',
                                sender: sender.person.name,
                                role: sender.person.role,
                                avatarUrl: sender.person.avatar,
                                text: msg.text,
                                timestamp: 'Now',
                                attachment: msg.attachment,
                                personName: sender.person.name
                            }]);
                        } else {
                            setTypingRight(undefined);
                            setTypingRightText(undefined);
                            setMessagesRight(prev => [...prev, {
                                id: `msg-${i}-${localIndex}`,
                                type: 'user',
                                sender: sender.person.name,
                                role: sender.person.role,
                                avatarUrl: sender.person.avatar,
                                text: msg.text,
                                timestamp: 'Now',
                                attachment: msg.attachment,
                                personName: sender.person.name
                            }]);

                            setEngineActive(true);
                            setPacketRightToLeft(true);
                            await wait(randomDelay(800, 1200));
                            if (!active) break;

                            setEngineActive(false);
                            setPacketRightToLeft(false);
                            setMessagesLeft(prev => [...prev, {
                                id: `msg-${i}-sync-${localIndex}`,
                                type: 'user',
                                sender: sender.person.name,
                                role: sender.person.role,
                                avatarUrl: sender.person.avatar,
                                text: msg.text,
                                timestamp: 'Now',
                                attachment: msg.attachment,
                                personName: sender.person.name
                            }]);
                        }
                    }

                } else {
                    // --- STANDARD SEQUENTIAL FLOW (for ALL messages) ---
                    const messages = extractMessages(currentScenario.conversation);

                    for (let i = 0; i < messages.length; i++) {
                        const msg = messages[i];
                        const isLeftSender = i % 2 === 0;
                        
                        if (i > 0) {
                            await wait(randomDelay(1200, 2000));
                            if (!active) break;
                        }

                        const sender = isLeftSender ? currentScenario.source : currentScenario.dest;

                        // Typing
                        if (isLeftSender) {
                            setTypingLeft(sender.person.name);
                            setTypingLeftText(msg.text);
                        } else {
                            setTypingRight(sender.person.name);
                            setTypingRightText(msg.text);
                        }

                        const typingDuration = calculateTypingDuration(msg.text);
                        await wait(typingDuration);
                        if (!active) break;

                        // Send
                        if (isLeftSender) {
                            setTypingLeft(undefined);
                            setTypingLeftText(undefined);
                            setMessagesLeft(prev => [...prev, {
                                id: `msg-${i}-${localIndex}`,
                                type: 'user',
                                sender: sender.person.name,
                                role: sender.person.role,
                                avatarUrl: sender.person.avatar,
                                text: msg.text,
                                timestamp: 'Now',
                                attachment: msg.attachment,
                                personName: sender.person.name
                            }]);

                            setEngineActive(true);
                            setPacketLeftToRight(true);
                            await wait(randomDelay(800, 1200));
                            if (!active) break;

                            setEngineActive(false);
                            setPacketLeftToRight(false);
                            setMessagesRight(prev => [...prev, {
                                id: `msg-${i}-sync-${localIndex}`,
                                type: 'user',
                                sender: sender.person.name,
                                role: sender.person.role,
                                avatarUrl: sender.person.avatar,
                                text: msg.text,
                                timestamp: 'Now',
                                attachment: msg.attachment,
                                personName: sender.person.name
                            }]);
                        } else {
                            setTypingRight(undefined);
                            setTypingRightText(undefined);
                            setMessagesRight(prev => [...prev, {
                                id: `msg-${i}-${localIndex}`,
                                type: 'user',
                                sender: sender.person.name,
                                role: sender.person.role,
                                avatarUrl: sender.person.avatar,
                                text: msg.text,
                                timestamp: 'Now',
                                attachment: msg.attachment,
                                personName: sender.person.name
                            }]);

                            setEngineActive(true);
                            setPacketRightToLeft(true);
                            await wait(randomDelay(800, 1200));
                            if (!active) break;

                            setEngineActive(false);
                            setPacketRightToLeft(false);
                            setMessagesLeft(prev => [...prev, {
                                id: `msg-${i}-sync-${localIndex}`,
                                type: 'user',
                                sender: sender.person.name,
                                role: sender.person.role,
                                avatarUrl: sender.person.avatar,
                                text: msg.text,
                                timestamp: 'Now',
                                attachment: msg.attachment,
                                personName: sender.person.name
                            }]);
                        }
                    }
                }


                // 12. Final Linger before switch
                await wait(2500);
                if (!active) break;

                // 13. Exit Scenario
                setScenarioVisible(false);
                await wait(500); // Wait for exit animation
                if (!active) break;

                // 14. Increment & Loop
                localIndex = (localIndex + 1) % SCENARIOS.length;
                // Slight pause before next starts to let UI clear
                await wait(200);
            }
        };

        loop();

        return () => {
            active = false;
        };
    }, [SCENARIOS, SECURITY_MESSAGES, t]); // Run when these change (e.g. language change)

    const currentScenario = SCENARIOS[scenarioIndex];

    return (
        <section className="relative py-20 lg:py-32 bg-[#0B0D0F] overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-950/20 via-[#0B0D0F] to-[#0B0D0F]" />

            <div className="container relative z-10 px-4 mx-auto max-w-7xl">
                {/* Header */}
                <div className="text-center mb-16 md:mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-6"
                    >
                        <Activity className="w-3 h-3" /> {t('demo.ui.live_production_sync', 'Live Production Sync')}
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6"
                    >
                        {t('demo.ui.enterprise_grade', 'Enterprise-Grade')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400">{t('demo.ui.person_to_person_sync', 'Person-to-Person Sync')}</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed"
                    >
                        {t('demo.ui.subtitle', 'Watch SyncRivo instantly route secure messages between different platforms while maintaining identity, context, and security protocols.')}
                    </motion.p>
                </div>

                {/* Scenario Container with Slide Transition */}
                <div className="min-h-[550px]">
                    <AnimatePresence mode="wait">
                        {scenarioVisible && (
                            <motion.div
                                key={currentScenario.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -25, scale: 0.98 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 items-center"
                            >
                                {/* Left Platform */}
                                <div className="relative z-10">
                                    <ChatInterface
                                        platform={currentScenario.source.platform}
                                        personName={currentScenario.source.person.name}
                                        personRole={currentScenario.source.person.role}
                                        personAvatar={currentScenario.source.person.avatar}
                                        messages={messagesLeft}
                                        typingUser={typingRight} // Left sees Right typing (indicator)
                                        typingUserAvatar={currentScenario.dest.person.avatar} // Right's avatar
                                        typingText={typingLeftText} // Left's own typing (in their input)
                                        typingPlatform={currentScenario.dest.platform}
                                        securityText={securityText}
                                    />
                                </div>

                                {/* Engine */}
                                <div className="relative py-8 lg:py-0 flex flex-col items-center justify-center min-h-[200px]">
                                    <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent hidden lg:block" />

                                    <AnimatePresence>
                                        {packetLeftToRight && (
                                            <motion.div
                                                initial={{ left: '10%', opacity: 0, scaleX: 0.5 }}
                                                animate={{ left: '90%', opacity: [0, 1, 1, 0], scaleX: 1 }}
                                                transition={{ duration: 1, ease: 'easeInOut' }}
                                                className="absolute top-1/2 -translate-y-1/2 w-24 h-1.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent blur-md z-20 hidden lg:block"
                                            />
                                        )}
                                        {packetRightToLeft && (
                                            <motion.div
                                                initial={{ right: '10%', opacity: 0, scaleX: 0.5 }}
                                                animate={{ right: '90%', opacity: [0, 1, 1, 0], scaleX: 1 }}
                                                transition={{ duration: 1, ease: 'easeInOut' }}
                                                className="absolute top-1/2 -translate-y-1/2 w-24 h-1.5 bg-gradient-to-r from-transparent via-indigo-400 to-transparent blur-md z-20 hidden lg:block"
                                            />
                                        )}
                                    </AnimatePresence>

                                    <SecureEngineCore active={engineActive} />
                                </div>

                                {/* Right Platform */}
                                <div className="relative z-10">
                                    <ChatInterface
                                        platform={currentScenario.dest.platform}
                                        personName={currentScenario.dest.person.name}
                                        personRole={currentScenario.dest.person.role}
                                        personAvatar={currentScenario.dest.person.avatar}
                                        messages={messagesRight}
                                        typingUser={typingLeft} // Right sees Left typing (indicator)
                                        typingUserAvatar={currentScenario.source.person.avatar} // Left's avatar
                                        typingText={typingRightText} // Right's own typing (in their input)
                                        typingPlatform={currentScenario.source.platform}
                                        securityText={securityText}
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer Trust Seals */}
                <div className="mt-20 pt-8 border-t border-white/5 flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    {['SOC2 Type II Certified', 'ISO 27001 Ready', 'GDPR Compliant', 'Key Management'].map((seal) => (
                        <div key={seal} className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-widest">
                            <Check className="w-4 h-4 text-emerald-500" /> {seal}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
