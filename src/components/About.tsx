import { useEffect, useRef, useState } from 'react';
import './About.css';

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
      className={`about ${isVisible ? 'about--visible' : ''}`}
    >
      <div className="about__layout">
        <div className="section-labels">
          <span className="section-num">/02</span>
          <span className="section-name">ОБО МНЕ</span>
        </div>
        <div className="about__content">
          <div className="about__left">
            <h2 className="about__title">
              <span className="about__title-line">ОБО</span>
              <span className="about__title-line">МНЕ</span>
            </h2>
          </div>
          <div className="about__center">
            <p className="about__text">
              Я — фронтенд-разработчик, который создаёт функциональные, быстрые 
              и эстетичные интерфейсы. Люблю сложные задачи, внимание 
              к деталям и чистый код.
            </p>
            <p className="about__text">
              Постоянно изучаю новое и стремлюсь делать веб лучше.
            </p>
          </div>
          <div className="about__right">
            <div className="about__stat">
              <span className="about__stat-num">3+</span>
              <span className="about__stat-label">года опыта</span>
            </div>
            <div className="about__stat">
              <span className="about__stat-num">20+</span>
              <span className="about__stat-label">проектов</span>
            </div>
            <div className="about__stat">
              <span className="about__stat-num">100%</span>
              <span className="about__stat-label">отдача процессу</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
