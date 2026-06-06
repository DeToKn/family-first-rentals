const stats = [
  { num: "5★", label: "Customer Rating" },
  { num: "100+", label: "Events Served" },
  { num: "24hr", label: "Response Time" },
  { num: "ATL", label: "Metro Area" },
];

const Stats = () => (
  <section className="py-12 px-6">
    <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
      {stats.map((s) => (
        <div key={s.label}>
          <div className="font-display text-3xl md:text-4xl text-primary">{s.num}</div>
          <div className="mt-2 text-[0.65rem] font-bold tracking-[0.3em] uppercase text-white/60">{s.label}</div>
        </div>
      ))}
    </div>
  </section>
);

export default Stats;