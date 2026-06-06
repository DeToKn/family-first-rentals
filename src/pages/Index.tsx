import SiteNav from "@/components/familyfirst/SiteNav";
import Hero from "@/components/familyfirst/Hero";
import TrustBar from "@/components/familyfirst/TrustBar";
import Stats from "@/components/familyfirst/Stats";
import Rentals from "@/components/familyfirst/Rentals";
import QuoteCalculator from "@/components/familyfirst/QuoteCalculator";
import Availability from "@/components/familyfirst/Availability";
import Packages from "@/components/familyfirst/Packages";
import WhoWeAre from "@/components/familyfirst/WhoWeAre";
import Occasions from "@/components/familyfirst/Occasions";
import ServiceArea from "@/components/familyfirst/ServiceArea";
import Guarantee from "@/components/familyfirst/Guarantee";
import Faq from "@/components/familyfirst/Faq";
import Values from "@/components/familyfirst/Values";
import Booking from "@/components/familyfirst/Booking";
import Footer from "@/components/familyfirst/Footer";
import { BookingProvider } from "@/components/familyfirst/BookingContext";

const Index = () => (
  <BookingProvider>
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main>
        <Hero />
        <TrustBar />
        <Stats />
        <Rentals />
        <QuoteCalculator />
        <Availability />
        <Packages />
        <WhoWeAre />
        <Occasions />
        <ServiceArea />
        <Guarantee />
        <Faq />
        <Values />
        <Booking />
      </main>
      <Footer />
    </div>
  </BookingProvider>
);

export default Index;
