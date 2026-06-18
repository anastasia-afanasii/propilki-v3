type Props = {
  title: string;
  subtitle?: string;
  tone?: "light" | "dark";
  subtitleClassName?: string;
};

const SectionHeading = ({
  title,
  subtitle,
  tone = "light",
  subtitleClassName,
}: Props) => {
  const headingColor = tone === "light" ? "text-neutral-900 " : "";
  const dividerTone = tone === "light" ? "bg-neutral-300" : "bg-neutral-600";

  return (
    <div className="text-center mb-10 sm:mb-12 md:mb-14">
      <h2
        className={`text-3xl sm:text-4xl md:text-5xl font-light ${headingColor}mb-4 sm:mb-5 tracking-tight`}
      >
        {title}
      </h2>
      <div
        className={`w-16 sm:w-20 md:w-24 h-px ${dividerTone} mx-auto mb-5 sm:mb-6`}
      />
      {subtitle && <p className={subtitleClassName}>{subtitle}</p>}
    </div>
  );
};

export default SectionHeading;
