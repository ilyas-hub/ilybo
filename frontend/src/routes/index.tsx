import { createFileRoute } from '@tanstack/react-router'
import { HeroSection, StatsSection, JourneySection, ServicesSection, ProjectsSection, TechStackSection, ReviewsSection, FAQSection, ProjectWizardSection, AboutSection, ContactSection } from '@/components/sections'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <ProjectsSection />
      <TechStackSection />
      <JourneySection />
      <ReviewsSection />
      <FAQSection />
      <AboutSection />
      <ProjectWizardSection />
      <ContactSection />
    </>
  )
}
