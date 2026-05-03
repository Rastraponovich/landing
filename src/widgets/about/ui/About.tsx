import { useEffect, useRef, useState } from 'react';
import { SectionLayout } from '~/shared/ui';
import { cn } from '~/shared/lib/utils';

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
      id="about"
      ref={sectionRef}
      className={cn(
        'px-6 py-12 md:px-12 md:py-26 border-t border-border transition-all duration-600 ease-out',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'
      )}
    >
      {children}
    </section>
  );
}

export function About() {
  return (
    <Wrapper>
      <SectionLayout num="/02" label="ОБО МНЕ">
        <div className="grid lg:grid-cols-[150px_1fr_180px] xl:grid-cols-[200px_1fr_200px] gap-8 items-start">
          <div className="flex flex-col w-fit max-md:pb-4 border-b border-text-secondary/50 md:border-none">
            <h2 className="font-display text-5xl xl:text-[72px] font-normal leading-[0.9] tracking-[0.02em]">
              <span className="block -skew-x-8 origin-left">ОБО</span>
              <span className="block -skew-x-8 origin-left">МНЕ</span>
            </h2>
          </div>

          <div className="flex flex-col md:text-lg text-[15px] gap-4 pt-4 md:pt-2 md:border-l border-border md:pl-6 h-full">
            <p className="leading-relaxed md:leading-normal text-text-secondary max-w-[480px]">
              Я — фронтенд-разработчик, который создаёт функциональные, быстрые
              и эстетичные интерфейсы. Люблю{' '}
              <strong className="text-accent font-bold">сложные задачи</strong>,
              внимание к деталям и{' '}
              <strong className="text-accent font-bold">чистый код</strong>.
            </p>
            <p className="leading-relaxed md:leading-normal text-text-secondary max-w-[480px]">
              Постоянно изучаю новое и стремлюсь делать веб лучше.
            </p>
          </div>

          <Statistics />
        </div>
      </SectionLayout>
    </Wrapper>
  );
}

const STATISTICS = [
  { value: '3+', label: 'года опыта' },
  { value: '20+', label: 'проектов' },
  { value: '100%', label: 'отдача процессу' },
];

function Statistics() {
  return (
    <div className="max-md:grid grid-cols-2 md:flex  md:flex-col gap-8">
      {STATISTICS.map((stat, index) => (
        <StatisticsItem
          key={stat.label}
          value={stat.value}
          label={stat.label}
          className={cn(index === 2 && 'max-md:col-span-full')}
        />
      ))}
    </div>
  );
}

function StatisticsItem({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <span className=" font-display text-4xl md:text-6xl font-extrabold text-text leading-none tracking-[0.02em]">
        {value}
      </span>
      <span className="text-[10px] text-text-secondary/50 tracking-[0.2em] uppercase">
        {label}
      </span>
    </div>
  );
}
