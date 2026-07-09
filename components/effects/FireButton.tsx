'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

// A button/link with a layered 3D bevel and a rising-ember canvas overlay.
// Embers drift gently at idle and intensify (denser, faster, more scattered)
// on hover. Ported from the approved landing-page mockup's particle engine.
export default function FireButton({
  href, onClick, children, variant = 'primary', className = '', style,
}: {
  href?: string
  onClick?: () => void
  children: React.ReactNode
  variant?: 'primary' | 'ghost'
  className?: string
  style?: React.CSSProperties
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const btnRef = useRef<HTMLDivElement>(null)
  const [hovering, setHovering] = useState(false)
  const hoveringRef = useRef(false)
  useEffect(() => { hoveringRef.current = hovering }, [hovering])

  useEffect(() => {
    if (variant !== 'primary') return
    const canvas = canvasRef.current
    const btn = btnRef.current
    if (!canvas || !btn) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0, h = 0
    const dpr = window.devicePixelRatio || 1
    function size() {
      const r = canvas!.getBoundingClientRect()
      w = r.width; h = r.height
      canvas!.width = w * dpr; canvas!.height = h * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    size()
    window.addEventListener('resize', size)

    type P = {
      x: number; y: number; vx: number; vy: number; life: number; decay: number
      r: number; hue: 0 | 1; wob: number; wobSpeed: number; flick: number
    }
    let particles: P[] = []
    const MAX = 90

    function spawn(intensity: number) {
      const bw = btn!.getBoundingClientRect().width
      const px = w / 2 + (Math.random() - 0.5) * Math.min(bw, w) * (0.55 + Math.random() * 0.35)
      particles.push({
        x: px, y: h - 2 - Math.random() * 4,
        vx: (Math.random() - 0.5) * (1.2 + intensity * 1.8),
        vy: -(0.5 + Math.random() * 1.1 + intensity * 1.4),
        life: 1,
        decay: 0.010 + Math.random() * 0.026,
        r: 0.9 + Math.random() * 2.6,
        hue: Math.random() < 0.55 ? 0 : 1,
        wob: Math.random() * Math.PI * 2,
        wobSpeed: 0.08 + Math.random() * 0.22,
        flick: 0.6 + Math.random() * 0.4,
      })
      if (particles.length > MAX) particles.shift()
    }

    let raf = 0
    function tick() {
      ctx!.clearRect(0, 0, w, h)
      const isHovering = hoveringRef.current
      const intensity = isHovering ? 1 : 0.22
      const spawnChance = isHovering ? 1.5 : 0.35
      let n = spawnChance
      while (n > 0) { if (Math.random() < Math.min(n, 1)) spawn(intensity); n -= 1 }

      particles = particles.filter(p => p.life > 0)
      particles.forEach(p => {
        p.wob += p.wobSpeed
        const flicker = p.flick + Math.sin(p.wob * 1.7) * 0.15
        p.x += p.vx + Math.sin(p.wob) * 0.6
        p.y += p.vy
        p.vy *= 0.978
        p.vx *= 0.99
        p.life -= p.decay
        const alpha = Math.max(0, p.life) * flicker
        const rad = p.r * (0.45 + p.life * 0.7)
        const grad = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, rad * 3)
        if (p.hue === 0) {
          grad.addColorStop(0, `rgba(255,244,214,${(alpha * 0.95).toFixed(2)})`)
          grad.addColorStop(0.35, `rgba(255,181,64,${(alpha * 0.7).toFixed(2)})`)
          grad.addColorStop(1, `rgba(200,70,20,0)`)
        } else {
          grad.addColorStop(0, `rgba(255,220,150,${(alpha * 0.9).toFixed(2)})`)
          grad.addColorStop(0.4, `rgba(221,161,25,${(alpha * 0.55).toFixed(2)})`)
          grad.addColorStop(1, `rgba(140,50,10,0)`)
        }
        ctx!.fillStyle = grad
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, rad * 3, 0, Math.PI * 2)
        ctx!.fill()
      })
      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => { window.removeEventListener('resize', size); cancelAnimationFrame(raf) }
  }, [variant])

  const baseStyle: React.CSSProperties = variant === 'primary'
    ? {
        position: 'relative', fontWeight: 700, fontSize: 13, letterSpacing: '.1em', textTransform: 'uppercase',
        padding: '16px 30px', cursor: 'pointer', border: '1px solid transparent',
        transition: 'transform .18s ease, box-shadow .25s ease', display: 'inline-flex', alignItems: 'center', gap: 8,
        background: 'linear-gradient(180deg, #F3C24A 0%, #DDA119 45%, #A9670F 100%)', color: '#2A1904',
        boxShadow: hovering
          ? 'inset 0 1px 0 rgba(255,235,180,.7), inset 0 -3px 6px rgba(90,45,5,.5), 0 0 34px rgba(255,175,40,.55), 0 14px 26px rgba(221,161,25,.35), 0 2px 0 #7A4C0C'
          : 'inset 0 1px 0 rgba(255,235,180,.6), inset 0 -3px 6px rgba(90,45,5,.5), 0 10px 22px rgba(221,161,25,.28), 0 2px 0 #7A4C0C',
        transform: hovering ? 'translateY(-2px)' : 'translateY(0)',
        ...style,
      }
    : {
        position: 'relative', fontWeight: 700, fontSize: 13, letterSpacing: '.1em', textTransform: 'uppercase',
        padding: '16px 30px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
        border: `1px solid ${hovering ? 'var(--gold)' : 'var(--border-strong, rgba(221,161,25,.32))'}`,
        color: hovering ? 'var(--gold)' : 'var(--text-primary)',
        background: 'rgba(255,255,255,.02)',
        boxShadow: hovering ? '0 0 20px rgba(221,161,25,.15)' : 'none',
        transition: 'all .2s',
        ...style,
      }

  const content = (
    <div
      ref={btnRef}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={onClick}
      className={className}
      style={baseStyle}
    >
      {children}
      {variant === 'primary' && (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          style={{ position: 'absolute', left: '50%', bottom: '100%', transform: 'translateX(-50%)', width: 140, height: 70, pointerEvents: 'none', opacity: hovering ? 1 : 0.55, transition: 'opacity .3s' }}
        />
      )}
    </div>
  )

  if (href) return <Link href={href} style={{ textDecoration: 'none' }}>{content}</Link>
  return content
}
