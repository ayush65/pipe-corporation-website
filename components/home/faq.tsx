import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { SectionHeading } from "@/components/section-heading"
import { site } from "@/lib/site"

const faqs = [
  {
    q: "Do you supply to retailers and contractors outside Hyderabad?",
    a: "Yes. We serve dealers, retailers, contractors and farmers across Telangana and neighbouring states. Share your requirement on WhatsApp and our team will confirm availability and dispatch.",
  },
  {
    q: "Which brands do you distribute?",
    a: "We are long-standing distributors of Hero Agro Plast, OXYJAL, IZOTI Taps, FLOZY Taps, BOND-WELD Solvents, KELTON Ball Valves, SBF NRV, JINDAL G.I Pipes and AMRUT CPVC Pipes.",
  },
  {
    q: "How do I get prices for a product?",
    a: "Tap the Enquire button on any product card. It opens WhatsApp with the product name pre-filled so we can share the latest price and stock right away.",
  },
  {
    q: "Do you offer ISI-marked G.I fittings?",
    a: "Yes, we stock G.I fittings in both ISI and non-ISI grades, along with heavy G.I and B.P nipples, bends and jalis.",
  },
  {
    q: "Can I place bulk orders?",
    a: "Absolutely. With over 7,000 SKUs in our portfolio, we regularly handle bulk and project orders. Contact our office for bulk pricing.",
  },
  {
    q: "What are your contact hours?",
    a: `You can reach us on ${site.phoneMain} or our office line ${site.phoneOffice} during business hours, Monday to Saturday. WhatsApp enquiries are welcome anytime.`,
  },
]

export function Faq() {
  return (
    <section aria-labelledby="faq-heading" className="bg-background py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title={<span id="faq-heading">Questions, answered.</span>}
          description="Everything you need to know about ordering from Pipe Corporation."
          className="lg:sticky lg:top-28 lg:self-start"
        />
        <Accordion defaultValue={["item-0"]} className="flex flex-col gap-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={f.q}
              value={`item-${i}`}
              className="rounded-2xl border border-border bg-card px-5 not-last:border-b data-open:border-primary/40 sm:px-6"
            >
              <AccordionTrigger className="py-5 text-left font-display text-base font-bold hover:no-underline sm:text-lg">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
