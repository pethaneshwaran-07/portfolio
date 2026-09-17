import { Network, Banknote, Table, ClipboardList } from 'lucide-react';
import { skillCategories } from '@/lib/data';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';

const iconMap: Record<string, React.ElementType> = {
  Network, Banknote, Table, ClipboardList,
};

export default function Skills() {
  return (
    <section className="w-full px-6 lg:px-8 py-8 bg-surface" id="skills">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        <SectionHeading
          label="Technical & Functional Taxonomy"
          title="Skills Dashboard"
          description="Systematic categorization of enterprise technologies, financial concepts, and spreadsheet proficiencies."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((cat, i) => {
            const Icon = iconMap[cat.icon];
            return (
              <ScrollReveal key={i} delay={0.1 * i}>
                <div className="p-6 bg-surface-container-low rounded-xl flex flex-col justify-between shadow-sm h-full">
                  <div>
                    <div className={`flex items-center gap-1.5 ${cat.color} mb-4`}>
                      {Icon && <Icon size={20} />}
                      <h3 className="text-headline-sm text-on-surface">{cat.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.map((skill) => (
                        <span key={skill} className="px-2 py-1 bg-surface-container rounded text-label-md text-on-surface">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 pt-1.5 border-t border-surface-container-highest">
                    <span className={`text-label-sm ${cat.color} font-mono`}>{cat.footer}</span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
