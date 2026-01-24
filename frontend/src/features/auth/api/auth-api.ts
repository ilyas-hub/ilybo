import { apiClient } from '@/lib/api-client'

export interface AuthUser {
  id: string
  email: string
  name: string
  role: 'user' | 'admin'
}

export interface LoginResponse {
  success: boolean
  data: {
    user: AuthUser
    accessToken: string
    refreshToken: string
  }
}

export interface RegisterResponse {
  success: boolean
  data: {
    user: AuthUser
    accessToken: string
    refreshToken: string
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
    apiClient.post<LoginResponse>('/auth/login', { email, password }),

  register: (name: string, email: string, password: string) =>
    apiClient.post<RegisterResponse>('/auth/register', { name, email, password }),

  logout: () => apiClient.post('/auth/logout'),

  me: () => apiClient.get<MeResponse>('/auth/me'),

  refresh: (refreshToken: string) =>
    apiClient.post<LoginResponse>('/auth/refresh', { refreshToken }),
}
