import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { useBookingPrefill } from "./BookingContext";
import { supabase } from "@/integrations/client";

const schema = z.object({
  first_name: z.string().trim().min(1, "Required").max(80),
  last_name: z.string().trim().min(1, "Required").max(80),
  phone: z.string().trim().min(7, "Enter a valid phone").max(30),
  email: z.string().trim().email("Invalid email").max(255),
  event_date: z.string().max(20).optional().or(z.literal("")),
  event_type: z.string().max(80).optional().or(z.literal("")),
  guest_count: z.string().max(40).optional().or(z.literal("")),
  package_interest: z.string().max(80).optional().or(z.literal("")),
  event_location: z.string().max(200).optional().or(z.literal("")),
  notes: z.string().max(2000).optional().or(z.literal("")),
});

const itemOptions = ["Metal Black Chairs", "4ft Rectangular Tables", "Round Tables", "Not Sure Yet"];

const initial = {
  first_name: "", last_name: "", phone: "", email: "",
  event_date: "", event_type: "", guest_count: "", package_interest: "",
  event_location: "", notes: "",
};

const inputCls = "w-full bg-[hsl(var(--card-2))] border border-[hsl(var(--primary-dark)/0.4)] rounded-sm px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-primary";

const Booking = () => {
  const { preselectedPackage, setPreselectedPackage, preselectedDate, setPreselectedDate } = useBookingPrefill();
  const [form, setForm] = useState(initial);
  const [items, setItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (preselectedPackage) {
      setForm((f) => ({ ...f, package_interest: preselectedPackage }));
    }
  }, [preselectedPackage]);

  useEffect(() => {
    if (preselectedDate) {
      setForm((f) => ({ ...f, event_date: preselectedDate }));
    }
  }, [preselectedDate]);

  const update = (k: keyof typeof initial, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const toggleItem = (it: string) => {
    setItems((prev) => (prev.includes(it) ? prev.filter((x) => x !== it) : [...prev, it]));
  };

  const submit = async () => {
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const first = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0];
      toast.error(first ?? "Please check the form");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from("booking_requests").insert({
        first_name: parsed.data.first_name,
        last_name: parsed.data.last_name,
        phone: parsed.data.phone,
        email: parsed.data.email,
        event_date: parsed.data.event_date || null,
        event_type: parsed.data.event_type || null,
        guest_count: parsed.data.guest_count || null,
        package_interest: parsed.data.package_interest || null,
        items_needed: items,
        event_location: parsed.data.event_location || null,
        notes: parsed.data.notes || null,
      });
      if (error) throw error;
      toast.success("Booking request sent! We'll be in touch soon.");
      setForm(initial);
      setItems([]);
      setPreselectedPackage("");
      setPreselectedDate("");
    } catch (err: any) {
      console.error(err);
      toast.error("Couldn't send your request. Please call 404-520-9004.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="book" className="py-16 md:py-20 px-4 sm:px-6 bg-background">
      <div className="max-w-3xl mx-auto">
        <SectionHeader eyebrow="Let's Get Started" title="Book Your Event" />
        <div className="bg-[hsl(var(--card))] border border-[hsl(var(--primary-dark)/0.3)] rounded-md p-4 sm:p-6 md:p-10">
          <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
            <Field label="First Name">
              <input className={inputCls} value={form.first_name} onChange={(e) => update("first_name", e.target.value)} placeholder="Your first name" />
            </Field>
            <Field label="Last Name">
              <input className={inputCls} value={form.last_name} onChange={(e) => update("last_name", e.target.value)} placeholder="Your last name" />
            </Field>
            <Field label="Phone Number">
              <input className={inputCls} type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="(404) 000-0000" />
            </Field>
            <Field label="Email Address">
              <input className={inputCls} type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@email.com" />
            </Field>
            <Field label="Event Date">
              <input className={inputCls} type="date" value={form.event_date} onChange={(e) => update("event_date", e.target.value)} />
            </Field>
            <Field label="Event Type">
              <select className={inputCls} value={form.event_type} onChange={(e) => update("event_type", e.target.value)}>
                <option value="">Select event type...</option>
                {["Birthday Party","Baby Shower","Cookout","School Event","Graduation","Church Event","Corporate Event","Repast","Wedding","Other"].map((o) => <option key={o}>{o}</option>)}
              </select>
            </Field>
            <Field label="Number of Guests">
              <select className={inputCls} value={form.guest_count} onChange={(e) => update("guest_count", e.target.value)}>
                <option value="">Estimated guests...</option>
                {["Under 25","25–50","50–100","100+"].map((o) => <option key={o}>{o}</option>)}
              </select>
            </Field>
            <Field label="Package Interest">
              <select className={inputCls} value={form.package_interest} onChange={(e) => update("package_interest", e.target.value)}>
                <option value="">Select a package...</option>
                {["Starter Pack – $95","Party Pack – $245","Full Event Pack – $430","Custom / Individual Items"].map((o) => <option key={o}>{o}</option>)}
              </select>
            </Field>
            <Field label="Items Needed" full>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {itemOptions.map((it) => (
                  <label key={it} className="flex items-center gap-2 bg-[hsl(var(--card-2))] border border-[hsl(var(--primary-dark)/0.3)] rounded-sm px-3 py-2 text-sm text-white/80 cursor-pointer hover:border-primary">
                    <input
                      type="checkbox"
                      checked={items.includes(it)}
                      onChange={() => toggleItem(it)}
                      className="accent-[hsl(var(--primary))]"
                    />
                    {it}
                  </label>
                ))}
              </div>
            </Field>
            <Field label="Event Location" full>
              <input className={inputCls} value={form.event_location} onChange={(e) => update("event_location", e.target.value)} placeholder="City, GA or full address" />
            </Field>
            <Field label="Additional Notes" full>
              <textarea
                className={inputCls + " min-h-[100px] resize-y"}
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                placeholder="Setup time, special requests, or anything else we should know..."
              />
            </Field>
          </div>
          <button onClick={submit} disabled={loading} className="ff-btn-gold w-full mt-8 !py-4 text-sm">
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            {loading ? "Sending..." : "Send Booking Request ✦"}
          </button>
          <p className="mt-4 text-center text-xs text-white/50">
            Or call us directly at{" "}
            <a href="tel:4045209004" className="text-primary font-bold">404-520-9004</a>
          </p>
        </div>
      </div>
    </section>
  );
};

const Field = ({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) => (
  <div className={full ? "md:col-span-2" : ""}>
    <label className="block text-[0.6rem] font-bold tracking-[0.25em] uppercase text-primary/80 mb-2">{label}</label>
    {children}
  </div>
);

export default Booking;
