import type { ReactNode } from 'react';
import './SectionLayout.css';

export interface SectionLayoutProps {
  num: string;
  label: string;
  children: ReactNode;
  className?: string;
}

export function SectionLayout({ num, label, children, className }: SectionLayoutProps) {
  return (
    <div className={['section-layout', className].filter(Boolean).join(' ')}>
      <div className="section-labels">
        <span className="section-num">{num}</span>
        <span className="section-name">{label}</span>
      </div>
      {children}
    </div>
  );
}
