// Beautiful SVG gradient thumbnails for project cards
export const projectThumbnails: Record<string, React.ReactNode> = {
  'proj-001': (
    <svg viewBox="0 0 400 225" className="w-full h-full">
      <defs>
        <linearGradient id="bagan" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="50%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
        <filter id="sun"><feGaussianBlur stdDeviation="8"/></filter>
      </defs>
      <rect width="400" height="225" fill="url(#bagan)" />
      <circle cx="320" cy="40" r="30" fill="#FCD34D" filter="url(#sun)" opacity="0.8" />
      <circle cx="320" cy="40" r="15" fill="#FEF3C7" />
      <g opacity="0.3" fill="white">
        <rect x="50" y="140" width="80" height="85" rx="4" />
        <rect x="140" y="120" width="60" height="105" rx="3" />
        <rect x="210" y="150" width="70" height="75" rx="4" />
        <rect x="290" y="130" width="50" height="95" rx="3" />
      </g>
      <ellipse cx="200" cy="225" rx="250" ry="40" fill="rgba(0,0,0,0.15)" />
      <g transform="translate(180,80)" fill="none" stroke="white" strokeWidth="2" opacity="0.5">
        <circle cx="20" cy="0" r="3" fill="white" />
        <path d="M0 20 Q10 10 20 20" />
        <path d="M0 30 Q10 20 20 30" />
      </g>
      <text x="200" y="200" textAnchor="middle" fill="white" fontSize="11" fontWeight="600" opacity="0.9">
        🇲🇲 Bagan Sunrise
      </text>
    </svg>
  ),
  'proj-002': (
    <svg viewBox="0 0 400 225" className="w-full h-full">
      <defs>
        <linearGradient id="ai" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      <rect width="400" height="225" fill="url(#ai)" />
      <g opacity="0.15" fill="white">
        <rect x="30" y="30" width="340" height="165" rx="12" />
        <rect x="50" y="50" width="300" height="20" rx="4" />
        <rect x="50" y="80" width="200" height="15" rx="3" />
        <rect x="50" y="105" width="260" height="15" rx="3" />
        <rect x="50" y="130" width="180" height="15" rx="3" />
        <rect x="50" y="155" width="220" height="15" rx="3" />
      </g>
      <g transform="translate(320,160)" fill="none" stroke="white" strokeWidth="2" opacity="0.5">
        <circle cx="0" cy="0" r="35" />
        <path d="M-20 0 L20 0 M0 -20 L0 20 M-14 -14 L14 14 M14 -14 L-14 14" strokeWidth="1" opacity="0.3"/>
        <circle cx="0" cy="0" r="8" fill="white" opacity="0.3" />
      </g>
      <text x="200" y="200" textAnchor="middle" fill="white" fontSize="11" fontWeight="600" opacity="0.9">
        🤖 AI Revolution 2026
      </text>
    </svg>
  ),
  'proj-003': (
    <svg viewBox="0 0 400 225" className="w-full h-full">
      <defs>
        <linearGradient id="smart" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
      </defs>
      <rect width="400" height="225" fill="url(#smart)" />
      <g transform="translate(200,100)" fill="none" stroke="white" opacity="0.2">
        <rect x="-60" y="-50" width="120" height="100" rx="16" strokeWidth="2" />
        <circle cx="0" cy="-10" r="20" strokeWidth="1.5" />
        <line x1="-20" y1="15" x2="20" y2="15" strokeWidth="1" />
        <line x1="-15" y1="25" x2="15" y2="25" strokeWidth="1" />
      </g>
      <g transform="translate(120,40)" fill="none" stroke="white" opacity="0.15">
        <rect x="0" y="0" width="160" height="90" rx="12" />
        <circle cx="30" cy="30" r="15" />
        <rect x="60" y="20" width="80" height="8" rx="4" />
        <rect x="60" y="35" width="60" height="8" rx="4" />
      </g>
      <text x="200" y="200" textAnchor="middle" fill="white" fontSize="11" fontWeight="600" opacity="0.9">
        🏠 Smart Home Hub Launch
      </text>
    </svg>
  ),
  'proj-004': (
    <svg viewBox="0 0 400 225" className="w-full h-full">
      <defs>
        <linearGradient id="culture" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#DC2626" />
        </linearGradient>
      </defs>
      <rect width="400" height="225" fill="url(#culture)" />
      <g opacity="0.2" fill="white" transform="translate(200,100)">
        <rect x="-80" y="-40" width="160" height="80" rx="8" />
        <polygon points="0,-30 -60,40 60,40" fill="none" stroke="white" strokeWidth="2" />
      </g>
      <g transform="translate(100,60)" fill="none" stroke="white" opacity="0.2">
        <circle cx="0" cy="0" r="25" />
        <circle cx="0" cy="0" r="15" />
        <circle cx="0" cy="0" r="5" fill="white" />
        <path d="M-30 -30 L-15 -15 M30 -30 L15 -15 M-30 30 L-15 15 M30 30 L15 15" />
      </g>
      <text x="200" y="200" textAnchor="middle" fill="white" fontSize="10" fontWeight="600" opacity="0.9">
        🏛️ မြန်မာ့ရိုးရာ သင်္ကေတများ
      </text>
    </svg>
  ),
  'proj-005': (
    <svg viewBox="0 0 400 225" className="w-full h-full">
      <defs>
        <linearGradient id="food" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>
      <rect width="400" height="225" fill="url(#food)" />
      <g opacity="0.15" fill="white">
        <rect x="60" y="40" width="280" height="60" rx="30" />
        <circle cx="100" cy="70" r="8" />
        <circle cx="200" cy="70" r="8" />
        <circle cx="300" cy="70" r="8" />
        <rect x="80" y="120" width="100" height="8" rx="4" />
        <rect x="80" y="135" width="60" height="8" rx="4" />
        <circle cx="140" cy="160" r="12" />
      </g>
      <text x="200" y="200" textAnchor="middle" fill="white" fontSize="11" fontWeight="600" opacity="0.9">
        🍜 Yangon Street Food Vlog
      </text>
    </svg>
  ),
  'proj-006': (
    <svg viewBox="0 0 400 225" className="w-full h-full">
      <defs>
        <linearGradient id="leader" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E3A5F" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>
      </defs>
      <rect width="400" height="225" fill="url(#leader)" />
      <g opacity="0.12" fill="white">
        <rect x="30" y="30" width="160" height="80" rx="8" />
        <rect x="50" y="50" width="120" height="8" rx="4" />
        <rect x="50" y="65" width="80" height="8" rx="4" />
        <rect x="220" y="30" width="150" height="80" rx="8" />
        <rect x="240" y="50" width="110" height="8" rx="4" />
        <rect x="240" y="65" width="70" height="8" rx="4" />
      </g>
      <g transform="translate(200,145)" fill="none" stroke="white" opacity="0.15">
        <path d="M-60,0 L60,0 M-40,-20 L40,20 M-40,20 L40,-20" strokeWidth="2"/>
      </g>
      <text x="200" y="200" textAnchor="middle" fill="white" fontSize="10" fontWeight="600" opacity="0.9">
        📊 Leadership in Digital Age
      </text>
    </svg>
  ),
};

// CSS gradient class names as fallback
export const projectGradients: Record<string, string> = {
  'proj-001': 'from-orange-500 via-red-500 to-purple-600',
  'proj-002': 'from-cyan-500 to-blue-600',
  'proj-003': 'from-purple-600 to-pink-500',
  'proj-004': 'from-amber-500 to-red-600',
  'proj-005': 'from-emerald-500 to-teal-600',
  'proj-006': 'from-blue-900 to-indigo-600',
};
