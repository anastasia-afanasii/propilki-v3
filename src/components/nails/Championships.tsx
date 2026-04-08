import { Trophy } from "lucide-react";

type Props = {
  content: {
    id?: string;
    title?: string;
    subtitle?: string;
    award?: {
      name?: string;
      label?: string;
      image?: string;
      imageAlt?: string;
      badge?: string;
      items?: string[];
    };
  };
};

const Championships = ({ content }: Props) => {
  const award = content?.award ?? {};
  const items = award?.items ?? [];

  const imgSrc = award?.image
    ? award.image.startsWith("http")
      ? award.image
      : `${import.meta.env.BASE_URL}${award.image}`
    : `${import.meta.env.BASE_URL}placeholder.svg`;

  return (
    <section
      id={content?.id ?? "championships"}
      className="py-14 sm:py-16 md:py-20 px-4 sm:px-6 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 md:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-neutral-900 mb-4 sm:mb-5 tracking-tight">
            {content?.title}
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-px bg-neutral-300 mx-auto mb-5 sm:mb-6" />
          <p className="text-base sm:text-lg text-neutral-600 font-light max-w-2xl mx-auto">
            {content?.subtitle}
          </p>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-5 sm:mb-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-amber-100 rounded-full flex items-center justify-center">
                  <Trophy className="h-7 w-7 sm:h-8 sm:w-8 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-light text-neutral-900 mb-1">
                    {award?.name}
                  </h3>
                  <p className="text-amber-600 font-medium">{award?.label}</p>
                </div>
              </div>

              <ul className="space-y-3">
                {items.map((t, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mt-2" />
                    <span className="text-neutral-600 font-light text-sm sm:text-base">
                      {t}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative aspect-[4/3] bg-amber-100 rounded-lg overflow-hidden">
              <img
                src={imgSrc}
                alt={award?.imageAlt ?? "Award ceremony"}
                className="w-full h-full object-cover"
                loading="lazy"
              />

              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-white/90 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium text-neutral-900">
                {award?.badge}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Championships;
