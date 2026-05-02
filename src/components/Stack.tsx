import { useEffect, useRef, useState } from 'react';
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
      <div className="stack__layout">
        <div className="section-labels">
          <span className="section-num">/03</span>
          <span className="section-name">ТЕХНОЛОГИИ</span>
        </div>
        <div className="stack__content">
          <div className="stack__main">
            {mainStack.map((tech, index) => (
              <div key={tech.name} className="stack__item-wrapper">
                <span 
                  className="stack__item" 
                  style={{ color: tech.accent ? 'var(--color-accent)' : 'var(--color-text)' }}
                >
                  {tech.name}
                </span>
                {index < mainStack.length - 1 && <span className="stack__divider">/</span>}
              </div>
            ))}
          </div>
          <div className="stack__secondary">
            {secondaryStack.map((tech, index) => (
              <div key={tech} className="stack__secondary-item">
                <span className="stack__secondary-name">{tech}</span>
                {index < secondaryStack.length - 1 && <span className="stack__secondary-divider">/</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
