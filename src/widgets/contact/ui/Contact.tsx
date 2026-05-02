import { useEffect, useRef, useState } from 'react';
import { SectionLayout } from '~/shared/ui';
import { cn } from '~/shared/lib/utils';

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
      className={cn(
        'px-6 py-8 pb-12 md:px-12 md:py-12 md:pb-16 border-y border-border transition-all duration-600 ease-out',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'
      )}
    >
      <SectionLayout num="/05" label="КОНТАКТЫ">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 lg:gap-16">
          <div className="relative">
            <h2 className="font-display text-[clamp(32px,4vw,56px)] font-bold not-italic leading-[1.1] tracking-[0.02em]">
              <span className="block">ДАВАЙТЕ СОЗДАВАТЬ</span>
              <span className="block text-accent">КРУТОЕ</span>
            </h2>
            <div className="hidden lg:flex items-center gap-0 mt-3 w-[80%]" aria-hidden>
              <span className="flex-1 min-w-0 h-1 bg-accent" />
              <svg
                className="shrink-0 text-accent block -ml-[1px]"
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
          <div className="flex flex-col justify-start pt-2">
            <p className="text-sm text-text-secondary mb-6">
              Открыт к интересным проектам и сотрудничеству
            </p>
            <a
              href="mailto:hello@aleksey.dev"
              className="inline-flex items-center justify-center md:justify-start gap-3 bg-accent text-text px-7 py-3.5 text-xs font-semibold tracking-[0.05em] mb-8 transition-all duration-300 w-full md:w-fit hover:bg-accent-hover hover:gap-4"
            >
              <span>НАПИСАТЬ МНЕ</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 15L15 5M15 5H7M15 5V13" stroke="currentColor" strokeWidth="2" />
              </svg>
            </a>
            <div className="flex flex-col gap-3">
              {links.map((link) => (
                <div className="flex flex-col gap-[2px]" key={link.label}>
                  <span className="text-[10px] font-medium tracking-[0.1em] text-text-secondary">
                    {link.label}
                  </span>
                  <a
                    href={link.href}
                    className="text-sm text-text transition-colors duration-300 hover:text-accent"
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
