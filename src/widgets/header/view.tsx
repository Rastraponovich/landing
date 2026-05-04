import { useEffect, useState } from 'react';
import { cn } from '~/shared/lib/utils';

const LINKS = [
  { href: '#about', label: 'ОБО МНЕ' },
  { href: '#stack', label: 'СТЕК' },
  { href: '#projects', label: 'ПРОЕКТЫ' },
  { href: '#contact', label: 'КОНТАКТЫ' },
];

export function Header() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'stack', 'projects', 'contact'];
      let current = '';

      for (const id of sections) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed  group top-0 left-0 right-0 py-4 px-6 z-100 transition-all duration-300 ease-out',
        'header backdrop-blur-md outline-none lg:py-6 md:px-12 md:py-5'
      )}
    >
      <div className="flex justify-between items-center container">
        <DecorationTitle />

        <nav className="hidden md:flex gap-6 lg:gap-12">
          {LINKS.map((link) => {
            const isActive = activeSection === link.href.slice(1);

            return (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  'relative text-xs font-medium lg:tracking-[0.2em] transition-colors duration-300',
                  isActive
                    ? 'text-text'
                    : 'text-text-secondary hover:text-accent',
                  'after:content-[""] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-accent after:transition-all after:duration-300',
                  isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full',
                  'focus:outline-none focus-visible:text-accent'
                )}
              >
                {link.label}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

function DecorationTitle() {
  return (
    <div className=" flex flex-col h-4 overflow-hidden leading-4 ">
      <div className="flex flex-col transition-transform duration-500 ease-in-out group-hover:-translate-y-1/2">
        {/* <!-- Состояние 1: Стандартное --> */}
        <div className="flex items-baseline gap-4 opacity-40 font-medium">
          <span className="text-[11px] text-text tracking-wider">/01</span>
          <p className="text-[10px] font-display text-text-secondary tracking-[0.3em]">
            FRONTEND DEVELOPER
          </p>
        </div>

        <div className="flex items-baseline gap-4 text-accent font-medium">
          <span className="text-[11px] tracking-wider opacity-70">
            /AVAILABLE
          </span>
          <span className="text-[10px] tracking-[0.3em]">FOR WORK</span>
        </div>
      </div>
    </div>
  );
}
