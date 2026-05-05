import { createContext, use, useMemo } from 'react';
import { cn } from '~/shared/lib/utils';
import { useScrollLock } from './lib';
import { createStore, type StoreApi } from '~/shared/lib/create-store';

type DrawerState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const DrawerContext = createContext<StoreApi<DrawerState> | null>(null);

export function DrawerRoot({ children }: { children: React.ReactNode }) {
  const store = useMemo(
    () =>
      createStore<DrawerState>((set) => ({
        isOpen: false,
        open: () => set(() => ({ isOpen: true })),
        close: () => set(() => ({ isOpen: false })),
        toggle: () => set((state) => ({ isOpen: !state.isOpen })),
      })),
    []
  );
  return <DrawerContext value={store}>{children}</DrawerContext>;
}

function useDrawerStore() {
  const context = use(DrawerContext);
  if (!context) {
    throw new Error('useDrawerStore must be used within a DrawerRoot');
  }
  return context;
}

export function BurgerButton() {
  const store = useDrawerStore();

  const isOpen = store.use((state) => state.isOpen);
  const onClick = store.use((state) => state.toggle);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-controls="drawer"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      className="cursor-pointer md:hidden group relative flex size-10 items-center justify-center rounded-full border border-white/5 bg-white/5 backdrop-blur-sm transition-all hover:border-accent/30"
    >
      <div className="flex flex-col items-end gap-1.5">
        <span
          className={cn(
            'h-px bg-primary transition-all duration-300 ease-in-out',
            isOpen ? 'w-6 translate-y-[3.5px] -rotate-45' : 'w-6'
          )}
        />

        <span
          className={cn(
            'h-px bg-accent transition-all duration-300 ease-in-out',
            isOpen ? 'w-6 translate-y-[-3.5px] rotate-45' : 'w-4'
          )}
        />
      </div>
    </button>
  );
}

const menuItems = [
  { name: 'ОБО МНЕ', id: 'about' },
  { name: 'СТЕК', id: 'stack' },
  { name: 'ПРОЕКТЫ', id: 'projects' },
  { name: 'КОНТАКТЫ', id: 'contacts' },
];

export function Drawer() {
  // Блокируем скролл основной страницы при открытом меню
  const store = useDrawerStore();
  const isOpen = store.use((state) => state.isOpen);
  const onClose = store.use((state) => state.close);
  useScrollLock(isOpen);

  return (
    <div
      className={cn(
        'md:hidden fixed inset-0 z-40 transition-all duration-500',
        isOpen ? 'visible' : 'invisible'
      )}
    >
      <div
        onClick={onClose}
        className={cn(
          'absolute inset-0 bg-bg/80 backdrop-blur-2xl transition-opacity duration-500',
          isOpen ? 'opacity-100' : 'opacity-0'
        )}
      />

      <div className="relative h-full w-full flex flex-col justify-center px-8 md:px-16">
        <nav className="flex flex-col gap-8 md:gap-12">
          {menuItems.map((item, index) => (
            <a
              key={item.name}
              onClick={onClose}
              href={`#${item.id}`}
              style={{ animationDelay: `${index * 100 + 200}ms` }}
              className={cn(
                'group flex items-baseline gap-4 opacity-0 w-fit',
                isOpen && 'animate-slide-in'
              )}
            >
              <span className="font-mono whitespace-nowrap text-[10px] text-secondary/50">
                / 0{index + 1}
              </span>

              <span className=" font-display text-4xl uppercase -skew-x-8 transition-all group-hover:text-accent group-hover:translate-x-4">
                {item.name}
              </span>
            </a>
          ))}
        </nav>

        <div
          className={cn(
            'absolute bottom-12 left-8 right-8 flex justify-between items-center transition-all duration-700 delay-500',
            isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          )}
        >
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-[0.2em] opacity-30">
              Socials
            </span>

            <div className="flex gap-6 text-sm font-medium">
              <a href="#" className="hover:text-accent transition-colors">
                TELEGRAM
              </a>

              <a href="#" className="hover:text-accent transition-colors">
                GITHUB
              </a>
            </div>
          </div>

          <div className="text-right flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-[0.2em] opacity-30">
              Status
            </span>
            <p className="text-xs text-accent animate-pulse font-medium">
              AVAILABLE FOR WORK
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
