export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0 px-6 py-5 md:px-12 text-[10px] text-text-secondary tracking-[0.08em] bg-bg text-center md:text-left">
      <div className="flex-none md:flex-1 text-center md:text-left">
        <span>© {currentYear} АЛЕКСЕЙ К.</span>
      </div>
      <div className="flex-none md:flex-1 text-center">
        <span>СОЗДАЮ ЦИФРОВЫЕ ВПЕЧАТЛЕНИЯ</span>
      </div>
      <div className="flex-none md:flex-1 flex justify-center md:justify-end items-center gap-2">
        <span className="text-text-secondary">
          РАЗРАБОТАНО С ЛЮБОВЬЮ И КОДОМ
        </span>
        <span className="text-accent">&lt;/&gt;</span>
      </div>
    </footer>
  );
}
