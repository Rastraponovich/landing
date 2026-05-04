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

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={cn(
        'px-6 py-8 pb-12 md:px-12 md:py-26 border-y border-border transition-all duration-600 ease-out',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'
      )}
    >
      <SectionLayout num="/05" label="КОНТАКТЫ" className="container">
        <div className="grid lg:grid-cols-[auto_1fr_1fr] gap-8 items-start">
          <div className="relative">
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold not-italic leading-none tracking-[0.02em]">
              <span className="block">ДАВАЙТЕ </span>
              <span className="block space-x-[1ch]">
                <span>СОЗДАВАТЬ</span>
                <span className="text-accent">КРУТОЕ</span>
              </span>
            </h2>
            <div
              className="hidden lg:flex items-center gap-0 mt-1 w-full"
              aria-hidden
            >
              <span className="flex-1 min-w-0 h-0.5 bg-accent" />
              <svg
                className="shrink-0 text-accent block -ml-px"
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

          <div className="flex flex-col  justify-start">
            <div>
              <p className="text-pretty  text-white/70 mb-3">
                Открыт к интересным проектам и сотрудничеству
              </p>
              <a
                href="mailto:hello@aleksey.dev"
                className="inline-flex items-center justify-center md:justify-between gap-3 bg-accent text-text p-3 text-xs font-semibold tracking-wider transition-all duration-300 w-full  hover:bg-accent-hover hover:gap-4"
              >
                <span>НАПИСАТЬ МНЕ</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M5 15L15 5M15 5H7M15 5V13"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </a>
            </div>
          </div>
          <ContactLinks />
        </div>
      </SectionLayout>
    </section>
  );
}

const links = [
  {
    label: 'EMAIL',
    value: 'hello@aleksey.dev',
    href: 'mailto:hello@aleksey.dev',
  },
  {
    label: 'TELEGRAM',
    value: '@aleksey_dev',
    href: 'https://t.me/aleksey_dev',
  },
  {
    label: 'GITHUB',
    value: 'github.com/aleksey-dev',
    href: 'https://github.com/aleksey-dev',
  },
];
function ContactLinks() {
  return (
    <div className="flex flex-col gap-3 text-xs">
      {links.map((link) => (
        <div className="grid grid-cols-2 gap-px" key={link.label}>
          <span className=" font-medium tracking-widest text-text-secondary">
            {link.label}
          </span>

          <a
            target="_blank"
            href={link.href}
            rel="noopener noreferrer"
            className="whitespace-nowrap text-text transition-colors duration-300 hover:text-accent"
          >
            {link.value}
          </a>
        </div>
      ))}
    </div>
  );
}
