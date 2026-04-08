import { Star } from "lucide-react";
import ReviewCarousel from "@/components/ReviewCarousel";

type Props = {
  reviews: {
    pill: string;
    title: string;
    items: string[];
  };
};

const ReviewsSection = ({ reviews }: Props) => (
  <ReviewCarousel
    id="reviews"
    title={reviews.title}
    items={reviews.items}
    pill={{ icon: Star, text: reviews.pill }}
    variant="themed"
  />
);

export default ReviewsSection;
