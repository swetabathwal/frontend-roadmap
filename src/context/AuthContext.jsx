import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../supabase/client'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // undefined = still resolving session, null = not logged in, object = logged in
  const [user, setUser] = useState(undefined)
  // true when the user arrived via a password-reset email link
  const [recoveryMode, setRecoveryMode] = useState(false)

  useEffect(() => {
    // Resolve the initial session immediately
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    // Then keep in sync with auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        setUser(session?.user ?? null)
        setRecoveryMode(true)
      } else {
        setUser(session?.user ?? null)
        setRecoveryMode(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const signup = async (email, password, name) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: name } },
    })
    if (error) throw error
    return data
  }

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  }

  const logout = async () => {
    await supabase.auth.signOut()
  }

  const resetPassword = async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/`,
    })
    if (error) throw error
  }

  const updatePassword = async (newPassword) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) throw error
    setRecoveryMode(false)
  }

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, resetPassword, updatePassword, recoveryMode }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
