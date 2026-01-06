import * as React from 'react';
import {cn} from '@/lib/cn';

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        'w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-sm',
        'outline-none transition',
        'focus:border-blue-300 focus:ring-2 focus:ring-blue-200',
        'dark:bg-slate-950/40 dark:border-slate-800 dark:text-slate-100',
        'dark:focus:border-blue-500/60 dark:focus:ring-blue-500/20',
        className
      )}
      {...props}
    />
  );
}
