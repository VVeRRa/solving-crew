'use client';

import * as React from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';

type Props = {
  labels: {
    name: string;
    company: string;
    email: string;
    phone: string;
    message: string;
    submit: string;
    success: string;
    error: string;
  };
  locale: string;
};

export default function ContactForm({labels, locale}: Props) {
  const [status, setStatus] = React.useState<'idle' | 'sending' | 'ok' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get('name') || ''),
      company: String(fd.get('company') || ''),
      email: String(fd.get('email') || ''),
      phone: String(fd.get('phone') || ''),
      message: String(fd.get('message') || ''),
      website: String(fd.get('website') || ''), // honeypot
      locale
    };

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
    });

    if (res.ok) setStatus('ok');
    else setStatus('error');
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* honeypot (hidden) */}
      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <Input name="name" placeholder={labels.name} required />
      <Input name="company" placeholder={labels.company} />
      <Input name="email" placeholder={labels.email} type="email" required />
      <Input name="phone" placeholder={labels.phone} />
      <Textarea name="message" placeholder={labels.message} required rows={6} />

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={status === 'sending'}>
          {labels.submit}
        </Button>

        {status === 'ok' && <span className="text-sm text-emerald-600">{labels.success}</span>}
        {status === 'error' && <span className="text-sm text-red-600">{labels.error}</span>}
      </div>
    </form>
  );
}
