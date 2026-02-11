import { createFileRoute } from '@tanstack/react-router'
import { ProjectWizardPage } from '@/components/sections/project-wizard-page'

export const Route = createFileRoute('/start-project')({
  component: ProjectWizardPage,
})
