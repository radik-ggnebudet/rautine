import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  BookOpen,
  FileText,
  BarChart3,
  Calendar,
  User,
  Menu,
  X,
  Sun,
  Moon
} from 'lucide-react';

const navItems = [
  { path: '/', icon: Home, label: 'Главная' },
  { path: '/courses', icon: BookOpen, label: 'Курсы' },
  { path: '/assignments', icon: FileText, label: 'Задания' },
  { path: '/grades', icon: BarChart3, label: 'Оценки' },
  { path: '/schedule', icon: Calendar, label: 'Расписание' },
  { path: '/profile', icon: User, label: 'Профиль' },
];

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches || document.documentElement.classList.contains('dark');
  });
  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia('(min-width: 1024px)').matches;
  });
  const location = useLocation();

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const handler = (e: MediaQueryListEvent | MediaQueryList) => {
      const matches = 'matches' in e ? e.matches : (e as MediaQueryList).matches;
      setIsDesktop(matches);
      if (matches) {
        // ensure sidebar shown
        setIsSidebarOpen(false); // we use desktop unconditional 0 offset
      }
    };
    handler(mq);
    mq.addEventListener('change', handler as (ev: MediaQueryListEvent) => void);
    return () => mq.removeEventListener('change', handler as (ev: MediaQueryListEvent) => void);
  }, []);

  // Persist / apply dark mode
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Load stored preference
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored) setDarkMode(stored === 'dark');
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleTheme = () => setDarkMode(prev => !prev);

  // Close sidebar on route change (mobile)
  useEffect(() => { closeSidebar(); }, [location.pathname]);

  const isActivePath = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  useEffect(() => {
    if (isDesktop) return; // only mobile
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isSidebarOpen, isDesktop]);

  return (
    <div className="min-h-screen relative bg-[radial-gradient(circle_at_40%_35%,rgba(0,122,255,0.10),transparent_65%)] dark:bg-[radial-gradient(circle_at_40%_35%,rgba(10,132,255,0.18),transparent_60%)]">
      {/* Subtle grid overlay */}
      <div className="pointer-events-none absolute inset-0 bg-grid-light bg-grid-sm opacity-[0.04] dark:opacity-[0.06]" />

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50">
        <div className="glass flex items-center justify-between px-4 py-3 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-apple hover:bg-gray-100/70 dark:hover:bg-white/10 transition active:scale-95"
              aria-label={isSidebarOpen ? 'Закрыть меню' : 'Открыть меню'}
            >
              {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">Rautine</h1>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-apple hover:bg-gray-100/70 dark:hover:bg-white/10 transition active:scale-95"
            aria-label="Переключить тему"
          >
            {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: isDesktop ? 0 : (isSidebarOpen ? 0 : -260) }}
        transition={{ type: 'spring', stiffness: 260, damping: 30 }}
        className="fixed top-0 left-0 h-full w-64 z-40 lg:translate-x-0 lg:static lg:block"
      >
        <div className="hidden lg:block h-full" />
        <div className="glass-solid h-full flex flex-col border-r border-gray-200/60 dark:border-white/10 shadow-apple backdrop-blur-2xl">
          <div className="p-6 pb-4 flex items-center justify-between">
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">Rautine</h1>
            <button
              onClick={toggleTheme}
              className="hidden lg:inline-flex p-2 rounded-apple hover:bg-gray-100/70 dark:hover:bg-white/10 transition active:scale-95"
              aria-label="Переключить тему"
            >
              {darkMode ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} />}
            </button>
          </div>
          <nav className="px-4 pb-6 flex-1 overflow-y-auto hide-scrollbar space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const active = isActivePath(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group flex items-center gap-3 px-4 py-2.5 rounded-apple text-[15px] font-medium transition-colors relative ${active
                    ? 'bg-primary-500 text-white shadow-apple'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/70 dark:hover:bg-white/10'} `}
                >
                  <Icon size={20} strokeWidth={active ? 2.6 : 2} className="shrink-0" />
                  <span className={active ? 'font-semibold' : ''}>{item.label}</span>
                  {active && <span className="absolute inset-0 rounded-apple ring-1 ring-white/40 dark:ring-white/20" />}
                </Link>
              );
            })}
          </nav>
          <div className="px-6 py-5 border-t border-gray-200/60 dark:border-white/10 text-[12px] text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Rautine
          </div>
        </div>
      </motion.aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && !isDesktop && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden animate-fade-in"
          onClick={closeSidebar}
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen relative">
        {/* Subtle top gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-transparent dark:from-gray-900/70" />
        <div className="relative p-6 lg:p-10 w-full animate-slide-up-fade">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
