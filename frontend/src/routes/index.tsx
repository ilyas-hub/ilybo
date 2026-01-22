import { createFileRoute } from '@tanstack/react-router'
import { HeroSection, JourneySection, ServicesSection, AboutSection, ContactSection } from '@/components/sections'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <>
      <HeroSection />
      <JourneySection />
      <ServicesSection />
      <AboutSection />
      <ContactSection />
    </>
  )
}
