import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { t, tr, type Lang } from '../data/i18n'

gsap.registerPlugin(ScrollTrigger)

interface Props { lang: Lang }

export default function About({ lang }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
        }
      )

      const paras = textRef.current?.querySelectorAll('p')
      if (paras) {
        gsap.fromTo(
          paras,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.15,
            scrollTrigger: { trigger: textRef.current, start: 'top 80%' },
          }
        )
      }

      gsap.fromTo(
        imageRef.current,
        { x: 60, opacity: 0, clipPath: 'inset(0 100% 0 0)' },
        {
          x: 0, opacity: 1, clipPath: 'inset(0 0% 0 0)', duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: imageRef.current, start: 'top 80%' },
        }
      )

      const statItems = statsRef.current?.querySelectorAll('.stat-item')
      if (statItems) {
        gsap.fromTo(
          statItems,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.1,
            scrollTrigger: { trigger: statsRef.current, start: 'top 85%' },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const stats = [
    { value: '3+', label: lang === 'en' ? 'Years XR Dev' : 'Años XR Dev' },
    { value: '25+', label: lang === 'en' ? 'Projects' : 'Proyectos' },
    { value: '3', label: lang === 'en' ? 'Platforms' : 'Plataformas' },
    { value: '∞', label: lang === 'en' ? 'Passion' : 'Pasión' },
  ]

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-28"
    >
      {/* Background glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full blur-[180px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--color-secondary), transparent)', opacity: 0.13 }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <h2
          ref={titleRef}
          className="section-title text-center mb-16 opacity-0"
        >
          {tr(t.about.title, lang)}
        </h2>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div ref={textRef} className="flex flex-col gap-6">
            {[t.about.p1, t.about.p2, t.about.p3].map((p, i) => (
              <p key={i} className="font-body text-white/70 leading-relaxed text-lg opacity-0">
                {tr(p, lang)}
              </p>
            ))}
            <p className="font-body text-sm text-white/45 flex items-center gap-2">
              <span style={{ color: 'var(--color-primary)' }}>◎</span>
              {tr(t.about.location, lang)}
            </p>
          </div>

          {/* Image + stats */}
          <div className="flex flex-col gap-8">
            <div
              ref={imageRef}
              className="relative rounded-[28px] overflow-hidden opacity-0"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <img
                src="/img/pERSONAJE2.png"
                alt="Cindy Solano"
                className="w-full max-w-[340px] mx-auto block object-cover"
                style={{ filter: 'drop-shadow(0 0 40px rgba(230,70,154,0.25))' }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to bottom, transparent 50%, rgba(16,8,24,0.8) 100%)',
                }}
              />
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-4 gap-4">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="stat-item card-glass p-4 rounded-2xl text-center opacity-0"
                  style={{ boxShadow: '0 0 20px rgba(230,70,154,0.06)' }}
                >
                  <div
                    className="font-display font-bold text-2xl mb-1 text-gradient-primary"
                  >
                    {s.value}
                  </div>
                  <div className="font-body text-xs text-white/50 leading-tight">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
