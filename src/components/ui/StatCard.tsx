import { ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface StatCardProps {
  icon?: ReactNode;
  value: ReactNode;
  label: string;
  gradient?: 'blue' | 'green' | 'purple' | 'orange';
  className?: string;
  subtle?: boolean;
}

const gradientMap = {
  blue: 'from-primary-500 to-primary-600',
  green: 'from-green-500 to-green-600',
  purple: 'from-purple-500 to-purple-600',
  orange: 'from-orange-500 to-orange-600'
};

export function StatCard({ icon, value, label, gradient = 'blue', className, subtle }: StatCardProps) {
  if (subtle) {
    return (
      <div className={cn('card p-5', className)}>
        {icon && <div className="mb-3 text-primary-500">{icon}</div>}
        <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-1">{value}</div>
        <div className="text-[13px] font-medium text-gray-500 dark:text-gray-400 tracking-wide uppercase">{label}</div>
      </div>
    );
  }
  return (
    <div className={cn('rounded-apple-lg shadow-apple-lg p-6 text-white bg-gradient-to-br', gradientMap[gradient], className)}>
      {icon && <div className="mb-3 opacity-90">{icon}</div>}
      <div className="text-3xl font-semibold mb-1 leading-none">{value}</div>
      <div className="text-[13px] text-white/80 font-medium">{label}</div>
    </div>
  );
}

