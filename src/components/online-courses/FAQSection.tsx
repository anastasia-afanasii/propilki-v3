import { BookOpen } from "lucide-react";
import FAQAccordion from "@/components/FAQAccordion";

type Props = {
  faq: {
    pill: string;
    title: string;
    items: { question: string; answer: string }[];
  };
};

const FAQSection = ({ faq }: Props) => (
  <FAQAccordion
    title={faq.title}
    items={faq.items}
    pill={{ icon: BookOpen, text: faq.pill }}
    variant="themed"
  />
);

export default FAQSection;
