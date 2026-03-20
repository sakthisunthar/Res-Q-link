import { ArrowLeft, CheckCircle2, Circle, Truck, MapPin, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobileShell from "@/components/MobileShell";
import BottomNav from "@/components/BottomNav";

const timelineSteps = [
  { label: "Request Sent", time: "9:32 AM", icon: Circle, done: true, detail: "Emergency SOS triggered" },
  { label: "Ambulance Assigned", time: "9:33 AM", icon: Truck, done: true, detail: "AMB-42 dispatched" },
  { label: "On the Way", time: "9:34 AM", icon: MapPin, done: true, detail: "ETA 5 minutes" },
  { label: "Reached Location", time: "—", icon: CheckCircle2, done: false, detail: "Waiting" },
  { label: "At Hospital", time: "—", icon: Building2, done: false, detail: "Manipal Hospital" },
];

const DashboardScreen = () => {
  const navigate = useNavigate();

  return (
    <MobileShell>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="px-5 pt-4 pb-2 flex items-center gap-3 animate-fade-up">
          <button onClick={() => navigate("/")} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center active:scale-90 transition-transform">
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
          <div className="flex-1">
            <p className="text-sm font-bold text-foreground">Emergency Status</p>
            <p className="text-[10px] text-muted-foreground">Request #ER-20260320-042</p>
          </div>
          <span className="bg-emergency/10 text-emergency text-[10px] font-bold px-2.5 py-1 rounded-full animate-countdown-pulse">LIVE</span>
        </div>

        <div className="flex-1 px-5 pb-4 overflow-y-auto">
          {/* Status summary */}
          <div className="bg-navy rounded-2xl p-5 mt-3 animate-fade-up" style={{ animationDelay: '100ms' }}>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-2xl font-extrabold text-navy-foreground tabular-nums">3</p>
                <p className="text-[10px] text-navy-foreground/60 mt-0.5">Min Elapsed</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-emergency tabular-nums animate-countdown-pulse">5</p>
                <p className="text-[10px] text-navy-foreground/60 mt-0.5">Min ETA</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-navy-foreground tabular-nums">1.8</p>
                <p className="text-[10px] text-navy-foreground/60 mt-0.5">km Away</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-6 animate-fade-up" style={{ animationDelay: '200ms' }}>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">Response Timeline</p>

            <div className="relative">
              {timelineSteps.map((step, i) => (
                <div key={step.label} className="flex gap-3 pb-6 last:pb-0 animate-slide-in-right" style={{ animationDelay: `${250 + i * 80}ms` }}>
                  {/* Line + dot */}
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      step.done ? "bg-navy" : "bg-secondary"
                    }`}>
                      <step.icon className={`w-3.5 h-3.5 ${step.done ? "text-navy-foreground" : "text-muted-foreground"}`} />
                    </div>
                    {i < timelineSteps.length - 1 && (
                      <div className={`w-0.5 flex-1 mt-1 rounded-full ${step.done ? "bg-navy" : "bg-border"}`} />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pt-1 flex-1">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm font-semibold ${step.done ? "text-foreground" : "text-muted-foreground"}`}>{step.label}</p>
                      <span className={`text-[10px] font-medium tabular-nums ${step.done ? "text-foreground" : "text-muted-foreground"}`}>{step.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div className="mt-4 flex gap-2 animate-fade-up" style={{ animationDelay: '500ms' }}>
            <button
              onClick={() => navigate("/tracking")}
              className="flex-1 bg-navy text-navy-foreground rounded-xl py-3 text-xs font-bold active:scale-[0.97] transition-transform"
            >
              Track Ambulance
            </button>
            <button
              onClick={() => navigate("/hospital")}
              className="flex-1 bg-secondary text-foreground rounded-xl py-3 text-xs font-bold border border-border active:scale-[0.97] transition-transform"
            >
              Hospital Info
            </button>
          </div>
        </div>

        <BottomNav />
      </div>
    </MobileShell>
  );
};

export default DashboardScreen;
