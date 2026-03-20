import { MapPin, Clock, ChevronRight, Shield, Radio } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobileShell from "@/components/MobileShell";
import BottomNav from "@/components/BottomNav";
import { triggerEmergencyFeedback } from "@/lib/haptics";

const emergencyHistory = [
  { id: 1, date: "Mar 14, 2026", type: "Cardiac", status: "Resolved", time: "14 min" },
  { id: 2, date: "Feb 28, 2026", type: "Accident", status: "Resolved", time: "9 min" },
];

const HomeScreen = () => {
  const navigate = useNavigate();

  return (
    <MobileShell>
      <div className="flex flex-col h-full">
        <div className="flex-1 px-5 pb-4">
          {/* Header */}
          <div className="flex items-center justify-between pt-4 pb-6 animate-fade-up">
            <div>
              <p className="text-xs font-medium text-muted-foreground tracking-wide uppercase">Emergency Response</p>
              <h1 className="text-xl font-extrabold text-foreground tracking-tight mt-0.5">Optimizer</h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/dispatcher")}
                className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center active:scale-90 transition-transform"
                title="Dispatcher View"
              >
                <Radio className="w-4 h-4 text-foreground" />
              </button>
              <div className="w-9 h-9 rounded-full bg-navy flex items-center justify-center">
                <Shield className="w-4 h-4 text-navy-foreground" />
              </div>
            </div>
          </div>

          {/* Location card */}
          <div className="bg-secondary rounded-2xl p-4 mb-6 animate-fade-up" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-navy/10 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-navy" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Current Location</p>
                <p className="text-sm font-semibold text-foreground">12.9716° N, 77.5946° E</p>
                <p className="text-xs text-muted-foreground">MG Road, Bengaluru</p>
              </div>
            </div>
          </div>

          {/* Emergency Button */}
          <div className="flex items-center justify-center py-8 animate-fade-up" style={{ animationDelay: '200ms' }}>
            <div className="relative">
              {/* Ripple rings */}
              <div className="absolute inset-0 rounded-full bg-emergency/10 animate-ripple" />
              <div className="absolute inset-0 rounded-full bg-emergency/10 animate-ripple" style={{ animationDelay: '0.5s' }} />
              <div className="absolute inset-0 rounded-full bg-emergency/10 animate-ripple" style={{ animationDelay: '1s' }} />

              <button
                onClick={() => { triggerEmergencyFeedback(); navigate("/emergency"); }}
                className="relative w-36 h-36 rounded-full bg-emergency text-emergency-foreground font-extrabold text-lg tracking-wide shadow-xl animate-emergency-pulse active:scale-95 transition-transform duration-100 flex flex-col items-center justify-center gap-1 z-10"
              >
                <span className="text-2xl">🚨</span>
                <span>SOS</span>
                <span className="text-[10px] font-semibold opacity-80">TAP FOR HELP</span>
              </button>
            </div>
          </div>

          {/* History */}
          <div className="animate-fade-up" style={{ animationDelay: '350ms' }}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-foreground">Recent Emergencies</h2>
              <button className="text-[10px] font-semibold text-navy uppercase tracking-wide">View All</button>
            </div>

            <div className="space-y-2.5">
              {emergencyHistory.map((item) => (
                <div
                  key={item.id}
                  className="bg-card border border-border rounded-xl p-3.5 flex items-center gap-3 active:scale-[0.98] transition-transform cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-lg bg-success/10 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-success" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{item.type} Emergency</p>
                    <p className="text-xs text-muted-foreground">{item.date} · {item.time} response</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <BottomNav />
      </div>
    </MobileShell>
  );
};

export default HomeScreen;
