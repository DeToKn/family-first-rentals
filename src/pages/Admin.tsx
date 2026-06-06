import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/client";
import BookingTable from "@/components/familyfirst/BookingTable";
import { Loader2, LogOut, Calendar, Users } from "lucide-react";

const Admin = () => {
  const [checking, setChecking] = useState(true);
  const [totalBookings, setTotalBookings] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [confirmedCount, setConfirmedCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/admin/login");
        return;
      }
      if (session.user.email !== import.meta.env.VITE_ADMIN_EMAIL) {
        await supabase.auth.signOut();
        navigate("/admin/login");
        return;
      }
      const { data } = await supabase
        .from("booking_requests")
        .select("status");
      if (data) {
        setTotalBookings(data.length);
        setPendingCount(data.filter((b) => b.status === "pending").length);
        setConfirmedCount(data.filter((b) => b.status === "confirmed").length);
      }
      setChecking(false);
    };
    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="bg-[hsl(var(--card))] border-b border-[hsl(var(--primary-dark)/0.3)] px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-primary font-bold tracking-widest uppercase text-sm">
            Family First Event Rentals
          </h1>
          <p className="text-white/30 text-xs mt-0.5">Admin Dashboard</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-xs text-white/50 hover:text-white border border-white/10 hover:border-white/30 px-3 py-1.5 rounded-sm transition-colors"
        >
          <LogOut className="w-3 h-3" />
          Sign Out
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <StatCard
            icon={<Users className="w-5 h-5 text-primary" />}
            label="Total Requests"
            value={totalBookings}
          />
          <StatCard
            icon={<Calendar className="w-5 h-5 text-yellow-400" />}
            label="Pending"
            value={pendingCount}
            valueColor="text-yellow-400"
          />
          <StatCard
            icon={<Calendar className="w-5 h-5 text-green-400" />}
            label="Confirmed"
            value={confirmedCount}
            valueColor="text-green-400"
          />
        </div>

        <div>
          <h2 className="text-[0.6rem] font-bold tracking-[0.25em] uppercase text-primary/80 mb-4">
            Booking Requests
          </h2>
          <BookingTable />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({
  icon,
  label,
  value,
  valueColor = "text-white",
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  valueColor?: string;
}) => (
  <div className="bg-[hsl(var(--card))] border border-[hsl(var(--primary-dark)/0.3)] rounded-md px-6 py-5 flex items-center gap-4">
    <div className="bg-[hsl(var(--card-2))] p-2 rounded-sm">{icon}</div>
    <div>
      <p className="text-white/40 text-xs uppercase tracking-widest">{label}</p>
      <p className={`text-2xl font-bold mt-0.5 ${valueColor}`}>{value}</p>
    </div>
  </div>
);

export default Admin;