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
  'EFFECTOR',
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
        'py-26 px-6 md:px-12 border-t border-border transition-all duration-600 ease-out',
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
      <SectionLayout
        num="/03"
        label="ТЕХНОЛОГИИ"
        className="container max-md:gap-y-20"
      >
        <Marquee />
      </SectionLayout>
    </Wrapper>
  );
}

function Marquee() {
  return (
    <div className="flex flex-col gap-16 md:gap-12 overflow-hidden ">
      {/* <!-- Ряд 1: Основной стек (Едет ВЛЕВО) --> */}
      <div className="relative flex mask-[linear-gradient(to_right,transparent_0%,black_5%,black_95%,transparent_100%)]">
        <div className="flex animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
          {[1, 2].map((item) => {
            return (
              <div
                key={item}
                aria-hidden={item === 2}
                className="flex items-center gap-12 px-6 font-display text-5xl md:text-8xl uppercase"
              >
                {mainStack.map((tech) => {
                  return (
                    <Fragment key={tech.name}>
                      <span className={cn(tech.accent && 'text-accent')}>
                        {tech.name}
                      </span>{' '}
                      <span className="opacity-10">/</span>
                    </Fragment>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* <!-- Ряд 2: Инструменты (Едет ВПРАВО) --> */}
      <div className="relative flex mask-[linear-gradient(to_right,transparent_0%,black_5%,black_95%,transparent_100%)] max-md:opacity-70">
        <div className="flex animate-marquee-reverse whitespace-nowrap hover:[animation-play-state:paused] font-display text-xs lg:text-base text-text-secondary ">
          {[1, 2].map((item) => {
            return (
              <div
                key={item}
                aria-hidden={item === 2}
                className="flex items-center gap-8 px-4 uppercase tracking-widest"
              >
                {secondaryStack.map((tech) => {
                  return (
                    <Fragment key={tech}>
                      <span className="tracking-wider xl:tracking-[0.5em]">
                        {tech}
                      </span>{' '}
                      <span className="-skew-x-16 text-text/20">/</span>
                    </Fragment>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
