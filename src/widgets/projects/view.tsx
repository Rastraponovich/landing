import { SectionLayout, SectionScrollWrapper } from '~/shared/ui';
import { cn } from '~/shared/lib/utils';

interface Project {
  num: string;
  title: string;
  desc: string;
  tech: string;
  link: string;
}

const projects: Project[] = [
  {
    num: '01',
    title: 'MOTION',
    desc: 'Лендинговая страница',
    tech: 'GSAP / SCROLL TRIGGER / RESPONSIVE',
    link: '#',
  },
  {
    num: '02',
    title: 'MARQUEE',
    desc: 'Интерактивное веб-приложение',
    tech: 'NEXT.JS / STRAPI / ANIMATIONS',
    link: '#',
  },
  {
    num: '03',
    title: 'DASHBOARD',
    desc: 'Админ-панель',
    tech: 'REACT / CHARTS / API',
    link: '#',
  },
  {
    num: '04',
    title: 'E-COMMERCE',
    desc: 'Интернет-магазин',
    tech: 'NEXT.JS / TAILWIND / STRIPE',
    link: '#',
  },
];

export function Projects() {
  return (
    <SectionScrollWrapper id="projects">
      <SectionLayout num="/04" label="ПРОЕКТЫ" className="container">
        <div>
          <div className="grid max-md:gap-y-6 md:grid-cols-2 lg:grid-cols-4">
            {projects.map((project) => (
              <article
                key={project.num}
                className={cn(
                  'lg:border-l border-white/10 md:even:mt-20 md:max-lg:even:border-l lg:first:border-none group flex flex-col bg-bg p-6 min-h-auto md:min-h-[220px] relative overflow-hidden cursor-pointer transition-colors duration-300 '
                )}
              >
                <span className="text-[200px] top-0 right-0 opacity-10 font-medium absolute text-text-secondary -tracking-widest group-hover:text-accent transition-colors duration-300">
                  {project.num}
                </span>
                <div className="flex flex-col z-10">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-accent font-mono text-[9px] tracking-[0.2em]">
                      / PROJECT_MODULE
                    </span>
                    <svg
                      className="text-text-secondary transition-all duration-300 group-hover:text-accent group-hover:translate-x-[2px] group-hover:translate-y-[-2px]"
                      width="16"
                      height="16"
                      fill="none"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M4 12L12 4M12 4H6M12 4V10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>

                  <h3 className="font-display text-[32px] font-black tracking-[0.02em] leading-[1.1] mb-2 -skew-x-8 origin-left">
                    {project.title}
                  </h3>

                  <p className="text-[11px] text-text-secondary mb-2 leading-[1.4]">
                    {project.desc}
                  </p>

                  <p className="text-[10px] text-text-secondary tracking-[0.2em] uppercase mb-auto leading-normal">
                    {project.tech}
                  </p>
                  <a
                    href={project.link}
                    className="flex items-center text-[10px] font-medium tracking-[0.08em] text-text-secondary/50  group-hover:text-accent mt-10 md:mt-6 transition-all duration-300 group-hover:gap-3"
                  >
                    <span>СМОТРЕТЬ ПРОЕКТ</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </SectionLayout>
    </SectionScrollWrapper>
  );
}
