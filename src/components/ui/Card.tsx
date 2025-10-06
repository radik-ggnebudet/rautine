import type { ReactNode, HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: CardPadding;
  hover?: boolean;
}

const paddingMap: Record<CardPadding, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-5',
  lg: 'p-6'
};

export function Card({ children, padding = 'none', hover = false, className, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        'card',
        paddingMap[padding],
        hover && 'card-hover',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
