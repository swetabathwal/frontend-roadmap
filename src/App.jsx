import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Toaster } from 'sonner'
import { AuthProvider, useAuth } from './context/AuthContext'
import { AppProvider, useApp } from './context/AppContext'
import { InterviewProvider } from './context/InterviewContext'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { CookieConsent } from './components/CookieConsent'
import { FocusTimer } from './components/FocusTimer'
import { Dashboard } from './pages/Dashboard'
import { LevelView } from './pages/LevelView'
import { BookmarksView } from './pages/BookmarksView'
import { PlannerView } from './pages/PlannerView'
import { StatsView } from './pages/StatsView'
import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SignupPage'
import { ForgotPasswordPage } from './pages/ForgotPasswordPage'
import { ResetPasswordPage } from './pages/ResetPasswordPage'
import { PublicProfileView } from './pages/PublicProfileView'
import { CategoryView } from './pages/CategoryView'
import { InterviewListView } from './pages/InterviewListView'
import { PrivacyPolicy } from './pages/PrivacyPolicy'
import { TermsOfService } from './pages/TermsOfService'
import { ContactPage } from './pages/ContactPage'

/** Fire a GA4 page_view event on every route change */
function Analytics() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (typeof globalThis.gtag === 'function') {
      globalThis.gtag('event', 'page_view', { page_path: pathname })
    }
  }, [pathname])
  return null
}

/** Routes accessible without authentication */
function PublicRoutes() {
  return (
    <Routes>
      <Route path="/profile/:slug" element={<PublicProfileView />} />
      <Route path="/privacy"       element={<PrivacyPolicy />} />
      <Route path="/terms"         element={<TermsOfService />} />
      <Route path="/contact"       element={<ContactPage />} />
    </Routes>
  )
}

function AuthenticatedApp() {
  const { ready } = useApp()
  const [focusOpen, setFocusOpen] = useState(false)

  // Keyboard shortcut: F toggles focus mode (ignored while typing in inputs)
  useEffect(() => {
    function onKey(e) {
      if (e.key !== 'f' && e.key !== 'F') return
      const t = e.target
      const tag = t?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || t?.isContentEditable) return
      if (e.metaKey || e.ctrlKey || e.altKey) return
      e.preventDefault()
      setFocusOpen((v) => !v)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (!ready) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-slate-500 dark:text-slate-400">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium">Loading your progress…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200 flex flex-col">
      <Header focusOpen={focusOpen} onToggleFocus={() => setFocusOpen((v) => !v)} />
      <FocusTimer open={focusOpen} onClose={() => setFocusOpen(false)} />
      <main className="flex-1 max-w-screen-xl w-full mx-auto px-4 py-6 pb-20">
        <Routes>
          <Route path="/"                   element={<Dashboard />} />
          <Route path="/level/:levelId"      element={<LevelView />} />
          <Route path="/category/:categoryId" element={<CategoryView />} />
          <Route path="/bookmarks"          element={<BookmarksView />} />
          <Route path="/planner"            element={<PlannerView />} />
          <Route path="/stats"              element={<StatsView />} />
          <Route path="/interview-prep"     element={<InterviewListView />} />
          {/* Legal pages also accessible when logged in */}
          <Route path="/privacy"            element={<PrivacyPolicy />} />
          <Route path="/terms"              element={<TermsOfService />} />
          <Route path="/contact"            element={<ContactPage />} />
          <Route path="*"                   element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

function AuthGate() {
  const { user, recoveryMode } = useAuth()
  const { pathname } = useLocation()
  const [authView, setAuthView] = useState('login')

  // Public routes — no auth required
  if (
    pathname.startsWith('/profile/') ||
    pathname === '/privacy' ||
    pathname === '/terms' ||
    pathname === '/contact'
  ) {
    return <PublicRoutes />
  }

  // Still resolving session
  if (user === undefined) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // Password recovery mode — user clicked the reset link in their email
  if (recoveryMode) {
    return <ResetPasswordPage />
  }

  // Not logged in
  if (!user) {
    if (authView === 'forgot') {
      return <ForgotPasswordPage onBack={() => setAuthView('login')} />
    }
    return authView === 'login'
      ? <LoginPage onSwitch={() => setAuthView('signup')} onForgot={() => setAuthView('forgot')} />
      : <SignupPage onSwitch={() => setAuthView('login')} />
  }

  return (
    <AppProvider userId={user.id}>
      <InterviewProvider userId={user.id}>
        <AuthenticatedApp />
      </InterviewProvider>
    </AppProvider>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Analytics />
      <AuthGate />
      <CookieConsent />
      <Toaster
        position="bottom-right"
        richColors
        theme="system"
        toastOptions={{ duration: 3000 }}
      />
    </AuthProvider>
  )
}
