import { navLinks, siteConfig } from '@/lib/data';
import ScrollReveal from './ui/ScrollReveal';

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/30 py-space-xl">
      <ScrollReveal>
        <div className="w-full px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
              <span className="text-label-md tracking-wider text-on-surface uppercase">
                {siteConfig.name}
              </span>
            </div>
            <p className="text-body-sm text-on-surface-variant mt-1">
              {siteConfig.tagline}
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-center">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-body-sm text-on-surface-variant hover:text-on-surface transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="w-full px-6 lg:px-8 max-w-7xl mx-auto mt-6 pt-4 border-t border-outline-variant/20 flex flex-col sm:flex-row items-center justify-between text-on-surface-variant text-body-sm gap-2">
          <p>© 2024 Harish Murugan P. All rights reserved.</p>
          <p className="text-outline">Enterprise Financial Governance & Portfolio Architecture</p>
        </div>
      </ScrollReveal>
    </footer>
  );
}
