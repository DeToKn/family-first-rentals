import SectionHeader from "./SectionHeader";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "What areas do you deliver to?",
    a: "We serve Atlanta and the surrounding metro area including Stone Mountain, Decatur, Lithonia, Conyers, Snellville, Lawrenceville, Tucker, and more. Call us if you're outside these areas — we'll do our best to accommodate you.",
  },
  {
    q: "How far in advance should I book?",
    a: "We recommend booking at least 1–2 weeks in advance, especially for weekends and holidays. Popular dates fill up fast, so the earlier the better. Call 404-520-9004 to check availability right away.",
  },
  {
    q: "Do you deliver, set up, and pick up?",
    a: "Yes! We handle delivery and pickup. Setup assistance is available — just let us know what you need when you book and we'll coordinate all the details with you directly.",
  },
  {
    q: "What is your deposit and payment policy?",
    a: "A deposit is required to hold your date. We accept cash, Zelle, CashApp, and major debit/credit cards. Contact us at 404-520-9004 for deposit details based on your order size.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Cancellations made more than 1 week before your event are eligible for a deposit credit toward a future booking. Cancellations within 1 week of the event are non-refundable. Contact us as soon as possible if plans change.",
  },
  {
    q: "Are the tables and chairs clean?",
    a: "Absolutely. Every chair and table is cleaned and inspected after each use. We take pride in delivering equipment that looks great and is ready to go. Clean quality is one of our core promises.",
  },
  {
    q: "Can I mix and match items outside of packages?",
    a: "Yes! You can rent individual chairs and tables at our standard rates, or we can build a custom quote for your event. Just call or text 404-520-9004 and we'll put together exactly what you need.",
  },
];

const Faq = () => (
  <section id="faq" className="py-16 md:py-20 px-4 sm:px-6 bg-background">
    <div className="max-w-3xl mx-auto">
      <SectionHeader eyebrow="Got Questions?" title="Frequently Asked Questions" />
      <Accordion type="single" collapsible className="w-full space-y-3">
        {faqs.map((f, i) => (
          <AccordionItem
            key={i}
            value={`item-${i}`}
            className="border border-[hsl(var(--primary-dark)/0.3)] bg-[hsl(var(--card))] rounded-md px-5"
          >
            <AccordionTrigger className="text-left text-white hover:text-primary text-sm font-semibold">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-white/70 leading-relaxed">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default Faq;