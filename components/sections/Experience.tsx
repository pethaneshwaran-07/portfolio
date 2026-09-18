import { Package, Scale, GitCompare, FileText, Calculator, ClipboardCheck, FolderOpen, Mail } from 'lucide-react';
import { experiences } from '@/lib/data';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';

const iconMap: Record<string, React.ElementType> = {
  Package, Scale, GitCompare, FileText, Calculator, ClipboardCheck, FolderOpen, Mail,
};

export default function Experience() {
  return (
    <section className="w-full px-6 lg:px-8 py-8 bg-surface scroll-mt-20" id="experience">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <SectionHeading
          label="Practical Rigor"
          title="Professional Experience"
          description="Direct operational accounting, inventory audits, and income tax filing exposure."
        />

        {/* Timeline */}
        <div className="relative flex flex-col gap-8 pl-8 sm:pl-12">
          {/* Track line */}
          <div className="absolute left-3 sm:left-5 top-3 bottom-3 w-0.5 bg-surface-container-highest" />

          {experiences.map((exp, i) => (
            <ScrollReveal key={i} delay={0.15 * i}>
              <div className="relative flex flex-col gap-2">
                {/* Node */}
                <div className={`absolute -left-8 sm:-left-12 top-1.5 w-6 h-6 rounded-full bg-surface border-4 ${
                  exp.color === 'primary' ? 'border-primary-container' : 'border-secondary-container'
                } flex items-center justify-center`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    exp.color === 'primary' ? 'bg-primary-container' : 'bg-secondary-container'
                  }`} />
                </div>

                <div className="p-6 bg-surface-container-low hover:bg-surface-container transition-colors rounded-xl flex flex-col gap-4 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <h3 className="text-headline-sm text-on-surface">{exp.title}</h3>
                      <span className={`text-label-md ${
                        exp.color === 'primary' ? 'text-primary' : 'text-secondary'
                      } font-medium`}>
                        {exp.company} • {exp.location}
                      </span>
                    </div>
                    <span className="px-4 py-1 bg-surface-container-highest text-on-surface text-label-sm rounded-full w-fit">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="flex flex-col gap-1.5 text-body-md text-on-surface-variant">
                    {exp.tasks.map((task, j) => {
                      const Icon = iconMap[task.icon];
                      return (
                        <li key={j} className="flex items-start gap-2">
                          {Icon && <Icon size={16} className={`${
                            exp.color === 'primary' ? 'text-primary' : 'text-secondary'
                          } mt-1 shrink-0`} />}
                          <span>{task.text}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
