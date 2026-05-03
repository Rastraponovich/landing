import { Fragment, useEffect, useRef, useState } from 'react';
import { SectionLayout } from '~/shared/ui';
import { cn } from '~/shared/lib/utils';

const mainStack = [
  { name: 'HTML', accent: true },
  { name: 'CSS', accent: false },
  { name: 'JS', accent: false },
  { name: 'TS', accent: true },
  { name: 'REACT', accent: false },
  { name: 'NEXT.JS', accent: false },
];

const secondaryStack = [
  'SASS',
  'TAILWIND CSS',
  'VITE',
  'PINIA',
  'GSAP',
  'FIGMA',
  'GIT',
];

function Wrapper({ children }: { children: React.ReactNode }) {
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
      id="stack"
      ref={sectionRef}
      className={cn(
        //container mx-auto - возможно нужно сделать везде
        'py-8 px-6 md:px-12 border-t border-border transition-all duration-600 ease-out ',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'
      )}
    >
      {children}
    </section>
  );
}

export function Stack() {
  return (
    <Wrapper>
      <SectionLayout num="/03" label="ТЕХНОЛОГИИ">
        <div className="flex flex-col gap-1">
          <div
            className="flex flex-wrap items-baseline gap-4 justify-between font-display text-[20px] md:text-[clamp(32px,5vw,72px)] font-normal "
            role="list"
          >
            {mainStack.map((tech, index) => (
              <Fragment key={tech.name}>
                <span
                  role="listitem"
                  className={cn(
                    'tracking-[0.02em] leading-none whitespace-nowrap',
                    tech.accent ? 'text-accent' : 'text-text'
                  )}
                >
                  {tech.name}
                </span>

                {index < mainStack.length - 1 && (
                  <span className=" text-text leading-none" aria-hidden>
                    /
                  </span>
                )}
              </Fragment>
            ))}
          </div>

          <div
            role="list"
            className="flex flex-wrap items-center gap-1 xl:gap-4 justify-between text-xs lg:text-base text-text "
          >
            {secondaryStack.map((tech, index) => (
              <Fragment key={tech}>
                <span
                  role="listitem"
                  className="tracking-wider xl:tracking-[0.5em] whitespace-nowrap"
                >
                  {tech}
                </span>

                {index < secondaryStack.length - 1 && (
                  <span className="-skew-x-16" aria-hidden>
                    /
                  </span>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </SectionLayout>
    </Wrapper>
  );
}
