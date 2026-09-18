import { GraduationCap, Terminal } from 'lucide-react';
import { education, sapTraining } from '@/lib/data';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function Education() {
  return (
    <section className="w-full px-6 lg:px-8 py-8 bg-surface-container-lowest scroll-mt-20" id="education">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        <SectionHeading
          label="Academic Foundation & Certifications"
          title="Education & Training"
          description="Structured business education combined with specialized technical ERP capability."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Academic Block */}
          <ScrollReveal delay={0.1}>
            <div className="p-6 bg-surface-container-low rounded-xl flex flex-col justify-between shadow-sm h-full">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <GraduationCap size={24} className="text-primary" />
                  <h3 className="text-headline-md text-on-surface font-semibold">Formal Education</h3>
                </div>
                <div className="flex flex-col gap-6 pt-1">
                  {education.map((edu, i) => (
                    <div key={i} className="flex flex-col gap-1">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <h4 className="text-headline-sm text-on-surface">{edu.degree}</h4>
                        <span className={`text-label-sm ${edu.color === 'primary' ? 'text-primary bg-primary/10' : 'text-secondary bg-secondary/10'} px-2 py-0.5 rounded`}>
                          {edu.period}
                        </span>
                      </div>
                      <span className="text-body-md text-on-surface-variant">{edu.institution}</span>
                      <p className="text-body-sm text-on-surface-variant mt-1">{edu.focus}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 pt-4 bg-surface-container rounded p-4 flex items-center justify-between">
                <span className="text-label-sm text-on-surface-variant">Accounting Core Track</span>
                <span className="text-label-sm text-primary font-mono font-semibold">Honors in Accounts</span>
              </div>
            </div>
          </ScrollReveal>

          {/* SAP Training Block */}
          <ScrollReveal delay={0.2}>
            <div className="p-6 bg-surface-container-low rounded-xl flex flex-col justify-between shadow-sm h-full">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Terminal size={24} className="text-secondary" />
                  <h3 className="text-headline-md text-on-surface font-semibold">Specialized ERP Training</h3>
                </div>
                <div className="flex flex-col gap-4 pt-1">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <h4 className="text-headline-sm text-on-surface">{sapTraining.title}</h4>
                      <span className="text-label-sm text-primary-container bg-primary-container/20 px-2 py-0.5 rounded">
                        {sapTraining.period}
                      </span>
                    </div>
                    <span className="text-body-md text-on-surface-variant">{sapTraining.institution}</span>
                  </div>
                  <p className="text-body-md text-on-surface-variant leading-relaxed">
                    {sapTraining.description}
                  </p>
                  <div className="grid grid-cols-2 gap-1.5 text-label-sm">
                    {sapTraining.modules.map((mod, i) => (
                      <div key={i} className={`p-1.5 bg-surface-container rounded flex items-center gap-2 ${i === sapTraining.modules.length - 1 ? 'col-span-2' : ''}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${mod.color}`} />
                        {mod.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 bg-surface-container rounded p-4 flex items-center justify-between">
                <span className="text-label-sm text-on-surface-variant">Lab Environment</span>
                <span className="text-label-sm text-secondary font-mono font-semibold">Live SAP S/4HANA Server Access</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
