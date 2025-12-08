import { Shield } from 'lucide-react';

interface SyncBadgeProps {
    from: string;
}

export function SyncBadge({ from }: SyncBadgeProps) {
    return (
        <div className="flex items-center gap-1.5 mt-2">
            <Shield className="w-3 h-3 text-emerald-500" />
            <span className="text-[10px] text-muted-foreground font-medium">
                Synced from {from} · via SyncRivo · Encrypted
            </span>
        </div>
    );
}
