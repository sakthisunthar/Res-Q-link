import { useState, useEffect } from "react";
import { ArrowLeft, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobileShell from "@/components/MobileShell";
import MapPlaceholder from "@/components/MapPlaceholder";
import BottomNav from "@/components/BottomNav";

const TrackingScreen = () => {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(312); // 5:12

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          navigate("/hospital");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [navigate]);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <MobileShell>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="px-5 pt-4 pb-2 flex items-center gap-3 animate-fade-up">
          <button onClick={() => navigate("/")} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center active:scale-90 transition-transform">
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
          <div className="flex-1">
            <p className="text-sm font-bold text-foreground">Ambulance En Route</p>
            <p className="text-[10px] text-muted-foreground">AMB-42 · Advanced Life Support</p>
          </div>
          <button className="w-8 h-8 rounded-full bg-navy flex items-center justify-center active:scale-90 transition-transform">
            <Phone className="w-3.5 h-3.5 text-navy-foreground" />
          </button>
        </div>

        {/* Map */}
        <MapPlaceholder showAmbulance showRoute className="flex-1 mx-4 mt-2 min-h-[260px]" />

        {/* ETA Card */}
        <div className="px-5 pb-4 pt-4 animate-fade-up" style={{ animationDelay: '100ms' }}>
          <div className="bg-navy rounded-2xl p-5 text-center">
            <p className="text-[10px] font-semibold text-navy-foreground/70 uppercase tracking-widest mb-1">Estimated Arrival</p>
            <div className="flex items-center justify-center gap-1">
              <span className="text-5xl font-extrabold text-navy-foreground tabular-nums tracking-tight leading-none animate-countdown-pulse">
                {mins}:{secs.toString().padStart(2, "0")}
              </span>
            </div>
            <p className="text-xs text-navy-foreground/60 mt-2">1.8 km away · Via MG Road</p>

            <div className="mt-4 flex items-center gap-2">
              <div className="flex-1 h-1.5 rounded-full bg-navy-foreground/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-emergency transition-all duration-1000"
                  style={{ width: `${((312 - seconds) / 312) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Driver info */}
          <div className="mt-3 bg-card border border-border rounded-xl p-3.5 flex items-center gap-3 animate-fade-up" style={{ animationDelay: '200ms' }}>
            <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center text-sm font-bold text-navy-foreground">
              RK
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Rajesh Kumar</p>
              <p className="text-[10px] text-muted-foreground">Paramedic · 4.9 ★ · 320 trips</p>
            </div>
            <span className="text-xs font-bold text-success bg-success/10 px-2 py-1 rounded-md">Active</span>
          </div>
        </div>

        <BottomNav />
      </div>
    </MobileShell>
  );
};

export default TrackingScreen;
