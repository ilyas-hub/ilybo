import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { settingsApi, type SiteSettings } from '../api'

export function useSettings() {
  return useQuery({
    queryKey: ['settings'],
    queryFn: () => settingsApi.getSettings(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useContactInfo() {
  const { data, ...rest } = useSettings()
  return {
    ...rest,
    contact: data?.data.contact,
    company: data?.data.company,
    calendlyUrl: data?.data.calendlyUrl,
    whatsapp: data?.data.contact?.whatsapp,
  }
}

export function useSocialLinks() {
  const { data, ...rest } = useSettings()
  return {
    ...rest,
    socialLinks: data?.data.socialLinks?.filter((link) => link.isActive) || [],
  }
}

export function useBusinessHours() {
  const { data, ...rest } = useSettings()
  return {
    ...rest,
    businessHours: data?.data.businessHours || [],
  }
}

export function useAboutContent() {
  const { data, ...rest } = useSettings()
  return {
    ...rest,
    about: data?.data.about,
  }
}

export function useUpdateSettings() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Partial<SiteSettings>) => settingsApi.updateSettings(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] })
    },
  })
}
