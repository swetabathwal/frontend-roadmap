import { NavLink } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useAuth } from '../context/AuthContext'
import { Icon } from './Icon'

const NAV_ITEMS = [
  { to: '/',                label: 'Home',      icon: 'grid',       end: true  },
  { to: '/bookmarks',       label: 'Saved',     icon: 'bookmark',   end: false },
  { to: '/planner',         label: 'Planner',   icon: 'calendar',   end: false },
  { to: '/stats',           label: 'Stats',     icon: 'chart',      end: false },
  { to: '/interview-prep',  label: 'Interview', icon: 'sparkles',   end: false },
]

export function Header() {
  const { state, toggleDark } = useApp()
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-3">

        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          aria-label="Go to dashboard"
        >
          <span className="text-2xl" aria-hidden="true">📚</span>
          <div className="text-left">
            <p className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">
              Frontend Dev Roadmap
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Junior → Staff Complete Guide</p>
          </div>
        </NavLink>

        {/* Navigation */}
        <nav className="flex items-center gap-1" aria-label="Main navigation">
          {NAV_ITEMS.map(({ to, label, icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-indigo-500 text-white'
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`
              }
            >
              <Icon name={icon} size={15} />
              <span className="hidden sm:inline">{label}</span>
            </NavLink>
          ))}

          <button
            onClick={toggleDark}
            className="ml-1 p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            aria-label={state.dark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <Icon name={state.dark ? 'sun' : 'moon'} size={17} />
          </button>

          {/* User info + logout */}
          {user && (
            <div className="ml-2 flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-600">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 leading-tight max-w-[120px] truncate">
                  {user.user_metadata?.display_name || user.email}
                </span>
                {user.user_metadata?.display_name && (
                  <span className="text-xs text-slate-400 dark:text-slate-500 max-w-[120px] truncate">
                    {user.email}
                  </span>
                )}
              </div>
              <button
                onClick={logout}
                className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-colors"
                aria-label="Sign out"
                title="Sign out"
              >
                <Icon name="logout" size={17} />
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
