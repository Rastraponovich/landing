import { Fragment, useEffect, useRef, useState } from 'react';
import { SectionLayout } from '~/shared/ui';
import { cn } from '~/shared/lib/utils';

export function Stack() {
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

  const mainStack = [
    { name: 'HTML', accent: true },
    { name: 'CSS', accent: false },
    { name: 'JS', accent: false },
    { name: 'TS', accent: true },
    { name: 'REACT', accent: false },
    { name: 'NEXT.JS', accent: false },
  ];

  const secondaryStack = ['SASS', 'TAILWIND CSS', 'VITE', 'PINIA', 'GSAP', 'FIGMA', 'GIT'];

  return (
    <section
      id="stack"
      ref={sectionRef}
      className={cn(
        'px-6 py-8 md:px-12 border-t border-border transition-all duration-600 ease-out',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'
      )}
    >
      <SectionLayout num="/03" label="ТЕХНОЛОГИИ">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-baseline gap-stack-gap" role="list">
            {mainStack.map((tech, index) => (
              <Fragment key={tech.name}>
                <span
                  className={cn(
                    'font-display text-[20px] md:text-[clamp(32px,5vw,72px)] font-normal tracking-[0.02em] leading-none whitespace-nowrap',
                    tech.accent ? 'text-accent' : 'text-text'
                  )}
                  role="listitem"
                >
                  {tech.name}
                </span>
                {index < mainStack.length - 1 && (
                  <span
                    className="font-display text-[20px] md:text-[clamp(32px,5vw,72px)] font-normal text-text leading-none"
                    aria-hidden
                  >
                    /
                  </span>
                )}
              </Fragment>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-stack-gap" role="list">
            {secondaryStack.map((tech, index) => (
              <Fragment key={tech}>
                <span className="text-[11px] md:text-[13px] font-medium text-text tracking-[0.02em] whitespace-nowrap" role="listitem">
                  {tech}
                </span>
                {index < secondaryStack.length - 1 && (
                  <span className="text-[11px] md:text-[13px] text-text" aria-hidden>
                    /
                  </span>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </SectionLayout>
    </section>
  );
}
