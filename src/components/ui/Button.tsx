import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import type { ButtonProps } from '@/types';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-white hover:bg-primary-dark focus-visible:ring-primary',
        secondary: 'bg-secondary text-white hover:bg-secondary-dark focus-visible:ring-secondary',
        outline: 'border border-primary text-primary hover:bg-primary hover:text-white focus-visible:ring-primary',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-base',
        lg: 'h-12 px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export function Button({
  variant,
  size,
  className,
  children,
  type = 'button',
  disabled = false,
  onClick,
  'aria-label': ariaLabel,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </button>
  );
}