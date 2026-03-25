import { MapPin, Clock, ChevronRight, Shield, Radio, Heart, Car } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobileShell from "@/components/MobileShell";
import BottomNav from "@/components/BottomNav";
import { triggerEmergencyFeedback } from "@/lib/haptics";

const emergencyHistory = [
  { id: 1, date: "Mar 14, 2026", type: "Cardiac", status: "Resolved", time: "14 min", color: "bg-red-100 text-red-700", icon: Heart },
  { id: 2, date: "Feb 28, 2026", type: "Accident", status: "Resolved", time: "9 min", color: "bg-orange-100 text-orange-700", icon: Car },
];

const HomeScreen = () => {
  const navigate = useNavigate();

  return (
    <MobileShell>
      <div className="flex flex-col h-full">
        <div className="flex-1 px-5 pb-4 md:px-8 lg:px-12">
          {/* Header */}
          <div className="flex items-center justify-between pt-4 pb-6 animate-fade-up md:pt-8 md:pb-8">
            <div>
              <p className="text-xs font-medium text-muted-foreground tracking-wide uppercase md:text-sm">Emergency Response</p>
              <h1 className="text-xl font-extrabold text-foreground tracking-tight mt-0.5 md:text-3xl">Optimizer</h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/dispatcher")}
                className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center active:scale-90 transition-transform md:w-12 md:h-12"
                title="Dispatcher View"
              >
                <Radio className="w-4 h-4 text-foreground md:w-5 md:h-5" />
              </button>
              <div className="w-9 h-9 rounded-full bg-navy flex items-center justify-center md:w-12 md:h-12">
                <Shield className="w-4 h-4 text-navy-foreground md:w-5 md:h-5" />
              </div>
            </div>
          </div>

          {/* Location card */}
          <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 mb-6 shadow-lg border border-white/20 animate-fade-up md:p-6 md:mb-8" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-navy/10 flex items-center justify-center md:w-10 md:h-10">
                <MapPin className="w-4 h-4 text-navy md:w-5 md:h-5" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider md:text-xs">Current Location</p>
                <p className="text-sm font-semibold text-foreground md:text-lg">12.9716° N, 77.5946° E</p>
                <p className="text-xs text-muted-foreground md:text-sm">MG Road, Bengaluru</p>
              </div>
            </div>
            {/* Subtle map preview */}
            <div className="mt-3 h-16 bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg opacity-50 md:h-20"></div>
          </div>

          {/* Emergency Button */}
          <div className="flex items-center justify-center py-8 animate-fade-up md:py-12" style={{ animationDelay: '200ms' }}>
            <div className="relative">
              {/* Ripple rings */}
              <div className="absolute inset-0 rounded-full bg-red-500/20 animate-ping" />
              <div className="absolute inset-0 rounded-full bg-red-500/20 animate-ping" style={{ animationDelay: '0.5s' }} />
              <div className="absolute inset-0 rounded-full bg-red-500/20 animate-ping" style={{ animationDelay: '1s' }} />

              <button
                onClick={() => { triggerEmergencyFeedback(); navigate("/emergency"); }}
                className="relative w-40 h-40 rounded-full text-white font-extrabold text-lg tracking-wide shadow-2xl shadow-red-500/50 animate-pulse active:scale-95 transition-transform duration-100 flex flex-col items-center justify-center gap-1 z-10 md:w-52 md:h-52 md:text-xl"
                style={{ background: 'radial-gradient(circle, #ef4444, #dc2626)' }}
              >
                <span className="text-3xl md:text-4xl">🚨</span>
                <span>SOS</span>
                <span className="text-[10px] font-semibold opacity-80 md:text-xs">Tap in Emergency</span>
              </button>
            </div>
          </div>

          {/* History */}
          <div className="animate-fade-up md:max-w-2xl md:mx-auto" style={{ animationDelay: '350ms' }}>
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h2 className="text-sm font-bold text-foreground md:text-lg">Recent Emergencies</h2>
              <button className="text-[10px] font-semibold text-navy uppercase tracking-wide md:text-sm">View All</button>
            </div>

            <div className="space-y-2.5 md:space-y-3">
              {emergencyHistory.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.id}
                    className="bg-white/60 backdrop-blur-md border border-white/20 rounded-xl p-3.5 flex items-center gap-3 active:scale-[0.98] transition-transform cursor-pointer shadow-lg md:p-4 md:gap-4"
                  >
                    <div className={`w-9 h-9 rounded-lg ${item.color} flex items-center justify-center md:w-12 md:h-12`}>
                      <IconComponent className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground md:text-base">{item.type} Emergency</p>
                      <p className="text-xs text-muted-foreground md:text-sm">{item.date} · {item.time} response</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-semibold rounded-full md:text-xs">Resolved</span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 md:w-5 md:h-5" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <BottomNav />
      </div>
    </MobileShell>
  );
};

export default HomeScreen;
