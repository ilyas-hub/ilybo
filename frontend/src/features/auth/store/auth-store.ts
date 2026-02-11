import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authApi, type AuthUser } from '../api/auth-api'

interface AuthState {
  user: AuthUser | null
  isLoading: boolean
  error: string | null
  isAuthenticated: boolean

  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
  clearError: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null })
        try {
          const response = await authApi.login(email, password)
          const { user } = response.data

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          })
          return true
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Login failed'
          set({ error: message, isLoading: false })
          return false
        }
      },

      register: async (name: string, email: string, password: string) => {
        set({ isLoading: true, error: null })
        try {
          const response = await authApi.register(name, email, password)
          const { user } = response.data

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          })
          return true
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Registration failed'
          set({ error: message, isLoading: false })
          return false
        }
      },

      logout: async () => {
        try {
          await authApi.logout()
        } catch {
          // Ignore logout errors
        }

        set({
          user: null,
          isAuthenticated: false,
        })
      },

      checkAuth: async () => {
        set({ isLoading: true })
        try {
          const response = await authApi.me()
          set({
            user: response.data.user,
            isAuthenticated: true,
            isLoading: false,
          })
        } catch {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          })
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
