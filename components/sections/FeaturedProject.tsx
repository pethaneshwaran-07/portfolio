import { CheckCircle2, ExternalLink } from 'lucide-react';
import { projectActivities, projectConfig, ledgerEntries } from '@/lib/data';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function FeaturedProject() {
  return (
    <section className="w-full px-6 lg:px-8 py-8 bg-surface-container-lowest scroll-mt-20" id="project">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <ScrollReveal>
          <div className="flex flex-col gap-1.5">
            <div className="inline-flex items-center gap-1.5 px-4 py-1 bg-primary-container/10 rounded-full w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
              <span className="text-label-sm text-primary uppercase font-bold tracking-wider">Enterprise Case Study</span>
            </div>
            <h2 className="text-headline-lg text-on-surface">SAP S/4HANA FI Implementation for Titan Company Limited</h2>
            <p className="text-body-lg text-on-surface-variant">Financial Accounting Mini Project • End-to-End Simulation</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left: SAP GUI Terminal Mockup */}
          <ScrollReveal className="lg:col-span-6" delay={0.1}>
            <div className="bg-surface-container rounded-2xl overflow-hidden shadow-2xl flex flex-col">
              {/* Chrome bar */}
              <div className="bg-surface-container-highest px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-error/60" />
                  <span className="w-3 h-3 rounded-full bg-secondary/60" />
                  <span className="w-3 h-3 rounded-full bg-primary-container" />
                  <span className="text-label-sm text-on-surface-variant font-mono ml-2">SAP GUI • FB03 [Display Document]</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-surface-container-low font-mono text-label-sm text-secondary">TTN1 (Titan Co)</span>
              </div>

              {/* Cockpit content */}
              <div className="p-6 flex flex-col gap-4 font-mono text-body-sm">
                {/* Metadata */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-2 bg-surface-container-low rounded">
                  <div>
                    <span className="text-on-surface-variant text-label-sm">Doc No:</span>
                    <p className="text-on-surface font-bold">100000429</p>
                  </div>
                  <div>
                    <span className="text-on-surface-variant text-label-sm">Doc Type:</span>
                    <p className="text-primary font-bold">KR (Vendor Inv)</p>
                  </div>
                  <div>
                    <span className="text-on-surface-variant text-label-sm">Fiscal Yr:</span>
                    <p className="text-on-surface font-bold">2024</p>
                  </div>
                  <div>
                    <span className="text-on-surface-variant text-label-sm">Status:</span>
                    <span className="inline-flex items-center gap-1 text-primary font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-container" /> Cleared
                    </span>
                  </div>
                </div>

                {/* Ledger table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-surface-container-highest/60 text-on-surface-variant text-label-sm">
                      <tr>
                        <th className="p-2">Itm</th>
                        <th className="p-2">PK</th>
                        <th className="p-2">Account</th>
                        <th className="p-2">Description</th>
                        <th className="p-2 text-right">Amount (INR)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-container-high text-on-surface">
                      {ledgerEntries.map((entry) => (
                        <tr key={entry.item} className="hover:bg-surface-container-low">
                          <td className="p-2">{entry.item}</td>
                          <td className={`p-2 ${entry.pkColor}`}>{entry.pk}</td>
                          <td className="p-2 font-semibold">{entry.account}</td>
                          <td className="p-2 text-on-surface-variant">{entry.desc}</td>
                          <td className={`p-2 text-right ${entry.amountColor}`}>{entry.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Balance check */}
                <div className="p-2 bg-surface-container-low rounded flex items-center justify-between text-label-sm">
                  <div className="flex items-center gap-1.5 text-secondary">
                    <CheckCircle2 size={16} />
                    <span>Debit = Credit (Zero Balance Check)</span>
                  </div>
                  <span className="font-bold text-on-surface font-mono">NET 0.00 INR</span>
                </div>

                {/* T-Codes */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1 text-label-sm text-on-surface-variant">
                  <span>Executed T-Codes:</span>
                  {['FB50', 'F-02', 'F-43', 'F-28', 'FS00', 'FBL3N'].map((code) => (
                    <span key={code} className="px-2 py-0.5 bg-surface-container-highest rounded text-on-surface">{code}</span>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Description */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <ScrollReveal delay={0.2}>
              <h3 className="text-headline-md text-on-surface">
                End-to-End Enterprise Financial Transaction Cycle
              </h3>
            </ScrollReveal>
            <ScrollReveal delay={0.25}>
              <p className="text-body-md text-on-surface-variant leading-relaxed">
                Designed and configured the corporate financial accounting structure for a simulated implementation of{' '}
                <strong className="text-on-surface">Titan Company Limited</strong>. The model covers end-to-end transaction lifecycles spanning General Ledger entries, vendor procure-to-pay routines, customer order-to-cash receipts, fixed assets capitalization, and bank clearing processes.
              </p>
            </ScrollReveal>

            {/* Activity Tags */}
            <ScrollReveal delay={0.3}>
              <div className="flex flex-col gap-1.5">
                <span className="text-label-sm text-primary uppercase tracking-wider font-semibold">Configured Transaction Activities</span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {projectActivities.map((activity) => (
                    <span key={activity} className="px-2 py-1 bg-surface-container rounded text-label-sm text-on-surface">{activity}</span>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Config Matrix */}
            <ScrollReveal delay={0.35}>
              <div className="p-4 bg-surface-container rounded-lg grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                {projectConfig.map((item) => (
                  <div key={item.label}>
                    <span className="text-label-sm text-on-surface-variant block">{item.label}</span>
                    <span className={`text-headline-sm ${item.color} font-bold`}>{item.value}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* CTA */}
            <ScrollReveal delay={0.4}>
              <div className="pt-1">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary-container hover:bg-cobalt text-on-primary-container text-label-md rounded-lg transition-colors shadow-md"
                >
                  <span>Discuss Case Study Findings</span>
                  <ExternalLink size={16} />
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
