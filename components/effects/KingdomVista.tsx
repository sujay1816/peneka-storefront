'use client'

// A painted ancient-kingdom skyline silhouette sitting behind the hero's ember
// field — temple spires and palace domes backlit by a warm glow, muted enough
// to read as atmosphere rather than competing with the wordmark and copy.
export default function KingdomVista() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1400 700"
      preserveAspectRatio="xMidYMax slice"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.9 }}
    >
      <defs>
        <radialGradient id="kv-glow" cx="62%" cy="38%" r="55%">
          <stop offset="0%" stopColor="#3A2410" stopOpacity="0.9" />
          <stop offset="45%" stopColor="#1B1006" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#0E0A08" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="kv-mtn-far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#241609" />
          <stop offset="100%" stopColor="#160D05" />
        </linearGradient>
        <linearGradient id="kv-mtn-near" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#170F06" />
          <stop offset="100%" stopColor="#0E0A08" />
        </linearGradient>
        <linearGradient id="kv-palace" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#120B05" />
          <stop offset="100%" stopColor="#0A0603" />
        </linearGradient>
        <linearGradient id="kv-haze" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8B25A" stopOpacity="0" />
          <stop offset="100%" stopColor="#0E0A08" stopOpacity="0.85" />
        </linearGradient>
      </defs>

      {/* ambient glow behind the whole skyline */}
      <rect x="0" y="0" width="1400" height="700" fill="url(#kv-glow)" />

      {/* far mountain range */}
      <path
        d="M0 460 L90 380 180 435 260 350 340 420 420 340 500 410 590 355 670 425 760 360 850 430 930 370 1020 425 1110 355 1200 420 1290 365 1400 430 1400 700 0 700 Z"
        fill="url(#kv-mtn-far)" opacity="0.85"
      />

      {/* near mountain range */}
      <path
        d="M0 540 L120 470 230 520 320 455 410 510 510 460 610 515 710 465 810 520 910 470 1010 515 1110 460 1210 515 1310 465 1400 520 1400 700 0 700 Z"
        fill="url(#kv-mtn-near)"
      />

      {/* palace / temple skyline silhouette */}
      <g fill="url(#kv-palace)">
        <rect x="430" y="500" width="26" height="130" />
        <path d="M430 500 q13-26 26 0z" />
        <rect x="466" y="470" width="34" height="160" />
        <path d="M466 470 q17-32 34 0z" />
        <circle cx="483" cy="452" r="7" />
        <rect x="508" y="515" width="24" height="115" />
        <rect x="540" y="480" width="30" height="150" />
        <path d="M540 480 q15-28 30 0z" />
        <rect x="600" y="440" width="46" height="190" />
        <path d="M600 440 q23-42 46 0z" />
        <circle cx="623" cy="416" r="9" />
        <rect x="654" y="500" width="26" height="130" />
        <rect x="690" y="465" width="36" height="165" />
        <path d="M690 465 q18-30 36 0z" />
        <rect x="734" y="510" width="24" height="120" />
        <rect x="766" y="475" width="32" height="155" />
        <path d="M766 475 q16-28 32 0z" />
        <circle cx="782" cy="458" r="7" />
        <rect x="806" y="440" width="46" height="190" />
        <path d="M806 440 q23-42 46 0z" />
        <rect x="860" y="505" width="26" height="125" />
        <rect x="896" y="472" width="34" height="158" />
        <path d="M896 472 q17-30 34 0z" />
        <rect x="938" y="518" width="22" height="112" />
        <rect x="968" y="485" width="28" height="145" />
      </g>

      {/* two taller central spires with finials, echoing the brand's gold accents */}
      <g stroke="#DDA119" strokeWidth="1.4" opacity="0.75">
        <path d="M623 416 V396" />
        <path d="M623 396 q7-3 7 4 q0 6-7 5z" fill="#DDA119" stroke="none" />
        <path d="M782 458 V440" />
        <path d="M782 440 q6-3 6 4 q0 6-6 5z" fill="#DDA119" stroke="none" />
      </g>

      {/* faint temple flags */}
      <g fill="#9A3324" opacity="0.6">
        <path d="M623 396 l10 4 -10 4z" />
        <path d="M782 440 l9 3.5 -9 3.5z" />
      </g>

      {/* ground haze so the base of the buildings fades into the dark foreground */}
      <rect x="0" y="0" width="1400" height="700" fill="url(#kv-haze)" />
    </svg>
  )
}
