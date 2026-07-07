import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface Star {
  x: number; y: number; r: number
  base: number; phase: number; speed: number
  parallax: number
}

interface Shooter {
  x: number; y: number; vx: number; vy: number
  age: number; maxAge: number; tailLen: number
}

const NEBULAS = [
  { x: 0.1,  y: 0.08, r: 0.50, rgb: '123,92,255',  a: 0.10 },
  { x: 0.85, y: 0.18, r: 0.45, rgb: '230,70,154',  a: 0.08 },
  { x: 0.50, y: 0.52, r: 0.42, rgb: '123,92,255',  a: 0.07 },
  { x: 0.08, y: 0.75, r: 0.38, rgb: '255,209,102', a: 0.05 },
  { x: 0.88, y: 0.68, r: 0.44, rgb: '230,70,154',  a: 0.07 },
  { x: 0.45, y: 0.88, r: 0.40, rgb: '123,92,255',  a: 0.06 },
]

function makeStars(): Star[] {
  return [
    ...Array.from({ length: 200 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 0.55 + 0.15,
      base: Math.random() * 0.35 + 0.1,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.006 + 0.002,
      parallax: 0,
    })),
    ...Array.from({ length: 90 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 0.75 + 0.4,
      base: Math.random() * 0.4 + 0.2,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.009 + 0.004,
      parallax: Math.random() * 0.08 + 0.02,
    })),
    ...Array.from({ length: 30 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.1 + 0.8,
      base: Math.random() * 0.45 + 0.3,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.012 + 0.006,
      parallax: Math.random() * 0.15 + 0.08,
    })),
  ]
}

function startAnimation(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  reduced: boolean,
): () => void {
  let W = 0, H = 0, scrollY = 0, raf = 0
  const shooters: Shooter[] = []
  let nextShoot = 4500
  const stars = makeStars()

  function resize() {
    W = window.innerWidth
    H = window.innerHeight
    canvas.width = W
    canvas.height = H
  }
  resize()

  const onScroll = () => { scrollY = window.scrollY }
  const onResize = () => resize()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize)

  function draw(t: number) {
    ctx.clearRect(0, 0, W, H)

    // Nebula clouds
    for (const n of NEBULAS) {
      const gx = n.x * W
      const gy = n.y * H
      const radius = n.r * Math.max(W, H) * 0.6
      const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, radius)
      grad.addColorStop(0,   `rgba(${n.rgb},${n.a})`)
      grad.addColorStop(0.5, `rgba(${n.rgb},${n.a * 0.4})`)
      grad.addColorStop(1,   `rgba(${n.rgb},0)`)
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, W, H)
    }

    // Stars with parallax scroll
    for (const s of stars) {
      const opacity = s.base + Math.sin(t * s.speed + s.phase) * 0.2
      const rawY = s.y * H - scrollY * s.parallax
      const y = ((rawY % H) + H) % H
      ctx.globalAlpha = Math.max(0, Math.min(1, opacity))
      ctx.beginPath()
      ctx.arc(s.x * W, y, s.r, 0, Math.PI * 2)
      ctx.fillStyle = '#ffffff'
      ctx.fill()
    }
    ctx.globalAlpha = 1

    // Shooting stars
    if (!reduced) {
      if (t > nextShoot) {
        nextShoot = t + 5500 + Math.random() * 9000
        const goLeft = Math.random() > 0.5
        shooters.push({
          x: goLeft ? W * 0.1 + Math.random() * W * 0.4 : W * 0.5 + Math.random() * W * 0.4,
          y: H * 0.05 + Math.random() * H * 0.35,
          vx: goLeft ? 5 : -5,
          vy: 2.8,
          age: 0, maxAge: 50,
          tailLen: 100 + Math.random() * 70,
        })
      }

      for (let i = shooters.length - 1; i >= 0; i--) {
        const ss = shooters[i]
        const p = ss.age / ss.maxAge
        const alpha = p < 0.25 ? p / 0.25 : 1 - (p - 0.25) / 0.75
        const dist = Math.hypot(ss.vx, ss.vy)
        const tx = ss.x - (ss.vx / dist) * ss.tailLen
        const ty = ss.y - (ss.vy / dist) * ss.tailLen
        const grad = ctx.createLinearGradient(ss.x, ss.y, tx, ty)
        grad.addColorStop(0,    `rgba(255,255,255,${alpha * 0.95})`)
        grad.addColorStop(0.35, `rgba(210,220,255,${alpha * 0.5})`)
        grad.addColorStop(1,    'rgba(200,210,255,0)')
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(ss.x, ss.y)
        ctx.lineTo(tx, ty)
        ctx.stroke()
        ss.x += ss.vx
        ss.y += ss.vy
        ss.age++
        if (ss.age >= ss.maxAge) shooters.splice(i, 1)
      }
    }

    raf = requestAnimationFrame(draw)
  }

  raf = requestAnimationFrame(draw)

  return () => {
    cancelAnimationFrame(raf)
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onResize)
  }
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    return startAnimation(canvas, ctx, reduced)
  }, [reduced])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
