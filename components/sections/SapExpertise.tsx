import { CheckCircle2, GitBranch } from 'lucide-react';
import { sapModules, s4HanaSteps } from '@/lib/data';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';

const colorClasses = {
  primary: {
    badge: 'bg-primary-container/20 text-primary',
    tag: 'text-primary-fixed-dim bg-primary-container/10',
    check: 'text-primary',
    tcode: 'text-primary',
  },
  secondary: {
    badge: 'bg-secondary-container/20 text-secondary',
    tag: 'text-secondary bg-secondary-container/10',
    check: 'text-secondary',
    tcode: 'text-secondary',
  },
  tertiary: {
    badge: 'bg-tertiary-container/20 text-tertiary',
    tag: 'text-tertiary bg-tertiary-container/10',
    check: 'text-tertiary',
    tcode: 'text-tertiary',
  },
};

export default function SapExpertise() {
  return (
    <section className="w-full px-6 lg:px-8 py-8 bg-surface" id="sap-expertise">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-label-sm text-primary uppercase tracking-widest font-semibold">Modular Core Proficiency</span>
              <h2 className="text-headline-lg text-on-surface mt-1">SAP FI / FICO Expertise</h2>
              <p className="text-body-md text-on-surface-variant mt-1 max-w-xl">
                Proficient in configuring and executing core financial sub-modules in SAP, guaranteeing rigorous accounting standards and complete document trace.
              </p>
            </div>
            <span className="hidden md:block text-label-md text-on-surface-variant bg-surface-container px-4 py-1 rounded-full">
              Release: SAP S/4HANA 2022 / ECC 6.0
            </span>
          </div>
        </ScrollReveal>

        {/* Module Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sapModules.map((mod, i) => {
            const colors = colorClasses[mod.color];
            return (
              <ScrollReveal key={mod.code} delay={0.1 * i}>
                <div className="p-6 bg-surface-container-low hover:bg-surface-container transition-colors rounded-xl flex flex-col justify-between shadow-sm h-full">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`w-10 h-10 rounded-lg ${colors.badge} flex items-center justify-center font-bold text-headline-sm`}>
                        {mod.code}
                      </span>
                      <span className={`text-label-sm ${colors.tag} px-2 py-0.5 rounded`}>
                        {mod.tag}
                      </span>
                    </div>
                    <h3 className="text-headline-sm text-on-surface">{mod.title}</h3>
                    <ul className="mt-4 flex flex-col gap-1.5 text-body-sm text-on-surface-variant">
                      {mod.items.map((item, j) => (
                        <li key={j} className="flex items-center gap-1.5">
                          <CheckCircle2 size={14} className={colors.check + ' shrink-0'} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6 pt-2 bg-surface-container-lowest/50 rounded p-2 flex justify-between items-center text-on-surface-variant text-label-sm">
                    <span>Key T-Codes</span>
                    <span className={`font-mono ${colors.tcode}`}>{mod.tCodes}</span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}

          {/* Enterprise Integrity Card */}
          <ScrollReveal delay={0.5}>
            <div className="p-6 bg-gradient-to-br from-primary-container/20 via-surface-container-low to-surface-container-lowest rounded-xl flex flex-col justify-between shadow-sm h-full">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <GitBranch size={28} className="text-primary-container" />
                  <span className="text-label-sm text-primary font-mono uppercase">Architecture</span>
                </div>
                <h3 className="text-headline-sm text-on-surface">Enterprise Integrity</h3>
                <p className="text-body-md text-on-surface-variant mt-1">
                  Every configured account aligns with corporate fiscal calendars, field status variants, and tolerance limits to safeguard reporting accuracy.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-primary text-label-md font-semibold">
                <span>Continuous S/4HANA Evolution</span>
                <span>→</span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* S/4HANA Architecture Banner */}
        <ScrollReveal delay={0.2}>
          <div className="p-6 bg-surface-container-high rounded-xl flex flex-col gap-4 shadow-sm">
            <div className="flex items-center gap-2">
              <GitBranch size={20} className="text-primary" />
              <h4 className="text-headline-sm text-on-surface font-semibold">
                SAP S/4HANA Implementation Architecture Overview
              </h4>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 pt-1">
              {s4HanaSteps.map((step, i) => (
                <div key={i} className="p-2 bg-surface-container rounded flex flex-col">
                  <span className="text-label-sm text-primary">{step.num}</span>
                  <span className="text-body-sm text-on-surface font-semibold mt-1">{step.label}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
