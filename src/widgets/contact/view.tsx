import { SectionLayout, SectionScrollWrapper } from '~/shared/ui';

export function Contact() {
  return (
    <SectionScrollWrapper id="contact" className="md:py-16 lg:py-26">
      <SectionLayout num="/05" label="КОНТАКТЫ" className="container">
        <div className="grid lg:grid-cols-[auto_1fr] gap-8 items-start">
          <div className="relative">
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold not-italic leading-none tracking-[0.02em]">
              <span className="block">ДАВАЙТЕ </span>
              <span className="block">
                <span>СОЗДАВАТЬ</span>
                <span className="text-accent max-md:block"> КРУТОЕ</span>
              </span>
            </h2>
            <div
              aria-hidden
              className="hidden lg:flex items-center gap-0 mt-1 w-full"
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
          <div className="flex md:max-lg:flex-row flex-col gap-8 md:max-lg:items-baseline">
            <ContactLinks />

            <div className="flex flex-col justify-start ">
              <div>
                <p className="text-balance text-xl text-white/70 mb-4 md:mb-3">
                  Открыт к интересным проектам и сотрудничеству
                </p>
                <a
                  href="mailto:hello@vitaliy.dev"
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
          </div>
        </div>
      </SectionLayout>
    </SectionScrollWrapper>
  );
}

const links = [
  {
    label: 'EMAIL',
    value: 'hello@vitaliy.dev',
    href: 'mailto:hello@vitaliy.dev',
  },
  {
    label: 'TELEGRAM',
    value: '@vitaliy_dev',
    href: 'https://t.me/vitaliy_dev',
  },
  {
    label: 'GITHUB',
    value: 'github.com/vitaliy-dev',
    href: 'https://github.com/vitaliy-dev',
  },
];
function ContactLinks() {
  return (
    <div className="flex flex-col gap-3 text-xs">
      {links.map((link) => (
        <div
          key={link.label}
          className="grid gap-y-1 md:grid-cols-2 gap-px items-baseline"
        >
          <span className=" tracking-[0.2em] text-text-secondary/40 text-[10px] font-display">
            {link.label}
          </span>

          <a
            target="_blank"
            href={link.href}
            rel="noopener noreferrer"
            className="whitespace-nowrap text-text transition-colors duration-300 hover:text-accent font-medium"
          >
            {link.value}
          </a>
        </div>
      ))}
    </div>
  );
}
