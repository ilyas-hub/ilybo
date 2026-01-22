import { CheckCircle, Award, Users, Zap } from 'lucide-react'

const FEATURES = [
  'Agile Development Methodology',
  'Dedicated Project Managers',
  'Transparent Communication',
  'Quality Assurance at Every Step',
  'Post-Launch Support',
  'Scalable Solutions',
]

const STATS = [
  { icon: Award, value: '5+', label: 'Years of Excellence' },
  { icon: Users, value: '30+', label: 'Happy Clients' },
  { icon: Zap, value: '50+', label: 'Projects Delivered' },
]

export function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden py-20 lg:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -right-40 top-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          {/* Left content */}
          <div>
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              About Ilybo
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tight sm:text-4xl md:text-5xl">
              Why Choose
              <span className="text-secondary"> Us?</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              We are a team of passionate developers, designers, and strategists
              dedicated to delivering exceptional digital solutions. Our
              approach combines technical expertise with creative innovation to
              transform your ideas into reality.
            </p>
            <p className="mt-4 text-muted-foreground">
              With years of experience across various industries, we understand
              the unique challenges businesses face in the digital landscape. We
              don't just build software—we build partnerships that drive
              long-term success.
            </p>

            {/* Features list */}
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {FEATURES.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary">
                    <CheckCircle className="h-4 w-4 text-secondary-foreground" />
                  </div>
                  <span className="text-sm font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right side - Visual element */}
          <div className="relative">
            {/* Main card */}
            <div className="relative overflow-hidden rounded-3xl bg-primary p-8 lg:p-12">
              {/* Decorative elements */}
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
              <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-secondary/30" />

              <div className="relative">
                <h3 className="text-2xl font-black text-primary-foreground lg:text-3xl">
                  Building Digital Excellence Since 2019
                </h3>
                <p className="mt-4 text-primary-foreground/80">
                  From startups to enterprises, we've helped businesses of all
                  sizes achieve their digital goals.
                </p>

                {/* Stats */}
                <div className="mt-8 grid grid-cols-3 gap-4">
                  {STATS.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl bg-white/10 p-4 text-center backdrop-blur-sm"
                    >
                      <stat.icon className="mx-auto h-6 w-6 text-secondary" />
                      <div className="mt-2 text-2xl font-black text-primary-foreground lg:text-3xl">
                        {stat.value}
                      </div>
                      <div className="text-xs text-primary-foreground/70">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 rounded-2xl bg-secondary p-4 shadow-xl lg:-bottom-6 lg:-right-6 lg:p-6">
              <div className="text-center">
                <div className="text-3xl font-black text-secondary-foreground lg:text-4xl">
                  99%
                </div>
                <div className="text-xs font-semibold text-secondary-foreground/80 lg:text-sm">
                  Client Satisfaction
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
