'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { navLinks, siteConfig } from '@/lib/data';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-surface/80 backdrop-blur-md border-b border-outline-variant/30 shadow-lg shadow-black/10'
          : 'bg-transparent'
      }`}
    >
      <div className="h-20 w-full px-6 lg:px-8 flex items-center justify-between gap-4 max-w-[1440px] mx-auto">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); handleClick('#hero'); }}
          className="flex flex-col"
        >
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary-container inline-block shadow-[0_0_8px_rgba(0,112,242,0.6)]" />
            <span className="text-label-lg tracking-wider text-on-surface uppercase font-bold">
              HARISH MURUGAN P
            </span>
          </div>
          <span className="text-label-sm text-primary tracking-widest uppercase pl-3">
            SAP FI / FICO
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-6">
          {navLinks.map((link) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
                className={`text-label-md transition-colors ${
                  isActive
                    ? 'text-primary font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <a
            href="/resume.pdf"
            download
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 bg-primary-container hover:bg-cobalt text-on-primary-container text-label-md rounded-lg transition-colors shadow-[0_0_12px_rgba(0,112,242,0.3)]"
          >
            Download Resume
          </a>
          <Image
            src={siteConfig.avatarUrl || '/images/harish-portrait.png'}
            alt="Harish Murugan P - Profile"
            width={32}
            height={32}
            className="w-8 h-8 rounded-full object-cover object-top ring-1 ring-primary/40 hidden sm:block"
            unoptimized
          />
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden p-2 text-on-surface-variant hover:text-on-surface transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="xl:hidden bg-surface-container/95 backdrop-blur-lg border-b border-outline-variant/30 overflow-hidden"
          >
            <nav className="flex flex-col px-6 py-4 gap-1">
              {navLinks.map((link) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
                    className={`py-3 px-4 rounded-lg transition-colors ${
                      isActive
                        ? 'text-primary bg-primary-container/10 font-semibold'
                        : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
              <a
                href="/resume.pdf"
                download
                className="mt-2 flex items-center justify-center px-4 py-3 bg-primary-container text-on-primary-container text-label-md rounded-lg"
              >
                Download Resume
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
