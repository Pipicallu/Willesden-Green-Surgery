// src/components/NewPatientFAQ.tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "./button";
type FaqProps = {
  question: string;
  answer: string;
  showLink: boolean;
  href: string;
  linkCta: string;
};

export default function Faq({ faqs }: { faqs: FaqProps[] }) {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full max-w-6xl mx-auto my-20"
    >
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className="text-xl px-4">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 px-4 flex flex-col gap-2">
              {faq.answer}
              {faq.showLink && (
                <a
                  data-slot="link"
                  href={faq.href}
                  target="_blank"
                  className="text-primary w-max border rounded border-current px-2 py-1 hover:border-current"
                >
                  {faq.linkCta}
                </a>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
