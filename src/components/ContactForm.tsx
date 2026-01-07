'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type Labels = {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  submit: string;
  success: string;
  error: string;

  helper: {
    messageHint: string; // např. "Min {min} • {current}/{max}"
  };

  validation: {
    nameRequired: string;
    nameTooLong: string;     // "… {max} …"
    companyTooLong: string;  // "… {max} …"
    emailRequired: string;
    emailInvalid: string;
    phoneTooLong: string;    // "… {max} …"
    messageRequired: string;
    messageTooShort: string; // "… {min} …"
    messageTooLong: string;  // "… {max} …"
  };
};

type Props = {
  labels: Labels;
  locale: string;
};

type Status = 'idle' | 'sending' | 'ok' | 'error';

type Fields = {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  website: string;
};

const MAX = {
  name: 120,
  company: 120,
  phone: 50,
  message: 5000
} as const;

const MIN = {
  message: 5
} as const;

function format(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? `{${key}}`));
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validate(values: Fields, labels: Labels) {
  const errors: Partial<Record<keyof Fields, string>> = {};

  const name = values.name.trim();
  const company = values.company.trim();
  const email = values.email.trim();
  const phone = values.phone.trim();
  const message = values.message.trim();

  if (!name) errors.name = labels.validation.nameRequired;
  else if (name.length > MAX.name) {
    errors.name = format(labels.validation.nameTooLong, { max: MAX.name });
  }

  if (company && company.length > MAX.company) {
    errors.company = format(labels.validation.companyTooLong, { max: MAX.company });
  }

  if (!email) errors.email = labels.validation.emailRequired;
  else if (!isEmail(email)) errors.email = labels.validation.emailInvalid;

  if (phone && phone.length > MAX.phone) {
    errors.phone = format(labels.validation.phoneTooLong, { max: MAX.phone });
  }

  if (!message) errors.message = labels.validation.messageRequired;
  else if (message.length < MIN.message) {
    errors.message = format(labels.validation.messageTooShort, { min: MIN.message });
  } else if (message.length > MAX.message) {
    errors.message = format(labels.validation.messageTooLong, { max: MAX.message });
  }

  return errors;
}

function assertLabels(labels: any): asserts labels is Labels {
  if (!labels?.validation || !labels?.helper) {
    throw new Error('ContactForm: labels.validation or labels.helper missing. Check i18n keys.');
  }
}

export default function ContactForm({ labels, locale }: Props) {
  const [status, setStatus] = React.useState<Status>('idle');
  const [submitAttempted, setSubmitAttempted] = React.useState(false);

  const [values, setValues] = React.useState<Fields>({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
    website: ''
  });

  const [touched, setTouched] = React.useState<Partial<Record<keyof Fields, boolean>>>({});

  assertLabels(labels);

  const errors = React.useMemo(() => validate(values, labels), [values, labels]);
  const hasErrors = Object.keys(errors).length > 0;

  function setField<K extends keyof Fields>(key: K, val: string) {
    setValues((v) => ({ ...v, [key]: val }));
    if (status === 'ok' || status === 'error') setStatus('idle');
  }

  function onBlur<K extends keyof Fields>(key: K) {
    setTouched((t) => ({ ...t, [key]: true }));
  }

  const shouldShow = (k: keyof Fields) => Boolean((submitAttempted || touched[k]) && errors[k]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitAttempted(true);

    // ukázat chyby i když user nic "neblurnul"
    setTouched((t) => ({ ...t, name: true, email: true, message: true }));

    if (Object.keys(validate(values, labels)).length > 0) return;

    setStatus('sending');

    const payload = {
      name: values.name.trim(),
      company: values.company.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      message: values.message.trim(),
      website: values.website.trim(), // honeypot
      locale
    };

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) setStatus('ok');
    else setStatus('error');
  }

  const messageHint = format(labels.helper.messageHint, {
    min: MIN.message,
    current: values.message.trim().length,
    max: MAX.message
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {/* honeypot (hidden) */}
      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
        value={values.website}
        onChange={(e) => setField('website', e.target.value)}
      />

      <div className="space-y-1">
        <Input
          name="name"
          placeholder={labels.name}
          required
          maxLength={MAX.name}
          value={values.name}
          onChange={(e) => setField('name', e.target.value)}
          onBlur={() => onBlur('name')}
          aria-invalid={shouldShow('name')}
          className={shouldShow('name') ? 'border-red-500 focus-visible:ring-red-500' : undefined}
        />
        {shouldShow('name') && <p className="text-sm text-red-600">{errors.name}</p>}
      </div>

      <div className="space-y-1">
        <Input
          name="company"
          placeholder={labels.company}
          maxLength={MAX.company}
          value={values.company}
          onChange={(e) => setField('company', e.target.value)}
          onBlur={() => onBlur('company')}
          aria-invalid={shouldShow('company')}
          className={shouldShow('company') ? 'border-red-500 focus-visible:ring-red-500' : undefined}
        />
        {shouldShow('company') && <p className="text-sm text-red-600">{errors.company}</p>}
      </div>

      <div className="space-y-1">
        <Input
          name="email"
          placeholder={labels.email}
          type="email"
          required
          value={values.email}
          onChange={(e) => setField('email', e.target.value)}
          onBlur={() => onBlur('email')}
          aria-invalid={shouldShow('email')}
          className={shouldShow('email') ? 'border-red-500 focus-visible:ring-red-500' : undefined}
        />
        {shouldShow('email') && <p className="text-sm text-red-600">{errors.email}</p>}
      </div>

      <div className="space-y-1">
        <Input
          name="phone"
          placeholder={labels.phone}
          maxLength={MAX.phone}
          value={values.phone}
          onChange={(e) => setField('phone', e.target.value)}
          onBlur={() => onBlur('phone')}
          aria-invalid={shouldShow('phone')}
          className={shouldShow('phone') ? 'border-red-500 focus-visible:ring-red-500' : undefined}
        />
        {shouldShow('phone') && <p className="text-sm text-red-600">{errors.phone}</p>}
      </div>

      <div className="space-y-1">
        <Textarea
          name="message"
          placeholder={labels.message}
          required
          rows={6}
          maxLength={MAX.message}
          value={values.message}
          onChange={(e) => setField('message', e.target.value)}
          onBlur={() => onBlur('message')}
          aria-invalid={shouldShow('message')}
          className={shouldShow('message') ? 'border-red-500 focus-visible:ring-red-500' : undefined}
        />
        <div className="flex items-center justify-between">
          {shouldShow('message') ? (
            <p className="text-sm text-red-600">{errors.message}</p>
          ) : (
            <span className="text-sm text-muted-foreground">{messageHint}</span>
          )}
        </div>
      </div>

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
