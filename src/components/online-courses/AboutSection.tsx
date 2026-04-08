import { Award } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  about: {
    image: string;
    imageAlt: string;
    pill: string;
    titleTop: string;
    titleBottom: string;
    paragraphs: string[];
    quote?: string;
    button: string;
    socialProof: string;
    buttonHref?: string;
    badge?: {
      line1: string;
      line2: string;
    };
  };
};

const AboutSection = ({ about }: Props) => {
  const imgSrc = `${import.meta.env.BASE_URL}${
    about.image.startsWith("/") ? about.image.slice(1) : about.image
  }`;

  return (
    <section
      id="about"
      className="py-12 sm:py-14 md:py-16 px-4 sm:px-6 bg-muted/50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-14 items-center">
          {/* IMAGE + BADGE */}
          <div className="relative">
            <div className="relative aspect-[4/5] bg-muted rounded-lg overflow-hidden elegant-shadow">
              <img
                src={imgSrc}
                alt={about.imageAlt}
                className="w-full h-full object-cover object-bottom"
                width={3341}
                height={5011}
                loading="lazy"
              />
            </div>

            {/* Badge — left position */}
            {about.badge && (
              <div className="absolute left-2 bottom-2 sm:-left-5 sm:-bottom-5 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-neutral-900 rounded-lg flex items-center justify-center elegant-shadow">
                <span className="text-white font-light text-xs sm:text-sm text-center leading-snug px-2">
                  {about.badge.line1}
                  <br />
                  {about.badge.line2}
                </span>
              </div>
            )}
          </div>

          {/* CONTENT */}
          <div className="space-y-5 sm:space-y-6">
            <div className="inline-flex items-center gap-2 bg-secondary border border-border rounded-full px-3.5 py-1.5">
              <Award className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">
                {about.pill}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-foreground tracking-tight leading-tight">
              {about.titleTop}
              <span className="block text-primary">{about.titleBottom}</span>
            </h2>

            <div className="space-y-3 sm:space-y-4 text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
              {about.paragraphs.map((text, idx) => (
                <p key={idx}>{text}</p>
              ))}
            </div>

            {about.quote && (
              <blockquote className="border-l-2 border-primary pl-4 sm:pl-5 italic text-muted-foreground text-sm sm:text-base leading-relaxed">
                {about.quote}
              </blockquote>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 pt-2 sm:pt-3">
              <Button
                asChild={Boolean(about.buttonHref)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8 h-11 rounded-lg"
              >
                {about.buttonHref ? (
                  <a href={about.buttonHref} target="_blank" rel="noreferrer">
                    {about.button}
                  </a>
                ) : (
                  <span>{about.button}</span>
                )}
              </Button>

              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-sm">{about.socialProof}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
