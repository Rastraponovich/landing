import { useEffect, useRef, useState } from 'react';
import { cn } from '~/shared/lib/utils';

interface SectionScrollWrapperProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export function SectionScrollWrapper(props: SectionScrollWrapperProps) {
  const { id, className, children } = props;

  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={cn(
        'px-6 py-12 md:px-12 md:py-16 lg:py-26 border-t border-border transition-all duration-600 ease-out',
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-[30px]',
        className
      )}
    >
      {children}
    </section>
  );
}
