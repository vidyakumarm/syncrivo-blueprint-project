import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Lock, RefreshCw, Send, Paperclip, Smile, MoreHorizontal, Check, Zap, FileText, Play } from "lucide-react";
import { useTranslationWithFallback } from "@/hooks/useTranslationWithFallback";

// --- Types & Constants ---

type Platform = "slack" | "teams" | "google" | "zoom";

interface Message {
    id: string;
    sender: string;
    avatar: string;
    role?: string;
    text: React.ReactNode;
    time: string;
    isBot?: boolean;
    attachment?: {
        name: string;
        size: string;
        type: "file" | "image";
    };
    status?: "sending" | "sent" | "delivered" | "read";
}

const PLATFORM_CONFIG = {
    slack: {
        name: "Slack",
        color: "#4A154B",
        icon: "/assets/brands/slack-official.svg", // Assuming asset exists or using Lucide fallback
        headerClass: "bg-[#350d36]",
        bubbleSent: "bg-transparent hover:bg-slate-800/50", // Slack messages are cleaner
        bubbleRecv: "bg-transparent hover:bg-slate-800/50",
    },
    teams: {
        name: "Microsoft Teams",
        color: "#6264A7",
        icon: "/assets/brands/teams-official.svg",
        headerClass: "bg-[#464775]",
        bubbleSent: "bg-[#E8EBFA] text-slate-900 border border-slate-200", // Teams bubbles are distinct
        bubbleRecv: "bg-white text-slate-900 border border-slate-200",
    },
    google: {
        name: "Google Chat",
        color: "#137333",
        icon: "/assets/brands/google-chat.svg",
        headerClass: "bg-[#1f1f1f]",
        bubbleSent: "bg-[#e8f0fe] text-slate-900",
        bubbleRecv: "bg-white text-slate-900 border border-slate-200",
    },
};

// --- Sub-components for Realism ---

const Avatar = ({ name, url, fallback, size = "md" }: { name: string; url?: string; fallback: string, size?: "sm" | "md" }) => {
    const sizeClass = size === "sm" ? "w-6 h-6 text-[10px]" : "w-9 h-9 text-xs";
    // Use realistic photo placeholders if no URL provided (for Sarah/Alex)
    const photoUrl = url || (name.includes("Sarah") ? "https://i.pravatar.cc/150?u=sarah" : name.includes("Alex") ? "https://i.pravatar.cc/150?u=alex" : undefined);

    return (
        <div className={`${sizeClass} rounded flex items-center justify-center font-bold text-white shrink-0 overflow-hidden relative shadow-sm`} style={{ backgroundColor: stringToColor(name) }}>
            {photoUrl ? <img src={photoUrl} alt={name} className="w-full h-full object-cover" /> : fallback}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
        </div>
    );
};

// Deterministic color generator for avatars
const stringToColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = (hash & 0x00ffffff).toString(16).toUpperCase();
    return "#" + "00000".substring(0, 6 - c.length) + c;
};

// --- Main Chat Window Component ---

const ChatWindow = ({
    platform,
    messages,
    isTyping,
    typingUser,
    inputText = ""
}: {
    platform: Platform;
    messages: Message[];
    isTyping: boolean;
    typingUser?: string;
    inputText?: string;
}) => {
    const config = PLATFORM_CONFIG[platform as keyof typeof PLATFORM_CONFIG] || PLATFORM_CONFIG.slack;
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom on new message
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    return (
        <div className="flex flex-col h-[600px] w-full bg-[#1A1D21] border border-slate-700/50 rounded-lg overflow-hidden shadow-2xl font-sans relative group">
            {/* 1. Header */}
            <div className={`h-14 px-4 flex items-center justify-between shrink-0 ${platform === 'teams' ? config.headerClass : 'bg-[#121417] border-b border-slate-800'}`}>
                <div className="flex items-center gap-3">
                    {/* Mock Platform Logo */}
                    <div className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold text-white ${platform === 'slack' ? 'bg-transparent' : 'bg-transparent'}`}>
                        {/* SVG placeholders for icons to ensure no missing assets */}
                        {platform === 'slack' && <span className="text-lg">#</span>}
                        {platform === 'teams' && <span className="font-bold text-white uppercase tracking-tighter">T</span>}
                        {platform === 'google' && <span className="font-bold text-green-500 uppercase">G</span>}
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="text-sm font-bold text-white leading-tight">
                                {platform === 'slack' ? '# prod-incidents' : platform === 'teams' ? 'Production Incidents' : 'Incidents'}
                            </h3>
                            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                        </div>
                        <p className="text-[10px] text-slate-400 flex items-center gap-1">
                            <Lock className="w-2.5 h-2.5 opacity-70" /> Encrypted • 24 participants
                        </p>
                    </div>
                </div>
                {/* Header Actions */}
                <div className="flex items-center gap-3 text-slate-400">
                    <div className="flex -space-x-1.5 opacity-60">
                        <div className="w-5 h-5 rounded bg-slate-600 border border-slate-900"></div>
                        <div className="w-5 h-5 rounded bg-slate-500 border border-slate-900"></div>
                        <div className="w-5 h-5 rounded bg-slate-400 border border-slate-900"></div>
                    </div>
                    <MoreHorizontal className="w-4 h-4 cursor-pointer hover:text-white" />
                </div>
            </div>

            {/* 2. Message Area */}
            <div ref={scrollRef} className={`flex-1 overflow-y-auto p-4 space-y-4 ${platform === 'teams' ? 'bg-[#F5F5F7] dark:bg-[#1F1F1F]' : 'bg-[#1A1D21]'}`}>
                {/* Date Separator */}
                <div className="flex items-center justify-center my-4">
                    <div className="h-px bg-slate-800 w-16"></div>
                    <span className="mx-2 text-[10px] font-medium text-slate-500 uppercase tracking-widest">Today</span>
                    <div className="h-px bg-slate-800 w-16"></div>
                </div>

                {messages.map((msg) => (
                    <div key={msg.id} className={`group flex gap-3 ${msg.isBot ? 'opacity-90' : 'opacity-100'} animate-fade-in`}>
                        {/* Avatar */}
                        {msg.isBot ? (
                            <div className="w-9 h-9 rounded bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                                <Zap className="w-5 h-5" />
                            </div>
                        ) : (
                            <Avatar name={msg.sender} fallback={msg.sender.substring(0, 2).toUpperCase()} />
                        )}

                        <div className="flex-1 min-w-0">
                            {/* Message Header */}
                            <div className="flex items-baseline gap-2">
                                <span className={`text-sm font-bold ${platform === 'teams' ? 'text-slate-900 dark:text-slate-100' : 'text-slate-200'}`}>
                                    {msg.sender}
                                </span>
                                {msg.role && (
                                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-700/50 text-slate-400 border border-slate-700 uppercase tracking-wide">
                                        {msg.role}
                                    </span>
                                )}
                                <span className="text-[10px] text-slate-500 hover:text-slate-400 cursor-default transition-colors">
                                    {msg.time}
                                </span>
                            </div>

                            {/* Message Body */}
                            <div className={`mt-0.5 text-sm leading-relaxed ${platform === 'teams'
                                ? 'text-slate-800 dark:text-slate-300'
                                : 'text-slate-300'
                                }`}>
                                {msg.text}
                            </div>

                            {/* Attachments */}
                            {msg.attachment && (
                                <div className={`mt-2 flex items-center gap-3 p-2 rounded-md border w-fit max-w-full ${platform === 'teams'
                                    ? 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                                    : 'bg-[#222529] border-slate-700'
                                    }`}>
                                    <div className="w-8 h-8 rounded bg-red-500/10 flex items-center justify-center text-red-500">
                                        <FileText className="w-4 h-4" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className={`text-xs font-medium truncate max-w-[150px] ${platform === 'teams' ? 'text-slate-900 dark:text-white' : 'text-slate-200'}`}>{msg.attachment.name}</p>
                                        <p className="text-[10px] text-slate-500">{msg.attachment.size}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                    <div className="flex gap-3 animate-fade-in">
                        <Avatar name={typingUser || "User"} fallback=".." size="sm" />
                        <div className="flex items-center gap-1 h-6 px-2">
                            <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                            <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                            <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                            <span className="ml-2 text-xs text-slate-500 italic">{typingUser} is typing...</span>
                        </div>
                    </div>
                )}
            </div>

            {/* 3. Input Area */}
            <div className={`p-3 shrink-0 ${platform === 'teams' ? 'bg-white dark:bg-[#1F1F1F] border-t border-slate-200 dark:border-slate-800' : 'bg-[#222529] border-t border-slate-700'}`}>
                <div className={`flex items-center gap-2 p-2 rounded-md border ${platform === 'teams'
                    ? 'bg-transparent border-transparent' // Teams has a simpler input look usually
                    : 'bg-[#1A1D21] border-slate-700'
                    }`}>
                    <div className="flex items-center gap-1 text-slate-500 p-1 border-r border-slate-700 pr-2">
                        <MoreHorizontal className="w-4 h-4" />
                    </div>
                    <div className={`flex-1 text-sm font-normal truncate ${inputText ? (platform === 'teams' ? 'text-slate-900' : 'text-slate-200') : 'text-slate-500'}`}>
                        {inputText || `Message ${platform === 'slack' ? '#prod-incidents' : 'Incidents'}...`}
                    </div>
                    <div className="flex items-center gap-3 text-slate-500">
                        <Smile className="w-4 h-4 hover:text-slate-300 cursor-not-allowed" />
                        <Paperclip className="w-4 h-4 hover:text-slate-300 cursor-not-allowed" />
                        <div className={`p-1.5 rounded ${platform === 'teams' ? 'text-purple-500 hover:bg-purple-50' : 'text-slate-400 hover:bg-slate-700'}`}>
                            <Send className="w-3.5 h-3.5" />
                        </div>
                    </div>
                </div>
                {platform === 'slack' && (
                    <div className="flex items-center gap-4 mt-1 px-1 text-[10px] text-slate-500">
                        <span className="flex items-center gap-1"><span className="font-bold">+</span> Attach</span>
                        <span className="flex items-center gap-1">@ Mention</span>
                    </div>
                )}
            </div>
        </div>
    );
}

// --- Main Demo Section ---

export function LiveSyncDemoSection() {
    const { t } = useTranslationWithFallback();
    const [leftConfig, setLeftConfig] = useState<Platform>("slack");
    const [rightConfig, setRightConfig] = useState<Platform>("teams");
    const [isPlaying, setIsPlaying] = useState(true);

    // Message State
    const [leftMessages, setLeftMessages] = useState<Message[]>([]);
    const [rightMessages, setRightMessages] = useState<Message[]>([]);
    const [leftTyping, setLeftTyping] = useState(false);
    const [rightTyping, setRightTyping] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [currentTyper, setCurrentTyper] = useState<string | undefined>(undefined);
    const [flowState, setFlowState] = useState<"idle" | "typing-src" | "sending" | "syncing" | "typing-dest" | "delivered">("idle");
    const demoStepRef = useRef(0);

    // Typing simulation helper
    const simulateTyping = (text: string, callback: () => void) => {
        let currentText = "";
        let index = 0;

        const typeChar = () => {
            if (index < text.length) {
                currentText += text.charAt(index);
                setInputValue(currentText);
                index++;
                setTimeout(typeChar, 30 + Math.random() * 50); // Random typing speed equivalent to 300-800 WPM? No, just fast typing.
            } else {
                setTimeout(callback, 300); // Pause before send
            }
        };
        typeChar();
    };

    // Initial Messages
    useEffect(() => {
        setLeftMessages([{ id: "init-1", sender: "System", avatar: "Sys", text: "Channel sync active. Messages are encrypted.", time: "09:00 AM", isBot: true }]);
        setRightMessages([{ id: "init-1", sender: "System", avatar: "Sys", text: "External sync active. End-to-end encrypted.", time: "09:00 AM", isBot: true }]);
    }, [leftConfig, rightConfig]);

    // Main Simulation Loop
    useEffect(() => {
        if (!isPlaying) return;

        let timeoutId: NodeJS.Timeout;

        const loop = () => {
            const step = demoStepRef.current;

            // SCENARIO 1: Sarah sends incident report (Left -> Right)
            if (step === 0) {
                // Idle -> Typing Left
                setFlowState("typing-src");
                setCurrentTyper("Sarah Chen");
                // Start realistic typing simulation
                const messageText = "Incident detected: API latency spike > 500ms";
                simulateTyping(messageText, () => {
                    setInputValue(""); // Clear input on send
                    setLeftMessages(prev => [...prev, {
                        id: "msg-1", sender: "Sarah Chen", avatar: "SC", role: "SRE Lead",
                        text: <span>Incident detected: API latency spike {'>'} 500ms on <code className="bg-slate-800 px-1 py-0.5 rounded text-rose-300">auth-service</code>. Investigating.</span>,
                        time: "10:32 AM"
                    }]);
                    setFlowState("sending");
                    demoStepRef.current++;
                    loop();
                });
            }
            else if (step === 1) {
                // Sending -> Syncing (Hub Animation)
                setFlowState("syncing");
                timeoutId = setTimeout(() => {
                    setFlowState("typing-dest");
                    setRightTyping(true); // Mirrored typing (Sarah)
                    setCurrentTyper("Sarah Chen");
                    demoStepRef.current++;
                    loop();
                }, 1200); // 1.2s network/sync delay
            }
            else if (step === 2) {
                // Typing Dest -> Delivered
                setRightTyping(false);
                setRightMessages(prev => [...prev, {
                    id: "msg-1-sync", sender: "Sarah Chen", avatar: "SC", role: "SRE Lead",
                    text: <span className="opacity-90">Incident detected: API latency spike {'>'} 500ms on `auth-service`. Investigating.</span>,
                    time: "10:32 AM",
                    attachment: { name: "latency-graph.png", size: "1.2 MB", type: "image" }
                }]);
                setFlowState("delivered");
                demoStepRef.current++;
                timeoutId = setTimeout(loop, 3000); // Read time
            }
            else if (step === 3) {
                // SCENARIO 2: Alex replies (Right -> Left)
                setFlowState("typing-dest");
                setCurrentTyper("Alex Rivera");
                setRightTyping(true);
                timeoutId = setTimeout(() => {
                    setRightTyping(false);
                    setRightMessages(prev => [...prev, {
                        id: "msg-2", sender: "Alex Rivera", avatar: "AR", role: "DevOps",
                        text: "Acknowledged. I see a connection drain on the primary DB. Rolling back recent migration.",
                        time: "10:33 AM"
                    }]);
                    setFlowState("syncing");
                    demoStepRef.current++;
                    loop();
                }, 2000);
            }
            else if (step === 4) {
                // Syncing back
                setFlowState("syncing");
                timeoutId = setTimeout(() => {
                    setFlowState("typing-src");
                    setLeftTyping(true);
                    setCurrentTyper("Alex Rivera");
                    demoStepRef.current++;
                    loop();
                }, 1200);
            }
            else if (step === 5) {
                // Delivered Left
                setLeftTyping(false);
                setLeftMessages(prev => [...prev, {
                    id: "msg-2-sync", sender: "Alex Rivera", avatar: "AR", role: "DevOps",
                    text: "Acknowledged. I see a connection drain on the primary DB. Rolling back recent migration.",
                    time: "10:33 AM"
                }]);
                setFlowState("idle");
                demoStepRef.current++;
                timeoutId = setTimeout(loop, 4000);
            }
            else {
                // Reset
                setLeftMessages([{ id: "init-1", sender: "System", avatar: "Sys", text: "Channel sync active. Messages are encrypted.", time: "09:00 AM", isBot: true }]);
                setRightMessages([{ id: "init-1", sender: "System", avatar: "Sys", text: "External sync active. End-to-end encrypted.", time: "09:00 AM", isBot: true }]);
                demoStepRef.current = 0;
                loop();
            }
        };

        loop();
        return () => clearTimeout(timeoutId);
    }, [isPlaying, leftConfig, rightConfig]);


    return (
        <section className="relative py-24 bg-[#0B0D0F] overflow-hidden text-slate-200 font-sans" aria-labelledby="live-sync-heading">

            {/* Background Ambience */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0B0D0F] to-[#0B0D0F] opacity-80" />
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />

            <div className="container relative z-10 px-4 max-w-[1400px] mx-auto">

                {/* Header content */}
                <div className="text-center mb-12 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live Production Environment
                    </div>
                    <h2 id="live-sync-heading" className="text-3xl md:text-5xl font-bold tracking-tight text-white">
                        Enterprise-Grade <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Secure Sync</span>
                    </h2>
                    <p className="max-w-xl mx-auto text-lg text-slate-400">
                        Watch how SyncRivo bridges isolated platforms with full context preservation, encryption, and zero manual copying.
                    </p>
                </div>

                {/* --- DEMO STAGE --- */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-4 lg:gap-8 items-stretch pt-8">

                    {/* LEFT PANEL: Source */}
                    <div className="relative z-10">
                        <ChatWindow
                            platform={leftConfig}
                            messages={leftMessages}
                            isTyping={leftTyping}
                            typingUser={currentTyper}
                            inputText={flowState === 'typing-src' ? inputValue : ""}
                        />
                    </div>

                    {/* CENTER: The Hub / Pipe */}
                    <div className="flex lg:flex-col items-center justify-center gap-6 py-4 lg:py-0 relative">
                        {/* Connection Lines (SVG) */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block" preserveAspectRatio="none">
                            <path
                                d="M 50 0 L 50 1000"
                                stroke="url(#pipe-gradient)"
                                strokeWidth="2"
                                strokeDasharray="4 4"
                                className="opacity-20"
                            />
                            <defs>
                                <linearGradient id="pipe-gradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
                                    <stop offset="50%" stopColor="#6366f1" stopOpacity="0.5" />
                                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>

                        {/* Directional Flow Animation */}
                        <div className={`w-12 h-12 rounded-full bg-[#1A1D21] border border-slate-700 flex items-center justify-center relative z-10 transition-all duration-500 ${flowState === 'syncing' ? 'border-accent shadow-[0_0_25px_rgba(16,185,129,0.4)] scale-110' : ''}`}>
                            <Lock className={`w-5 h-5 transition-colors ${flowState === 'syncing' ? 'text-accent' : 'text-slate-500'}`} />

                            {/* Orbiting particles during sync */}
                            {flowState === 'syncing' && (
                                <>
                                    <div className="absolute inset-0 border-2 border-accent/30 rounded-full animate-ping" />
                                    <div className="absolute -inset-2 border border-dashed border-accent/20 rounded-full animate-spin-slow" />
                                </>
                            )}
                        </div>

                        {/* Pulse lines */}
                        {flowState === 'syncing' && (
                            <div className="absolute w-full h-1 lg:w-1 lg:h-full bg-accent/20 blur-sm animate-pulse" />
                        )}
                    </div>

                    {/* RIGHT PANEL: Destination */}
                    <div className="relative z-10">
                        <ChatWindow
                            platform={rightConfig}
                            messages={rightMessages}
                            isTyping={rightTyping}
                            typingUser={currentTyper} // If active typing it's Alex, if mirrored it's Sarah
                        />
                    </div>

                </div>

                {/* Controls */}
                <div className="mt-16 flex justify-center">
                    <div className="inline-flex items-center gap-2 p-1.5 bg-[#1A1D21] border border-slate-800 rounded-full shadow-lg">
                        {(['slack', 'teams', 'google'] as const).map(p => (
                            <button
                                key={p}
                                onClick={() => { setLeftConfig(p); setRightConfig(p === 'teams' ? 'slack' : 'teams'); demoStepRef.current = 0; setLeftMessages([]); setRightMessages([]); }}
                                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${leftConfig === p ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                            >
                                {PLATFORM_CONFIG[p].name} Source
                            </button>
                        ))}
                        <div className="w-px h-6 bg-slate-800 mx-2" />
                        <button onClick={() => setIsPlaying(!isPlaying)} className="p-2 rounded-full hover:bg-slate-800 text-slate-400">
                            {isPlaying ? <span className="block w-2.5 h-2.5 bg-yellow-500 rounded sm:hidden" /> : <Play className="w-4 h-4 fill-current" />}
                            {isPlaying ? <span className="hidden sm:inline text-xs font-medium">Pause Sim</span> : <span className="hidden sm:inline text-xs font-medium">Resume</span>}
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
}
