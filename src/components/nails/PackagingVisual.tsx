import { assetUrl } from "@/lib/utils";
import SectionHeading from "@/components/SectionHeading";
import CornerBadge from "@/components/CornerBadge";

type Props = {
  content: {
    title: string;
    subtitle: string;
    insideTitle: string;
    insideItems: string[];
    image: { src: string; alt: string };
    badge: { line1: string; line2: string };
  };
};

const PackagingVisual = ({ content }: Props) => {
  const imgSrc = assetUrl(content.image.src);

  return (
    <section
      id="packaging"
      className="py-14 sm:py-16 md:py-20 px-4 sm:px-6 bg-neutral-900 text-white"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title={content.title}
          subtitle={content.subtitle}
          tone="dark"
          subtitleClassName="text-base sm:text-lg text-neutral-300 font-light max-w-2xl mx-auto"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 md:gap-14 lg:gap-16 items-start">
          <div>
            <h3 className="text-2xl sm:text-3xl font-light mb-5 sm:mb-6">
              {content.insideTitle}
            </h3>

            <div className="space-y-3 sm:space-y-4">
              {content.insideItems.map((item, index) => (
                <div key={index} className="flex items-center gap-3 sm:gap-4">
                  <div className="w-8 h-8 bg-neutral-800 rounded-full flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </div>
                  <span className="text-sm sm:text-base text-neutral-300 font-light">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative self-start">
            <div className="aspect-4/3 bg-neutral-800 rounded-lg overflow-hidden">
              <img
                src={imgSrc}
                alt={content.image.alt}
                className="w-full h-full object-cover"
                width={4032}
                height={6048}
                loading="lazy"
              />
            </div>

            <CornerBadge
              line1={content.badge.line1}
              line2={content.badge.line2}
              side="right"
              tone="glass"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackagingVisual;
