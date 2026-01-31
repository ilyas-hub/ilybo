import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { settingsApi } from '../api/settings-api'
import type { UpdateSettingsInput } from '../types'

export function useSettings() {
  return useQuery({
    queryKey: ['settings'],
    queryFn: () => settingsApi.getSettings(),
  })
}

export function useUpdateSettings() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: UpdateSettingsInput) => settingsApi.updateSettings(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] })
    },
  })
}
