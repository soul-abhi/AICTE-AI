import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '../theme/ThemeProvider';
import { useAuth } from '../auth/AuthProvider';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-100">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/70 backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-lg font-semibold tracking-tight">
            AI Resume & Portfolio Builder
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <NavLink to="/" className={({ isActive }) => (isActive ? 'text-brand-600' : 'hover:text-brand-600')}>
              Home
            </NavLink>
            <NavLink to="/resume" className={({ isActive }) => (isActive ? 'text-brand-600' : 'hover:text-brand-600')}>
              Resume
            </NavLink>
            <NavLink to="/ai-resume" className={({ isActive }) => (isActive ? 'text-brand-600 font-semibold' : 'hover:text-brand-600')}>
              ✨ AI Resume
            </NavLink>
            <NavLink to="/portfolio" className={({ isActive }) => (isActive ? 'text-brand-600' : 'hover:text-brand-600')}>
              Portfolio
            </NavLink>
            <NavLink to="/ats" className={({ isActive }) => (isActive ? 'text-brand-600' : 'hover:text-brand-600')}>
              ATS
            </NavLink>
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-full border border-slate-300 px-3 py-1 text-xs uppercase tracking-wide dark:border-slate-700"
            >
              {theme === 'light' ? 'Dark' : 'Light'}
            </button>
            {isAuthenticated ? (
              <button
                type="button"
                onClick={logout}
                className="rounded-full bg-brand-600 px-3 py-1 text-white hover:bg-brand-700"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                className="rounded-full bg-brand-600 px-3 py-1 text-white hover:bg-brand-700"
              >
                Login
              </NavLink>
            )}
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
      <footer className="border-t border-slate-200 py-6 text-center text-sm dark:border-slate-800">
        Built for students • Deploy on Vercel • Crafted with AI assistance
      </footer>
    </div>
  );
};
