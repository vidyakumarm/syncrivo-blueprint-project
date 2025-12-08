import { Zap, Lock } from 'lucide-react';

interface SyncRivoHubProps {
    phase: number;
}

export function SyncRivoHub({ phase }: SyncRivoHubProps) {
    const isProcessing = phase === 4;

    return (
        <div className="relative mx-4">
            {/* Glow */}
            <div
                className={`absolute inset-0 bg-primary/20 rounded-2xl blur-xl transition-all duration-500 ${isProcessing ? 'scale-150 opacity-100' : 'scale-100 opacity-40'
                    }`}
            />

            {/* Hub Card */}
            <div
                className={`relative w-28 h-28 lg:w-32 lg:h-32 rounded-2xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xl flex flex-col items-center justify-center transition-all duration-300 ${isProcessing ? 'scale-110' : 'scale-100'
                    }`}
            >
                {/* Icon */}
                <div
                    className={`w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 flex items-center justify-center shadow-lg transition-all duration-300 ${isProcessing ? 'animate-pulse' : ''
                        }`}
                >
                    <Zap className="w-6 h-6 lg:w-7 lg:h-7 text-white dark:text-slate-900" />
                </div>
                <span className="text-xs font-bold text-foreground mt-2">SyncRivo</span>

                {/* Processing Indicator */}
                {isProcessing && (
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-500 text-white text-[10px] font-semibold rounded-full animate-fade-in flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        Encrypting...
                    </div>
                )}
            </div>
        </div>
    );
}
