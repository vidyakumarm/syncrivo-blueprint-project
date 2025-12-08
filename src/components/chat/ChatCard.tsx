import { PlatformTheme } from '@/config/platformThemes';
import { MessageConfig } from '@/data/chatScenarios';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';

interface ChatCardProps {
    platform: PlatformTheme;
    currentMessage: MessageConfig;
    previousMessages: MessageConfig[];
    phase: number;
    isSource: boolean;
    oppositePlatformName: string;
}

export function ChatCard({
    platform,
    currentMessage,
    previousMessages,
    phase,
    isSource,
    oppositePlatformName,
}: ChatCardProps) {
    // Typing indicator shows ONLY on receiver's platform during phase 1
    // If isSource=true (sender's platform), don't show typing
    // If isSource=false (receiver's platform), show typing
    const showTypingOnThisSide = phase === 1 && !isSource;

    // Message shows on sender side at phase 2, on receiver side at phase 6
    const showCurrentMessage = isSource ? phase >= 2 : phase >= 6;

    // Show ALL previous messages on both sides
    const displayMessages = previousMessages;

    return (
        <div className="w-full md:w-[300px] lg:w-[340px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div
                className={`flex items-center gap-3 px-5 py-3.5 bg-gradient-to-r ${platform.gradient} ${platform.textColor}`}
            >
                <img src={platform.icon} alt={platform.name} className="w-5 h-5" />
                <span className="font-semibold text-sm">{platform.name}</span>
                <div className="ml-auto flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-xs opacity-80">Connected</span>
                </div>
            </div>

            {/* Chat Area */}
            <div className="p-4 min-h-[200px] bg-slate-50/50 dark:bg-slate-900/50 space-y-3">
                {/* Previous Messages - ALL messages shown on both sides */}
                {displayMessages.map((msg) => {
                    // Determine if this message is "mirrored" (originated from the opposite platform)
                    const isMirrored = (isSource && msg.from === 'right') || (!isSource && msg.from === 'left');

                    return (
                        <MessageBubble
                            key={msg.id}
                            sender={msg.sender}
                            role={msg.role}
                            photo={msg.photo}
                            text={msg.text}
                            showSyncBadge={isMirrored}
                            syncFrom={isMirrored ? oppositePlatformName : undefined}
                        />
                    );
                })}

                {/* Typing Indicator - Shows ONLY on receiver's platform during phase 1 */}
                {showTypingOnThisSide && !showCurrentMessage && (
                    <div className="flex items-start gap-3 animate-fade-in pl-12">
                        <TypingIndicator senderName={currentMessage.sender} />
                    </div>
                )}

                {/* Current Message */}
                {showCurrentMessage && (
                    <div className="flex items-start gap-3 animate-fade-in">
                        <img
                            src={currentMessage.photo}
                            alt={currentMessage.sender}
                            className="w-9 h-9 rounded-full object-cover flex-shrink-0 ring-2 ring-slate-200 dark:ring-slate-700 shadow-md"
                        />

                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1.5">
                                <span className="text-sm font-semibold text-foreground">
                                    {currentMessage.sender}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    · {currentMessage.role}
                                </span>
                            </div>

                            <div className="bg-white dark:bg-slate-800 rounded-xl px-4 py-2.5 inline-block shadow-sm border border-slate-100 dark:border-slate-700 animate-fade-in">
                                <p className="text-sm text-foreground">{currentMessage.text}</p>
                            </div>

                            {/* Sync badge for mirrored messages */}
                            {((isSource && currentMessage.from === 'right') ||
                                (!isSource && currentMessage.from === 'left')) && (
                                    <div className="flex items-center gap-1.5 mt-2">
                                        <span className="text-[10px] text-muted-foreground font-medium">
                                            Synced from {oppositePlatformName} · via SyncRivo · Encrypted
                                        </span>
                                    </div>
                                )}
                        </div>
                    </div>
                )}
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
                <div className="flex items-center px-4 py-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
                    <span className="text-sm text-muted-foreground">Type a message...</span>
                </div>
            </div>
        </div>
    );
}
