// Vidora AI — Brand Assets
// SVG-based logo system with multiple variants

export const VidoraLogo = ({ size = 32, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <defs>
      <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="50%" stopColor="#A855F7" />
        <stop offset="100%" stopColor="#06B6D4" />
      </linearGradient>
      <linearGradient id="logoGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
      <filter id="logoGlow">
        <feGaussianBlur stdDeviation="1.5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    {/* Outer hex ring */}
    <path
      d="M24 4L44 14V34L24 44L4 34V14L24 4Z"
      stroke="url(#logoGrad)"
      strokeWidth="2.5"
      fill="none"
      opacity="0.6"
    />
    {/* Inner shape */}
    <path
      d="M24 10L38 17V31L24 38L10 31V17L24 10Z"
      fill="url(#logoGrad2)"
      opacity="0.15"
      stroke="url(#logoGrad)"
      strokeWidth="1.5"
    />
    {/* Play triangle */}
    <path
      d="M20 18L30 24L20 30V18Z"
      fill="url(#logoGrad)"
      filter="url(#logoGlow)"
    />
    {/* Sparkle dots */}
    <circle cx="36" cy="12" r="1.5" fill="#06B6D4" opacity="0.8" />
    <circle cx="14" cy="36" r="1" fill="#8B5CF6" opacity="0.6" />
    <circle cx="38" cy="30" r="1" fill="#EC4899" opacity="0.5" />
  </svg>
);

export const VidoraWordmark = ({ className = '' }: { className?: string }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <VidoraLogo size={36} />
    <span className="font-black text-xl tracking-tight">
      Vidora<span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">AI</span>
    </span>
  </div>
);

// Feature illustrations as SVG
export const FeatureIllustrations = {
  deepResearch: (
    <svg viewBox="0 0 200 160" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="drGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <rect width="200" height="160" rx="16" fill="url(#drGrad)" />
      {/* Brain nodes */}
      <circle cx="60" cy="50" r="8" fill="#8B5CF6" opacity="0.6">
        <animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="100" cy="40" r="6" fill="#A855F7" opacity="0.5">
        <animate attributeName="r" values="6;8;6" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="140" cy="55" r="7" fill="#06B6D4" opacity="0.4">
        <animate attributeName="r" values="7;9;7" dur="1.8s" repeatCount="indefinite" />
      </circle>
      <circle cx="80" cy="90" r="5" fill="#EC4899" opacity="0.4" />
      <circle cx="130" cy="100" r="6" fill="#8B5CF6" opacity="0.3" />
      {/* Connecting lines */}
      <line x1="60" y1="50" x2="100" y2="40" stroke="#8B5CF6" strokeWidth="1" opacity="0.3" />
      <line x1="100" y1="40" x2="140" y2="55" stroke="#A855F7" strokeWidth="1" opacity="0.3" />
      <line x1="60" y1="50" x2="80" y2="90" stroke="#06B6D4" strokeWidth="1" opacity="0.3" />
      <line x1="80" y1="90" x2="130" y2="100" stroke="#EC4899" strokeWidth="1" opacity="0.3" />
      <line x1="140" y1="55" x2="130" y2="100" stroke="#8B5CF6" strokeWidth="1" opacity="0.3" />
      {/* Search magnifier */}
      <circle cx="160" cy="130" r="14" stroke="#06B6D4" strokeWidth="2" opacity="0.5" />
      <line x1="170" y1="140" x2="182" y2="152" stroke="#06B6D4" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  ),
  
  cinematic: (
    <svg viewBox="0 0 200 160" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="cinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EC4899" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#F97316" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <rect width="200" height="160" rx="16" fill="url(#cinGrad)" />
      {/* Film strip */}
      <rect x="30" y="30" width="140" height="100" rx="8" stroke="#EC4899" strokeWidth="1.5" opacity="0.4" fill="none" />
      {/* Frame holes */}
      {[45, 95, 145].map((x, i) => (
        <g key={i}>
          <rect x={x-3} y="22" width="6" height="8" rx="1" fill="#EC4899" opacity="0.3" />
          <rect x={x-3} y="130" width="6" height="8" rx="1" fill="#EC4899" opacity="0.3" />
        </g>
      ))}
      {/* Film frames */}
      <rect x="45" y="45" width="35" height="25" rx="3" stroke="#EC4899" strokeWidth="1" opacity="0.3" />
      <rect x="85" y="45" width="35" height="25" rx="3" stroke="#EC4899" strokeWidth="1" opacity="0.3" />
      <rect x="125" y="45" width="35" height="25" rx="3" stroke="#EC4899" strokeWidth="1" opacity="0.3" />
      <rect x="45" y="85" width="35" height="25" rx="3" stroke="#EC4899" strokeWidth="1" opacity="0.3" />
      <rect x="85" y="85" width="35" height="25" rx="3" stroke="#F97316" strokeWidth="1" opacity="0.3" />
      {/* Play icon center */}
      <circle cx="135" cy="97" r="12" fill="#EC4899" opacity="0.15" />
      <polygon points="131,91 141,97 131,103" fill="#EC4899" opacity="0.6" />
    </svg>
  ),

  voices: (
    <svg viewBox="0 0 200 160" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="vcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <rect width="200" height="160" rx="16" fill="url(#vcGrad)" />
      {/* Waveform bars */}
      {[30, 50, 70, 90, 110, 130, 150, 170].map((x, i) => {
        const heights = [20, 35, 25, 50, 30, 45, 28, 15];
        return (
          <rect
            key={i}
            x={x}
            y={80 - heights[i] / 2}
            width="8"
            height={heights[i]}
            rx="4"
            fill="#06B6D4"
            opacity={0.2 + i * 0.08}
          >
            <animate attributeName="height" values={`${heights[i]};${heights[i] * 0.6};${heights[i]}`} dur="1.5s" repeatCount="indefinite" begin={`${i * 0.15}s`} />
            <animate attributeName="y" values={`${80 - heights[i] / 2};${80 - heights[i] * 0.3};${80 - heights[i] / 2}`} dur="1.5s" repeatCount="indefinite" begin={`${i * 0.15}s`} />
          </rect>
        );
      })}
      {/* Mic icon */}
      <circle cx="60" cy="45" r="18" stroke="#06B6D4" strokeWidth="2" opacity="0.5" />
      <rect x="54" y="45" width="12" height="20" rx="6" fill="#06B6D4" opacity="0.3" />
      <line x1="60" y1="65" x2="60" y2="80" stroke="#06B6D4" strokeWidth="2" opacity="0.4" />
      <line x1="50" y1="80" x2="70" y2="80" stroke="#06B6D4" strokeWidth="2" opacity="0.4" strokeLinecap="round" />
      {/* Flag badges */}
      <rect x="140" y="20" width="36" height="24" rx="6" fill="#8B5CF6" opacity="0.15" />
      <text x="158" y="36" textAnchor="middle" fill="#8B5CF6" fontSize="12" fontWeight="bold" opacity="0.6">EN</text>
      <rect x="155" y="50" width="36" height="24" rx="6" fill="#F59E0B" opacity="0.15" />
      <text x="173" y="66" textAnchor="middle" fill="#F59E0B" fontSize="12" fontWeight="bold" opacity="0.6">MM</text>
    </svg>
  ),
};

// App icon for PWA/favicon
export const AppIcon = () => (
  <svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="appBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0A0A0F" />
        <stop offset="100%" stopColor="#1A1025" />
      </linearGradient>
      <linearGradient id="appGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="50%" stopColor="#A855F7" />
        <stop offset="100%" stopColor="#06B6D4" />
      </linearGradient>
    </defs>
    <rect width="512" height="512" rx="112" fill="url(#appBg)" />
    {/* Glow behind logo */}
    <circle cx="256" cy="240" r="100" fill="#8B5CF6" opacity="0.08" filter="blur(40px)" />
    {/* Hex ring */}
    <path d="M256 60L430 150V330L256 420L82 330V150L256 60Z" stroke="url(#appGrad)" strokeWidth="12" fill="none" opacity="0.5" />
    <path d="M256 110L390 180V300L256 370L122 300V180L256 110Z" fill="#8B5CF6" opacity="0.1" stroke="url(#appGrad)" strokeWidth="6" />
    {/* Play icon */}
    <path d="M220 180L320 255L220 330V180Z" fill="url(#appGrad)" />
  </svg>
);

// Hero background gradient mesh
export const HeroBackground = `
  radial-gradient(ellipse at 20% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
  radial-gradient(ellipse at 80% 20%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
  radial-gradient(ellipse at 50% 80%, rgba(236, 72, 153, 0.08) 0%, transparent 50%),
  #050508
`;
