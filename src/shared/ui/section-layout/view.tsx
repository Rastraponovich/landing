import type { ReactNode } from 'react';
import { cn } from '~/shared/lib/utils';

export interface SectionLayoutProps {
  num: string;
  label: string;
  children: ReactNode;
  className?: string;
}

export function SectionLayout(props: SectionLayoutProps) {
  const { num, label, children, className } = props;

  return (
    <div
      className={cn(
        'grid lg:grid-cols-[--spacing(30)_1fr] gap-6 lg:gap-8',
        className
      )}
    >
      <div className="flex flex-col gap-1">
        <span className="text-[11px] font-medium text-text tracking-wider">
          {num}
        </span>

        <span className="text-[10px] font-medium text-text-secondary tracking-[0.15em]">
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}
