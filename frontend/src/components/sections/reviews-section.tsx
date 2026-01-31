import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

const REVIEWS = [
  {
    name: 'Rahul Mehta',
    company: 'TechStart Solutions',
    image: 'RM',
    review: 'IlyBo transformed our startup idea into a fully functional product. Their team understood our vision perfectly and delivered beyond expectations. The communication was excellent throughout.',
  },
  {
    name: 'Priya Sharma',
    company: 'HealthFirst India',
    image: 'PS',
    review: 'Working with IlyBo was a game-changer for our healthcare platform. They built a scalable solution that handles thousands of users daily. Highly professional team!',
  },
  {
    name: 'Amit Patel',
    company: 'EduLearn Academy',
    image: 'AP',
    review: 'The team at IlyBo delivered our e-learning platform ahead of schedule. Their attention to detail and technical expertise is outstanding. We continue to work with them on new features.',
  },
  {
    name: 'Sneha Gupta',
    company: 'RetailMax',
    image: 'SG',
    review: 'Our e-commerce platform built by IlyBo increased our sales by 200%. The UI/UX design is beautiful and our customers love the seamless shopping experience.',
  },
  {
    name: 'Vikram Singh',
    company: 'FinSecure',
    image: 'VS',
    review: 'Security was our top priority and IlyBo delivered a rock-solid fintech solution. Their expertise in building secure applications gave us complete confidence.',
  },
]

export function ReviewsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % REVIEWS.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length)
  }

  const visibleReviews = [
    REVIEWS[currentIndex],
    REVIEWS[(currentIndex + 1) % REVIEWS.length],
    REVIEWS[(currentIndex + 2) % REVIEWS.length],
  ]

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

        {/* Reviews Grid */}
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
                  <Quote className="mb-4 h-10 w-10 text-secondary/30" />
                </motion.div>

                {/* Header with avatar */}
                <div className="mb-4 flex items-center gap-4">
                  <motion.div
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-lg font-bold text-white"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {review.image}
                  </motion.div>
                  <div>
                    <h4 className="font-bold text-secondary">{review.name}</h4>
                    <p className="text-sm text-black/50">{review.company}</p>
                  </div>
                </div>

                {/* Review text */}
                <p className="text-black/70">{review.review}</p>

                {/* Read more link */}
                <button className="mt-4 font-bold text-secondary hover:underline">
                  Read More
                </button>
              </motion.div>
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <motion.button
              onClick={prevSlide}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-primary shadow-md transition-all hover:bg-secondary hover:text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="h-6 w-6" />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {REVIEWS.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'w-8 bg-secondary'
                      : 'w-2 bg-black/20 hover:bg-black/40'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            <motion.button
              onClick={nextSlide}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-primary shadow-md transition-all hover:bg-secondary hover:text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="h-6 w-6" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}
