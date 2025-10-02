import { ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface PageContainerProps {
  children: ReactNode;
  width?: 'default' | 'narrow' | 'wide';
  className?: string;
}

const widthMap = {
  default: 'max-w-7xl',
  narrow: 'max-w-3xl',
  wide: 'max-w-[1600px]'
};

export function PageContainer({ children, width = 'default', className }: PageContainerProps) {
  return (
    <div className={cn('w-full mx-auto', widthMap[width], 'space-y-8', className)}>
      {children}
    </div>
  );
}
