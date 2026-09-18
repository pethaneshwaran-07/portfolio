import { Wallet, ShieldCheck, Receipt, BarChart3, Database, ArrowLeftRight } from 'lucide-react';
import { aboutNarrative } from '@/lib/data';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';

const iconMap: Record<string, React.ElementType> = {
  Wallet, ShieldCheck, Receipt, BarChart3, Database, ArrowLeftRight,
};

export default function About() {
  return (
    <section className="w-full px-6 lg:px-8 py-8 bg-surface-container-lowest scroll-mt-20" id="about">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        <SectionHeading label="Background & Philosophy" title="About Me" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Narrative */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <ScrollReveal delay={0.1}>
              <p className="text-body-lg text-on-surface leading-relaxed">
                {aboutNarrative.main}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-body-md text-on-surface-variant leading-relaxed">
                {aboutNarrative.secondary}
              </p>
            </ScrollReveal>

            {/* Core Competencies */}
            <ScrollReveal delay={0.3}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                {aboutNarrative.competencies.map((comp, i) => {
                  const Icon = iconMap[comp.icon];
                  return (
                    <div key={i} className="p-4 bg-surface-container rounded-lg flex items-start gap-2">
                      {Icon && <Icon size={20} className={`${i === 0 ? 'text-primary' : 'text-secondary'} mt-0.5 shrink-0`} />}
                      <div>
                        <h4 className="text-headline-sm text-on-surface">{comp.title}</h4>
                        <p className="text-body-sm text-on-surface-variant mt-1">{comp.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>

          {/* Focus Cards (Bento) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {aboutNarrative.focusCards.map((card, i) => {
              const Icon = iconMap[card.icon];
              return (
                <ScrollReveal key={i} delay={0.1 * (i + 1)}>
                  <div className="p-6 bg-surface-container-low hover:bg-surface-container transition-all duration-300 rounded-lg flex flex-col justify-between shadow-sm group h-full">
                    <div className="flex items-center justify-between">
                      {Icon && (
                        <Icon
                          size={24}
                          className={`${
                            i === 0 ? 'text-primary-container' : i === 1 ? 'text-secondary-container' : i === 2 ? 'text-tertiary-container' : 'text-primary'
                          } group-hover:scale-110 transition-transform`}
                        />
                      )}
                      <span className="text-label-sm text-on-surface-variant font-mono">{card.num}</span>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-headline-sm text-on-surface">{card.title}</h3>
                      <p className="text-body-sm text-on-surface-variant mt-1">{card.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
