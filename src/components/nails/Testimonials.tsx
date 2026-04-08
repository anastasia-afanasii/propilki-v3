import ReviewCarousel from "@/components/ReviewCarousel";

type Props = {
  content: {
    title: string;
    subtitle: string;
    autoPlayMs: number;
    items: { text: string }[];
  };
};

const Testimonials = ({ content }: Props) => (
  <ReviewCarousel
    id="testimonials"
    title={content.title}
    subtitle={content.subtitle}
    items={content.items}
    autoPlayMs={content.autoPlayMs}
    variant="neutral"
  />
);

export default Testimonials;
