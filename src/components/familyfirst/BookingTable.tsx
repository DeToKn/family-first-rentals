import { useEffect, useState } from "react";
import { supabase } from "@/integrations/client";
import { Loader2 } from "lucide-react";

type Booking = {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  event_date: string;
  event_type: string;
  guest_count: string;
  package_interest: string;
  event_location: string;
  items_needed: string[];
  notes: string;
  status: string;
  created_at: string;
};

const statusColors: Record<string, string> = {
  pending:   "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
  confirmed: "bg-green-500/20 text-green-400 border border-green-500/30",
  cancelled: "bg-red-500/20 text-red-400 border border-red-500/30",
};

const BookingTable = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchBookings = async () => {
    const { data, error } = await supabase
      .from("booking_requests")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Failed to fetch bookings:", error);
      return;
    }
    setBookings((data as Booking[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id);
    const { error } = await supabase
      .from("booking_requests")
      .update({ status })
      .eq("id", id);
    if (!error) {
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b))
      );
    }
    setUpdating(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-20 text-white/40">
        No booking requests yet.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {bookings.map((b) => (
        <div
          key={b.id}
          className="bg-[hsl(var(--card))] border border-[hsl(var(--primary-dark)/0.3)] rounded-md p-5 flex flex-col gap-3"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-white font-bold text-base">
                {b.first_name} {b.last_name}
              </p>
              <p className="text-white/50 text-xs mt-0.5">{b.phone}</p>
              {b.email && (
                <p className="text-white/50 text-xs">{b.email}</p>
              )}
            </div>
            <span className={`text-xs px-3 py-1 rounded-full font-semibold capitalize ${statusColors[b.status] ?? statusColors.pending}`}>
              {b.status}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            <Detail label="Event Date"    value={b.event_date ?? "—"} />
            <Detail label="Event Type"    value={b.event_type ?? "—"} />
            <Detail label="Guests"        value={b.guest_count ?? "—"} />
            <Detail label="Package"       value={b.package_interest ?? "—"} />
            <Detail label="Location"      value={b.event_location ?? "—"} />
            <Detail label="Items Needed"  value={Array.isArray(b.items_needed) ? b.items_needed.join(", ") : b.items_needed ?? "—"} />
          </div>

          {b.notes && (
            <div className="bg-[hsl(var(--card-2))] border-l-2 border-primary/40 rounded px-3 py-2 text-xs text-white/60">
              {b.notes}
            </div>
          )}

          <div className="flex gap-2 flex-wrap pt-1">
            <button
              onClick={() => updateStatus(b.id, "confirmed")}
              disabled={b.status === "confirmed" || updating === b.id}
              className="text-xs px-4 py-1.5 rounded-sm bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {updating === b.id ? "..." : "Confirm"}
            </button>
            <button
              onClick={() => updateStatus(b.id, "cancelled")}
              disabled={b.status === "cancelled" || updating === b.id}
              className="text-xs px-4 py-1.5 rounded-sm bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {updating === b.id ? "..." : "Cancel"}
            </button>
            <button
              onClick={() => updateStatus(b.id, "pending")}
              disabled={b.status === "pending" || updating === b.id}
              className="text-xs px-4 py-1.5 rounded-sm bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 hover:bg-yellow-500/30 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {updating === b.id ? "..." : "Reset to Pending"}
            </button>
          </div>

          <p className="text-white/20 text-[10px]">
            Submitted: {new Date(b.created_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

const Detail = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-[hsl(var(--card-2))] rounded-sm px-3 py-2">
    <p className="text-white/30 text-[10px] uppercase tracking-widest mb-0.5">{label}</p>
    <p className="text-white/80 font-medium">{value}</p>
  </div>
);

export default BookingTable;
