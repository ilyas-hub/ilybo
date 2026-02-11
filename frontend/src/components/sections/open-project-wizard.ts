import { router } from '@/app/router'

export const START_PROJECT_PATH = '/start-project' as const

export function navigateToStartProject() {
  router.navigate({ to: START_PROJECT_PATH })
}
