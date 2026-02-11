import { useRef, useState } from 'react'
import {
  ArrowRight,
  TrendingUp,
  Clock,
  ExternalLink,
  Quote,
  AlertTriangle,
  Lightbulb,
  BarChart3,
  Code2,
} from 'lucide-react'
import { motion, useInView, AnimatePresence } from 'motion/react'
import { usePortfolioProjects } from '@/features/portfolio'
import type { PortfolioProject } from '@/features/portfolio'
import { Link } from '@tanstack/react-router'
import { navigateToStartProject, START_PROJECT_PATH } from './open-project-wizard'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/lib/ui/dialog'

const CATEGORIES = [
  { key: '', label: 'All' },
  { key: 'web_app', label: 'Web Apps' },
  { key: 'mobile_app', label: 'Mobile' },
  { key: 'ecommerce', label: 'E-commerce' },
  { key: 'enterprise', label: 'Enterprise' },
  { key: 'saas', label: 'SaaS' },
] as const

const CATEGORY_COLORS: Record<string, string> = {
  web_app: '#8B5CF6',
  mobile_app: '#10B981',
  ecommerce: '#F59E0B',
  enterprise: '#3366FF',
  saas: '#EC4899',
  custom: '#14B8A6',
}

const CATEGORY_LABELS: Record<string, string> = {
  web_app: 'Web App',
  mobile_app: 'Mobile App',
  ecommerce: 'E-commerce',
  enterprise: 'Enterprise',
  saas: 'SaaS',
  custom: 'Custom',
}

// --- Project Card ---

interface ProjectCardProps {
  project: PortfolioProject
  index: number
  isInView: boolean
  onSelect: () => void
}

function ProjectCard({ project, index, isInView, onSelect }: ProjectCardProps) {
  const color = CATEGORY_COLORS[project.category] || '#3366FF'
  const primaryResult = project.results[0]
  const visibleTags = project.tags.slice(0, 3)
  const extraTags = project.tags.length - 3

  return (
    <motion.div
      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
      onClick={onSelect}
    >
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div
            className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
            style={{
              background: `linear-gradient(135deg, ${color}40, ${color}20)`,
            }}
          />
        )}
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        {/* Category badge */}
        <div className="absolute left-3 top-3">
          <span
            className="rounded-full px-3 py-1 text-xs font-bold text-white shadow-sm"
            style={{ backgroundColor: color }}
          >
            {CATEGORY_LABELS[project.category]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Client & Duration */}
        <div className="mb-2 flex items-center justify-between text-xs text-black/50">
          <span>{project.client.name}</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {project.duration}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-black transition-colors group-hover:text-secondary">
          {project.title}
        </h3>

        {/* Description */}
        <p className="mt-1 text-sm text-black/60 line-clamp-2">{project.description}</p>

        {/* Tech tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {visibleTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-black/5 px-2.5 py-0.5 text-xs font-medium text-black/70"
            >
              {tag}
            </span>
          ))}
          {extraTags > 0 && (
            <span className="rounded-full bg-black/5 px-2.5 py-0.5 text-xs font-medium text-black/50">
              +{extraTags}
            </span>
          )}
        </div>

        {/* Key metric */}
        {primaryResult && (
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-sm font-bold text-green-700">{primaryResult.value}</span>
            <span className="text-xs text-green-600">{primaryResult.metric}</span>
          </div>
        )}

        {/* CTA */}
        <div className="mt-4 flex items-center gap-1 text-sm font-bold text-secondary opacity-0 transition-opacity group-hover:opacity-100">
          View Case Study
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </motion.div>
  )
}

// --- Project Detail Modal ---

interface ProjectDetailModalProps {
  project: PortfolioProject | null
  open: boolean
  onClose: () => void
}

function ProjectDetailModal({ project, open, onClose }: ProjectDetailModalProps) {
  if (!project) return null

  const color = CATEGORY_COLORS[project.category] || '#3366FF'

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto bg-white p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>{project.title}</DialogTitle>
          <DialogDescription>{project.tagline}</DialogDescription>
        </DialogHeader>

        {/* Hero */}
        <div className="relative h-48 w-full overflow-hidden rounded-t-lg sm:h-56">
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt={project.title}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : (
            <div
              className="h-full w-full"
              style={{ background: `linear-gradient(135deg, ${color}50, ${color}20)` }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6">
            <span
              className="mb-2 inline-block rounded-full px-3 py-1 text-xs font-bold text-white"
              style={{ backgroundColor: color }}
            >
              {CATEGORY_LABELS[project.category]}
            </span>
            <h2 className="text-2xl font-black text-white sm:text-3xl">{project.title}</h2>
            <p className="text-sm text-white/80">{project.tagline}</p>
          </div>
        </div>

        <div className="space-y-6 p-6">
          {/* Info bar */}
          <div className="grid grid-cols-3 gap-4 rounded-xl bg-black/5 p-4">
            <div className="text-center">
              <p className="text-xs text-black/50">Client</p>
              <p className="text-sm font-bold text-black">{project.client.name}</p>
              <p className="text-xs text-black/50">{project.client.industry}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-black/50">Duration</p>
              <p className="text-sm font-bold text-black">{project.duration}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-black/50">Team Size</p>
              <p className="text-sm font-bold text-black">{project.teamSize} members</p>
            </div>
          </div>

          {/* Challenge */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" style={{ color }} />
              <h3 className="text-lg font-bold text-black">The Challenge</h3>
            </div>
            <p className="text-sm leading-relaxed text-black/70">{project.challenge}</p>
          </div>

          {/* Solution */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Lightbulb className="h-5 w-5" style={{ color }} />
              <h3 className="text-lg font-bold text-black">Our Solution</h3>
            </div>
            <p className="text-sm leading-relaxed text-black/70">{project.solution}</p>
          </div>

          {/* Results */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <BarChart3 className="h-5 w-5" style={{ color }} />
              <h3 className="text-lg font-bold text-black">Key Results</h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {project.results.map((result) => (
                <div
                  key={result.metric}
                  className="rounded-xl border border-black/10 p-4 text-center"
                >
                  <p className="text-2xl font-black" style={{ color }}>
                    {result.value}
                  </p>
                  <p className="text-sm font-bold text-black">{result.metric}</p>
                  <p className="mt-1 text-xs text-black/50">{result.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Code2 className="h-5 w-5" style={{ color }} />
              <h3 className="text-lg font-bold text-black">Technologies Used</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full px-3 py-1.5 text-xs font-bold text-white"
                  style={{ backgroundColor: color }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          {project.testimonial && (
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: color + '10' }}
            >
              <Quote className="mb-2 h-6 w-6 opacity-30" style={{ color }} />
              <p className="text-sm italic leading-relaxed text-black/80">
                "{project.testimonial.quote}"
              </p>
              <div className="mt-3">
                <p className="text-sm font-bold text-black">{project.testimonial.author}</p>
                <p className="text-xs text-black/50">{project.testimonial.position}</p>
              </div>
            </div>
          )}

          {/* CTA footer */}
          <div className="flex flex-col gap-3 sm:flex-row">
            {project.projectUrl && (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-black/10 px-4 py-3 text-sm font-bold text-black transition-colors hover:bg-black/5"
              >
                <ExternalLink className="h-4 w-4" />
                Visit Live Site
              </a>
            )}
            <button
              onClick={() => {
                onClose()
                setTimeout(() => navigateToStartProject(), 300)
              }}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: color }}
            >
              Start Similar Project
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// --- Projects Section ---

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [activeCategory, setActiveCategory] = useState('')
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null)

  const { data, isLoading } = usePortfolioProjects()

  const projects = data?.data || []
  const filteredProjects = activeCategory
    ? projects.filter((p) => p.category === activeCategory)
    : projects

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-16 lg:py-24"
    >
      <div className="container relative mx-auto px-4">
        {/* Section header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="mb-3 inline-block rounded-full bg-secondary px-4 py-1.5 text-sm font-bold text-white">
            Our Work
          </span>
          <h2 className="text-3xl font-black tracking-tight text-black sm:text-4xl md:text-5xl">
            Projects We're <span className="text-secondary">Proud Of</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-black/70">
            Real projects, real results. See how we've helped businesses transform through technology.
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          className="mb-10 flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`rounded-full px-5 py-2 text-sm font-bold transition-colors ${
                activeCategory === cat.key
                  ? 'bg-secondary text-white shadow-md'
                  : 'bg-gray-100 text-black/70 hover:bg-gray-200'
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects grid */}
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-96 animate-pulse rounded-2xl bg-white/50" />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  index={index}
                  isInView={isInView}
                  onSelect={() => setSelectedProject(project)}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Empty state */}
        {!isLoading && filteredProjects.length === 0 && (
          <motion.p
            className="py-12 text-center text-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No projects in this category yet.
          </motion.p>
        )}

        {/* CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link to={START_PROJECT_PATH}>
            <motion.span
              className="inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-4 font-bold text-white transition-colors hover:bg-secondary/90"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Your Project
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.span>
            </motion.span>
          </Link>
        </motion.div>
      </div>

      {/* Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        open={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  )
}
