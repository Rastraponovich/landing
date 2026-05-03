import { forwardRef, useEffect, useRef, useState } from 'react';
import { useTypewriter } from '~/shared/lib/hooks/useTypewriter';
import { cn } from '~/shared/lib/utils';

const CODE = `const developer = {
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

export function Hero() {
  const titleRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGSVGElement>(null);

  const [showCode, setShowCode] = useState(false);
  const [showLine, setShowLine] = useState(false);

  const { displayText: line1, isComplete: line1Complete } = useTypewriter(
    'СОЗДАЮ',
    80,
    300
  );
  const { displayText: line2, isComplete: line2Complete } = useTypewriter(
    'ЦИФРОВЫЕ',
    80,
    line1Complete ? 200 : 1000
  );
  const { displayText: line3, isComplete: line3Complete } = useTypewriter(
    'ВПЕЧАТЛЕНИЯ',
    80,
    line2Complete ? 200 : 2000
  );

  useEffect(() => {
    if (line3Complete) {
      const codeTimeout = setTimeout(() => setShowCode(true), 600);
      const lineTimeout = setTimeout(() => setShowLine(true), 100);
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

  return (
    <section className="min-h-[calc(100vh-60px)] grid  lg:grid-cols-[1fr_auto] relative overflow-hidden bg-bg items-center pt-20 px-6 lg:pt-0 lg:px-0 pb-8 lg:pb-0">
      <div
        ref={titleRef}
        className="z-30 flex flex-col relative gap-8 lg:px-12 lg:py-15 justify-center will-change-transform "
      >
        <h1
          className="font-display text-[40px] md:text-[clamp(48px,8vw,120px)] font-bold leading-[0.9] lg:leading-[0.85] tracking-[-0.04em] relative z-10"
          style={{
            textShadow: '2px 2px 0 var(--color-bg), 4px 4px 0 rgba(0,0,0,0.5)',
          }}
        >
          <span className="block -skew-x-8 origin-left text-shadow-inherit will-change-transform ">
            {line1}
          </span>

          <span className="block -skew-x-8 origin-left text-shadow-inherit will-change-transform">
            {line2}
          </span>

          <span className="block  origin-left text-shadow-inherit will-change-transform -skew-x-8">
            {line3}
          </span>

          <span className="inline-block font-display text-[40px] md:text-[clamp(48px,8vw,120px)] text-accent ml-2 animate-pulse">
            _
          </span>
        </h1>

        <AuthorBlock />
      </div>

      <DecorationLine showLine={showLine} ref={lineRef} />
      <CodeBlock ref={codeRef} showCode={showCode} />
    </section>
  );
}

const CodeBlock = forwardRef<HTMLDivElement, { showCode: boolean }>(
  ({ showCode }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'z-20 rounded-2xl p-6 lg:px-10 lg:py-12 backdrop-blur-xs',
          'code-container flex items-center justify-start will-change-transform transition-all duration-600 ease-out absolute top-1/2 right-12 -translate-y-1/2',
          showCode ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
        )}
      >
        <pre className="code-keyword font-main text-[9px] md:text-[10px] lg:text-[18px] leading-relaxed font-medium p-0 border-none overflow-x-auto whitespace-pre text-code-obj-keys">
          <code dangerouslySetInnerHTML={{ __html: formatCode(CODE) }} />
        </pre>
      </div>
    );
  }
);

function formatCode(code: string): string {
  return code
    .split('\n')
    .map((line, i) => {
      const num = String(i + 1).padStart(2, '0');
      const formatted = line
        .replace(
          /const|function|return/g,
          // text-[#ff79c6]
          '<span class="text-code-const">$&</span>'
        )
        .replace(
          /developer|createExperience/g,
          '<span class="text-[#bd93f9]">$&</span>'
        )
        .replace(/'[^']*'/g, '<span class="text-code-obj-values">$&</span>')
        // text-accent
        .replace(/\/\/ .*/, '<span class="text-code-comment">$&</span>');
      return `<span class="mr-3 select-none text-code-number">${num}</span> ${formatted}`;
    })
    .join('\n');
}

function AuthorBlock() {
  return (
    <div className="flex flex-col md:flex-row justify-between md:items-end w-full gap-4 md:gap-0 uppercase">
      <div className="flex flex-col gap-0.5">
        <p className="text-xs font-bold tracking-wider text-text">Виталий К.</p>
        <p className="text-[10px] font-normal text-text-secondary tracking-[0.12em]">
          FRONTEND DEVELOPER
        </p>
      </div>

      <a
        href="#about"
        style={{ animationDuration: '2s' }}
        className="flex items-center gap-2 text-[10px] tracking-[0.15em] text-text-secondary transition-colors duration-300 hover:text-accent animate-bounce"
      >
        <span>SCROLL</span>

        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            strokeWidth="1.5"
            stroke="currentColor"
            d="M6 1V11M6 11L1 6M6 11L11 6"
          />
        </svg>
      </a>
    </div>
  );
}

const DecorationLine = forwardRef<SVGSVGElement, { showLine: boolean }>(
  ({ showLine }, ref) => {
    return (
      <svg
        ref={ref}
        viewBox="0 0 1200 16"
        preserveAspectRatio="none"
        className={cn(
          'z-10 absolute top-4/9 -left-12 w-3/5 h-4 -rotate-2 origin-left pointer-events-none opacity-95 transition-all duration-600 ease-out',
          showLine ? 'clip-path-none' : '[clip-path:inset(0_100%_0_0)]'
        )}
      >
        <polygon
          fill="var(--color-accent)"
          points="0,0 700,2 1100,6 1180,7 1200,8 1180,9 1100,10 700,14 0,16"
        />
      </svg>
    );
  }
);
