import React from "react";
import { Palette, Sparkles, Target, CheckCircle } from "lucide-react";

type IconKey = "palette" | "sparkles" | "target" | "checkCircle";

type Props = {
  content: {
    title: string;
    subtitle: string;
    steps: {
      icon: string;
      title: string;
      description: string;
    }[];
    highlight: {
      title: string;
      description: string;
      bullets: { title: string; description: string }[];
      image: { src: string; alt: string };
    };
  };
};

const ICONS: Record<IconKey, React.ElementType> = {
  palette: Palette,
  sparkles: Sparkles,
  target: Target,
  checkCircle: CheckCircle,
};

const TipCreationProcess = ({ content }: Props) => {
  const imgSrc = content.highlight.image.src.startsWith("http")
    ? content.highlight.image.src
    : `${import.meta.env.BASE_URL}${content.highlight.image.src}`;

  return (
    <section
      id="tip-creation"
      className="py-14 sm:py-16 md:py-20 px-4 sm:px-6 bg-neutral-50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 md:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-neutral-900 mb-4 sm:mb-5 tracking-tight">
            {content.title}
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-px bg-neutral-300 mx-auto mb-5 sm:mb-6" />
          <p className="text-base sm:text-lg text-neutral-600 font-light max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 md:gap-8 mb-10 sm:mb-12 md:mb-16">
          {content.steps.map((step, index) => {
            const Icon = ICONS[step.icon as IconKey] ?? Sparkles;
            return (
              <div key={index} className="text-center">
                <div className="mb-5 sm:mb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <Icon className="h-7 w-7 sm:h-8 sm:w-8 text-neutral-700" />
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-neutral-900 mb-2 sm:mb-3 tracking-wide">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-light text-neutral-900 mb-4 sm:mb-6">
                {content.highlight.title}
              </h3>

              <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed mb-6 sm:mb-8">
                {content.highlight.description}
              </p>

              <div className="space-y-4 sm:space-y-5">
                {content.highlight.bullets.map((b, i) => (
                  <div key={i} className="flex items-start gap-3 sm:gap-4">
                    <span className="w-2.5 h-2.5 bg-neutral-900 rounded-full mt-2 shrink-0" />
                    <div>
                      <div className="font-medium text-neutral-900 mb-1">
                        {b.title}
                      </div>
                      <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
                        {b.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="aspect-[4/3] bg-neutral-100 rounded-lg overflow-hidden">
              <img
                src={imgSrc}
                alt={content.highlight.image.alt}
                className="w-full h-full object-cover object-bottom"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TipCreationProcess;
