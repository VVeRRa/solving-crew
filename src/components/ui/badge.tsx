import * as React from 'react';
import {cva, type VariantProps} from 'class-variance-authority';
import {cn} from '@/lib/cn';

const badgeVariants = cva(
  'inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium border',
  {
    variants: {
      variant: {
        soft:
          'border-slate-200 bg-white/70 text-slate-700 shadow-sm dark:border-slate-800 dark:bg-black/30 dark:text-slate-200',
        outline:
          'border-slate-200 bg-transparent text-slate-700 dark:border-slate-800 dark:text-slate-200',
        info:
          'border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-500/25 dark:bg-blue-500/15 dark:text-blue-200',
        success:
          'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-500/25 dark:bg-emerald-500/15 dark:text-emerald-200',
        warning:
          'border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-500/25 dark:bg-amber-500/15 dark:text-amber-200'
      }
    },
    defaultVariants: {variant: 'soft'}
  }
);

export function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({variant}), className)} {...props} />;
}

export {badgeVariants};
