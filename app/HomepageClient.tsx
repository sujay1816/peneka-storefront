'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import EmberField from '@/components/effects/EmberField'
import FireButton from '@/components/effects/FireButton'
import type { SiteConfig, Category, Product, Banner } from '@/types'

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } } }
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }

// Flavour stat-card copy for each launch character. Keyed by category slug so
// it lines up with whatever categories actually exist in the database — if a
// new character category is added without an entry here, the card just shows
// its name and design count without the extra flavour text, rather than breaking.
const ROSTER_FLAVOUR: Record<string, { house: string; weapon: string; temper: string; line: string; emblem: string }> = {
  bheema: {
    house: 'Hastinapura', weapon: 'Gada, 90kg', temper: 'Zero to forest-uprooting',
    line: 'The one who never learned to lose an argument quietly.',
    emblem: '<ellipse cx="20" cy="12" rx="8" ry="9"/><path d="M20 3v-2M13 6l-3-3M27 6l3-3M11 15l-3-1M29 15l3-1M20 21v16M15 37h10"/>',
  },
  arjuna: {
    house: 'Indraprastha', weapon: 'Gandiva', temper: 'Calm, then devastating',
    line: 'Doubted himself for one whole chapter. Still showed up.',
    emblem: '<path d="M27 4C15 10 15 30 27 36" fill="none"/><path d="M27 4L27 36" stroke-dasharray="2 3"/><path d="M13 20h16M24 15l6 5-6 5"/>',
  },
  karna: {
    house: 'Anga', weapon: 'Vijaya, cursed', temper: 'Loyal past the point of sense',
    line: 'Chose the harder side because it was still his side.',
    emblem: '<circle cx="20" cy="20" r="7.5"/><path d="M20 4v5M20 31v5M4 20h5M31 20h5M9 9l3.5 3.5M27.5 27.5 31 31M31 9l-3.5 3.5M12.5 27.5 9 31"/>',
  },
  hanuman: {
    house: 'Kishkindha', weapon: 'His own scale', temper: 'Devotion with a flight plan',
    line: 'Crossed an ocean because someone needed a message delivered.',
    emblem: '<path d="M4 32L15 12l7 11 5-7 9 16z"/><path d="M15 12l3 6M27 16l2 4"/>',
  },
  rama: {
    house: 'Ayodhya', weapon: 'Kodanda', temper: 'Duty before comfort, always',
    line: 'Gave up a throne rather than break a promise.',
    emblem: '<path d="M26 12C17 16 17 28 26 32" fill="none"/><path d="M26 12L26 32" stroke-dasharray="2 3"/><path d="M13 22h13"/>',
  },
  krishna: {
    house: 'Dwaraka', weapon: 'Sudarshana Chakra', temper: 'Three steps ahead, always smiling',
    line: 'Won the war without lifting the weapon everyone expected.',
    emblem: '<circle cx="20" cy="20" r="9"/><circle cx="20" cy="20" r="3"/><path d="M20 11v-4M20 33v-4M11 20h-4M33 20h-4M13.6 13.6 10.8 10.8M29.2 29.2 26.4 26.4M26.4 13.6 29.2 10.8M10.8 29.2 13.6 26.4"/>',
  },
}

export default function HomepageClient({ config, categories, featured, bestsellers, newArrivals, banners, occasions = [], userId }: {
  config: SiteConfig; categories: Category[]; featured: Product[]; bestsellers: Product[]; newArrivals: Product[]; banners: Banner[]; occasions?: any[]; userId?: string
}) {
  const brandName = config.brand_name || 'Pinaka'
  const roster = categories.filter(c => ROSTER_FLAVOUR[c.slug]).slice(0, 6)

  return (
    <div style={{ position: 'relative', background: 'var(--ivory)', color: 'var(--text-primary)' }}>
      <EmberField />

      {/* ================= ACT I — HERO ================= */}
      <section style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 28px 80px' }}>
        <motion.div initial="hidden" animate="visible" variants={stagger} style={{ position: 'relative', zIndex: 2, maxWidth: 780 }}>
          <motion.span variants={fadeUp} className="actlabel" style={{ marginBottom: 36 }}>
            [ ACT.I ] &nbsp;::&nbsp; THE_FIRST_ARROW &nbsp;::&nbsp; <b style={{ color: 'var(--text-secondary)', fontWeight: 400 }}>3000 BCE &rarr; NOW</b>
          </motion.span>
          <div className="brand-strike-wrap brand-cycle-wrap" style={{ width: '100%' }}>
            <motion.h1 variants={fadeUp} className="brand-strike-text brand-cycle-en" style={{
              fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 96, lineHeight: 1, letterSpacing: '.02em', margin: 0,
              background: 'linear-gradient(180deg, var(--gold-light), var(--gold) 55%, var(--gold-dark))',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
            }}>{brandName.toUpperCase()}</motion.h1>
            <motion.h1 variants={fadeUp} className="brand-strike-text brand-cycle-dev" style={{
              fontFamily: "'Tiro Devanagari Sanskrit', serif", fontWeight: 400, fontSize: 90, lineHeight: 1, letterSpacing: '.02em', margin: 0,
              background: 'linear-gradient(180deg, var(--gold-light), var(--gold) 55%, var(--gold-dark))',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
            }}>{(config as any).brand_name_devanagari || 'पिनाक'}</motion.h1>
            <svg className="brand-strike-bolt" viewBox="0 0 60 180" fill="none" aria-hidden="true">
              <path d="M34 0 L14 78 L30 78 L20 180 L48 66 L30 66 Z" fill="#FFF7E0" />
              <path d="M34 0 L14 78 L30 78 L20 180 L48 66 L30 66 Z" fill="none" stroke="#FFE8A8" strokeWidth="2" opacity="0.8" />
            </svg>
          </div>
          <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, margin: '26px 0 34px', color: 'var(--text-secondary)', fontSize: 13, letterSpacing: '.14em', textTransform: 'uppercase' }}>
            <span style={{ width: 52, height: 1, background: 'linear-gradient(90deg, transparent, var(--border-strong, rgba(221,161,25,.32)))' }} />
            <span style={{ fontFamily: 'var(--font-voice)', fontSize: 18, color: 'var(--gold)' }}>पिनाक</span>
            <span style={{ width: 52, height: 1, background: 'linear-gradient(90deg, var(--border-strong, rgba(221,161,25,.32)), transparent)' }} />
          </motion.div>
          <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 42, lineHeight: 1.15, marginBottom: 22 }}>
            Wear the <em style={{ fontStyle: 'normal', color: 'var(--crimson)' }}>epics.</em>
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontFamily: 'var(--font-voice)', fontStyle: 'italic', fontSize: 20, color: '#D9CBA8', maxWidth: 480, margin: '0 auto 12px', lineHeight: 1.6 }}>
            The war never ended. It just <b style={{ color: 'var(--gold-light)', fontWeight: 600, fontStyle: 'normal' }}>changed its uniform.</b>
          </motion.p>
          <motion.p variants={fadeUp} style={{ fontFamily: 'var(--font-voice)', fontStyle: 'italic', fontSize: 20, color: '#D9CBA8', maxWidth: 480, margin: '0 auto 12px', lineHeight: 1.6 }}>
            Six warriors. One cotton standard each. Pre-printed, in stock, ready for Monday.
          </motion.p>
          <motion.div variants={fadeUp} style={{ display: 'flex', gap: 14, justifyContent: 'center', marginTop: 34, flexWrap: 'wrap' }}>
            <FireButton href="/shop" variant="primary">Shop now &rarr;</FireButton>
            <FireButton href="#roster" variant="ghost">Explore warriors</FireButton>
          </motion.div>
        </motion.div>
      </section>

      <ActDivider icon={<path d="M12 3v18M3 12h18" />} />

      {/* ================= ACT II — SCRIPTURE ================= */}
      <section style={{ position: 'relative', zIndex: 1, padding: '20px 28px 100px', textAlign: 'center' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <span className="actlabel" style={{ marginBottom: 30 }}>[ ACT.II ] &nbsp;::&nbsp; THE_VOW</span>
          <p style={{ fontFamily: "'Tiro Devanagari Sanskrit', serif", fontSize: 26, color: 'var(--gold)', margin: '26px 0', lineHeight: 1.8 }}>यदा यदा हि धर्मस्य ग्लानिर्भवति भारत</p>
          <p style={{ fontFamily: 'var(--font-voice)', fontStyle: 'italic', fontSize: 27, lineHeight: 1.65 }}>&ldquo;Whenever the old order frays, something rises to hold the line.&rdquo;</p>
          <p style={{ marginTop: 22, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>&mdash; Bhagavad Gita, paraphrased</p>
        </div>
      </section>

      <ActDivider icon={<path d="M12 2l2.5 7h7.5l-6 5 2.5 7-6-4.5-6 4.5 2.5-7-6-5h7.5z" />} />

      {/* ================= ACT III — ROSTER ================= */}
      <section id="roster" style={{ position: 'relative', zIndex: 1, padding: '20px 0 110px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px' }}>
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 60px' }}>
            <span className="actlabel" style={{ marginBottom: 22 }}>[ ACT.III ] &nbsp;::&nbsp; THE_ROSTER</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 36, margin: '14px 0' }}>Six warriors. Six standards.</h2>
            <p style={{ fontFamily: 'var(--font-voice)', fontStyle: 'italic', fontSize: 17, color: 'var(--text-secondary)' }}>Every legend had a build. Find yours.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 1, background: 'var(--border)', border: '1px solid var(--border)' }}>
            {roster.map((cat, i) => {
              const f = ROSTER_FLAVOUR[cat.slug]
              return (
                <Link key={cat.id} href={`/shop/${cat.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ background: 'var(--ivory)', padding: '34px 26px', height: '100%' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)', marginBottom: 18 }}>0{i + 1}</div>
                    <svg viewBox="0 0 40 40" fill="none" stroke="var(--gold)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ width: 44, height: 44, marginBottom: 18 }} dangerouslySetInnerHTML={{ __html: f.emblem }} />
                    <div style={{ fontFamily: 'var(--font-voice)', fontSize: 21, color: 'var(--gold-light)' }}>{cat.name}</div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 18, letterSpacing: '.03em', marginBottom: 12 }}>{cat.name}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 16, fontFamily: 'var(--font-mono)', fontSize: 11 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '.06em' }}>House</span><span style={{ color: 'var(--gold)' }}>{f.house}</span></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '.06em' }}>Weapon</span><span style={{ color: 'var(--gold)' }}>{f.weapon}</span></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '.06em' }}>Temper</span><span style={{ color: 'var(--gold)' }}>{f.temper}</span></div>
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, borderTop: '1px solid var(--border)', paddingTop: 14 }}>{f.line}</div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <ActDivider icon={<><path d="M12 2v20M4 8l8-6 8 6" /></>} />

      {/* ================= ACT IV — THEN/NOW ================= */}
      <section style={{ position: 'relative', zIndex: 1, padding: '20px 0 110px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px' }}>
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 60px' }}>
            <span className="actlabel" style={{ marginBottom: 22 }}>[ ACT.IV ] &nbsp;::&nbsp; THE_UPGRADE</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 36, margin: '14px 0' }}>Same war. Better fabric.</h2>
            <p style={{ fontFamily: 'var(--font-voice)', fontStyle: 'italic', fontSize: 17, color: 'var(--text-secondary)' }}>Some things about being a warrior never change.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', border: '1px solid var(--border)' }}>
            <div style={{ padding: '44px 34px', background: 'var(--cream)' }}>
              <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 28, color: 'var(--text-secondary)' }}>5000 BCE</span>
              {[['Armor', 'Bronze plate, 40 lbs'], ['Range', 'One kingdom, on foot'], ['Comms', 'Conch shell, line of sight'], ['Endurance test', '18-day war'], ['Post-battle recovery', 'Divine intervention']].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '14px 0', borderBottom: '1px solid var(--border)', fontSize: 14 }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{k}</span>
                  <span style={{ fontFamily: 'var(--font-voice)', fontStyle: 'italic', fontSize: 16 }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px', fontFamily: 'var(--font-heading)', color: 'var(--crimson)', fontSize: 13, letterSpacing: '.1em', background: 'var(--ivory)' }}>VS</div>
            <div style={{ padding: '44px 34px', background: 'var(--ivory)' }}>
              <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 28, color: 'var(--gold)' }}>NOW</span>
              {[['Armor', '240 GSM cotton, 0.4 lbs'], ['Range', 'Anywhere COD reaches'], ['Comms', 'One WhatsApp order confirmation'], ['Endurance test', '18-hour flight, still fresh'], ['Post-battle recovery', 'Machine wash, tumble dry low']].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '14px 0', borderBottom: '1px solid var(--border)', fontSize: 14 }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{k}</span>
                  <span style={{ color: 'var(--gold-light)', fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ActDivider icon={<><circle cx="12" cy="12" r="3" /><path d="M12 5v-2M12 21v-2M5 12h-2M21 12h-2M7 7l-1.5-1.5M18.5 18.5L17 17M17 7l1.5-1.5M5.5 18.5L7 17" /></>} />

      {/* ================= ACT V — MANIFESTO ================= */}
      <section style={{ position: 'relative', zIndex: 1, padding: '20px 28px 110px', textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <span className="actlabel" style={{ marginBottom: 30 }}>[ ACT.V ] &nbsp;::&nbsp; THE_MANIFESTO</span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 34, lineHeight: 1.3, margin: '26px 0' }}>The stories didn&rsquo;t end.<br />They just went <em style={{ fontStyle: 'normal', color: 'var(--crimson)' }}>quiet</em> for a while.</h2>
          <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: 16 }}>Every kid who grew up hearing these names knew, on some level, that they weren&rsquo;t just bedtime stories. They were blueprints. For patience. For rage held one breath too long. For showing up when the whole side has already decided the fight is lost.</p>
          <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: 16 }}>We&rsquo;re not making costumes. We&rsquo;re making the thing you reach for on the day you need to remember who you actually are.</p>
          <p style={{ marginTop: 30, fontFamily: "'Tiro Devanagari Sanskrit', serif", fontSize: 20, color: 'var(--gold)' }}>॥ जय ॥</p>
        </div>
      </section>
    </div>
  )
}

function ActDivider({ icon }: { icon: React.ReactNode }) {
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px', position: 'relative', zIndex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, padding: '70px 0' }}>
        <span style={{ height: 1, width: 100, background: 'linear-gradient(90deg, transparent, var(--border-strong, rgba(221,161,25,.32)))' }} />
        <svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth={1.2} style={{ width: 26, height: 26 }}>{icon}</svg>
        <span style={{ height: 1, width: 100, background: 'linear-gradient(90deg, var(--border-strong, rgba(221,161,25,.32)), transparent)' }} />
      </div>
    </div>
  )
}
