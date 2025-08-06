"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User, getCurrentUser, saveCurrentUser, logout as logoutStorage, isLoggedIn as isLoggedInStorage } from '@/lib/storage'

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, phone: string, password: string) => Promise<boolean>
  logout: () => void
  isLoggedIn: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)
    setIsLoggedIn(currentUser !== null)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate login validation
    if (email && password.length >= 6) {
      const userData: User = {
        email,
        name: email.split('@')[0],
      }
      saveCurrentUser(userData)
      setUser(userData)
      setIsLoggedIn(true)
      return true
    }
    return false
  }

  const signup = async (name: string, email: string, phone: string, password: string): Promise<boolean> => {
    // Simulate signup validation
    if (name && email && phone && password.length >= 6) {
      const userData: User = {
        email,
        name,
        phone,
      }
      saveCurrentUser(userData)
      setUser(userData)
      setIsLoggedIn(true)
      return true
    }
    return false
  }

  const logout = () => {
    logoutStorage()
    setUser(null)
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      isLoggedIn
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
