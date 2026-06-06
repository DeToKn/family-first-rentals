const SectionHeader = ({ eyebrow, title }: { eyebrow: string; title: string }) => (
  <div className="text-center mb-12">
    <p className="ff-eyebrow">{eyebrow}</p>
    <h2 className="ff-title mt-2">{title}</h2>
    <div className="ff-underline" />
  </div>
);

export default SectionHeader;