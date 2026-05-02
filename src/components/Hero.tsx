import { useEffect, useRef, useState } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';
import './Hero.css';

export function Hero() {
  const titleRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);
  const [showCode, setShowCode] = useState(false);
  const [showLine, setShowLine] = useState(false);
  
  const { displayText: line1, isComplete: line1Complete } = useTypewriter('СОЗДАЮ', 80, 300);
  const { displayText: line2, isComplete: line2Complete } = useTypewriter('ЦИФРОВЫЕ', 80, line1Complete ? 200 : 1000);
  const { displayText: line3, isComplete: line3Complete } = useTypewriter('ВПЕЧАТЛЕНИЯ', 80, line2Complete ? 200 : 2000);

  useEffect(() => {
    if (line3Complete) {
      const lineTimeout = setTimeout(() => setShowLine(true), 100);
      const codeTimeout = setTimeout(() => setShowCode(true), 600);
      return () => {
        clearTimeout(lineTimeout);
        clearTimeout(codeTimeout);
      };
    }
  }, [line3Complete]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      
      if (titleRef.current && scrolled < window.innerHeight) {
        titleRef.current.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
      
      if (codeRef.current && scrolled < window.innerHeight) {
        codeRef.current.style.transform = `translateY(${scrolled * 0.15}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const codeString = `const developer = {
  name: 'Алексей',
  role: 'Frontend Developer',
  focus: ['UI', 'UX', 'Performance'],
  code: 'Чистый. Семантичный. Эффективный.',
  build: 'Современные веб-приложения',
};

function createExperience() {
  return 'Пользовательский опыт, ' +
         'который запоминается';
}

// > запуск...`;

  return (
    <section className="hero">
      <div className="hero__main" ref={titleRef}>
        <div className="hero__title-wrapper">
          <svg className={`hero__red-line-svg ${showLine ? 'hero__red-line-svg--visible' : ''}`} viewBox="0 0 1200 16" preserveAspectRatio="none">
            <polygon points="0,0 700,2 1100,6 1180,7 1200,8 1180,9 1100,10 700,14 0,16" fill="var(--color-accent)" />
          </svg>
          <h1 className="hero__title">
            <span className="hero__line">{line1}</span>
            <span className="hero__line hero__line--accent">{line2}</span>
            <span className="hero__line">{line3}</span>
            <span className="hero__cursor">_</span>
          </h1>
        </div>
        <div className="hero__bottom">
          <div className="hero__info">
            <p className="hero__name">АЛЕКСЕЙ К.</p>
            <p className="hero__position">FRONTEND DEVELOPER</p>
          </div>
          <a href="#about" className="hero__scroll">
            <span>SCROLL</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1V11M6 11L1 6M6 11L11 6" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </a>
        </div>
      </div>
      <div 
        className={`hero__code ${showCode ? 'hero__code--visible' : ''}`} 
        ref={codeRef}
      >
        <pre className="hero__code-block">
          <code dangerouslySetInnerHTML={{ __html: formatCode(codeString) }} />
        </pre>
      </div>
    </section>
  );
}

function formatCode(code: string): string {
  return code
    .split('\n')
    .map((line, i) => {
      const num = String(i + 1).padStart(2, '0');
      let formatted = line
        .replace(/const|function|return/g, '<span class="code__keyword">$&</span>')
        .replace(/developer|createExperience/g, '<span class="code__func">$&</span>')
        .replace(/'[^']*'/g, '<span class="code__string">$&</span>')
        .replace(/\/\/ .*/, '<span class="code__comment">$&</span>');
      return `<span class="code__line-num">${num}</span> ${formatted}`;
    })
    .join('\n');
}
