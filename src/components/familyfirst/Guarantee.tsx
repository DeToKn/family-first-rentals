const items = [
  { icon: "🛡️", label: "Clean Equipment" },
  { icon: "⏰", label: "On-Time Always" },
  { icon: "💛", label: "Family Values" },
  { icon: "💰", label: "Fair Pricing" },
];

const Guarantee = () => (
  <section className="py-16 md:py-20 px-4 sm:px-6 bg-[hsl(var(--card))]">
    <div className="max-w-3xl mx-auto text-center">
      <span className="text-4xl text-primary block mb-4">♛</span>
      <h2 className="font-display text-3xl md:text-4xl text-white">
        Satisfaction Guaranteed — Because Family Comes First
      </h2>
      <p className="mt-4 text-white/70 leading-relaxed">
        If something isn't right, call us at{" "}
        <a href="tel:4045209004" className="text-primary font-bold">404-520-9004</a>{" "}
        and we'll make it right. We want every event to be perfect — that's our promise to you and your family.
      </p>
      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((g) => (
          <div
            key={g.label}
            className="bg-[hsl(var(--card-2))] border border-[hsl(var(--primary-dark)/0.3)] rounded-md p-5"
          >
            <div className="text-3xl mb-2">{g.icon}</div>
            <div className="text-[0.65rem] font-bold tracking-[0.25em] uppercase text-white/70">{g.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Guarantee;