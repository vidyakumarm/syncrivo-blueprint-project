import { FileIcon, ImageIcon } from 'lucide-react';
import { Attachment } from '@/data/chatScenarios';

interface AttachmentBubbleProps {
    attachment: Attachment;
}

export function AttachmentBubble({ attachment }: AttachmentBubbleProps) {
    return (
        <div className='flex items-center gap-3 bg-slate-100 dark:bg-slate-700/50 p-2.5 rounded-lg max-w-full mt-2'>
            <div className='w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-600 shadow-sm'>
                {attachment.type === 'image' ? (
                    <ImageIcon className='w-5 h-5 text-indigo-500' />
                ) : (
                    <FileIcon className='w-5 h-5 text-rose-500' />
                )}
            </div>
            <div className='min-w-0 flex-1'>
                <p className='text-xs font-semibold text-foreground truncate max-w-[180px]'>
                    {attachment.name}
                </p>
                {attachment.size && (
                    <p className='text-[10px] text-muted-foreground uppercase tracking-wide'>
                        {attachment.type} · {attachment.size}
                    </p>
                )}
            </div>
        </div>
    );
}
