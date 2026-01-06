import * as React from 'react';
import {cn} from '@/lib/cn';

export function Container({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mx-auto max-w-6xl px-6', className)} {...props} />
  );
}

export function Page({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mx-auto max-w-6xl px-6 py-16 space-y-14', className)} {...props} />
  );
}

export function Section({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return <section className={cn('', className)} {...props} />;
}

