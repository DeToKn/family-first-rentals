import { useState } from "react";
import { isSameDay, format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import SectionHeader from "./SectionHeader";
import { useBookingPrefill, scrollToBooking } from "./BookingContext";
import { toast } from "sonner";

const BOOKED_DATES = [
  new Date(2026, 5, 14),
  new Date(2026, 5, 21),
  new Date(2026, 5, 28),
  new Date(2026, 6, 4),
  new Date(2026, 6, 12),
];

const isBooked = (date: Date) => BOOKED_DATES.some((d) => isSameDay(d, date));

const Availability = () => {
  const [month, setMonth] = useState<Date>(new Date(2026, 5, 1));
  const [selected, setSelected] = useState<Date | undefined>();
  const { setPreselectedDate } = useBookingPrefill();

  const handleSelect = (date: Date | undefined) => {
    if (!date) return;
    if (isBooked(date)) {
      toast.error("This date is unavailable");
      return;
    }
    setSelected(date);
    const iso = format(date, "yyyy-MM-dd");
    setPreselectedDate(iso);
    toast.success(`Selected ${format(date, "MMMM d, yyyy")} — booking form updated`);
    scrollToBooking();
  };

  return (
    <section id="availability" className="py-16 md:py-20 px-4 sm:px-6 bg-background">
      <div className="max-w-3xl mx-auto">
        <SectionHeader eyebrow="Real-Time Availability" title="Check Open Dates" />
        <div className="bg-[hsl(var(--card))] border border-[hsl(var(--primary-dark)/0.3)] rounded-md p-3 sm:p-6 md:p-10 flex flex-col items-center overflow-x-auto">
          <Calendar
            mode="single"
            selected={selected}
            onSelect={handleSelect}
            month={month}
            onMonthChange={setMonth}
            disabled={isBooked}
            modifiers={{
              booked: BOOKED_DATES,
              available: (date) => !isBooked(date),
            }}
            modifiersClassNames={{
              booked:
                "!bg-[hsl(var(--destructive)/0.15)] !text-[hsl(var(--destructive))] line-through font-bold cursor-not-allowed",
              available: "!text-primary font-semibold hover:!bg-[hsl(var(--primary)/0.15)]",
            }}
            classNames={{
              day_selected:
                "!bg-primary !text-primary-foreground !font-bold ring-2 ring-primary shadow-[0_0_20px_hsl(var(--primary)/0.6)]",
            }}
            components={{
              DayContent: ({ date }: { date: Date }) => {
                const booked = isBooked(date);
                return (
                  <span
                    title={booked ? "This date is unavailable" : undefined}
                    aria-label={booked ? "This date is unavailable" : undefined}
                    className="flex items-center justify-center w-full h-full"
                  >
                    {date.getDate()}
                  </span>
                );
              },
            }}
            className="pointer-events-auto rounded-md border border-[hsl(var(--primary-dark)/0.3)] bg-[hsl(var(--card-2))] text-white"
          />
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <span className="ff-pill">
              <span className="w-2.5 h-2.5 rounded-full bg-primary" />
              Available
            </span>
            <span className="ff-pill">
              <span className="w-2.5 h-2.5 rounded-full bg-[hsl(var(--destructive))]" />
              Booked
            </span>
          </div>
          <p className="mt-5 text-center text-sm text-white/60">
            Click any gold date to select it — we'll auto-fill it in the booking form below.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Availability;
