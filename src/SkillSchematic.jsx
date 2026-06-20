import React from 'react';

// Signature element: a vaporwave grid-horizon with a gradient sun,
// carrying the workflow nodes (hardware -> systems -> applications)
// across it like instruments laid over a synth-grid landscape.
export default function SkillSchematic() {
  return (
    <svg
      viewBox="0 0 920 360"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto', display: 'block' }}
    >
      <defs>
        <linearGradient id="sunGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ff9d76" />
          <stop offset="45%" stopColor="#ff6ec7" />
          <stop offset="100%" stopColor="#b46eff" />
        </linearGradient>
        <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1c1535" />
          <stop offset="100%" stopColor="#0d0a1a" />
        </linearGradient>
        <clipPath id="frameClip">
          <rect x="0" y="0" width="920" height="360" />
        </clipPath>
        <linearGradient id="groundFade" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0d0a1a" stopOpacity="0" />
          <stop offset="100%" stopColor="#0d0a1a" stopOpacity="1" />
        </linearGradient>
      </defs>

      <g clipPath="url(#frameClip)">
        {/* sky */}
        <rect x="0" y="0" width="920" height="200" fill="url(#skyGrad)" />

        {/* sun */}
        <circle cx="460" cy="150" r="68" fill="url(#sunGrad)" opacity="0.9" />
        {/* sun scanlines for retro feel */}
        <g stroke="#0d0a1a" strokeWidth="4" opacity="0.5">
          <line x1="392" y1="172" x2="528" y2="172" />
          <line x1="396" y1="186" x2="524" y2="186" />
          <line x1="400" y1="200" x2="520" y2="200" />
          <line x1="406" y1="214" x2="514" y2="214" />
        </g>

        {/* horizon line */}
        <line x1="0" y1="200" x2="920" y2="200" stroke="#5ffbf1" strokeWidth="1.5" opacity="0.6" />

        {/* perspective ground grid */}
        <g stroke="#ff6ec7" strokeWidth="1" opacity="0.45">
          <line x1="460" y1="200" x2="40" y2="360" />
          <line x1="460" y1="200" x2="190" y2="360" />
          <line x1="460" y1="200" x2="340" y2="360" />
          <line x1="460" y1="200" x2="460" y2="360" />
          <line x1="460" y1="200" x2="580" y2="360" />
          <line x1="460" y1="200" x2="730" y2="360" />
          <line x1="460" y1="200" x2="880" y2="360" />
        </g>
        <g stroke="#5ffbf1" strokeWidth="1" opacity="0.35">
          <line x1="120" y1="220" x2="800" y2="220" />
          <line x1="40" y1="250" x2="880" y2="250" />
          <line x1="-60" y1="290" x2="980" y2="290" />
          <line x1="-220" y1="340" x2="1140" y2="340" />
        </g>

        {/* fade so the bottom blends to the panel background */}
        <rect x="0" y="230" width="920" height="130" fill="url(#groundFade)" />
      </g>

      {/* workflow nodes, laid over the grid */}
      <g>
        <rect x="50" y="44" width="210" height="58" fill="#161029" stroke="#5ffbf1" strokeWidth="1.5" />
        <text x="155" y="65" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9.5" letterSpacing="1" fill="#ff6ec7">HARDWARE SUPPORT</text>
        <text x="155" y="84" textAnchor="middle" fontFamily="Source Sans 3, sans-serif" fontSize="13" fontWeight="600" fill="#f0eaf5">Deployment &amp; Repair</text>
      </g>

      <g>
        <rect x="355" y="44" width="210" height="58" fill="#161029" stroke="#ff6ec7" strokeWidth="2" />
        <text x="460" y="65" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9.5" letterSpacing="1" fill="#5ffbf1">WEB DEVELOPMENT</text>
        <text x="460" y="84" textAnchor="middle" fontFamily="Source Sans 3, sans-serif" fontSize="13" fontWeight="600" fill="#f0eaf5">React, PHP &amp; MySQL</text>
      </g>

      <g>
        <rect x="660" y="44" width="210" height="58" fill="#161029" stroke="#5ffbf1" strokeWidth="1.5" strokeDasharray="5 4" />
        <text x="765" y="65" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9.5" letterSpacing="1" fill="#ff6ec7">DESKTOP &amp; APP DEV</text>
        <text x="765" y="84" textAnchor="middle" fontFamily="Source Sans 3, sans-serif" fontSize="13" fontWeight="600" fill="#f0eaf5">Currently exploring</text>
      </g>

      {/* connector lines down to output */}
      <g stroke="#b46eff" strokeWidth="1.5" fill="none" opacity="0.8">
        <path d="M 155 102 L 155 300 L 380 300" />
        <path d="M 460 102 L 460 300" />
        <path d="M 765 102 L 765 300 L 540 300" />
      </g>
      <circle cx="155" cy="300" r="3" fill="#5ffbf1" />
      <circle cx="460" cy="300" r="3" fill="#5ffbf1" />
      <circle cx="765" cy="300" r="3" fill="#5ffbf1" />

      {/* output node */}
      <g>
        <rect x="345" y="300" width="230" height="48" fill="#ff6ec7" />
        <text x="460" y="319" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="1" fill="#0d0a1a">OUTPUT</text>
        <text x="460" y="337" textAnchor="middle" fontFamily="Source Sans 3, sans-serif" fontSize="12.5" fontWeight="600" fill="#0d0a1a">Reliable, end-to-end builds</text>
      </g>
    </svg>
  );
}
