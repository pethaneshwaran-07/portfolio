'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { usePortfolioContent } from '@/lib/usePortfolioContent';
import HeroPortrait from './HeroPortrait';

export default function Hero() {
  const { data } = usePortfolioContent();
  const { siteConfig, heroIntro, heroBadges } = data;
  return (
    <section className="relative w-full px-6 lg:px-8 py-8 overflow-hidden bg-surface scroll-mt-20" id="hero">
      {/* Ambient Glows */}
      <div className="absolute -top-24 right-1/4 w-[38rem] h-[38rem] bg-primary-container/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 -left-32 w-96 h-96 bg-tertiary-container/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-center min-h-[calc(100vh-6rem)]">
        {/* Left Column */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6">
          {/* Live Status Pill */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1 bg-surface-container-low rounded-full shadow-sm border border-outline-variant/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-container opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-container" />
            </span>
            <span className="text-label-sm text-primary tracking-wide uppercase font-semibold">
              SAP FI / FICO • Finance & Accounting
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            className="flex flex-col gap-1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span className="text-label-md text-on-surface-variant uppercase tracking-widest">
              Enterprise Financial Architect
            </span>
            <h1 className="text-display-lg-mobile sm:text-display-lg text-on-surface tracking-tight leading-none">
              HARISH{' '}
              <br className="hidden sm:inline" />
              <span className="text-gradient">MURUGAN P</span>
            </h1>
          </motion.div>

          {/* Subheading */}
          <motion.p
            className="text-body-lg text-on-surface-variant max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {heroIntro}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <a
              href="#project"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-primary-container text-on-primary-container hover:bg-cobalt text-label-lg rounded-full transition-all shadow-[0_0_24px_rgba(0,112,242,0.35)] hover:shadow-[0_0_32px_rgba(0,112,242,0.55)]"
            >
              <span>View My Project</span>
              <ArrowRight size={18} />
            </a>
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-label-lg rounded-full border border-outline-variant/30 transition-colors"
            >
              <Download size={18} />
              <span>Download Resume</span>
            </a>
          </motion.div>

          {/* Credential Badges */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {heroBadges.map((badge, i) => (
              <div
                key={i}
                className="flex flex-col p-4 bg-surface-container-low rounded-lg shadow-sm border border-outline-variant/15"
              >
                <span className={`text-label-sm uppercase tracking-wider ${
                  i === 2 ? 'text-tertiary' : 'text-secondary'
                }`}>
                  {badge.label}
                </span>
                <span className="text-headline-sm text-on-surface mt-1 font-bold">
                  {badge.value}
                </span>
                <span className="text-body-sm text-on-surface-variant">
                  {badge.sub}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Column: True Circular Hero Portrait */}
        <HeroPortrait />
      </div>
    </section>
  );
}
