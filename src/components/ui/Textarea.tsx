import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import type { TextareaProps } from '@/types';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      id,
      name,
      label,
      placeholder,
      required = false,
      disabled = false,
      error,
      value,
      onChange,
      onBlur,
      rows = 4,
      className,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const hasError = !!error;
    const errorId = hasError ? `${id}-error` : undefined;
    const describedBy = [ariaDescribedBy, errorId].filter(Boolean).join(' ');

    return (
      <div className="space-y-2">
        <label
          htmlFor={id}
          className="block text-sm font-medium text-text-primary"
        >
          {label}
          {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
        </label>

        <textarea
          ref={ref}
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          rows={rows}
          aria-invalid={hasError}
          aria-describedby={describedBy || undefined}
          className={cn(
            'block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 resize-vertical',
            'focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors duration-200',
            disabled && 'opacity-50 cursor-not-allowed',
            hasError
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-primary focus:ring-primary',
            className
          )}
          {...props}
        />

        {hasError && (
          <p
            id={errorId}
            className="text-sm text-red-600"
            role="alert"
            aria-live="polite"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';