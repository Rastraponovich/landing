import { useEffect, useState } from 'react';
import './Nav.css';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);

      // Update active section
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
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__left">
        <span className="nav__index">/01</span>
        <span className="nav__role">ФРОНТЕНД-РАЗРАБОТЧИК</span>
      </div>
      <div className="nav__links">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`nav__link ${activeSection === link.href.slice(1) ? 'nav__link--active' : ''}`}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
