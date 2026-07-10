'use client'

// A literal cart/chariot wheel — thick rim with visible felloe (segment) joints,
// 12 chunky tapered spokes, and a center hub with a bolt — rather than an
// abstract geometric dharma-chakra pattern. Sits very faint behind the hero,
// rotating slowly. Ties to mythology (the chariot wheel of the epics) while
// reading as a real object rather than a generic symbol.
export default function CartWheel({ style }: { style?: React.CSSProperties }) {
  const spokes = Array.from({ length: 12 })
  const felloeJoints = Array.from({ length: 12 })

  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden="true"
      style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 820, maxWidth: '150vw', ...style }}
    >
      <defs>
        <linearGradient id="cw-rim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#EDBB40" />
          <stop offset="55%" stopColor="#DDA119" />
          <stop offset="100%" stopColor="#8A5A16" />
        </linearGradient>
      </defs>

      {/* outer rim (tyre) */}
      <circle cx="200" cy="200" r="168" fill="none" stroke="url(#cw-rim)" strokeWidth="10" />
      {/* inner rim edge, slightly separated to read as a wooden felloe band */}
      <circle cx="200" cy="200" r="150" fill="none" stroke="url(#cw-rim)" strokeWidth="4" opacity="0.7" />

      {/* felloe segment joints around the rim */}
      {felloeJoints.map((_, i) => {
        const a = (i * 30 * Math.PI) / 180
        const x1 = 200 + 145 * Math.cos(a)
        const y1 = 200 + 145 * Math.sin(a)
        const x2 = 200 + 173 * Math.cos(a)
        const y2 = 200 + 173 * Math.sin(a)
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#8A5A16" strokeWidth="2" opacity="0.6" />
      })}

      {/* spokes: chunky, tapered from hub to rim */}
      {spokes.map((_, i) => {
        const a = (i * 30 * Math.PI) / 180
        const innerR = 34
        const outerR = 150
        const x1 = 200 + innerR * Math.cos(a)
        const y1 = 200 + innerR * Math.sin(a)
        const x2 = 200 + outerR * Math.cos(a)
        const y2 = 200 + outerR * Math.sin(a)
        return (
          <line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="url(#cw-rim)"
            strokeWidth="9"
            strokeLinecap="round"
          />
        )
      })}

      {/* hub */}
      <circle cx="200" cy="200" r="36" fill="none" stroke="url(#cw-rim)" strokeWidth="8" />
      <circle cx="200" cy="200" r="34" fill="#070708" opacity="0.5" />
      {/* center bolt */}
      <circle cx="200" cy="200" r="11" fill="url(#cw-rim)" />
      <circle cx="200" cy="200" r="4" fill="#070708" opacity="0.6" />
    </svg>
  )
}
