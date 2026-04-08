type Props = {
  content: {
    title: string;
    helpCard: {
      title: string;
      subtitle: string;
      primaryCta: { label: string; href: string };
      secondaryCta: { label: string };
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
        <div className="text-center mb-10 sm:mb-12 md:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight">
            {content.title}
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-px bg-neutral-600 mx-auto mt-4 sm:mt-5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-10 sm:mb-12">
          <div className="aspect-[4/3] bg-neutral-800 rounded-lg overflow-hidden">
            <img
              src={`${import.meta.env.BASE_URL}images/press_on_nails_guide1.webp`}
              alt="Press-on nails guide step 1"
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>

          <div className="aspect-[4/3] bg-neutral-800 rounded-lg overflow-hidden">
            <img
              src={`${import.meta.env.BASE_URL}images/press_on_nails_guide2.jpg`}
              alt="Press-on nails guide step 2"
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>
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
                target="_blank"
                rel="noreferrer"
                className="bg-white text-neutral-900 px-6 py-3 font-medium tracking-wide hover:bg-neutral-100 transition-colors"
              >
                {content.helpCard.primaryCta.label}
              </a>

              <a
                href={`${import.meta.env.BASE_URL}images/press_on_nails_guide.pdf`}
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
