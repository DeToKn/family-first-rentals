import SectionHeader from "./SectionHeader";
import { useBookingPrefill, scrollToBooking } from "./BookingContext";

const packages = [
  {
    name: "Starter Pack",
    sub: "Small Gatherings",
    price: 95,
    save: "Save $12.50",
    items: ["25 Metal Black Chairs", "5 Rectangular Tables (4ft)", "Seats up to 20 guests", "Birthdays & Baby Showers", "Cookouts & Small Parties"],
    featured: false,
    value: "Starter Pack – $95",
  },
  {
    name: "Party Pack",
    sub: "Medium Events",
    price: 245,
    save: "Save $47",
    items: ["50 Metal Black Chairs", "8 Rectangular Tables (4ft)", "4 Round Tables (seats 8)", "Seats up to 50 guests", "School Events & Parties"],
    featured: true,
    value: "Party Pack – $245",
  },
  {
    name: "Full Event Pack",
    sub: "Large Celebrations",
    price: 430,
    save: "Save $90",
    items: ["100 Metal Black Chairs", "10 Rectangular Tables (4ft)", "10 Round Tables (seats 8)", "Seats up to 100+ guests", "Corporate & Large Events"],
    featured: false,
    value: "Full Event Pack – $430",
  },
];

const Packages = () => {
  const { setPreselectedPackage } = useBookingPrefill();
  const select = (v: string) => {
    setPreselectedPackage(v);
    scrollToBooking();
  };

  return (
    <section id="packages" className="py-16 md:py-20 px-4 sm:px-6 bg-[hsl(var(--card))]">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="Best Value" title="Event Packages" />
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {packages.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-md p-8 flex flex-col text-center bg-[hsl(var(--card-2))] border ${
                p.featured ? "border-primary md:-mt-4 md:mb-4 shadow-[0_0_40px_-12px_hsl(var(--primary)/0.4)]" : "border-[hsl(var(--primary-dark)/0.3)]"
              }`}
            >
              {p.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[0.6rem] font-extrabold tracking-[0.25em] uppercase px-3 py-1 rounded">
                  Most Popular
                </div>
              )}
              <p className="font-display text-xl text-white">{p.name}</p>
              <p className="text-xs tracking-widest uppercase text-white/50 mt-1">{p.sub}</p>
              <div className="font-display text-5xl text-primary mt-6">
                <sup className="text-2xl align-top">$</sup>
                {p.price}
              </div>
              <span className="inline-block mt-2 text-[0.6rem] font-bold tracking-[0.2em] uppercase text-primary/80">
                {p.save}
              </span>
              <div className="my-6 h-px w-12 bg-primary/40 mx-auto" />
              <ul className="space-y-2 text-sm text-white/80 text-left flex-1">
                {p.items.map((it) => (
                  <li key={it} className="flex gap-2">
                    <span className="text-primary">✦</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => select(p.value)}
                className={`mt-6 ${p.featured ? "ff-btn-gold" : "ff-btn-outline"} w-full`}
              >
                Select Package
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;