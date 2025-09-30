import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { SelectProps } from '@/types';

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      id,
      name,
      label,
      options,
      value,
      onChange,
      onBlur,
      error,
      required = false,
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const hasError = !!error;
    const errorId = hasError ? `${id}-error` : undefined;

    return (
      <div className="space-y-2">
        <label
          htmlFor={id}
          className="block text-sm font-medium text-text-primary"
        >
          {label}
          {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
        </label>

        <div className="relative">
          <select
            ref={ref}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            required={required}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={errorId}
            className={cn(
              'block w-full px-3 py-2 border rounded-md shadow-sm appearance-none bg-white',
              'focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors duration-200 pr-10',
              disabled && 'opacity-50 cursor-not-allowed',
              hasError
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-primary focus:ring-primary',
              className
            )}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <ChevronDown
              className="h-4 w-4 text-gray-400"
              aria-hidden="true"
            />
          </div>
        </div>

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

Select.displayName = 'Select';