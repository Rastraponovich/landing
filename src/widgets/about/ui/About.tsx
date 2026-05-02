import { useEffect, useRef, useState } from 'react';
import { SectionLayout } from '~/shared/ui';
import { cn } from '~/shared/lib/utils';

export function About() {
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
        'px-6 py-12 md:px-12 md:py-16 border-t border-border transition-all duration-600 ease-out',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'
      )}
    >
      <SectionLayout num="/02" label="ОБО МНЕ">
        <div className="grid grid-cols-1 lg:grid-cols-[150px_1fr_180px] xl:grid-cols-[200px_1fr_200px] gap-8 items-start">
          <div className="flex flex-col">
            <h2 className="font-display text-5xl xl:text-[72px] font-normal leading-[0.9] tracking-[0.02em]">
              <span className="block -skew-x-[4deg] origin-left">ОБО</span>
              <span className="block -skew-x-[4deg] origin-left">МНЕ</span>
            </h2>
          </div>
          <div className="flex flex-col gap-4 pt-2">
            <p className="text-[15px] leading-relaxed text-text-secondary max-w-[480px]">
              Я — фронтенд-разработчик, который создаёт функциональные, быстрые
              и эстетичные интерфейсы. Люблю сложные задачи, внимание
              к деталям и чистый код.
            </p>
            <p className="text-[15px] leading-relaxed text-text-secondary max-w-[480px]">
              Постоянно изучаю новое и стремлюсь делать веб лучше.
            </p>
          </div>
          <div className="flex flex-row md:flex-col gap-8 md:gap-5">
            <div className="flex flex-col gap-1">
              <span className="text-[32px] font-extrabold text-text leading-none">3+</span>
              <span className="text-[10px] text-text-secondary tracking-[0.08em] uppercase">года опыта</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[32px] font-extrabold text-text leading-none">20+</span>
              <span className="text-[10px] text-text-secondary tracking-[0.08em] uppercase">проектов</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[32px] font-extrabold text-text leading-none">100%</span>
              <span className="text-[10px] text-text-secondary tracking-[0.08em] uppercase">отдача процессу</span>
            </div>
          </div>
        </div>
      </SectionLayout>
    </section>
  );
}
