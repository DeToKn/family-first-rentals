import SectionHeader from "./SectionHeader";

const areas = [
  "Atlanta", "Stone Mountain", "Decatur", "Lithonia", "Conyers", "Snellville",
  "Lawrenceville", "Tucker", "Clarkston", "Marietta", "Smyrna", "College Park",
  "East Point", "Morrow", "Jonesboro", "& Surrounding Areas",
];

const ServiceArea = () => (
  <section className="py-16 md:py-20 px-4 sm:px-6 bg-background">
    <div className="max-w-5xl mx-auto">
      <SectionHeader eyebrow="Where We Deliver" title="Our Service Area" />
      <p className="text-center text-sm text-white/60 max-w-lg mx-auto mb-8">
        We deliver throughout the Atlanta metro area. Outside our area? Call us — we'll work something out.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {areas.map((a) => (
          <div
            key={a}
            className="px-4 py-2 rounded-full bg-[hsl(var(--card))] border border-[hsl(var(--primary-dark)/0.3)] text-sm text-white/80"
          >
            {a}
          </div>
        ))}
      </div>
      <div className="mt-12 rounded-md overflow-hidden border border-[hsl(var(--primary-dark)/0.3)] bg-[hsl(var(--card))]">
        <iframe
          title="Stone Mountain, Georgia 30083"
          src="https://www.google.com/maps?q=Stone+Mountain+Georgia+30083&output=embed"
          width="100%"
          height="380"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block w-full border-0"
        />
      </div>
    </div>
  </section>
);

export default ServiceArea;