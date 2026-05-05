import { forwardRef, useEffect, useRef, useState } from 'react';
import { useTypewriter } from '~/shared/lib/hooks/useTypewriter';
import { cn } from '~/shared/lib/utils';

const CODE = `const developer = {
  name: 'Виталий',
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
        if (lineRef.current) {
          lineRef.current.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
      }

      if (codeRef.current && scrolled < window.innerHeight) {
        codeRef.current.style.transform = `translateX(${scrolled * 0.15}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="min-h-[calc(100vh-60px)] 2xl:min-h-[60dvh] container flex flex-col justify-center relative overflow-hidden bg-bg pt-20 px-6 md:px-12 pb-16 2xl:px-0 gap-4">
      <div className="relative grid items-center grow">
        <div
          ref={titleRef}
          className="z-30 flex flex-col relative gap-8 lg:py-15 justify-center will-change-transform"
        >
          <div className="relative font-display text-4xl md:text-[clamp(48px,8vw,120px)] font-bold leading-[1.2] md:leading-[0.9] lg:leading-[0.85] tracking-[-0.04em]">
            <h1 aria-hidden className="invisible text-shadow-hero">
              <span className="block -skew-x-8 origin-left text-shadow-inherit">
                СОЗДАЮ
              </span>

              <span className="block -skew-x-8 origin-left text-shadow-inherit">
                ЦИФРОВЫЕ
              </span>

              <span className="block  origin-left text-shadow-inherit -skew-x-8">
                ВПЕЧАТЛЕНИЯ
              </span>

              <span className="inline-block  text-accent ml-2">_</span>
            </h1>

            <h1 className="absolute inset-0 z-10 text-shadow-hero">
              <span className="block -skew-x-8 origin-left text-shadow-inherit will-change-transform">
                {line1}
              </span>

              <span className="block -skew-x-8 origin-left text-shadow-inherit will-change-transform">
                {line2}
              </span>

              <span className="block origin-left text-shadow-inherit will-change-transform -skew-x-8">
                {line3}
              </span>

              <span className="inline-block text-accent ml-2 animate-pulse">
                _
              </span>
            </h1>
          </div>
        </div>

        <RedLine ref={lineRef} showLine={showLine} />
        <CodeBlock ref={codeRef} showCode={showCode} />
      </div>
      <AuthorBlock />
    </section>
  );
}

const CodeBlock = forwardRef<
  HTMLDivElement,
  { showCode: boolean; className?: string }
>(({ showCode, className }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'z-20 rounded-2xl p-6 lg:px-10 lg:py-12 backdrop-blur-xs',
        'code-container flex items-center justify-start will-change-transform transition-all duration-600 ease-out lg:absolute lg:top-1/2 lg:right-12 lg:-translate-y-1/2',
        showCode ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8',
        className
      )}
    >
      <pre className="code-keyword font-main text-[9px] md:text-[10px] lg:text-[18px] leading-relaxed font-medium p-0 border-none overflow-x-auto whitespace-pre text-code-obj-keys">
        <code dangerouslySetInnerHTML={{ __html: formatCode(CODE) }} />
      </pre>
    </div>
  );
});

function formatCode(code: string): string {
  return code
    .split('\n')
    .map((line, i) => {
      const num = String(i + 1).padStart(2, '0');
      const formatted = line
        .replace(
          /const|function|return/g,
          '<span class="text-code-const">$&</span>'
        )
        .replace(
          /developer|createExperience/g,
          '<span class="text-[#bd93f9]">$&</span>'
        )
        .replace(/'[^']*'/g, '<span class="text-code-obj-values">$&</span>')
        .replace(/\/\/ .*/, '<span class="text-code-comment">$&</span>');
      return `<span class="mr-3 select-none text-code-number">${num}</span> ${formatted}`;
    })
    .join('\n');
}

function AuthorBlock() {
  return (
    <div className="flex justify-between items-end w-full gap-4 md:gap-0 uppercase">
      <div className="flex flex-col gap-0.5">
        <p className="text-xs font-bold tracking-wider text-text">Виталий К.</p>
        <p className="text-[10px] font-normal text-text-secondary tracking-[0.12em]">
          FRONTEND DEVELOPER
        </p>
      </div>

      <a
        href="#about"
        className="flex items-center gap-2 text-[10px] tracking-[0.15em] text-text-secondary transition-colors duration-300 hover:text-accent w-fit"
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

const RedLine = forwardRef<
  SVGSVGElement,
  { showLine: boolean; className?: string }
>(({ showLine, className }, ref) => {
  return (
    <svg
      ref={ref}
      viewBox="0 0 1200 16"
      preserveAspectRatio="none"
      className={cn(
        'z-10 absolute top-1/4 -left-12 lg:top-1/2 w-full md:w-4/5 lg:w-3/5 lg:h-4 h-2 -rotate-2 origin-left pointer-events-none opacity-95 transition-all duration-600 ease-out',
        showLine
          ? '[clip-path:inset(0_0_0_0)]' // Полностью открыта
          : '[clip-path:inset(0_100%_0_0)]', // Полностью скрыта справа
        className
      )}
    >
      <polygon
        fill="var(--color-accent)"
        points="0,0 700,2 1100,6 1180,7 1200,8 1180,9 1100,10 700,14 0,16"
      />
    </svg>
  );
});
