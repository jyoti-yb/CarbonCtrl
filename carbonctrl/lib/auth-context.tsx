"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import {
  type User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"
import { auth } from "./firebase"

// Helper that throws a consistent error when Firebase isn’t configured
function missingFirebase() {
  throw new Error(
    "Firebase has not been initialised. " + "Make sure all NEXT_PUBLIC_FIREBASE_* environment variables are set.",
  )
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  signInWithGoogle: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // If auth is unavailable, skip setting up the listener
    if (!auth) {
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const signIn = async (email: string, password: string) => {
    if (!auth) return missingFirebase()
    await signInWithEmailAndPassword(auth, email, password)
  }

  const signUp = async (email: string, password: string) => {
    if (!auth) return missingFirebase()
    await createUserWithEmailAndPassword(auth, email, password)
  }

  const signOut = async () => {
    if (!auth) return missingFirebase()
    await firebaseSignOut(auth)
  }

  const signInWithGoogle = async () => {
    if (!auth) return missingFirebase()
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
