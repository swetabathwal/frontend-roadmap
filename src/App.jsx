import { useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Toaster } from 'sonner'
import { AuthProvider, useAuth } from './context/AuthContext'
import { AppProvider, useApp } from './context/AppContext'
import { InterviewProvider } from './context/InterviewContext'
import { Header } from './components/Header'
import { Dashboard } from './pages/Dashboard'
import { LevelView } from './pages/LevelView'
import { BookmarksView } from './pages/BookmarksView'
import { PlannerView } from './pages/PlannerView'
import { StatsView } from './pages/StatsView'
import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SignupPage'
import { PublicProfileView } from './pages/PublicProfileView'
import { CategoryView } from './pages/CategoryView'
import { InterviewListView } from './pages/InterviewListView'

function AuthenticatedApp() {
  const { ready } = useApp()

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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
      <Header />
      <main className="max-w-screen-xl mx-auto px-4 py-6 pb-20">
        <Routes>
          <Route path="/"                  element={<Dashboard />} />
          <Route path="/level/:levelId"      element={<LevelView />} />
          <Route path="/category/:categoryId" element={<CategoryView />} />
          <Route path="/bookmarks"         element={<BookmarksView />} />
          <Route path="/planner"           element={<PlannerView />} />
          <Route path="/stats"             element={<StatsView />} />
          <Route path="/interview-prep"    element={<InterviewListView />} />
          <Route path="*"                  element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

function AuthGate() {
  const { user } = useAuth()
  const { pathname } = useLocation()
  const [authView, setAuthView] = useState('login')

  if (pathname.startsWith('/profile/')) {
    return (
      <Routes>
        <Route path="/profile/:slug" element={<PublicProfileView />} />
      </Routes>
    )
  }

  if (user === undefined) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) {
    return authView === 'login'
      ? <LoginPage  onSwitch={() => setAuthView('signup')} />
      : <SignupPage onSwitch={() => setAuthView('login')}  />
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
      <AuthGate />
      <Toaster
        position="bottom-right"
        richColors
        theme="system"
        toastOptions={{ duration: 3000 }}
      />
    </AuthProvider>
  )
}
