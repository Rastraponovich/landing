import { SectionLayout, SectionScrollWrapper } from '~/shared/ui';
import { cn } from '~/shared/lib/utils';

export function About() {
  return (
    <SectionScrollWrapper id="about">
      <SectionLayout num="/02" label="ОБО МНЕ" className="container">
        {/* lg:grid-cols-[150px_1fr_180px]  */}
        <div className="grid md:grid-cols-[40%_1fr] xl:grid-cols-[auto_1fr_min-content] gap-8 gap-y-16 items-start">
          <div className="flex flex-col w-fit max-md:pb-4 border-b border-text-secondary/50 md:border-none">
            <h2 className="font-display text-5xl md:text-7xl font-normal leading-[0.9] tracking-[0.02em]">
              <span className="block -skew-x-8 origin-left">ОБО</span>
              <span className="block -skew-x-8 origin-left">МНЕ</span>
            </h2>
          </div>

          <div className="flex flex-col md:text-lg text-[15px] gap-4 md:border-l border-border md:pl-6 h-full">
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

          <hr className="md:max-xl:block hidden md:max-xl:col-span-full border-border" />

          <Statistics />
        </div>
      </SectionLayout>
    </SectionScrollWrapper>
  );
}

const STATISTICS = [
  { value: '3+', label: 'года опыта' },
  { value: '20+', label: 'проектов' },
  { value: '100%', label: 'отдача процессу' },
];

function Statistics() {
  return (
    <div
      className={cn(
        'max-md:grid grid-cols-2 gap-8 max-xl:col-span-full',
        'md:flex xl:flex-col md:max-xl:justify-between'
      )}
    >
      {STATISTICS.map((stat) => (
        <StatisticsItem
          key={stat.label}
          value={stat.value}
          label={stat.label}
          className="last:max-md:col-span-full"
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
