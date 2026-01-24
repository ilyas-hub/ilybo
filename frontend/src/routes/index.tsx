import { createFileRoute } from '@tanstack/react-router'
import { HeroSection, StatsSection, JourneySection, ServicesSection, TechStackSection, ReviewsSection, FAQSection, ProjectWizardSection, AboutSection, ContactSection } from '@/components/sections'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
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
