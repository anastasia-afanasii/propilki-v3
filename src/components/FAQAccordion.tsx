import { type LucideIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Props = {
  id?: string;
  title: string;
  items: { question: string; answer: string }[];
  pill?: {
    icon: LucideIcon;
    text: string;
  };
  variant?: "neutral" | "themed";
};

const FAQAccordion = ({ id = "faq", title, items, pill, variant = "neutral" }: Props) => {
  const isThemed = variant === "themed";

  return (
    <section id={id} className="py-12 sm:py-14 md:py-16 px-4 sm:px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 md:mb-14">
          {pill && (
            <div className="inline-flex items-center gap-2 bg-secondary border border-border rounded-full px-3.5 py-1.5 mb-5 sm:mb-6">
              <pill.icon className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">
                {pill.text}
              </span>
            </div>
          )}

          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-light tracking-tight ${
              isThemed ? "text-foreground leading-tight" : "text-neutral-900 mb-4 sm:mb-5"
            }`}
          >
            {title}
          </h2>

          {!isThemed && (
            <div className="w-16 sm:w-20 md:w-24 h-px bg-neutral-300 mx-auto mb-5 sm:mb-6" />
          )}
        </div>

        <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
          {items.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className={`rounded-lg border overflow-hidden ${
                isThemed
                  ? "bg-card border-border elegant-shadow"
                  : "bg-white border-neutral-200 shadow-sm"
              }`}
            >
              <AccordionTrigger className="px-4 sm:px-6 py-3.5 sm:py-4 text-left hover:no-underline">
                <span
                  className={`font-medium text-sm sm:text-base ${
                    isThemed ? "text-foreground" : "text-neutral-900"
                  }`}
                >
                  {item.question}
                </span>
              </AccordionTrigger>

              <AccordionContent className="px-4 sm:px-6 pb-4">
                <p
                  className={`text-sm sm:text-base leading-relaxed ${
                    isThemed ? "text-muted-foreground" : "text-neutral-600 font-light"
                  }`}
                >
                  {item.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQAccordion;
