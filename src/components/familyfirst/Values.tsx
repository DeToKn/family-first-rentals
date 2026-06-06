import SectionHeader from "./SectionHeader";

const values = [
  { icon: "👨‍👩‍👦", title: "Family Owned", desc: "A mom and three sons putting family first in everything we do." },
  { icon: "✝️", title: "Faith Based", desc: "Our values are rooted in faith, integrity, and honest service." },
  { icon: "🤝", title: "Built on Respect", desc: "Every client is treated like family — with full care and attention." },
  { icon: "🏆", title: "Committed to Excellence", desc: "Small details, big memories. We never cut corners." },
];

const Values = () => (
  <section className="py-16 md:py-20 px-4 sm:px-6 bg-[hsl(var(--card))]">
    <div className="max-w-5xl mx-auto">
      <SectionHeader eyebrow="Why Choose Us" title="Built on Values" />
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        {values.map((v) => (
          <div
            key={v.title}
            className="bg-[hsl(var(--card-2))] border border-[hsl(var(--primary-dark)/0.3)] rounded-md p-6 text-center"
          >
            <div className="text-3xl mb-3">{v.icon}</div>
            <h4 className="font-display text-lg text-primary">{v.title}</h4>
            <p className="mt-2 text-sm text-white/70">{v.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Values;