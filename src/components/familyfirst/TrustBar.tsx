const items = ["Clean Quality", "On-Time Delivery", "Family Focused", "Affordable Pricing", "Faith Based"];

const TrustBar = () => (
  <div className="bg-[hsl(var(--card))] border-y border-[hsl(var(--primary-dark)/0.3)]">
    <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap justify-center gap-x-8 gap-y-2">
      {items.map((t) => (
        <div key={t} className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-white/70">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          {t}
        </div>
      ))}
    </div>
  </div>
);

export default TrustBar;