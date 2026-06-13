import SectionHeader from "./SectionHeader";
import chairImg from "@/assets/ff-chair.jpg"
import rectTableImg from "@/assets/ff-rect-table.jpg"
import roundTableImg from "@/assets/ff-round-table.jpg"

const items = [
  {
    img: chairImg,
    name: "Metal Black Chairs",
    price: "$6",
    unit: "/ chair / day",
    desc: "Sturdy, stylish, and reliable. Black metal folding chairs that elevate any event setup.",
    tags: ["Sturdy", "Stylish", "Min. 10"],
  },
  {
    img: rectTableImg,
    name: "4 ft Rectangular Tables",
    price: "$10",
    unit: "/ table / day",
    desc: "Seats 4 guests. Perfect for food stations, gift tables, banquets, and any occasion.",
    tags: ["Seats 4", "Versatile", "Min. 2"],
  },
  {
    img: roundTableImg,
    name: "Round Tables",
    price: "$10",
    unit: "/ table / day",
    desc: "Seats up to 8 guests. Creates an elegant, connected dining experience for large gatherings.",
    tags: ["Seats 8", "Elegant", "Min. 2"],
  },
];

const Rentals = () => (
  <section id="rentals" className="py-16 md:py-20 px-4 sm:px-6 bg-background">
    <div className="max-w-6xl mx-auto">
      <SectionHeader eyebrow="What We Offer" title="Our Rental Items" />
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((it) => (
          <div
            key={it.name}
            className="bg-[hsl(var(--card))] border border-[hsl(var(--primary-dark)/0.3)] rounded-md overflow-hidden hover:border-primary transition-colors"
          >
            <div className="relative h-48 bg-black overflow-hidden">
              <img src={it.img} alt={it.name} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            </div>
            <div className="p-6">
              <h3 className="font-display text-xl text-white">{it.name}</h3>
              <div className="mt-2 font-display text-2xl text-primary">
                {it.price} <span className="text-xs font-body text-white/50 tracking-wider">{it.unit}</span>
              </div>
              <p className="mt-3 text-sm text-white/70 leading-relaxed">{it.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {it.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[0.65rem] font-semibold tracking-wider uppercase text-primary border border-[hsl(var(--primary-dark)/0.5)] px-2 py-1 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Rentals;
