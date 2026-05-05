'use client';

import { useId, useState } from 'react';
import { Button } from 'src/components/ui/Button/Button';
import { FormField } from 'src/components/form/FormField/FormField';
import { Icon } from 'src/components/ui/Icon/Icon';
import {
  quoteSchema,
  type QuoteFormValues,
} from 'src/components/form/quoteSchema';
import styles from './QuoteForm.module.css';

type FieldErrors = Partial<Record<keyof QuoteFormValues, string>>;
type Status = 'idle' | 'submitting' | 'success' | 'error';

const EMPTY: QuoteFormValues = {
  name: '',
  phone: '',
  email: '',
  address: '',
  request: '',
  hp_url: '',
};

type QuoteFormProps = {
  variant?: 'card' | 'plain';
  heading?: string;
  description?: string;
};

export function QuoteForm({
  variant = 'card',
  heading = 'Request a Quote',
  description = 'Tell us a little about your project — we usually get back within one business day.',
}: QuoteFormProps) {
  const formId = useId();
  const [values, setValues] = useState<QuoteFormValues>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  function update<K extends keyof QuoteFormValues>(key: K, value: QuoteFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) {
      setErrors((e) => {
        const next = { ...e };
        delete next[key];
        return next;
      });
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'submitting') return;

    const parsed = quoteSchema.safeParse(values);
    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof QuoteFormValues | undefined;
        if (key && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      setStatus('error');
      setStatusMessage('Please fix the highlighted fields and try again.');
      return;
    }

    setStatus('submitting');
    setStatusMessage('Sending your request…');

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        simulated?: boolean;
      };

      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? 'Something went wrong sending your request.');
      }

      setStatus('success');
      setStatusMessage(
        data.simulated
          ? "Thanks! Your message was received (email delivery isn't configured yet)."
          : "Thanks! We've received your request and will be in touch shortly.",
      );
      setValues(EMPTY);
    } catch (err) {
      setStatus('error');
      setStatusMessage(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again or call us directly.',
      );
    }
  }

  const isCard = variant === 'card';

  return (
    <section className={isCard ? styles.card : styles.plain} aria-labelledby={`${formId}-heading`}>
      <header className={styles.head}>
        <h2 id={`${formId}-heading`} className={styles.heading}>
          {heading}
        </h2>
        {description && <p className={styles.description}>{description}</p>}
      </header>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <FormField
          id={`${formId}-name`}
          label="Name"
          required
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={(e) => update('name', e.currentTarget.value)}
          error={errors.name}
        />
        <FormField
          id={`${formId}-phone`}
          label="Phone"
          required
          name="phone"
          type="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={(e) => update('phone', e.currentTarget.value)}
          error={errors.phone}
        />
        <FormField
          id={`${formId}-email`}
          label="Email"
          required
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(e) => update('email', e.currentTarget.value)}
          error={errors.email}
        />
        <FormField
          id={`${formId}-address`}
          label="Address"
          name="address"
          autoComplete="street-address"
          hint="Optional — helps us estimate pickup or delivery."
          value={values.address ?? ''}
          onChange={(e) => update('address', e.currentTarget.value)}
          error={errors.address}
        />
        <FormField
          id={`${formId}-request`}
          label="What can we help with?"
          name="request"
          multiline
          rows={5}
          hint="Optional. Describe the damage or project — make/model if you'd like."
          value={values.request ?? ''}
          onChange={(e) => update('request', e.currentTarget.value)}
          error={errors.request}
        />

        <div className={styles.honeypot} aria-hidden>
          <label htmlFor={`${formId}-hp`}>Leave this field blank</label>
          <input
            id={`${formId}-hp`}
            type="text"
            name="hp_url"
            tabIndex={-1}
            autoComplete="off"
            value={values.hp_url ?? ''}
            onChange={(e) => update('hp_url', e.currentTarget.value)}
          />
        </div>

        <div className={styles.actions}>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={status === 'submitting'}
          >
            {status === 'submitting' ? 'Sending…' : 'Submit Request'}
          </Button>
          <p className={styles.privacyHint}>
            By submitting, you agree to our{' '}
            <a className={styles.link} href="/privacy-policy">
              Privacy Policy
            </a>
            .
          </p>
        </div>

        <div
          role="status"
          aria-live="polite"
          className={
            status === 'success'
              ? styles.statusSuccess
              : status === 'error'
                ? styles.statusError
                : styles.statusHidden
          }
        >
          {status !== 'idle' && status !== 'submitting' && statusMessage && (
            <span className={styles.statusInner}>
              <Icon name={status === 'success' ? 'check' : 'close'} size={18} />
              {statusMessage}
            </span>
          )}
        </div>
      </form>
    </section>
  );
}
