import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { t, tr, type Lang } from '../data/i18n'
import { useTilt } from '../hooks/useTilt'

interface Props { lang: Lang }

function SkillCard({
  title, items, icon, color, lang, index,
}: {
  title: { en: string; es: string }
  items: { en: string[]; es: string[] }
  icon: string
  color: string
  lang: Lang
  index: number
}) {
  const { ref: tiltRef, onMouseMove, onMouseLeave } = useTilt(8)
  const cardRef = useRef<HTMLDivElement>(null)
  const inView = useInView(cardRef, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 }}
    >
      <div
        ref={tiltRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="relative card-glass p-8 rounded-[28px] h-full group overflow-hidden"
        style={{
          transition: 'transform 0.12s ease, box-shadow 0.3s ease',
          willChange: 'transform',
        }}
      >
        {/* Hover bg shimmer */}
        <div
          className="absolute inset-0 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
          style={{ background: `linear-gradient(135deg, ${color}08, transparent 60%)` }}
        />
        {/* Border glow on hover */}
        <div
          className="absolute inset-0 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
          style={{ boxShadow: `inset 0 0 0 1px ${color}30` }}
        />

        {/* Icon */}
        <motion.div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6"
          style={{
            background: `linear-gradient(135deg, ${color}22, ${color}0a)`,
            border: `1px solid ${color}35`,
            boxShadow: `0 0 20px ${color}18`,
          }}
          whileHover={{ scale: 1.12, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        >
          {icon}
        </motion.div>

        <h3 className="font-display font-bold text-xl mb-5 text-white" style={{ textShadow: `0 0 20px ${color}30` }}>
          {tr(title, lang)}
        </h3>

        <ul className="flex flex-col gap-3">
          {items[lang].map((item, i) => (
            <motion.li
              key={i}
              className="flex items-start gap-3 text-white/65 text-sm font-body leading-snug"
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.15 + 0.3 + i * 0.07, duration: 0.4 }}
            >
              <span
                className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full"
                style={{ background: color, boxShadow: `0 0 5px ${color}` }}
              />
              {item}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

export default function Skills({ lang }: Props) {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' })

  const skillsData = [
    { title: t.skills.unity.title, items: t.skills.unity.items, icon: '◈', color: '#e6469a' },
    { title: t.skills.xr.title, items: t.skills.xr.items, icon: '⬡', color: '#7b5cff' },
    { title: t.skills.multiplayer.title, items: t.skills.multiplayer.items, icon: '◉', color: '#ffd166' },
  ]

  return (
    <section
      id="skills"
      className="relative py-28"
    >
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[160px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--color-primary), transparent)', opacity: 0.14 }}
      />
      <div
        className="absolute left-0 -bottom-24 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--color-secondary), transparent)', opacity: 0.12 }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          ref={titleRef}
          className="section-title text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {tr(t.skills.title, lang)}
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {skillsData.map((s, i) => (
            <SkillCard key={i} {...s} lang={lang} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
