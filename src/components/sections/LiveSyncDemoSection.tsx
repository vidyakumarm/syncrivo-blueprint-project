import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Lock, Shield, Check, FileText, Activity,
    Hash, Bell, Monitor,
    AlertCircle, RefreshCw, Zap
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

// --- Types & Configuration ---

type Platform = "slack" | "teams";

interface Message {
    id: string;
    sender: string;
    role?: string;
    avatar?: string;
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
}

const ENGINE_COLOR = "#10b981"; // Emerald-500
const SECURE_BLUE = "#6366f1"; // Indigo-500

// --- Components ---

const SecureBadge = () => (
    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 select-none">
        <Lock className="w-2.5 h-2.5" />
        <span>E2EE Active</span>
    </div>
);

const EngineSystemMessage = ({ text }: { text: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 px-4 py-2 mx-auto my-4 w-fit max-w-[90%] bg-indigo-500/5 border border-indigo-500/20 rounded-md shadow-sm backdrop-blur-sm"
    >
        <div className="shrink-0 w-6 h-6 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
            <Shield className="w-3 h-3 text-indigo-400" />
        </div>
        <span className="text-[11px] font-mono text-indigo-300 tracking-tight">
            <span className="font-bold text-indigo-200">SyncRivo Secure Engine:</span> {text}
        </span>
    </motion.div>
);

const Attachment = ({ name, size, type }: { name: string, size: string, type: string }) => (
    <div className="group relative mt-2 flex items-center gap-3 p-2.5 rounded border bg-card/50 border-border/50 hover:bg-card hover:border-border transition-colors w-[240px]">
        <div className="shrink-0 w-8 h-8 rounded bg-red-500/10 flex items-center justify-center border border-red-500/10">
            <FileText className="w-4 h-4 text-red-500" />
        </div>
        <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
                <p className="text-xs font-medium text-foreground truncate">{name}</p>
                <Lock className="w-2.5 h-2.5 text-emerald-500" />
            </div>
            <p className="text-[10px] text-muted-foreground">{size} • {type}</p>
        </div>

        {/* Enterprise Tooltip */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-900 border border-slate-700 text-white text-[10px] rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
            Encrypted & synced by SyncRivo Secure Engine
            <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 border-r border-b border-slate-700 rotate-45"></div>
        </div>
    </div>
);

const ChatInterface = ({
    platform,
    messages,
    title,
    channel,
    typingUser
}: {
    platform: Platform,
    messages: Message[],
    title: string,
    channel: string,
    typingUser?: string
}) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, typingUser]);

    const isSlack = platform === "slack";

    return (
        <div className="flex flex-col h-[520px] w-full bg-[#1e2124] border border-white/5 rounded-xl overflow-hidden shadow-2xl relative font-sans">
            {/* Header */}
            <div className={`h-12 px-4 flex items-center justify-between shrink-0 border-b ${isSlack ? 'bg-[#350d36] border-[#4a154b]' : 'bg-[#464775] border-[#5b5fc7]'}`}>
                <div className="flex items-center gap-3">
                    <div className="font-bold text-white text-sm flex items-center gap-2">
                        {isSlack ? <Hash className="w-4 h-4 opacity-70" /> : <div className="w-5 h-5 rounded-sm bg-white/10 flex items-center justify-center text-[10px] font-bold">T</div>}
                        {title}
                    </div>
                    {isSlack && <div className="hidden sm:block w-px h-4 bg-white/20"></div>}
                    {isSlack && <span className="hidden sm:block text-xs text-white/70 truncate max-w-[100px]">{channel}</span>}
                </div>
                <div className="flex items-center gap-3">
                    <SecureBadge />
                    <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)] animate-pulse"></div>
                </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-5 bg-[#1A1D21] scroll-smooth">
                {messages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="w-full"
                    >
                        {msg.type === "engine" ? (
                            <EngineSystemMessage text={msg.text as string} />
                        ) : (
                            <div className="flex gap-3 group">
                                <div className="shrink-0 w-9 h-9 rounded bg-indigo-500 flex items-center justify-center text-xs font-bold text-white shadow-sm border border-white/10">
                                    {msg.avatar}
                                    {msg.status === "sending" && <div className="absolute inset-0 bg-black/40 rounded animate-pulse" />}
                                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#1A1D21] rounded-full"></div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-sm font-bold text-slate-200">{msg.sender}</span>
                                        {msg.role && (
                                            <span className="px-1.5 py-px rounded text-[9px] font-medium bg-slate-800 text-slate-400 border border-slate-700 uppercase tracking-wide">
                                                {msg.role}
                                            </span>
                                        )}
                                        <span className="text-[10px] text-slate-500">{msg.timestamp}</span>
                                    </div>
                                    <div className="mt-0.5 text-[13px] leading-relaxed text-slate-300">
                                        {msg.text}
                                    </div>
                                    {msg.attachment && (
                                        <Attachment
                                            name={msg.attachment.name}
                                            size={msg.attachment.size}
                                            type={msg.attachment.type}
                                        />
                                    )}
                                </div>
                            </div>
                        )}
                    </motion.div>
                ))}

                {typingUser && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 items-end">
                        <div className="text-[10px] text-slate-500 italic ml-12 pb-1">
                            {typingUser} is typing...
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Input Placeholder */}
            <div className="p-3 bg-[#222529] border-t border-white/5 shrink-0">
                <div className="h-9 rounded border border-white/10 bg-[#1A1D21] flex items-center px-3 text-xs text-slate-600 select-none">
                    Message {isSlack ? channel : 'Project Team'}...
                </div>
            </div>
        </div>
    );
};

const SecureEngineCore = ({ active }: { active: boolean }) => {
    return (
        <div className="relative w-24 h-24 lg:w-32 lg:h-32 flex items-center justify-center">
            {/* Core Glow */}
            <div className={`absolute inset-0 bg-indigo-500/20 rounded-full blur-2xl transition-all duration-700 ${active ? 'opacity-100 scale-125' : 'opacity-30 scale-100'}`} />

            {/* Orbit Rings */}
            <div className="absolute inset-0 border border-indigo-500/30 rounded-full animate-[spin_8s_linear_infinite]" />
            <div className="absolute inset-2 border border-dashed border-emerald-500/30 rounded-full animate-[spin_12s_linear_infinite_reverse]" />

            {/* Central Module */}
            <div className="relative z-10 w-16 h-16 rounded-xl bg-[#0B0D0F] border border-indigo-500/50 shadow-[0_0_30px_rgba(99,102,241,0.3)] flex items-center justify-center backdrop-blur-xl">
                <Shield className={`w-8 h-8 transition-colors duration-500 ${active ? 'text-indigo-400' : 'text-slate-600'}`} />

                {/* Lock Animation */}
                <AnimatePresence>
                    {active && (
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg border-2 border-[#0B0D0F]"
                        >
                            <Lock className="w-3 h-3 text-white" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Status Label */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <div className={`text-[10px] font-mono font-bold tracking-widest uppercase transition-colors duration-500 ${active ? 'text-emerald-400' : 'text-slate-600'}`}>
                    {active ? 'PROCESSING' : 'STANDBY'}
                </div>
            </div>
        </div>
    );
};

// --- Main Demo Component ---

export function LiveSyncDemoSection() {
    const { t } = useTranslation();

    // State
    const [messagesLeft, setMessagesLeft] = useState<Message[]>([]);
    const [messagesRight, setMessagesRight] = useState<Message[]>([]);
    const [typingLeft, setTypingLeft] = useState<string | undefined>();
    const [typingRight, setTypingRight] = useState<string | undefined>();
    const [engineActive, setEngineActive] = useState(false);
    const [packetLeftToRight, setPacketLeftToRight] = useState(false);
    const [packetRightToLeft, setPacketRightToLeft] = useState(false);

    // Scenario Orchestration
    useEffect(() => {
        let mounted = true;
        const timeouts: NodeJS.Timeout[] = [];

        const schedule = (fn: () => void, delay: number) => {
            const id = setTimeout(() => { if (mounted) fn(); }, delay);
            timeouts.push(id);
        };

        const runScenario = () => {
            // Clear State
            setMessagesLeft([]);
            setMessagesRight([]);

            // Initial System Check
            schedule(() => {
                const sysMsg: Message = { id: 'sys-boot', type: 'engine', sender: 'System', text: 'Secure sync established. Context locked.', timestamp: '10:41 AM' };
                setMessagesLeft([sysMsg]);
                setMessagesRight([sysMsg]);
            }, 500);

            // Step 1: Sarah types on Left (Slack)
            schedule(() => setTypingLeft("Sarah Chen"), 1500);

            // Step 2: Sarah sends message
            schedule(() => {
                setTypingLeft(undefined);
                setMessagesLeft(prev => [...prev, {
                    id: 'msg-1', type: 'user', sender: 'Sarah Chen', role: 'SRE Lead', avatar: 'SC',
                    text: (<span>Incident detected on <code className="bg-white/10 px-1 rounded text-rose-300">payment-gateway</code>. 500 errors spiking.</span>),
                    timestamp: '10:42 AM'
                }]);
                setEngineActive(true);
                setPacketLeftToRight(true);
            }, 3500);

            // Step 3: Engine Processes & Syncs
            schedule(() => {
                setEngineActive(false);
                setPacketLeftToRight(false);
                setMessagesRight(prev => [...prev, {
                    id: 'msg-1-sync', type: 'user', sender: 'Sarah Chen', role: 'SRE Lead', avatar: 'SC',
                    text: (<span>Incident detected on <code className="bg-white/10 px-1 rounded text-rose-300">payment-gateway</code>. 500 errors spiking.</span>),
                    timestamp: '10:42 AM'
                }]);
                // Engine Confirmation on Right
                setMessagesRight(prev => [...prev, { id: 'sys-sync-1', type: 'engine', sender: 'System', text: 'Cross-platform delivery verified. Zero copy.', timestamp: '10:42 AM' }]);
            }, 4500);

            // Step 4: Alex types on Right (Teams)
            schedule(() => setTypingRight("Alex Rivera"), 6500);

            // Step 5: Alex Replies with Attachment
            schedule(() => {
                setTypingRight(undefined);
                setMessagesRight(prev => [...prev, {
                    id: 'msg-2', type: 'user', sender: 'Alex Rivera', role: 'DevOps', avatar: 'AR',
                    text: "I see the logs. It's the new rate limiter. Rolling back now.",
                    timestamp: '10:43 AM',
                    attachment: { name: 'latency-graph.png', size: '2.4 MB', type: 'image/png' }
                }]);
                setEngineActive(true);
                setPacketRightToLeft(true);
            }, 9500);

            // Step 6: Sync Back
            schedule(() => {
                setEngineActive(false);
                setPacketRightToLeft(false);
                setMessagesLeft(prev => [...prev, {
                    id: 'msg-2-sync', type: 'user', sender: 'Alex Rivera', role: 'DevOps', avatar: 'AR',
                    text: "I see the logs. It's the new rate limiter. Rolling back now.",
                    timestamp: '10:43 AM',
                    attachment: { name: 'latency-graph.png', size: '2.4 MB', type: 'image/png' }
                }]);
            }, 10500);

            // Loop
            schedule(runScenario, 16000);
        };

        runScenario();

        return () => {
            mounted = false;
            timeouts.forEach(clearTimeout);
        };
    }, []);

    return (
        <section className="relative py-20 lg:py-32 bg-[#0B0D0F] overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-950/20 via-[#0B0D0F] to-[#0B0D0F]" />

            <div className="container relative z-10 px-4 mx-auto max-w-7xl">
                {/* Header */}
                <div className="text-center mb-16 md:mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-6"
                    >
                        <Activity className="w-3 h-3" /> Live Production Sync
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6"
                    >
                        Enterprise-Grade <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400">Secure Sync</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed"
                    >
                        Real-time cross-platform sync powered by the <span className="text-white font-semibold">SyncRivo Secure Engine</span>.
                        Experience encryption, context integrity, and zero manual copying in action.
                    </motion.p>
                </div>

                {/* Demo Stage */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 items-center">

                    {/* Left: Source (Slack) */}
                    <div className="relative z-10">
                        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl blur-lg opacity-50" />
                        <div className="text-xs font-mono text-slate-500 mb-2 flex justify-between px-2">
                            <span>SOURCE: ENGINEERING (SLACK)</span>
                            <span className="text-emerald-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> ONLINE</span>
                        </div>
                        <ChatInterface
                            platform="slack"
                            title="#prod-incidents"
                            channel="#prod-incidents"
                            messages={messagesLeft}
                            typingUser={typingLeft}
                        />
                    </div>

                    {/* Center: Secure Engine */}
                    <div className="relative py-8 lg:py-0 flex flex-col items-center justify-center min-h-[200px]">
                        {/* Horizontal Connection Lines (Desktop) */}
                        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent hidden lg:block" />

                        {/* Packet Animations */}
                        <AnimatePresence>
                            {packetLeftToRight && (
                                <motion.div
                                    initial={{ left: '0%', opacity: 0 }}
                                    animate={{ left: '100%', opacity: [0, 1, 1, 0] }}
                                    transition={{ duration: 1, ease: 'easeInOut' }}
                                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-emerald-400 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.8)] z-20 hidden lg:block"
                                />
                            )}
                            {packetRightToLeft && (
                                <motion.div
                                    initial={{ right: '0%', opacity: 0 }}
                                    animate={{ right: '100%', opacity: [0, 1, 1, 0] }}
                                    transition={{ duration: 1, ease: 'easeInOut' }}
                                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-indigo-400 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.8)] z-20 hidden lg:block"
                                />
                            )}
                        </AnimatePresence>

                        <SecureEngineCore active={engineActive} />

                        <div className="mt-8 text-center space-y-2">
                            <h3 className="text-sm font-bold text-white tracking-wide uppercase">SyncRivo Secure Engine</h3>
                            <div className="flex flex-col gap-1 items-center">
                                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10">
                                    <Shield className="w-3 h-3" /> Context Integrity Guaranteed
                                </div>
                                <div className="flex items-center gap-1.5 text-[10px] text-indigo-400 bg-indigo-500/5 px-2 py-0.5 rounded border border-indigo-500/10">
                                    <Lock className="w-3 h-3" /> Keys Managed by Customer
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Destination (Teams) */}
                    <div className="relative z-10">
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-xl blur-lg opacity-50" />
                        <div className="text-xs font-mono text-slate-500 mb-2 flex justify-between px-2">
                            <span>DESTINATION: MANAGEMENT (TEAMS)</span>
                            <span className="text-emerald-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> ONLINE</span>
                        </div>
                        <ChatInterface
                            platform="teams"
                            title="Priorities / Incidents"
                            channel="General"
                            messages={messagesRight}
                            typingUser={typingRight}
                        />
                    </div>

                </div>

                {/* Footer Trust Seals */}
                <div className="mt-20 pt-8 border-t border-white/5 flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    {['SOC2 Type II Certified', 'ISO 27001 Ready', 'GDPR Compliant', 'Zero Data Retention'].map((seal) => (
                        <div key={seal} className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-widest">
                            <Check className="w-4 h-4 text-emerald-500" /> {seal}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
