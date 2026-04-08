import { useEffect, useState } from "react";

type Props = {
  content: {
    autoPlayMs: number;
    slides: {
      id: number;
      name: string;
      description: string;
      image: string;
    }[];
  };
};

const Hero = ({ content }: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!content.slides.length) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % content.slides.length);
    }, content.autoPlayMs);

    return () => clearInterval(timer);
  }, [content.autoPlayMs, content.slides.length]);

  return (
    <section className="relative w-full h-[78vh] sm:h-[86vh] md:h-screen overflow-hidden">
      <div className="relative w-full h-full">
        {/* Slides */}
        <div className="relative overflow-hidden h-full">
          <div
            className="flex transition-transform duration-500 ease-out h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {content.slides.map((slide) => (
              <div key={slide.id} className="w-full flex-shrink-0 h-full">
                <div className="relative h-full">
                  <img
                    src={slide.image}
                    alt={slide.name}
                    className="w-full h-full object-cover"
                    loading="eager"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  {/* Text */}
                  <div className="absolute bottom-16 sm:bottom-20 left-4 sm:left-8 right-4 sm:right-8 text-white">
                    <p className="text-2xl sm:text-4xl font-medium mb-3 sm:mb-4">
                      {slide.name}
                    </p>
                    <p className="text-sm sm:text-lg opacity-90 leading-relaxed max-w-2xl">
                      {slide.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slide indicator dots */}
        <div
          className="
            absolute 
            bottom-4 sm:bottom-8 
            left-1/2 -translate-x-1/2 
            flex gap-3 sm:gap-4 
            z-10 
            px-4
          "
        >
          {content.slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 sm:h-3 rounded-full transition-all duration-200 ${
                index === currentSlide
                  ? "bg-white w-8 sm:w-9"
                  : "bg-white/50 w-3 sm:w-3.5"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
