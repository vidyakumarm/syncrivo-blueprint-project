import { SyncBadge } from './SyncBadge';

interface MessageBubbleProps {
    sender: string;
    role: string;
    photo: string;
    text: string;
    showSyncBadge?: boolean;
    syncFrom?: string;
}

export function MessageBubble({
    sender,
    role,
    photo,
    text,
    showSyncBadge = false,
    syncFrom,
}: MessageBubbleProps) {
    return (
        <div className="flex items-start gap-3">
            <img
                src={photo}
                alt={sender}
                className="w-9 h-9 rounded-full object-cover flex-shrink-0 ring-2 ring-slate-200 dark:ring-slate-700 shadow-md"
            />
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-sm font-semibold text-foreground">{sender}</span>
                    <span className="text-xs text-muted-foreground">· {role}</span>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-xl px-4 py-2.5 inline-block shadow-sm border border-slate-100 dark:border-slate-700">
                    <p className="text-sm text-foreground">{text}</p>
                </div>
                {showSyncBadge && syncFrom && <SyncBadge from={syncFrom} />}
            </div>
        </div>
    );
}
