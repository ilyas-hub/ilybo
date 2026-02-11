import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { usePublicTestimonials } from '@/features/cms'

const FALLBACK_REVIEWS = [
  {
    name: 'Rahul Mehta',
    company: 'TechStart Solutions',
    initials: 'RM',
    review: 'IlyBo transformed our startup idea into a fully functional product. Their team understood our vision perfectly and delivered beyond expectations. The communication was excellent throughout.',
  },
  {
    name: 'Priya Sharma',
    company: 'HealthFirst India',
    initials: 'PS',
    review: 'Working with IlyBo was a game-changer for our healthcare platform. They built a scalable solution that handles thousands of users daily. Highly professional team!',
  },
  {
    name: 'Amit Patel',
    company: 'EduLearn Academy',
    initials: 'AP',
    review: 'The team at IlyBo delivered our e-learning platform ahead of schedule. Their attention to detail and technical expertise is outstanding. We continue to work with them on new features.',
  },
]

export function ReviewsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [currentIndex, setCurrentIndex] = useState(0)

  const { data, isLoading } = usePublicTestimonials()
  const reviews = data?.data && data.data.length > 0 ? data.data : FALLBACK_REVIEWS

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  const visibleReviews = reviews.length >= 3
    ? [
        reviews[currentIndex],
        reviews[(currentIndex + 1) % reviews.length],
        reviews[(currentIndex + 2) % reviews.length],
      ]
    : reviews

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-16 lg:py-24"
    >
      <div className="container relative mx-auto px-4">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="mb-3 inline-block rounded-full bg-secondary px-4 py-1.5 text-sm font-bold text-white">
            Testimonials
          </span>
          <h2 className="text-3xl font-black tracking-tight text-black sm:text-4xl md:text-5xl">
            Results That Create{' '}
            <span className="text-secondary">Raving Fans.</span>
          </h2>
        </motion.div>

        {/* Loading skeleton */}
        {isLoading && (
          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 animate-pulse rounded-3xl bg-primary/50" />
            ))}
          </div>
        )}

        {/* Reviews Grid */}
        {!isLoading && (
          <div className="relative">
            <div className="grid gap-6 md:grid-cols-3">
              {visibleReviews.map((review, index) => (
                <motion.div
                  key={`${review.name}-${currentIndex}-${index}`}
                  className="relative rounded-3xl bg-primary p-6 shadow-lg lg:p-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  {/* Quote icon */}
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: index * 0.3 }}
                  >
                    <Quote className="mb-4 h-10 w-10 text-secondary/30" aria-hidden="true" />
                  </motion.div>

                  {/* Header with avatar */}
                  <div className="mb-4 flex items-center gap-4">
                    <motion.div
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-lg font-bold text-white"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {review.initials}
                    </motion.div>
                    <div>
                      <h4 className="font-bold text-secondary">{review.name}</h4>
                      <p className="text-sm text-black/70">{review.company}</p>
                    </div>
                  </div>

                  {/* Review text */}
                  <p className="text-black/80">{review.review}</p>

                  {/* Read more link */}
                  <button className="mt-4 font-bold text-secondary hover:underline">
                    Read More
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Navigation buttons */}
            {reviews.length > 3 && (
              <div className="mt-8 flex items-center justify-center gap-4">
                <motion.button
                  onClick={prevSlide}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-primary shadow-md transition-all hover:bg-secondary hover:text-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-6 w-6" aria-hidden="true" />
                </motion.button>

                {/* Dots */}
                <div className="flex gap-2">
                  {reviews.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-3 rounded-full transition-all ${
                        index === currentIndex
                          ? 'w-8 bg-secondary'
                          : 'w-3 bg-black/30 hover:bg-black/50'
                      }`}
                      style={{ minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                <motion.button
                  onClick={nextSlide}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-primary shadow-md transition-all hover:bg-secondary hover:text-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-6 w-6" aria-hidden="true" />
                </motion.button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
