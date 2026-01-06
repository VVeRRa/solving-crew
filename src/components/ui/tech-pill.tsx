import * as React from 'react';
import {cn} from '@/lib/cn';
import {Badge} from '@/components/ui/badge';

export function TechPill({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Badge
      variant="outline"
      className={cn(
        'bg-slate-50 text-slate-700 hover:bg-blue-50 hover:border-blue-200 transition',
        'dark:bg-slate-900 dark:text-slate-200 dark:hover:border-blue-500/50',
        className
      )}
    >
      {children}
    </Badge>
  );
}
