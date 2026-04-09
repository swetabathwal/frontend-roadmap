import { Link } from 'react-router-dom'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 mt-auto">
      <div className="max-w-screen-xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">

        <span>&copy; {year} Frontend Dev Roadmap. All rights reserved.</span>

        <nav className="flex items-center gap-4 flex-wrap justify-center" aria-label="Footer navigation">
          <Link to="/privacy" className="hover:text-indigo-500 transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-indigo-500 transition-colors">
            Terms of Service
          </Link>
          <Link to="/contact" className="hover:text-indigo-500 transition-colors">
            Contact
          </Link>
          <a
            href="mailto:frontendroadmapdev@gmail.com?subject=Bug Report"
            className="hover:text-indigo-500 transition-colors"
          >
            Report a Bug
          </a>
        </nav>

      </div>
    </footer>
  )
}
