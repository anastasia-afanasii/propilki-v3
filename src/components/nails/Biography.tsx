type Props = {
  content: {
    id?: string;
    title?: string;
    image?: string;
    imageAlt?: string;
    paragraphs?: string[];
    quote?: string;
    badge?: { line1: string; line2: string };
  };
};

const normalize = (src: string) => (src.startsWith("/") ? src.slice(1) : src);

const Biography = ({ content }: Props) => {
  const id = content?.id ?? "biography";
  const paragraphs = content?.paragraphs ?? [];

  const imgSrc = `${import.meta.env.BASE_URL}${normalize(
    content?.image ?? ""
  )}`;

  return (
    <section id={id} className="py-14 sm:py-16 md:py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-14 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-neutral-900 mb-5 sm:mb-6 tracking-tight">
              {content?.title}
            </h2>
            <div className="w-16 sm:w-20 md:w-24 h-px bg-neutral-300 mb-6 sm:mb-7" />

            <div className="space-y-4 sm:space-y-5 text-base sm:text-lg text-neutral-600 font-light leading-relaxed">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}

              {content?.quote ? (
                <p className="italic">{content.quote}</p>
              ) : null}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] bg-neutral-100 rounded-lg overflow-hidden">
              <img
                src={imgSrc}
                alt={content?.imageAlt ?? "Artist portrait"}
                className="w-full h-full object-cover object-bottom"
                width={3341}
                height={5011}
                loading="lazy"
              />
            </div>

            <div className="absolute right-2 bottom-2 sm:-right-5 sm:-bottom-5 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-neutral-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-light text-xs sm:text-sm text-center leading-snug">
                {content?.badge?.line1}
                <br />
                {content?.badge?.line2}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Biography;
