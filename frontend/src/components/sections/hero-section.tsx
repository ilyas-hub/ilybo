import { ArrowRight, Play, Star, Rocket, CheckCircle, Terminal } from 'lucide-react'
import { Button } from '@/lib/ui'
import { motion } from 'motion/react'
import { useState, useEffect } from 'react'
import { openProjectWizard } from './project-wizard-section'

// Professional code that demonstrates capability
const CODE_LINES = [
  { text: 'import { IlyBo } from "@ilybo/core";', delay: 0 },
  { text: '', delay: 0 },
  { text: 'async function buildProject() {', delay: 0 },
  { text: '  const config = {', delay: 0 },
  { text: '    name: "my-awesome-app",', delay: 0 },
  { text: '    stack: ["React", "Node.js", "PostgreSQL"],', delay: 0 },
  { text: '    features: ["auth", "payments", "dashboard"],', delay: 0 },
  { text: '  };', delay: 0 },
  { text: '', delay: 0 },
  { text: '  const project = await IlyBo.create(config);', delay: 0 },
  { text: '  await project.build();', delay: 0 },
  { text: '  await project.deploy("production");', delay: 0 },
  { text: '}', delay: 0 },
]

function CodeEditor() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [phase, setPhase] = useState<'typing' | 'building' | 'deployed'>('typing')
  const [buildProgress, setBuildProgress] = useState(0)

  // Typing effect
  useEffect(() => {
    if (phase !== 'typing') return
    if (currentLineIndex >= CODE_LINES.length) {
      setTimeout(() => setPhase('building'), 400)
      return
    }

    const currentLine = CODE_LINES[currentLineIndex].text

    if (currentCharIndex < currentLine.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => {
          const newLines = [...prev]
          if (newLines.length <= currentLineIndex) {
            newLines.push(currentLine.charAt(0))
          } else {
            newLines[currentLineIndex] = currentLine.slice(0, currentCharIndex + 1)
          }
          return newLines
        })
        setCurrentCharIndex((prev) => prev + 1)
      }, 25 + Math.random() * 15)
      return () => clearTimeout(timeout)
    } else {
      const timeout = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1)
        setCurrentCharIndex(0)
      }, 50)
      return () => clearTimeout(timeout)
    }
  }, [currentLineIndex, currentCharIndex, phase])

  // Build animation
  useEffect(() => {
    if (phase !== 'building') return
    if (buildProgress >= 100) {
      setTimeout(() => setPhase('deployed'), 300)
      return
    }
    const timeout = setTimeout(() => {
      setBuildProgress((prev) => Math.min(prev + Math.random() * 15 + 5, 100))
    }, 80)
    return () => clearTimeout(timeout)
  }, [phase, buildProgress])

  // Reset loop
  useEffect(() => {
    if (phase === 'deployed') {
      const timeout = setTimeout(() => {
        setDisplayedLines([])
        setCurrentLineIndex(0)
        setCurrentCharIndex(0)
        setBuildProgress(0)
        setPhase('typing')
      }, 3000)
      return () => clearTimeout(timeout)
    }
  }, [phase])

  // Syntax highlighting
  const highlightLine = (line: string) => {
    if (!line) return <span className="opacity-0">.</span>

    // Import statement
    if (line.startsWith('import')) {
      const match = line.match(/^(import)(\s*\{)([^}]+)(\}\s*from\s*)("[^"]+")(.*)$/)
      if (match) {
        return (
          <>
            <span className="text-[#c586c0]">{match[1]}</span>
            <span className="text-[#ffd700]">{match[2]}</span>
            <span className="text-[#9cdcfe]">{match[3]}</span>
            <span className="text-[#ffd700]">{match[4]}</span>
            <span className="text-[#ce9178]">{match[5]}</span>
            <span className="text-white">{match[6]}</span>
          </>
        )
      }
    }

    // Async function
    if (line.includes('async function')) {
      const match = line.match(/^(async function )(\w+)(\(\))(\s*\{)$/)
      if (match) {
        return (
          <>
            <span className="text-[#c586c0]">{match[1]}</span>
            <span className="text-[#dcdcaa]">{match[2]}</span>
            <span className="text-[#ffd700]">{match[3]}</span>
            <span className="text-white">{match[4]}</span>
          </>
        )
      }
    }

    // Const declaration
    if (line.trim().startsWith('const ')) {
      const indent = line.match(/^(\s*)/)?.[1] || ''
      const rest = line.trim()
      const match = rest.match(/^(const )(\w+)(\s*=\s*)(.*)$/)
      if (match) {
        return (
          <>
            <span className="text-white">{indent}</span>
            <span className="text-[#569cd6]">{match[1]}</span>
            <span className="text-[#9cdcfe]">{match[2]}</span>
            <span className="text-white">{match[3]}</span>
            {highlightValue(match[4])}
          </>
        )
      }
    }

    // Object properties
    if (line.match(/^\s+\w+:/)) {
      const match = line.match(/^(\s+)(\w+)(:\s*)(.*)$/)
      if (match) {
        return (
          <>
            <span className="text-white">{match[1]}</span>
            <span className="text-[#9cdcfe]">{match[2]}</span>
            <span className="text-white">{match[3]}</span>
            {highlightValue(match[4])}
          </>
        )
      }
    }

    // Await expressions
    if (line.includes('await ')) {
      const indent = line.match(/^(\s*)/)?.[1] || ''
      const rest = line.trim()

      if (rest.includes('.create(') || rest.includes('.build()') || rest.includes('.deploy(')) {
        const match = rest.match(/^(await )(\w+)\.(\w+)\(([^)]*)\)(;?)$/)
        if (match) {
          return (
            <>
              <span className="text-white">{indent}</span>
              <span className="text-[#c586c0]">{match[1]}</span>
              <span className="text-[#9cdcfe]">{match[2]}</span>
              <span className="text-white">.</span>
              <span className="text-[#dcdcaa]">{match[3]}</span>
              <span className="text-[#ffd700]">(</span>
              {match[4] && <span className="text-[#ce9178]">{match[4]}</span>}
              <span className="text-[#ffd700]">)</span>
              <span className="text-white">{match[5]}</span>
            </>
          )
        }
      }
    }

    // Closing braces
    if (line.match(/^\s*\}[;,]?$/)) {
      return <span className="text-white">{line}</span>
    }

    return <span className="text-white">{line}</span>
  }

  const highlightValue = (value: string) => {
    // String value
    if (value.startsWith('"')) {
      return <span className="text-[#ce9178]">{value}</span>
    }
    // Array of strings
    if (value.startsWith('[')) {
      const items = value.match(/"[^"]+"/g) || []
      const parts = value.split(/"[^"]+"/)
      return (
        <>
          {parts.map((part, i) => (
            <span key={i}>
              <span className="text-white">{part}</span>
              {items[i] && <span className="text-[#ce9178]">{items[i]}</span>}
            </span>
          ))}
        </>
      )
    }
    // Object start
    if (value === '{') {
      return <span className="text-white">{value}</span>
    }
    return <span className="text-white">{value}</span>
  }

  return (
    <motion.div
      className="overflow-hidden rounded-xl bg-[#1e1e1e] shadow-2xl ring-1 ring-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-white/5 bg-[#252526] px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-full bg-[#ff5f57] transition-opacity hover:opacity-80" />
          <div className="h-3 w-3 rounded-full bg-[#febc2e] transition-opacity hover:opacity-80" />
          <div className="h-3 w-3 rounded-full bg-[#28c840] transition-opacity hover:opacity-80" />
        </div>
        <div className="flex items-center gap-2 text-xs text-white/40">
          <Terminal className="h-3.5 w-3.5" />
          <span>app.ts</span>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[10px] text-white/30">TypeScript</span>
        </div>
      </div>

      {/* Code */}
      <div className="relative min-h-[320px] overflow-hidden">
        <div className="p-4 font-mono text-[13px] leading-6">
          {displayedLines.map((line, i) => (
            <div key={i} className="flex">
              <span className="mr-4 w-6 select-none text-right text-white/20">{i + 1}</span>
              <span className="flex-1">
                {highlightLine(line)}
                {i === currentLineIndex && phase === 'typing' && (
                  <motion.span
                    className="ml-px inline-block h-[18px] w-[2px] bg-[#528bff]"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.53, repeat: Infinity }}
                  />
                )}
              </span>
            </div>
          ))}
          {displayedLines.length === 0 && phase === 'typing' && (
            <div className="flex">
              <span className="mr-4 w-6 select-none text-right text-white/20">1</span>
              <motion.span
                className="inline-block h-[18px] w-[2px] bg-[#528bff]"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.53, repeat: Infinity }}
              />
            </div>
          )}
        </div>

        {/* Build Overlay */}
        {phase === 'building' && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center bg-[#1e1e1e]/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex flex-col items-center gap-4">
              <motion.div
                className="flex h-16 w-16 items-center justify-center rounded-full bg-[#252526]"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <div className="h-12 w-12 rounded-full border-2 border-transparent border-t-[#528bff] border-r-[#528bff]/30" />
              </motion.div>
              <div className="text-center">
                <p className="text-sm font-medium text-white">Building project...</p>
                <p className="mt-1 text-xs text-white/40">Compiling TypeScript</p>
              </div>
              <div className="h-1 w-48 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#528bff] to-[#28c840]"
                  initial={{ width: 0 }}
                  animate={{ width: `${buildProgress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <p className="text-xs text-white/30">{Math.round(buildProgress)}%</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Terminal Output */}
      <motion.div
        className="border-t border-white/5 bg-[#1a1a1a]"
        initial={{ height: 0 }}
        animate={{ height: phase === 'deployed' ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4">
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-white/40">$</span>
            <span className="text-[#28c840]">ilybo deploy --production</span>
          </div>
          <motion.div
            className="mt-3 flex items-center gap-2"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, delay: 0.3 }}
            >
              <CheckCircle className="h-4 w-4 text-[#28c840]" />
            </motion.div>
            <span className="text-sm text-[#28c840]">Successfully deployed to production</span>
          </motion.div>
          <motion.div
            className="mt-2 flex items-center gap-2 font-mono text-xs text-white/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span>→</span>
            <span>https://my-awesome-app.ilybo.dev</span>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-primary pt-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -left-40 bottom-40 h-60 w-60 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full bg-black/10 px-4 py-2"
            >
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
              >
                <Rocket className="h-4 w-4 text-secondary" />
              </motion.span>
              <span className="text-sm font-medium text-black">
                Trusted by 100+ businesses worldwide
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl font-black leading-[1.1] tracking-tight text-black sm:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Build{' '}
              <span className="text-secondary">Digital</span>
              <br />
              Products That
              <br />
              <span className="text-secondary">Matter</span>
            </motion.h1>

            <motion.p
              className="mt-4 max-w-lg text-base leading-relaxed text-black/70"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              We transform your ideas into powerful software solutions. From
              concept to launch, we're your trusted technology partner.
            </motion.p>

            <motion.div
              className="mt-6 flex flex-col gap-3 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button
                size="lg"
                className="group h-12 rounded-full bg-secondary px-6 text-base font-bold text-white shadow-lg transition-all hover:bg-secondary/90 hover:shadow-xl"
                onClick={openProjectWizard}
              >
                Start Your Project
                <motion.span
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group h-12 rounded-full border-2 border-black/20 bg-white/50 px-6 text-base font-bold text-black transition-all hover:bg-white"
                asChild
              >
                <a href="#how-it-works">
                  <Play className="mr-2 h-5 w-5" />
                  See How It Works
                </a>
              </Button>
            </motion.div>

            <motion.div
              className="mt-6 flex flex-wrap items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {['JD', 'MK', 'AS', 'RB'].map((initials, i) => (
                    <motion.div
                      key={i}
                      className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-primary bg-black text-xs font-bold text-white"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      whileHover={{ scale: 1.1, zIndex: 10 }}
                    >
                      {initials}
                    </motion.div>
                  ))}
                </div>
                <div className="ml-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-black text-black" />
                    ))}
                  </div>
                  <p className="text-xs text-black/60">50+ happy clients</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right - Code Editor */}
          <motion.div
            className="relative mx-auto w-full max-w-[520px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <CodeEditor />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
