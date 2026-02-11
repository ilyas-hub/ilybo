import { apiClient } from '@/lib/api-client'

export interface AuthUser {
  id: string
  email: string
  name: string
  role: 'user' | 'admin'
}

export interface AuthResponse {
  success: boolean
  data: {
    user: AuthUser
  }
}

export interface MeResponse {
  success: boolean
  data: {
    user: AuthUser
  }
}

export const authApi = {
  login: (email: string, password: string) =>
    apiClient.post<AuthResponse>('/auth/login', { email, password }),

  register: (name: string, email: string, password: string) =>
    apiClient.post<AuthResponse>('/auth/register', { name, email, password }),

  logout: () => apiClient.post('/auth/logout'),

  me: () => apiClient.get<MeResponse>('/auth/me'),

  refresh: () => apiClient.post('/auth/refresh'),
}
