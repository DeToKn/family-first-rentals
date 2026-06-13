import { useState } from "react";
import SectionHeader from "./SectionHeader";

type ItemKey = "chairs" | "rect" | "round";

const ITEMS: { key: ItemKey; name: string; unit: string; price: number }[] = [
  { key: "chairs", name: "Metal Black Chairs", unit: "per chair", price: 6 },
  { key: "rect", name: "4 ft Rectangular Tables", unit: "per table", price: 10 },
  { key: "round", name: "Round Tables", unit: "per table", price: 10 },
];

const fmt = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

const QuoteCalculator = () => {
  const [qty, setQty] = useState<Record<ItemKey, number>>({
    chairs: 0,
    rect: 0,
    round: 0,
  });

  const setVal = (k: ItemKey, v: number) =>
    setQty((q) => ({ ...q, [k]: Math.max(0, Math.floor(isNaN(v) ? 0 : v)) }));

  const total = ITEMS.reduce((sum, i) => sum + qty[i.key] * i.price, 0);

  return (
    <section id="quote" className="py-16 md:py-20 px-4 sm:px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <SectionHeader eyebrow="Instant Estimate" title="Build Your Quote" />

        <div className="bg-[hsl(var(--card))] border border-[hsl(var(--primary-dark)/0.3)] rounded-md p-4 sm:p-6 md:p-10">
          <div className="space-y-6">
            {ITEMS.map((it) => {
              const subtotal = qty[it.key] * it.price;
              return (
                <div
                  key={it.key}
                  className="grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-6 items-center pb-6 border-b border-[hsl(var(--primary-dark)/0.2)] last:border-b-0 last:pb-0"
                >
                  <div className="col-span-2 md:col-span-5">
                    <h3 className="font-display text-lg text-white">{it.name}</h3>
                    <p className="mt-1 text-sm text-primary">
                      {fmt(it.price)}{" "}
                      <span className="text-xs text-white/50 tracking-wider">
                        {it.unit}
                      </span>
                    </p>
                  </div>

                  <div className="col-span-1 md:col-span-4 flex items-center gap-2">
                    <button
                      type="button"
                      aria-label={`Decrease ${it.name}`}
                      onClick={() => setVal(it.key, qty[it.key] - 1)}
                      disabled={qty[it.key] === 0}
                      className="shrink-0 w-10 h-10 rounded border border-[hsl(var(--primary-dark)/0.6)] text-primary hover:bg-primary hover:text-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min={0}
                      inputMode="numeric"
                      value={qty[it.key]}
                      onChange={(e) => setVal(it.key, parseInt(e.target.value, 10))}
                      aria-label={`Quantity of ${it.name}`}
                      className="w-full min-w-0 md:w-20 h-10 text-center bg-black border border-[hsl(var(--primary-dark)/0.6)] rounded text-white font-display focus:outline-none focus:border-primary"
                    />
                    <button
                      type="button"
                      aria-label={`Increase ${it.name}`}
                      onClick={() => setVal(it.key, qty[it.key] + 1)}
                      className="shrink-0 w-10 h-10 rounded border border-[hsl(var(--primary-dark)/0.6)] text-primary hover:bg-primary hover:text-black transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <div className="col-span-1 md:col-span-3 text-right">
                    <p className="text-[0.6rem] md:text-xs uppercase tracking-wider text-white/50">
                      Subtotal
                    </p>
                    <p className="font-display text-lg md:text-xl text-primary">
                      {fmt(subtotal)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-[hsl(var(--primary-dark)/0.4)] flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="ff-eyebrow">Estimated Total</p>
              <p className="font-display text-3xl sm:text-4xl md:text-5xl text-primary mt-1 break-words">
                {fmt(total)}
              </p>
              <p className="text-xs text-white/50 mt-2">
                Estimate only. Final pricing confirmed with your booking.
              </p>
            </div>
            <a href="#book" className="ff-btn-gold self-start md:self-auto">
              Request This Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteCalculator;
