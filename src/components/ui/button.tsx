import * as React from 'react';
import {cva, type VariantProps} from 'class-variance-authority';
import {cn} from '@/lib/cn';
import {Link as I18nLink} from '@/i18n/navigation';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'shrink-0 whitespace-nowrap', // zabrání “splácnutí” a zalomení
    'rounded-lg text-sm font-medium leading-none', // stabilní typografie/vertikála
    'transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60',
    'focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950',
    'disabled:pointer-events-none disabled:opacity-50',
    'select-none'
  ].join(' '),
  {
    variants: {
      variant: {
        primary:
          'bg-blue-600 text-white shadow-sm hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400',
        secondary:
          'border border-slate-300 bg-white text-slate-900 hover:border-blue-300 hover:bg-blue-50 ' +
          'dark:bg-transparent dark:text-slate-100 dark:border-slate-700 dark:hover:border-blue-500/60 dark:hover:bg-slate-900',
        ghost:
          'text-slate-900 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-900',
        destructive:
          'bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-400'
      },
      size: {
        sm: 'h-9 px-3',
        md: 'h-10 px-4',
        lg: 'h-11 px-5',
        icon: 'h-10 w-10 px-0'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;

export function Button({
  className,
  variant,
  size,
  type,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonVariants) {
  return (
    <button
      type={type ?? 'button'}
      className={cn(buttonVariants({variant, size}), className)}
      {...props}
    />
  );
}

type I18nLinkProps = React.ComponentProps<typeof I18nLink>;

export function ButtonLink({
  className,
  variant,
  size,
  ...props
}: I18nLinkProps & ButtonVariants) {
  return (
    <I18nLink
      className={cn(buttonVariants({variant, size}), className)}
      {...props}
    />
  );
}

export function ButtonA({
  className,
  variant,
  size,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & ButtonVariants) {
  return (
    <a
      className={cn(buttonVariants({variant, size}), className)}
      {...props}
    />
  );
}

export {buttonVariants};
