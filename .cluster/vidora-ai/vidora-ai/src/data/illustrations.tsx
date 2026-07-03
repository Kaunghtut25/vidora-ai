// Vidora AI — Hero illustrations & decorative images
// Beautiful SVG scene illustrations for key pages

export const HeroIllustration = () => (
  <svg viewBox="0 0 600 400" fill="none" className="w-full h-full">
    <defs>
      <linearGradient id="screenGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.05" />
      </linearGradient>
    </defs>
    
    {/* Laptop/Monitor */}
    <g transform="translate(300,180)">
      {/* Screen */}
      <rect x="-180" y="-120" width="360" height="220" rx="12" fill="#0D0D1A" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.6" />
      {/* Screen content - video timeline */}
      <rect x="-160" y="-100" width="320" height="160" rx="6" fill="url(#screenGrad)" />
      {/* Play button */}
      <circle cx="0" cy="-30" r="25" fill="#8B5CF6" opacity="0.3" />
      <polygon points="-8,-38 10,-30 -8,-22" fill="white" opacity="0.8" />
      {/* Timeline bar */}
      <rect x="-140" y="45" width="280" height="4" rx="2" fill="white" opacity="0.1" />
      <rect x="-140" y="45" width="120" height="4" rx="2" fill="#8B5CF6" opacity="0.6" />
      {/* Chapter markers */}
      <circle cx="-40" cy="47" r="3" fill="#06B6D4" opacity="0.5" />
      <circle cx="40" cy="47" r="3" fill="#EC4899" opacity="0.5" />
      <circle cx="120" cy="47" r="3" fill="#F59E0B" opacity="0.5" />
      {/* Waveform */}
      {Array.from({ length: 40 }).map((_, i) => (
        <rect key={i} x={-130 + i * 7} y={-10 + Math.sin(i * 0.5) * 15} width="4" height={Math.abs(Math.sin(i * 0.7)) * 25 + 3} rx="2" fill="white" opacity={0.1 + i * 0.005} />
      ))}
    </g>
    
    {/* Floating elements */}
    <g opacity="0.4">
      {/* Voice badge */}
      <rect x="420" y="60" width="80" height="32" rx="16" fill="#8B5CF6" opacity="0.1" />
      <circle cx="440" cy="76" r="8" fill="#8B5CF6" opacity="0.3" />
      <text x="454" y="81" fill="#8B5CF6" fontSize="10" fontWeight="bold">Sophia</text>
      
      {/* Length badge */}
      <rect x="430" y="180" width="70" height="28" rx="14" fill="#06B6D4" opacity="0.1" />
      <text x="465" y="198" textAnchor="middle" fill="#06B6D4" fontSize="10" fontWeight="bold">15 min</text>
      
      {/* Floating star */}
      <g transform="translate(80,70)">
        <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="20s" repeatCount="indefinite" />
        <polygon points="0,-12 3,-4 12,-4 5,2 7,10 0,6 -7,10 -5,2 -12,-4 -3,-4" fill="#F59E0B" opacity="0.3" />
      </g>
      
      {/* Floating sparkle */}
      <g transform="translate(500,300)">
        <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="-360 0 0" dur="15s" repeatCount="indefinite" />
        <path d="M0,-8 L2,-2 L8,0 L2,2 L0,8 L-2,2 L-8,0 L-2,-2 Z" fill="#EC4899" opacity="0.4" />
      </g>
    </g>
    
    {/* Bottom decorative elements */}
    <g opacity="0.2">
      <circle cx="50" cy="360" r="40" stroke="#8B5CF6" strokeWidth="1" fill="none" />
      <circle cx="550" cy="350" r="25" stroke="#06B6D4" strokeWidth="1" fill="none" />
      <line x1="100" y1="380" x2="500" y2="380" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" />
    </g>
  </svg>
);

export const DashboardIllustration = () => (
  <svg viewBox="0 0 500 300" fill="none" className="w-full h-full">
    {/* Cards */}
    {[0, 1, 2].map((i) => (
      <g key={i} transform={`translate(${20 + i * 160}, 30)`}>
        <rect width="145" height="100" rx="10" fill="white" fillOpacity="0.03" stroke="white" strokeWidth="0.5" strokeOpacity="0.1" />
        <rect x="10" y="50" width="60" height="8" rx="4" fill="#8B5CF6" opacity={0.3 + i * 0.1} />
        <rect x="10" y="65" width="40" height="6" rx="3" fill="white" opacity={0.1 + i * 0.05} />
        <circle cx="125" cy="20" r="4" fill={['#10B981', '#8B5CF6', '#F59E0B'][i]} opacity="0.6" />
        <rect x="10" y="12" width="80" height="6" rx="3" fill="white" opacity="0.15" />
      </g>
    ))}
    
    {/* Chart bars */}
    <g transform="translate(30,170)">
      {[30, 55, 40, 70, 50, 85, 45].map((h, i) => (
        <rect key={i} x={i * 55} y={90 - h} width="40" height={h} rx="4" fill="#8B5CF6" opacity={0.15 + i * 0.08}>
          <animate attributeName="height" from="0" to={h} dur="1s" fill="freeze" begin={`${i * 0.1}s`} />
          <animate attributeName="y" from="90" to={90 - h} dur="1s" fill="freeze" begin={`${i * 0.1}s`} />
        </rect>
      ))}
    </g>
    
    {/* Status dot */}
    <circle cx="460" cy="20" r="5" fill="#10B981">
      <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
    </circle>
  </svg>
);

export const AuthIllustration = () => (
  <svg viewBox="0 0 300 300" fill="none" className="w-full h-full opacity-60">
    <defs>
      <linearGradient id="shieldGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#06B6D4" />
      </linearGradient>
    </defs>
    {/* Shield */}
    <path d="M150 40L220 70V150C220 210 150 270 150 270C150 270 80 210 80 150V70L150 40Z" stroke="url(#shieldGrad)" strokeWidth="2" fill="url(#shieldGrad)" fillOpacity="0.05" />
    {/* Check inside shield */}
    <path d="M125 155L142 172L180 134" stroke="url(#shieldGrad)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.8" />
    {/* Orbiting dots */}
    {[0, 72, 144, 216, 288].map((angle, i) => (
      <g key={i} transform={`translate(150,150) rotate(${angle})`}>
        <circle cx="0" cy="-100" r="3" fill={['#8B5CF6', '#06B6D4', '#EC4899', '#F59E0B', '#10B981'][i]} opacity="0.3">
          <animateTransform attributeName="transform" type="rotate" from={`0 150 150`} to="360 150 150" dur="12s" repeatCount="indefinite" begin={`${i * 0.5}s`} />
        </circle>
      </g>
    ))}
  </svg>
);

export const EmptyStateIllustration = () => (
  <svg viewBox="0 0 200 160" fill="none" className="w-full h-full opacity-40">
    {/* Box */}
    <rect x="60" y="40" width="80" height="90" rx="10" stroke="white" strokeWidth="1.5" fill="white" fillOpacity="0.02" />
    {/* Lines inside */}
    <rect x="75" y="55" width="50" height="4" rx="2" fill="white" opacity="0.1" />
    <rect x="75" y="65" width="35" height="4" rx="2" fill="white" opacity="0.08" />
    <rect x="75" y="75" width="45" height="4" rx="2" fill="white" opacity="0.06" />
    {/* Film icon */}
    <rect x="85" y="95" width="30" height="20" rx="4" stroke="#8B5CF6" strokeWidth="1" opacity="0.5" />
  </svg>
);
