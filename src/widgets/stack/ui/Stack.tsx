import { Fragment, useEffect, useRef, useState } from 'react';
import { SectionLayout } from '../../../shared/ui';
import './Stack.css';

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
      className={`stack ${isVisible ? 'stack--visible' : ''}`}
    >
      <SectionLayout num="/03" label="ТЕХНОЛОГИИ">
        <div className="stack__content">
          <div className="stack__row stack__row--main" role="list">
            {mainStack.map((tech, index) => (
              <Fragment key={tech.name}>
                <span
                  className="stack__item"
                  style={{ color: tech.accent ? 'var(--color-accent)' : 'var(--color-text)' }}
                  role="listitem"
                >
                  {tech.name}
                </span>
                {index < mainStack.length - 1 && (
                  <span className="stack__divider" aria-hidden>
                    /
                  </span>
                )}
              </Fragment>
            ))}
          </div>
          <div className="stack__row stack__row--secondary" role="list">
            {secondaryStack.map((tech, index) => (
              <Fragment key={tech}>
                <span className="stack__secondary-name" role="listitem">
                  {tech}
                </span>
                {index < secondaryStack.length - 1 && (
                  <span className="stack__secondary-divider" aria-hidden>
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
