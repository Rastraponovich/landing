import { useEffect, useRef, useState } from 'react';
import { useTypewriter } from '~/shared/lib/hooks/useTypewriter';
import { cn } from '~/shared/lib/utils';

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
    <section className="min-h-[calc(100vh-60px)] grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 relative overflow-hidden bg-bg items-center pt-20 px-6 lg:pt-0 lg:px-0 pb-8 lg:pb-0">
      <div
        className="flex flex-col relative gap-8 lg:px-12 lg:py-15 justify-center will-change-transform"
        ref={titleRef}
      >
        <div className="relative">
          <svg
            className={cn(
              'absolute top-[45%] -left-12 w-[90%] h-4 -rotate-2 origin-left -z-10 pointer-events-none opacity-95 transition-all duration-600 ease-out',
              showLine ? 'clip-path-none' : '[clip-path:inset(0_100%_0_0)]'
            )}
            viewBox="0 0 1200 16"
            preserveAspectRatio="none"
          >
            <polygon points="0,0 700,2 1100,6 1180,7 1200,8 1180,9 1100,10 700,14 0,16" fill="var(--color-accent)" />
          </svg>
          <h1
            className="font-display text-[40px] md:text-[clamp(48px,8vw,120px)] font-normal leading-[0.9] tracking-[0.02em] relative z-10"
            style={{ textShadow: '2px 2px 0 var(--color-bg), 4px 4px 0 rgba(0,0,0,0.5)' }}
          >
            <span className="block -skew-x-[8deg] origin-left [text-shadow:inherit]">{line1}</span>
            <span className="block -skew-x-[8deg] origin-left [text-shadow:inherit] text-text">{line2}</span>
            <span className="block -skew-x-[8deg] origin-left [text-shadow:inherit]">{line3}</span>
            <span className="inline-block font-display text-[40px] md:text-[clamp(48px,8vw,120px)] text-accent ml-2 animate-pulse">
              _
            </span>
          </h1>
        </div>
        <div className="flex flex-col md:flex-row justify-between md:items-end w-full gap-4 md:gap-0">
          <div className="flex flex-col gap-[2px]">
            <p className="text-xs font-bold tracking-[0.05em] text-text">АЛЕКСЕЙ К.</p>
            <p className="text-[10px] font-normal text-text-secondary tracking-[0.12em]">FRONTEND DEVELOPER</p>
          </div>
          <a
            href="#about"
            className="flex items-center gap-2 text-[10px] tracking-[0.15em] text-text-secondary transition-colors duration-300 hover:text-accent animate-bounce"
            style={{ animationDuration: '2s' }}
          >
            <span>SCROLL</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1V11M6 11L1 6M6 11L11 6" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </a>
        </div>
      </div>
      <div
        className={cn(
          'flex items-center justify-start lg:pr-12 lg:pt-15 lg:pb-6 will-change-transform transition-all duration-600 ease-out',
          showCode ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
        )}
        ref={codeRef}
      >
        <pre className="font-mono text-[9px] md:text-[10px] lg:text-[13px] leading-[1.7] bg-transparent p-0 border-none overflow-x-auto whitespace-pre text-text-secondary">
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
      const formatted = line
        .replace(/const|function|return/g, '<span class="text-[#ff79c6]">$&</span>')
        .replace(/developer|createExperience/g, '<span class="text-[#bd93f9]">$&</span>')
        .replace(/'[^']*'/g, '<span class="text-[#f1fa8c]">$&</span>')
        .replace(/\/\/ .*/, '<span class="text-accent">$&</span>');
      return `<span class="text-[#444] mr-3 select-none">${num}</span> ${formatted}`;
    })
    .join('\n');
}
