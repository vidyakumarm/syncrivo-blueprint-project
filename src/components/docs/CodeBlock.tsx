import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
  filename?: string;
}

export function CodeBlock({ code, language, title, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6">
      {(title || filename) && (
        <div className="flex items-center justify-between px-4 py-2 bg-muted rounded-t-lg border-b">
          <div className="flex items-center space-x-2">
            {filename && (
              <span className="text-sm font-mono text-muted-foreground">{filename}</span>
            )}
            {title && (
              <span className="text-sm font-medium text-foreground">{title}</span>
            )}
          </div>
          <Badge variant="secondary" className="text-xs">
            {language}
          </Badge>
        </div>
      )}
      <div className="relative">
        <pre className={`overflow-x-auto p-4 bg-card border rounded-${title || filename ? 'b' : ''}-lg`}>
          <code className="text-sm font-mono text-foreground">
            {code}
          </code>
        </pre>
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 h-8 w-8 p-0"
          onClick={handleCopy}
        >
          {copied ? (
            <Check className="h-3 w-3 text-success" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
        </Button>
      </div>
    </div>
  );
}