import ScrollReveal from "./ScrollReveal";

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  label,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <ScrollReveal>
      <div
        className={`flex flex-col gap-space-xs ${
          align === "center" ? "items-center text-center" : ""
        }`}
      >
        <span className="text-label-sm text-primary uppercase tracking-widest font-semibold">
          {label}
        </span>
        <h2 className="text-headline-lg md:text-headline-lg text-on-surface">
          {title}
        </h2>
        {description && (
          <p className="text-body-md text-on-surface-variant max-w-xl">
            {description}
          </p>
        )}
        {align === "left" && (
          <div className="w-16 h-1 bg-primary-container rounded-full mt-space-xs" />
        )}
      </div>
    </ScrollReveal>
  );
}
