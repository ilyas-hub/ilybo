import { apiClient } from '@/lib/api-client'
import type { SettingsResponse, UpdateSettingsInput } from '../types'

export const settingsApi = {
  getSettings: () => apiClient.get<SettingsResponse>('/settings'),

  updateSettings: (data: UpdateSettingsInput) =>
    apiClient.patch<SettingsResponse>('/settings', data),
}
