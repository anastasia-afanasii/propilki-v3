import SectionHeading from "@/components/SectionHeading";
import { assetUrl } from "@/lib/utils";

type Props = {
  content: {
    title: string;
    subtitle: string;
    steps: { number: string; title: string; description: string }[];
    guideImages: string[];
    helpCard: {
      title: string;
      subtitle: string;
      primaryCta: { label: string; href: string };
      secondaryCta: { label: string; href: string };
    };
  };
};

const HowItWorks = ({ content }: Props) => {
  return (
    <section
      id="how-it-works"
      className="py-14 sm:py-16 md:py-20 px-4 sm:px-6 bg-neutral-900 text-white"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title={content.title}
          subtitle={content.subtitle}
          tone="dark"
          subtitleClassName="text-base sm:text-lg text-neutral-300 font-light max-w-2xl mx-auto"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-10 sm:mb-12">
          {content.steps.map((step) => (
            <div key={step.number}>
              <div className="text-4xl sm:text-5xl font-light text-neutral-600 mb-3 sm:mb-4">
                {step.number}
              </div>
              <h3 className="text-lg sm:text-xl font-medium mb-2 tracking-wide">
                {step.title}
              </h3>
              <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-10 sm:mb-12">
          {content.guideImages.map((src, i) => (
            <div
              key={i}
              className="aspect-4/3 bg-neutral-800 rounded-lg overflow-hidden"
            >
              <img
                src={assetUrl(src)}
                alt={`Press-on nails guide step ${i + 1}`}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-neutral-800 rounded-lg p-6 sm:p-7 md:p-8 max-w-4xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-light mb-3 sm:mb-4">
              {content.helpCard.title}
            </h3>

            <p className="text-sm sm:text-base text-neutral-300 font-light mb-5 sm:mb-6">
              {content.helpCard.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href={content.helpCard.primaryCta.href}
                {...(content.helpCard.primaryCta.href.startsWith("http")
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
                className="bg-white text-neutral-900 px-6 py-3 font-medium tracking-wide hover:bg-neutral-100 transition-colors"
              >
                {content.helpCard.primaryCta.label}
              </a>

              <a
                href={assetUrl(content.helpCard.secondaryCta.href)}
                download
                className="border border-neutral-600 text-white px-6 py-3 font-medium tracking-wide hover:bg-neutral-700 transition-colors"
              >
                {content.helpCard.secondaryCta.label}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
