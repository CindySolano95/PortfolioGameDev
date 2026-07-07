import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { t, tr, type Lang } from '../data/i18n'
import MagneticButton from './MagneticButton'

gsap.registerPlugin(ScrollTrigger)

const COLORS = ['var(--color-primary)', 'var(--color-secondary)', 'var(--color-accent)']
const CONTACT_PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  size: (((i * 7 + 3) % 4) + 1.5),
  color: COLORS[i % 3],
  left: `${(i * 37 + 11) % 100}%`,
  top: `${(i * 53 + 17) % 100}%`,
  duration: 5 + (i % 5) * 1.5,
  delay: (i * 0.4) % 4,
}))

interface Props { lang: Lang }

export default function Contact({ lang }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Spotlight following mouse
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      section.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
      section.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
    }
    section.addEventListener('mousemove', onMove, { passive: true })
    return () => section.removeEventListener('mousemove', onMove)
  }, [])

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: contentRef.current, start: 'top 80%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const links = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      label: 'LinkedIn',
      sublabel: 'Cindy Solano',
      href: 'https://www.linkedin.com/in/cindy-carolina-solano-caycedo-735822181',
      color: '#0A66C2',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      ),
      label: 'Email',
      sublabel: 'cindysolano.dev@gmail.com',
      href: 'mailto:cindysolano.dev@gmail.com',
      color: '#e6469a',
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="spotlight relative py-32"
    >
      {/* Background particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {CONTACT_PARTICLES.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              background: p.color,
              left: p.left,
              top: p.top,
              opacity: 0.35,
              boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
              animation: `particleDrift ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Glow center */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[100px] pointer-events-none opacity-15"
        style={{ background: 'radial-gradient(ellipse, var(--color-primary), transparent)' }}
      />

      <div ref={contentRef} className="relative z-10 max-w-3xl mx-auto px-6 text-center opacity-0">
        <h2 className="section-title mb-4">
          {tr(t.contact.title, lang)}
        </h2>
        <p className="font-body text-white/60 text-lg mb-12">
          {tr(t.contact.subtitle, lang)}
        </p>

        {/* Contact cards */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          {links.map((link, i) => (
            <MagneticButton
              key={i}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group card-glass px-6 py-5 rounded-2xl flex items-center gap-4 hover:scale-105 transition-all duration-300"
              style={{
                border: `1px solid ${link.color}25`,
                boxShadow: `0 0 0 0 ${link.color}`,
              }}
            >
              <span style={{ color: link.color }}>{link.icon}</span>
              <div className="text-left">
                <div className="font-display font-semibold text-white text-base">{link.label}</div>
                <div className="font-body text-xs text-white/50 mt-0.5">{link.sublabel}</div>
              </div>
            </MagneticButton>
          ))}
        </div>

        {/* Decorative line */}
        <div className="flex items-center gap-4 max-w-xs mx-auto">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--color-primary))' }} />
          <span className="text-white/25 text-lg">✦</span>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, var(--color-primary), transparent)' }} />
        </div>
      </div>
    </section>
  )
}
