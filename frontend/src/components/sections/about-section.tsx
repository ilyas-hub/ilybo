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
    <section id="about" className="relative overflow-hidden bg-secondary py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          {/* Left content */}
          <div>
            <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-2 text-sm font-bold text-white">
              About IlyBo
            </span>
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
              Why Choose <span className="text-primary">Us?</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/80">
              We are a team of passionate developers, designers, and strategists
              dedicated to delivering exceptional digital solutions. Our
              approach combines technical expertise with creative innovation.
            </p>
            <p className="mt-4 text-white/60">
              With years of experience across various industries, we understand
              the unique challenges businesses face in the digital landscape.
            </p>

            {/* Features list */}
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {FEATURES.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary">
                    <CheckCircle className="h-4 w-4 text-black" />
                  </div>
                  <span className="text-sm font-medium text-white">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right side - Card */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-xl lg:p-12">
              <h3 className="text-2xl font-black text-black lg:text-3xl">
                Building Digital Excellence Since 2019
              </h3>
              <p className="mt-4 text-black/60">
                From startups to enterprises, we've helped businesses of all
                sizes achieve their digital goals.
              </p>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                {STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl bg-primary/40 p-4 text-center"
                  >
                    <stat.icon className="mx-auto h-6 w-6 text-secondary" />
                    <div className="mt-2 text-2xl font-black text-black lg:text-3xl">
                      {stat.value}
                    </div>
                    <div className="text-xs text-black/60">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 rounded-2xl bg-primary p-4 shadow-xl lg:-bottom-6 lg:-right-6 lg:p-6">
              <div className="text-center">
                <div className="text-3xl font-black text-secondary lg:text-4xl">99%</div>
                <div className="text-xs font-semibold text-black/70 lg:text-sm">
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
