'use client'
import { useEffect, useRef } from 'react'

// Full-page ambient ember field — continuously drifting warm particles across
// the whole viewport. Runs independently of any button hover state; this is
// the constant "the page feels alive" layer. Ported from the approved
// landing-page mockup's particle engine.
export default function EmberField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Respect the user's reduced-motion preference — this is a pure JS
    // requestAnimationFrame loop, so the CSS-level reduced-motion rules
    // elsewhere in the site can't reach it; skip the animation entirely.
    const prefersReducedMotion = typeof window !== 'undefined'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    let vw = 0, vh = 0
    const dpr = window.devicePixelRatio || 1

    function size() {
      vw = window.innerWidth
      vh = window.innerHeight
      canvas!.width = vw * dpr
      canvas!.height = vh * dpr
      canvas!.style.width = vw + 'px'
      canvas!.style.height = vh + 'px'
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    size()
    window.addEventListener('resize', size)

    const COUNT = 95
    type Ember = {
      x: number; y: number; vy: number; vx: number; r: number
      baseAlpha: number; wob: number; wobSpeed: number; wobAmp: number
      flick: number; flickSpeed: number; hue: 0 | 1
    }
    function makeEmber(seedY?: number): Ember {
      return {
        x: Math.random() * vw,
        y: seedY !== undefined ? seedY : Math.random() * vh,
        vy: -(0.2 + Math.random() * 0.75),
        vx: (Math.random() - 0.5) * 0.28,
        r: 0.7 + Math.random() * 3.1,
        baseAlpha: 0.25 + Math.random() * 0.65,
        wob: Math.random() * Math.PI * 2,
        wobSpeed: 0.005 + Math.random() * 0.018,
        wobAmp: 8 + Math.random() * 30,
        flick: Math.random() * Math.PI * 2,
        flickSpeed: 0.025 + Math.random() * 0.06,
        hue: Math.random() < 0.6 ? 0 : 1,
      }
    }
    const embers: Ember[] = Array.from({ length: COUNT }, () => makeEmber())

    let raf = 0
    function tick() {
      ctx!.clearRect(0, 0, vw, vh)
      embers.forEach(p => {
        p.wob += p.wobSpeed
        p.flick += p.flickSpeed
        p.y += p.vy
        p.x += p.vx + Math.sin(p.wob) * p.wobAmp * 0.02
        if (p.y < -20 || p.x < -20 || p.x > vw + 20) {
          Object.assign(p, makeEmber(vh + Math.random() * 40))
        }
        const alpha = p.baseAlpha * (0.6 + Math.sin(p.flick) * 0.4)
        const rad = p.r
        const grad = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, rad * 3.8)
        if (p.hue === 0) {
          grad.addColorStop(0, `rgba(255,225,160,${alpha.toFixed(3)})`)
          grad.addColorStop(0.4, `rgba(221,161,25,${(alpha * 0.55).toFixed(3)})`)
          grad.addColorStop(1, `rgba(180,80,20,0)`)
        } else {
          grad.addColorStop(0, `rgba(255,190,150,${alpha.toFixed(3)})`)
          grad.addColorStop(0.4, `rgba(193,68,47,${(alpha * 0.5).toFixed(3)})`)
          grad.addColorStop(1, `rgba(120,30,15,0)`)
        }
        ctx!.fillStyle = grad
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, rad * 3.8, 0, Math.PI * 2)
        ctx!.fill()
      })
      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      window.removeEventListener('resize', size)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  )
}
