interface TypingIndicatorProps {
    senderName?: string;
}

export function TypingIndicator({ senderName }: TypingIndicatorProps) {
    return (
        <div className="flex items-center gap-2 py-2 animate-fade-in">
            <div className="flex items-center gap-1.5">
                <span
                    className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce"
                    style={{ animationDelay: '0ms', animationDuration: '1s' }}
                />
                <span
                    className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce"
                    style={{ animationDelay: '150ms', animationDuration: '1s' }}
                />
                <span
                    className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce"
                    style={{ animationDelay: '300ms', animationDuration: '1s' }}
                />
            </div>
            {senderName && (
                <span className="text-sm text-muted-foreground italic">
                    {senderName} is typing...
                </span>
            )}
        </div>
    );
}
