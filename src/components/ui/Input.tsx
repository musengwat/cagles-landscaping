import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import type { InputProps } from '@/types';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      name,
      type = 'text',
      label,
      placeholder,
      required = false,
      disabled = false,
      error,
      value,
      onChange,
      onBlur,
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

        <input
          ref={ref}
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={hasError}
          aria-describedby={describedBy || undefined}
          className={cn(
            'block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400',
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

Input.displayName = 'Input';