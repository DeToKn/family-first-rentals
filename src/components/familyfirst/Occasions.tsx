import SectionHeader from "./SectionHeader";

const occasions = [
  "Birthday Parties", "Baby Showers", "Cookouts", "School Events",
  "Graduation Parties", "Church Events", "Corporate Events", "Family Reunions",
  "Repasts", "Block Parties", "Weddings", "& More!",
];

const Occasions = () => (
  <section className="py-16 md:py-20 px-4 sm:px-6 bg-[hsl(var(--card))]">
    <div className="max-w-5xl mx-auto">
      <SectionHeader eyebrow="We Serve All Events" title="Perfect For Any Occasion" />
      <div className="flex flex-wrap justify-center gap-3">
        {occasions.map((o) => (
          <div key={o} className="ff-pill">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {o}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Occasions;