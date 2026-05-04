import { Fragment } from 'react';
import { SectionLayout, SectionScrollWrapper } from '~/shared/ui';
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

export function Stack() {
  return (
    <SectionScrollWrapper id="stack">
      <SectionLayout
        num="/03"
        label="ТЕХНОЛОГИИ"
        className="container max-md:gap-y-20"
      >
        <Marquee />
      </SectionLayout>
    </SectionScrollWrapper>
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
