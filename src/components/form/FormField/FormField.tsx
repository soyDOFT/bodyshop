import styles from './FormField.module.css';

// helpers
import clsx from 'clsx';

type CommonProps = {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
};

type InputFieldProps = CommonProps & {
  multiline?: false;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id'>;

type TextareaFieldProps = CommonProps & {
  multiline: true;
  rows?: number;
} & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'>;

type FormFieldProps = InputFieldProps | TextareaFieldProps;

/** Render a labelled input or textarea, wiring up its hint and error text. */
export function FormField({
  id,
  label,
  required,
  error,
  hint,
  className,
  multiline,
  ...rest
}: FormFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={clsx(styles.field, className)}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required ? (
          <span className={styles.requiredMark} aria-hidden>
            *
          </span>
        ) : null}
      </label>
      {multiline ? (
        <textarea
          id={id}
          rows={4}
          aria-required={required || undefined}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={describedBy}
          className={clsx(styles.input, styles.textarea, error && styles.inputError)}
          {...(rest as Omit<TextareaFieldProps, keyof CommonProps | 'multiline'>)}
        />
      ) : (
        <input
          id={id}
          aria-required={required || undefined}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={describedBy}
          className={clsx(styles.input, error && styles.inputError)}
          {...(rest as Omit<InputFieldProps, keyof CommonProps | 'multiline'>)}
        />
      )}
      {hint && !error ? (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
