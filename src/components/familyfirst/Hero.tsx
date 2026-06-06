import { scrollToBooking } from "./BookingContext";

const Hero = () => {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative overflow-hidden py-16 md:py-20 px-4 sm:px-6 text-center bg-[radial-gradient(ellipse_at_top,#1a1400_0%,#0A0A0A_65%)]">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-100"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C9A84C' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />
      <div className="relative max-w-3xl mx-auto">
        <span className="block text-5xl text-primary mb-3 animate-pulse">♛</span>
        <p className="ff-eyebrow mb-3">Atlanta's Trusted Table &amp; Chair Rental Company</p>
        <h1 className="font-display font-black leading-none text-white text-[clamp(2.8rem,7vw,5rem)]">
          Family<br />
          <em className="not-italic text-primary">First</em>
        </h1>
        <p className="mt-2 text-[0.72rem] font-bold tracking-[0.5em] uppercase text-white/40">
          Event Rentals
        </p>
        <div className="mx-auto my-6 h-px w-16 bg-primary" />
        <p className="text-white/80 max-w-xl mx-auto leading-relaxed">
          We set the table. You enjoy the moments. Clean, stylish rentals delivered on time — every time.
        </p>
        <p className="mt-4 ff-eyebrow !text-primary/80">A Mom. Three Sons. One Mission.</p>
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <button className="ff-btn-gold" onClick={scrollToBooking}>Book Your Event</button>
          <button className="ff-btn-outline" onClick={() => scrollTo("packages")}>View Packages</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;