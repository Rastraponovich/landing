import { useEffect, useRef, useState } from 'react';
import { SectionLayout } from '~/shared/ui';
import { cn } from '~/shared/lib/utils';

interface Project {
  num: string;
  title: string;
  desc: string;
  tech: string;
  link: string;
}

export function Projects() {
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

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={cn(
        'px-6 py-8 md:px-12 md:py-26 border-t border-border transition-all duration-600 ease-out',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'
      )}
    >
      <SectionLayout num="/04" label="ПРОЕКТЫ" className="container">
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {projects.map((project) => (
              <article
                className="group flex flex-col bg-bg p-6 min-h-auto md:min-h-[220px] relative overflow-hidden cursor-pointer transition-colors duration-300 hover:bg-bg-secondary"
                key={project.num}
              >
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] font-medium text-text-secondary tracking-wider">
                    {project.num}
                  </span>
                  <svg
                    className="text-text-secondary transition-all duration-300 group-hover:text-accent group-hover:translate-x-[2px] group-hover:translate-y-[-2px]"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M4 12L12 4M12 4H6M12 4V10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
                <h3 className="font-display text-[32px] font-normal tracking-[0.02em] leading-[1.1] mb-2 skew-x-[-4deg] origin-left">
                  {project.title}
                </h3>
                <p className="text-[11px] text-text-secondary mb-2 leading-[1.4]">
                  {project.desc}
                </p>
                <p className="text-[9px] text-text-secondary tracking-[0.03em] uppercase mb-auto leading-normal">
                  {project.tech}
                </p>
                <a
                  href={project.link}
                  className="flex items-center gap-2 text-[10px] font-medium tracking-[0.08em] text-accent mt-6 transition-all duration-300 group-hover:gap-3"
                >
                  <span>СМОТРЕТЬ ПРОЕКТ</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </SectionLayout>
    </section>
  );
}
