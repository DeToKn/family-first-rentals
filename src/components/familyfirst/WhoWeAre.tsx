import SectionHeader from "./SectionHeader";

const stats = [
  { num: "100+", label: "Events Served" },
  { num: "5★", label: "Avg Rating" },
  { num: "3", label: "Sons Strong" },
  { num: "ATL", label: "Based & Proud" },
];

const WhoWeAre = () => (
  <section id="about" className="py-16 md:py-20 px-4 sm:px-6 bg-background">
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
      <div>
        <p className="ff-eyebrow">Our Story</p>
        <h2 className="ff-title mt-2 text-left">Who We Are</h2>
        <div className="h-px w-16 bg-primary mt-3 mb-6" />
        <p className="text-white/80 leading-relaxed mb-4">
          We're a family just like yours. A mom and three sons right here in Atlanta, GA. We started Family First Event Rentals because we believe every celebration deserves clean, quality equipment delivered with care.
        </p>
        <p className="text-white/80 leading-relaxed mb-6">
          When you book with us, you're not just getting a rental — you're working with a team that genuinely cares about making your day special.
        </p>
        <ul className="space-y-2 text-white/80">
          {[
            "On-time delivery every time",
            "Clean, inspected equipment",
            "Simple and fair pricing",
            "Friendly, family-first service",
            "Faith based & built on respect",
          ].map((t) => (
            <li key={t} className="flex gap-2">
              <span className="text-primary">✓</span>
              {t}
            </li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-[hsl(var(--card))] border border-[hsl(var(--primary-dark)/0.3)] rounded-md p-6 text-center"
          >
            <div className="font-display text-4xl text-primary">{s.num}</div>
            <div className="mt-2 text-[0.65rem] font-bold tracking-[0.25em] uppercase text-white/60">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhoWeAre;