import { ArrowLeft, MapPin, Phone, Clock, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobileShell from "@/components/MobileShell";
import BottomNav from "@/components/BottomNav";

const HospitalScreen = () => {
  const navigate = useNavigate();

  return (
    <MobileShell>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="px-5 pt-4 pb-2 flex items-center gap-3 animate-fade-up">
          <button onClick={() => navigate("/")} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center active:scale-90 transition-transform">
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
          <p className="text-sm font-bold text-foreground">Hospital Details</p>
        </div>

        <div className="flex-1 px-5 pb-4 space-y-4 overflow-y-auto">
          {/* Notification banner */}
          <div className="bg-success/10 border border-success/20 rounded-2xl p-4 flex items-start gap-3 animate-fade-up" style={{ animationDelay: '100ms' }}>
            <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-foreground">Hospital has been notified</p>
              <p className="text-xs text-muted-foreground mt-0.5">Emergency team is preparing for your arrival</p>
            </div>
          </div>

          {/* Hospital card */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden animate-fade-up" style={{ animationDelay: '200ms' }}>
            <div className="bg-navy p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-lg font-extrabold text-navy-foreground leading-tight">Manipal Hospital</p>
                  <p className="text-xs text-navy-foreground/70 mt-1">Multi-Specialty · Level 1 Trauma</p>
                </div>
                <span className="bg-success text-success-foreground text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                  Ready
                </span>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-navy" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Distance</p>
                  <p className="text-sm font-semibold text-foreground">3.2 km · ~8 min drive</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                  <Phone className="w-4 h-4 text-navy" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Emergency Contact</p>
                  <p className="text-sm font-semibold text-foreground">+91 80 2502 4444</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                  <Clock className="w-4 h-4 text-navy" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Wait Time</p>
                  <p className="text-sm font-semibold text-foreground">~2 min (ER available)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Other hospitals */}
          <div className="animate-fade-up" style={{ animationDelay: '300ms' }}>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Nearby Alternatives</p>
            {[
              { name: "Apollo Hospital", dist: "5.1 km", status: "Ready", statusColor: "text-success bg-success/10" },
              { name: "Fortis Healthcare", dist: "7.8 km", status: "Busy", statusColor: "text-warning bg-warning/10" },
            ].map((h) => (
              <div key={h.name} className="bg-card border border-border rounded-xl p-3 flex items-center gap-3 mb-2 active:scale-[0.98] transition-transform cursor-pointer">
                <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                  <Building2Icon />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{h.name}</p>
                  <p className="text-[10px] text-muted-foreground">{h.dist}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${h.statusColor}`}>{h.status}</span>
              </div>
            ))}
          </div>
        </div>

        <BottomNav />
      </div>
    </MobileShell>
  );
};

const Building2Icon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-navy">
    <rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>
  </svg>
);

export default HospitalScreen;
