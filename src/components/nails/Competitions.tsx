import { Sparkles } from "lucide-react";
import { assetUrl } from "@/lib/utils";
import SectionHeading from "@/components/SectionHeading";

type Props = {
  content: {
    sectionTitle: string;
    sectionSubtitle: string;
    images: string[];
    eventTitle: string;
    eventDate: string;
    description: string;
    highlights: { title?: string; text: string }[];
    closing: string;
  };
};

const Competitions = ({ content }: Props) => {
  return (
    <section
      id="competitions"
      className="py-14 sm:py-16 md:py-20 px-4 sm:px-6 bg-neutral-50"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title={content.sectionTitle}
          subtitle={content.sectionSubtitle}
          subtitleClassName="text-base sm:text-lg text-neutral-600 font-light max-w-2xl mx-auto"
        />

        <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 items-center">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {content.images.map((img, i) => (
                <div
                  key={i}
                  className="aspect-3/4 rounded-lg overflow-hidden bg-neutral-100"
                >
                  <img
                    src={assetUrl(img)}
                    alt={`Competition image ${i + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            <div>
              <div className="flex items-center gap-4 mb-5 sm:mb-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-neutral-100 rounded-full flex items-center justify-center">
                  <Sparkles className="h-7 w-7 sm:h-8 sm:w-8 text-neutral-700" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-light text-neutral-900 mb-1">
                    {content.eventTitle}
                  </h3>
                  <p className="text-neutral-700 font-medium">
                    {content.eventDate}
                  </p>
                </div>
              </div>

              <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed mb-5 sm:mb-6">
                {content.description}
              </p>

              <div className="space-y-4 sm:space-y-5">
                {content.highlights.map((h, i) => (
                  <div key={i}>
                    {h.title ? (
                      <h4 className="font-medium text-neutral-900 mb-1">
                        {h.title}
                      </h4>
                    ) : null}
                    <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
                      {h.text}
                    </p>
                  </div>
                ))}

                <p className="text-sm sm:text-base text-neutral-600 font-light italic">
                  {content.closing}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Competitions;
