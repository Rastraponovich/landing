import { useEffect, useState } from 'react';
import { cn } from '~/shared/lib/utils';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);

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

  const navLinks = [
    { href: '#about', label: 'ОБО МНЕ' },
    { href: '#stack', label: 'СТЕК' },
    { href: '#projects', label: 'ПРОЕКТЫ' },
    { href: '#contact', label: 'КОНТАКТЫ' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 flex justify-between items-center px-6 md:px-12 py-4 md:py-5 z-[100] transition-all duration-300 ease-out',
        scrolled ? 'bg-bg/98' : 'bg-bg'
      )}
    >
      <div className="flex items-center gap-4">
        <span className="text-[11px] font-medium text-text tracking-[0.05em]">/01</span>
        <span className="text-[10px] font-medium text-text-secondary tracking-[0.15em]">
          ФРОНТЕНД-РАЗРАБОТЧИК
        </span>
      </div>
      <div className="hidden md:flex gap-10">
        {navLinks.map((link) => {
          const isActive = activeSection === link.href.slice(1);

          return (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                'relative text-[11px] font-medium tracking-[0.08em] transition-colors duration-300',
                isActive ? 'text-text' : 'text-text-secondary hover:text-text',
                'after:content-[""] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-accent after:transition-all after:duration-300',
                isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'
              )}
            >
              {link.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
