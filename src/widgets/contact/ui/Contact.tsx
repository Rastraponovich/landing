import { useEffect, useRef, useState } from 'react';
import { SectionLayout } from '../../../shared/ui';
import './Contact.css';

export function Contact() {
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

  const links = [
    { label: 'EMAIL', value: 'hello@aleksey.dev', href: 'mailto:hello@aleksey.dev' },
    { label: 'TELEGRAM', value: '@aleksey_dev', href: 'https://t.me/aleksey_dev' },
    { label: 'GITHUB', value: 'github.com/aleksey-dev', href: 'https://github.com/aleksey-dev' },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`contact ${isVisible ? 'contact--visible' : ''}`}
    >
      <SectionLayout num="/05" label="КОНТАКТЫ">
        <div className="contact__content">
          <div className="contact__left">
            <h2 className="contact__title">
              <span className="contact__title-row">ДАВАЙТЕ СОЗДАВАТЬ</span>
              <span className="contact__title-row contact__title-row--accent">КРУТОЕ</span>
            </h2>
            <div className="contact__red-line" aria-hidden>
              <span className="contact__red-line-track" />
              <svg
                className="contact__red-line-arrow"
                width="28"
                height="12"
                viewBox="0 0 28 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 6h20M20 6l-4-4M20 6l-4 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="contact__right">
            <p className="contact__text">Открыт к интересным проектам и сотрудничеству</p>
            <a href="mailto:hello@aleksey.dev" className="contact__cta">
              <span>НАПИСАТЬ МНЕ</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 15L15 5M15 5H7M15 5V13" stroke="currentColor" strokeWidth="2" />
              </svg>
            </a>
            <div className="contact__links">
              {links.map((link) => (
                <div className="contact__link" key={link.label}>
                  <span className="contact__link-label">{link.label}</span>
                  <a
                    href={link.href}
                    className="contact__link-value"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.value}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionLayout>
    </section>
  );
}
