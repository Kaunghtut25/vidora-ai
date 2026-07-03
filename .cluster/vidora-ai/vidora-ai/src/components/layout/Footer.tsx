import Link from 'next/link';

const footerLinks = {
  product: [
    { label: 'Features', href: '/#features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Voices', href: '/#voices' },
    { label: 'API', href: '/api' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#0D0D0D] border-t border-white/5 py-12 px-6 shrink-0">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand + Address */}
          <div>
            <Link href="/" className="inline-block text-xl font-bold text-white mb-3">
              VidoraAI
            </Link>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs mb-4">
              Create stunning videos with AI-powered voiceovers, visuals, and
              production tools. Built for creators who demand quality and speed.
            </p>
            <div className="text-xs text-white/40 leading-relaxed">
              <p className="font-medium text-white/60">Vidora AI Inc.</p>
              <p>350 Fifth Avenue, Suite 3300</p>
              <p>New York, NY 10118, USA</p>
              <p className="mt-1">+1 (212) 555-0199</p>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4">
              Product
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/40 hover:text-white/80 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/40 hover:text-white/80 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/40 hover:text-white/80 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/5 text-center text-sm text-white/30">
          &copy; {new Date().getFullYear()} Vidora AI Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
