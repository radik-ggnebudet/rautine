import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'subtle';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
  block?: boolean;
}

const base = 'btn relative select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 disabled:cursor-not-allowed';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-primary-500 text-white hover:bg-primary-600',
  secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700',
  outline: 'border border-gray-300 dark:border-white/20 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800',
  ghost: 'bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100/70 dark:hover:bg-white/10',
  danger: 'bg-accent-red text-white hover:bg-red-600',
  subtle: 'bg-gray-50 text-gray-800 hover:bg-gray-100 dark:bg-gray-800/50 dark:hover:bg-gray-700 dark:text-gray-100'
};

const sizes: Record<ButtonSize, string> = {
  sm: 'text-[13px] px-3 py-1.5 rounded-apple-sm',
  md: 'text-[15px] px-4 py-2.5 rounded-apple',
  lg: 'text-[16px] px-5 py-3 rounded-apple-lg'
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', leftIcon, rightIcon, children, className, loading, disabled, block, ...rest }, ref
) {
  return (
    <button
      ref={ref}
      className={cn(
        base,
        variants[variant],
        sizes[size],
        block && 'w-full justify-center',
        loading && 'opacity-70 cursor-wait',
        'inline-flex items-center gap-2 font-medium transition-all active:scale-95',
        className
      )}
      disabled={disabled || loading}
      {...rest}
    >
      {leftIcon && <span className="shrink-0 flex items-center" aria-hidden>{leftIcon}</span>}
      <span className="inline-flex items-center">{children}</span>
      {rightIcon && <span className="shrink-0 flex items-center" aria-hidden>{rightIcon}</span>}
    </button>
  );
});

