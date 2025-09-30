import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import type { CardProps } from '@/types';

const cardVariants = cva(
  'rounded-lg bg-white transition-shadow duration-200',
  {
    variants: {
      variant: {
        default: 'border border-gray-100 shadow-sm hover:shadow-md',
        elevated: 'shadow-md hover:shadow-lg',
        outlined: 'border-2 border-gray-200 shadow-none hover:border-primary/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const cardContentVariants = cva('p-6');

export function Card({
  variant,
  className,
  children,
  ...props
}: CardProps & VariantProps<typeof cardVariants>) {
  return (
    <div
      className={cn(cardVariants({ variant }), className)}
      {...props}
    >
      <div className={cardContentVariants()}>
        {children}
      </div>
    </div>
  );
}

export function CardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex flex-col space-y-1.5 pb-4', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('text-lg font-semibold leading-none tracking-tight text-text-primary', className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('text-sm text-text-secondary', className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('pt-0', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex items-center pt-4', className)}
      {...props}
    >
      {children}
    </div>
  );
}