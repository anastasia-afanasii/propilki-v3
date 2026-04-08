import FAQAccordion from "@/components/FAQAccordion";

type Props = {
  content: {
    pill?: string;
    title: string;
    items: { question: string; answer: string }[];
  };
};

const FAQ = ({ content }: Props) => (
  <FAQAccordion
    title={content.title}
    items={content.items}
    variant="neutral"
  />
);

export default FAQ;
