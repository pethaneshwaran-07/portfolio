'use client';

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { siteConfig, floatingBadges } from '@/lib/data';

const badgePositions = {
  'top-left': '-top-2 -left-2 sm:-left-8 sm:top-2',
  'top-right': '-top-2 -right-2 sm:-right-8 sm:top-4',
  'mid-left': 'top-1/2 -left-6 sm:-left-12 -translate-y-4 hidden sm:flex',
  'bottom-left': 'bottom-4 -left-2 sm:-left-10',
  'bottom-right': 'bottom-6 -right-2 sm:-right-8',
};

const badgeColors = {
  'top-left': { dot: 'bg-primary', glow: 'shadow-[0_0_8px_rgba(174,198,255,0.7)]', hover: 'hover:border-primary/50 hover:shadow-[0_0_16px_rgba(0,112,242,0.3)]' },
  'top-right': { dot: 'bg-secondary', glow: 'shadow-[0_0_8px_rgba(164,201,255,0.7)]', hover: 'hover:border-secondary/50 hover:shadow-[0_0_16px_rgba(164,201,255,0.3)]' },
  'mid-left': { dot: 'bg-secondary-fixed', glow: 'shadow-[0_0_8px_rgba(212,227,255,0.7)]', hover: 'hover:border-secondary-fixed/50 hover:shadow-[0_0_16px_rgba(212,227,255,0.3)]' },
  'bottom-left': { dot: 'bg-tertiary', glow: 'shadow-[0_0_8px_rgba(123,208,255,0.7)]', hover: 'hover:border-tertiary/50 hover:shadow-[0_0_16px_rgba(123,208,255,0.3)]' },
  'bottom-right': { dot: 'bg-primary-fixed', glow: 'shadow-[0_0_8px_rgba(216,226,255,0.7)]', hover: 'hover:border-primary-fixed/50 hover:shadow-[0_0_16px_rgba(216,226,255,0.3)]' },
};

const floatAnimations = [
  { duration: 5, delay: 0 },
  { duration: 3.5, delay: 0.5 },
  { duration: 4, delay: 1 },
  { duration: 4.5, delay: 0.3 },
  { duration: 6, delay: 0.7 },
];

export default function HeroPortrait() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Smooth scroll parallax (0% -> 100% progress: y = 0px -> -30px)
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  const enableMotion = !prefersReducedMotion && !isMobile;

  return (
    <div ref={containerRef} className="lg:col-span-5 relative flex items-center justify-center py-6 w-full max-w-full">
      {/* Outer Blue Ambient Radial Glows behind the circle */}
      <div className="absolute w-[20rem] h-[20rem] sm:w-[26rem] sm:h-[26rem] md:w-[28rem] md:h-[28rem] rounded-full bg-[radial-gradient(circle,rgba(0,112,242,0.35)_0%,rgba(0,112,242,0.12)_50%,transparent_75%)] blur-3xl pointer-events-none transition-transform duration-700 group-hover:scale-105" />
      
      {/* Thin Outer Decorative Circular Ring with slow rotation/pulse */}
      <motion.div
        className="absolute w-[18.5rem] h-[18.5rem] sm:w-[22.5rem] sm:h-[22.5rem] md:w-[25.5rem] md:h-[25.5rem] rounded-full border border-primary/40 shadow-[0_0_24px_rgba(0,112,242,0.3)] pointer-events-none z-10"
        animate={enableMotion ? { rotate: [0, 360] } : undefined}
        transition={enableMotion ? { duration: 30, repeat: Infinity, ease: 'linear' } : undefined}
      />

      {/* Main True Circular Portrait Container (Strict 50% border-radius & overflow-hidden) */}
      <motion.div
        className="relative z-20 w-[17.5rem] h-[17.5rem] sm:w-[21.5rem] sm:h-[21.5rem] md:w-[24.5rem] md:h-[24.5rem] rounded-full overflow-hidden border-2 border-primary/60 shadow-[0_0_36px_rgba(0,112,242,0.45)] flex items-center justify-center group cursor-pointer"
        initial={{ opacity: 0, y: 40, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={enableMotion ? { y: parallaxY } : undefined}
        whileHover={enableMotion ? { scale: 1.02 } : undefined}
      >
        {/* Subtle Floating Inner Wrapper */}
        <motion.div
          className="w-full h-full relative"
          animate={enableMotion ? { y: [0, -3, 0] } : undefined}
          transition={enableMotion ? { duration: 5, repeat: Infinity, ease: 'easeInOut' } : undefined}
        >
          <Image
            src={siteConfig.portraitUrl || '/images/harish-portrait.png'}
            alt="Harish Murugan P - Professional SAP FI Consultant Portrait"
            width={400}
            height={400}
            className="w-full h-full object-cover object-top select-none pointer-events-none transition-transform duration-500 group-hover:scale-105"
            priority
            unoptimized
          />
        </motion.div>
      </motion.div>

      {/* Orbiting SAP Module Badges (GL, AP, AR, AA, BA) */}
      {floatingBadges.map((badge, i) => {
        const pos = badgePositions[badge.position];
        const colors = badgeColors[badge.position];
        const anim = floatAnimations[i];
        return (
          <motion.div
            key={badge.code}
            className={`absolute ${pos} z-30 px-3.5 py-1 bg-surface-container-low/90 border border-outline-variant/30 backdrop-blur-md rounded-xl shadow-xl flex items-center gap-1.5 transition-all duration-300 ${colors.hover}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 + anim.delay }}
          >
            <motion.span
              animate={enableMotion ? { y: [0, -3, 0] } : undefined}
              transition={enableMotion ? { duration: anim.duration, repeat: Infinity, ease: 'easeInOut' } : undefined}
              className="flex items-center gap-1.5"
            >
              <span className={`w-2.5 h-2.5 rounded-full ${colors.dot} ${colors.glow}`} />
              <div className="flex flex-col">
                <span className="text-label-md text-on-surface font-bold leading-tight">{badge.code}</span>
                <span className="text-label-sm text-on-surface-variant">{badge.label}</span>
              </div>
            </motion.span>
          </motion.div>
        );
      })}
    </div>
  );
}
