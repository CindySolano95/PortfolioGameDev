import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects, type ProjectCategory } from '../data/projects'
import { t, tr, type Lang } from '../data/i18n'
import ProjectCard from './ProjectCard'
import MagneticButton from './MagneticButton'

gsap.registerPlugin(ScrollTrigger)

interface Props { lang: Lang }

type Filter = 'all' | ProjectCategory

export default function ProjectCarousel({ lang }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [filter, setFilter] = useState<Filter>('all')
  const [centerIdx, setCenterIdx] = useState(0)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollStart = useRef(0)

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.category === filter)

  // Entrance animation
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
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Scroll to center card
  const scrollToCard = (idx: number) => {
    const track = trackRef.current
    if (!track) return
    const cards = track.querySelectorAll('.carousel-card')
    const card = cards[idx] as HTMLElement
    if (!card) return
    const trackCenter = track.clientWidth / 2
    const cardCenter = card.offsetLeft + card.clientWidth / 2
    track.scrollTo({ left: cardCenter - trackCenter, behavior: 'smooth' })
  }

  const goTo = (idx: number) => {
    const clamped = Math.max(0, Math.min(idx, filtered.length - 1))
    setCenterIdx(clamped)
    scrollToCard(clamped)
  }

  // Reset center when filter changes
  useEffect(() => {
    setCenterIdx(0)
    setTimeout(() => scrollToCard(0), 50)
  }, [filter])

  // Drag to scroll
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true
    startX.current = e.clientX
    scrollStart.current = trackRef.current?.scrollLeft ?? 0
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return
    const dx = e.clientX - startX.current
    trackRef.current.scrollLeft = scrollStart.current - dx
  }

  const onMouseUp = () => {
    isDragging.current = false
    snapToNearest()
  }

  const snapToNearest = () => {
    const track = trackRef.current
    if (!track) return
    const cards = Array.from(track.querySelectorAll('.carousel-card')) as HTMLElement[]
    const trackCenter = track.scrollLeft + track.clientWidth / 2
    let nearest = 0
    let minDist = Infinity
    cards.forEach((card, i) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2
      const dist = Math.abs(cardCenter - trackCenter)
      if (dist < minDist) { minDist = dist; nearest = i }
    })
    goTo(nearest)
  }

  const filters: { key: Filter; label: { en: string; es: string } }[] = [
    { key: 'all', label: t.portfolio.filterAll },
    { key: 'ar', label: t.portfolio.filterAr },
    { key: 'vr', label: t.portfolio.filterVr },
    { key: 'games', label: t.portfolio.filterGames },
  ]

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative py-28 overflow-x-clip"
    >
      {/* BG glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[160px] pointer-events-none opacity-08"
        style={{ background: 'radial-gradient(circle, var(--color-secondary), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <h2 ref={titleRef} className="section-title text-center mb-6 opacity-0">
          {tr(t.portfolio.title, lang)}
        </h2>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2">
            {filters.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300"
                style={{
                  background: filter === key
                    ? 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))'
                    : 'rgba(255,255,255,0.06)',
                  border: filter === key ? 'none' : '1px solid rgba(255,255,255,0.1)',
                  color: filter === key ? 'white' : 'rgba(255,255,255,0.6)',
                  boxShadow: filter === key ? '0 4px 16px rgba(230,70,154,0.3)' : 'none',
                }}
              >
                {tr(label, lang)}
              </button>
            ))}
          </div>

          {/* CV Downloads */}
          <div className="flex gap-2">
            <MagneticButton
              href="/img/CV/CV_CindySolano_EN-comprimido.pdf"
              download
              className="px-4 py-2 text-xs font-semibold rounded-full border border-white/15 text-white/70 hover:text-white hover:border-white/30 transition-all duration-200"
            >
              ↓ CV (EN)
            </MagneticButton>
            <MagneticButton
              href="/img/CV/CV_CindySolano_ES-comprimido.pdf"
              download
              className="px-4 py-2 text-xs font-semibold rounded-full border border-white/15 text-white/70 hover:text-white hover:border-white/30 transition-all duration-200"
            >
              ↓ CV (ES)
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Carousel track */}
      <div
        ref={trackRef}
        className="flex items-center gap-6 overflow-x-auto pb-8 px-[calc(50vw-150px)]"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          cursor: isDragging.current ? 'grabbing' : 'grab',
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {filtered.map((project, i) => (
          <div
            key={project.id}
            className="carousel-card flex-shrink-0 transition-all duration-400"
            style={{
              opacity: i === centerIdx ? 1 : 0.5,
              transform: i === centerIdx ? 'scale(1)' : 'scale(0.88)',
              filter: i === centerIdx ? 'none' : 'blur(1px)',
            }}
            onClick={() => goTo(i)}
          >
            <ProjectCard project={project} lang={lang} isCenter={i === centerIdx} />
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between mt-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => goTo(centerIdx - 1)}
            disabled={centerIdx === 0}
            className="w-10 h-10 rounded-full card-glass flex items-center justify-center text-white/70 hover:text-white disabled:opacity-25 transition-all"
          >
            ←
          </button>
          <button
            onClick={() => goTo(centerIdx + 1)}
            disabled={centerIdx === filtered.length - 1}
            className="w-10 h-10 rounded-full card-glass flex items-center justify-center text-white/70 hover:text-white disabled:opacity-25 transition-all"
          >
            →
          </button>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center gap-1.5">
          {filtered.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === centerIdx ? 24 : 6,
                height: 6,
                background: i === centerIdx
                  ? 'var(--color-primary)'
                  : 'rgba(255,255,255,0.2)',
              }}
            />
          ))}
        </div>

        <span className="text-sm text-white/40 font-body">
          {centerIdx + 1} / {filtered.length}
        </span>
      </div>
    </section>
  )
}
