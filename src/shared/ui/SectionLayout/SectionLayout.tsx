import type { ReactNode } from 'react';
import { cn } from '~/shared/lib/utils';

export interface SectionLayoutProps {
  num: string;
  label: string;
  children: ReactNode;
  className?: string;
}

export function SectionLayout({
  num,
  label,
  children,
  className,
}: SectionLayoutProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 lg:grid-cols-[var(--spacing-section-label-width)_1fr] gap-6 lg:gap-section-gap',
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
