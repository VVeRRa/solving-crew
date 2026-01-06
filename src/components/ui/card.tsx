import * as React from 'react';
import {cva, type VariantProps} from 'class-variance-authority';
import {cn} from '@/lib/cn';

const cardVariants = cva(
  [
    // “mladší” tvar + méně šablonový look
    'relative overflow-hidden rounded-[18px]',
    'border border-slate-200/70 dark:border-slate-800/80',
    'text-slate-900 dark:text-slate-100',
    'shadow-sm'
  ].join(' '),
  {
    variants: {
      variant: {
        plain: 'bg-white dark:bg-slate-950/40',
        tinted: 'bg-slate-50/70 dark:bg-slate-900/30',
        glass:
          'bg-white/60 backdrop-blur-md dark:bg-slate-950/25 border-white/40 dark:border-slate-800/60',
        gradient: 'bg-gradient-to-r dark:from-slate-900 dark:to-slate-950'
      },
      scheme: {
        neutral: '',
        blue: '',
        cyan: '',
        indigo: '',
        violet: '',
        emerald: '',
        amber: ''
      },
      accent: {
        none: '',
        // místo “AI top bar” -> levý stripe
        stripe:
          'pl-6 before:absolute before:inset-y-0 before:left-0 before:w-[6px] before:bg-gradient-to-b before:opacity-90',
        // jemné “živé” světlo v rohu (neřve, ale působí organičtěji)
        corner:
          'after:absolute after:-top-10 after:-right-10 after:h-40 after:w-40 after:rounded-full after:bg-gradient-to-br after:opacity-30 after:blur-2xl'
      }
    },
    compoundVariants: [
      // gradient backgrounds per scheme
      {variant: 'gradient', scheme: 'blue', className: 'from-blue-50 to-cyan-50'},
      {variant: 'gradient', scheme: 'cyan', className: 'from-cyan-50 to-blue-50'},
      {variant: 'gradient', scheme: 'indigo', className: 'from-indigo-50 to-blue-50'},
      {variant: 'gradient', scheme: 'violet', className: 'from-violet-50 to-indigo-50'},
      {variant: 'gradient', scheme: 'emerald', className: 'from-emerald-50 to-cyan-50'},
      {variant: 'gradient', scheme: 'amber', className: 'from-amber-50 to-orange-50'},
      {variant: 'gradient', scheme: 'neutral', className: 'from-slate-50 to-white dark:from-slate-900 dark:to-slate-950'},

      // stripe gradient per scheme
      {accent: 'stripe', scheme: 'blue', className: 'before:from-blue-600 before:to-cyan-500'},
      {accent: 'stripe', scheme: 'cyan', className: 'before:from-cyan-500 before:to-sky-500'},
      {accent: 'stripe', scheme: 'indigo', className: 'before:from-indigo-500 before:to-blue-500'},
      {accent: 'stripe', scheme: 'violet', className: 'before:from-violet-500 before:to-indigo-500'},
      {accent: 'stripe', scheme: 'emerald', className: 'before:from-emerald-500 before:to-cyan-500'},
      {accent: 'stripe', scheme: 'amber', className: 'before:from-amber-500 before:to-orange-500'},
      {accent: 'stripe', scheme: 'neutral', className: 'before:from-slate-400 before:to-slate-300 dark:before:from-slate-700 dark:before:to-slate-600'},

      // corner glow gradient per scheme
      {accent: 'corner', scheme: 'blue', className: 'after:from-blue-500 after:to-cyan-400'},
      {accent: 'corner', scheme: 'cyan', className: 'after:from-cyan-500 after:to-blue-400'},
      {accent: 'corner', scheme: 'indigo', className: 'after:from-indigo-500 after:to-blue-400'},
      {accent: 'corner', scheme: 'violet', className: 'after:from-violet-500 after:to-indigo-400'},
      {accent: 'corner', scheme: 'emerald', className: 'after:from-emerald-500 after:to-cyan-400'},
      {accent: 'corner', scheme: 'amber', className: 'after:from-amber-500 after:to-orange-400'},
      {accent: 'corner', scheme: 'neutral', className: 'after:from-slate-400 after:to-slate-200 dark:after:from-slate-700 dark:after:to-slate-900'}
    ],
    defaultVariants: {
      variant: 'plain',
      scheme: 'neutral',
      accent: 'none'
    }
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export function Card({className, variant, scheme, accent, ...props}: CardProps) {
  return (
    <div
      className={cn(
        cardVariants({variant, scheme, accent}),
        // trochu “young”: mikro pohyb na hover
        'transition will-change-transform hover:-translate-y-0.5 hover:shadow-md',
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6 pb-0', className)} {...props} />;
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('text-base font-semibold tracking-tight', className)} {...props} />
  );
}

export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('mt-2 text-sm text-slate-700 dark:text-slate-300', className)} {...props} />
  );
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6 pb-3', className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6 pt-0', className)} {...props} />;
}
