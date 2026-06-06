const Footer = () => (
  <footer className="bg-[hsl(var(--card-2))] border-t border-[hsl(var(--primary-dark)/0.4)] py-12 px-6">
    <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-sm text-white/70">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl text-primary">♛</span>
          <span className="font-display text-primary text-base">Family First Event Rentals</span>
        </div>
        <p className="text-white/60">Atlanta's family-owned table & chair rental company. Clean, quality equipment for every occasion.</p>
      </div>
      <div>
        <h5 className="text-[0.65rem] font-bold tracking-[0.3em] uppercase text-primary mb-3">Contact</h5>
        <p>📞 <a className="hover:text-primary" href="tel:4045209004">404-520-9004</a></p>
        <p>✉️ <a className="hover:text-primary" href="mailto:bookus@familyfirstatl.com">bookus@familyfirstatl.com</a></p>
        <p>📍 Stone Mountain, GA</p>
      </div>
      <div>
        <h5 className="text-[0.65rem] font-bold tracking-[0.3em] uppercase text-primary mb-3">Quick Links</h5>
        <ul className="space-y-1">
          <li><a href="#rentals" className="hover:text-primary">Rentals</a></li>
          <li><a href="#packages" className="hover:text-primary">Packages</a></li>
          <li><a href="#about" className="hover:text-primary">About Us</a></li>
          <li><a href="#faq" className="hover:text-primary">FAQ</a></li>
          <li><a href="#book" className="hover:text-primary">Book Now</a></li>
        </ul>
      </div>
    </div>
    <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-[hsl(var(--primary-dark)/0.3)] text-center text-xs text-white/40">
      © {new Date().getFullYear()} Family First Event Rentals · Stone Mountain, GA
    </div>
  </footer>
);

export default Footer;