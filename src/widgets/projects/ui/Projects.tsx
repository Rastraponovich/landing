import { useEffect, useRef, useState } from 'react';
import { SectionLayout } from '~/shared/ui';
import './Projects.css';

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
      className={`projects ${isVisible ? 'projects--visible' : ''}`}
    >
      <SectionLayout num="/04" label="ПРОЕКТЫ">
        <div className="projects__content">
          <div className="projects__grid">
            {projects.map((project) => (
              <article className="project-card" key={project.num}>
                <div className="project-card__top">
                  <span className="project-card__num">{project.num}</span>
                  <svg className="project-card__arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__desc">{project.desc}</p>
                <p className="project-card__tech">{project.tech}</p>
                <a href={project.link} className="project-card__link">
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
