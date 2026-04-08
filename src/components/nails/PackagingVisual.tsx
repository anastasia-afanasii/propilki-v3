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

const isAbsoluteUrl = (v: string) => /^https?:\/\//i.test(v);

const PackagingVisual = ({ content }: Props) => {
  const imgSrc = isAbsoluteUrl(content.image.src)
    ? content.image.src
    : `${import.meta.env.BASE_URL}${content.image.src}`;

  return (
    <section
      id="packaging"
      className="py-14 sm:py-16 md:py-20 px-4 sm:px-6 bg-neutral-900 text-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 md:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 sm:mb-5 tracking-tight">
            {content.title}
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-px bg-neutral-600 mx-auto mb-5 sm:mb-6" />
          <p className="text-base sm:text-lg text-neutral-300 font-light max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </div>

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
            <div className="aspect-[4/3] bg-neutral-800 rounded-lg overflow-hidden">
              <img
                src={imgSrc}
                alt={content.image.alt}
                className="w-full h-full object-cover"
                width={4032}
                height={6048}
                loading="lazy"
              />
            </div>

            <div className="absolute right-2 bottom-2 sm:-right-5 sm:-bottom-5 w-20 h-20 sm:w-24 sm:h-24 bg-neutral-700/60 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <span className="text-white font-light text-[10px] sm:text-xs text-center leading-snug">
                {content.badge.line1}
                <br />
                {content.badge.line2}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackagingVisual;
