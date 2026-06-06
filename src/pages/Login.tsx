import { useState } from "react";
import { supabase } from "@/integrations/client";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("Invalid email or password");
      setLoading(false);
      return;
    }
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-primary tracking-widest uppercase">
            Family First
          </h1>
          <p className="text-white/50 text-sm mt-1">Admin Dashboard</p>
        </div>

        {/* Card */}
        <div className="bg-[hsl(var(--card))] border border-[hsl(var(--primary-dark)/0.3)] rounded-md p-8">
          <h2 className="text-white text-lg font-semibold mb-6">Sign In</h2>
          
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="block text-[0.6rem] font-bold tracking-[0.25em] uppercase text-primary/80 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[hsl(var(--card-2))] border border-[hsl(var(--primary-dark)/0.4)] rounded-sm px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-primary"
                placeholder="admin@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-[0.6rem] font-bold tracking-[0.25em] uppercase text-primary/80 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[hsl(var(--card-2))] border border-[hsl(var(--primary-dark)/0.4)] rounded-sm px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-primary"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="ff-btn-gold w-full mt-2 !py-3 text-sm flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center text-white/30 text-xs mt-6">
          Family First Event Rentals · Admin Only
        </p>
      </div>
    </div>
  );
};

export default Login;