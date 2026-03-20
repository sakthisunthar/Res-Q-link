import { ArrowLeft, Radio, Phone, AlertTriangle, Truck, Clock, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobileShell from "@/components/MobileShell";

const activeEmergencies = [
  { id: "ER-042", type: "Cardiac", location: "MG Road", severity: "Critical", eta: 4, ambulance: "AMB-42", x: 30, y: 72 },
  { id: "ER-039", type: "Accident", location: "Koramangala", severity: "High", eta: 7, ambulance: "AMB-17", x: 62, y: 38 },
  { id: "ER-041", type: "Burns", location: "Indiranagar", severity: "Medium", eta: 11, ambulance: "AMB-08", x: 78, y: 65 },
];

const fleet = [
  { id: "AMB-42", status: "Dispatched", x: 40, y: 48 },
  { id: "AMB-17", status: "Dispatched", x: 55, y: 30 },
  { id: "AMB-08", status: "Dispatched", x: 70, y: 55 },
  { id: "AMB-23", status: "Available", x: 22, y: 40 },
  { id: "AMB-31", status: "Available", x: 85, y: 20 },
  { id: "AMB-05", status: "Offline", x: 15, y: 82 },
];

const severityBadge: Record<string, string> = {
  Critical: "bg-emergency text-emergency-foreground",
  High: "bg-warning text-warning-foreground",
  Medium: "bg-navy text-navy-foreground",
};

const statusDot: Record<string, string> = {
  Dispatched: "bg-warning",
  Available: "bg-success",
  Offline: "bg-muted-foreground",
};

const DispatcherScreen = () => {
  const navigate = useNavigate();

  const dispatched = fleet.filter((a) => a.status === "Dispatched").length;
  const available = fleet.filter((a) => a.status === "Available").length;

  return (
    <MobileShell>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="px-5 pt-4 pb-2 flex items-center gap-3 animate-fade-up">
          <button
            onClick={() => navigate("/")}
            className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center active:scale-90 transition-transform"
          >
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
          <div className="flex-1">
            <p className="text-sm font-bold text-foreground">Dispatch Control</p>
            <p className="text-[10px] text-muted-foreground">Fleet overview · Bengaluru</p>
          </div>
          <span className="bg-emergency/10 text-emergency text-[10px] font-bold px-2.5 py-1 rounded-full animate-countdown-pulse">
            {activeEmergencies.length} ACTIVE
          </span>
        </div>

        {/* Stats bar */}
        <div
          className="mx-5 mt-2 bg-navy rounded-xl p-3 grid grid-cols-3 gap-2 text-center animate-fade-up"
          style={{ animationDelay: "80ms" }}
        >
          <div>
            <p className="text-lg font-extrabold text-emergency tabular-nums">{activeEmergencies.length}</p>
            <p className="text-[9px] text-navy-foreground/60 font-semibold uppercase">Emergencies</p>
          </div>
          <div>
            <p className="text-lg font-extrabold text-warning tabular-nums">{dispatched}</p>
            <p className="text-[9px] text-navy-foreground/60 font-semibold uppercase">Dispatched</p>
          </div>
          <div>
            <p className="text-lg font-extrabold text-success tabular-nums">{available}</p>
            <p className="text-[9px] text-navy-foreground/60 font-semibold uppercase">Available</p>
          </div>
        </div>

        {/* Map */}
        <div
          className="relative bg-secondary rounded-2xl overflow-hidden mx-5 mt-3 min-h-[220px] animate-fade-up"
          style={{ animationDelay: "160ms" }}
        >
          {/* Grid */}
          <div className="absolute inset-0 opacity-[0.06]">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={`h-${i}`} className="absolute w-full border-t border-foreground" style={{ top: `${(i + 1) * 9}%` }} />
            ))}
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={`v-${i}`} className="absolute h-full border-l border-foreground" style={{ left: `${(i + 1) * 12}%` }} />
            ))}
          </div>

          {/* Roads */}
          <div className="absolute inset-0 opacity-[0.05]">
            <div className="absolute top-[25%] left-0 right-0 h-1 bg-foreground" />
            <div className="absolute top-[55%] left-0 right-0 h-0.5 bg-foreground" />
            <div className="absolute top-[80%] left-[10%] right-[20%] h-0.5 bg-foreground" />
            <div className="absolute left-[35%] top-0 bottom-0 w-1 bg-foreground" />
            <div className="absolute left-[65%] top-0 bottom-0 w-0.5 bg-foreground" />
          </div>

          {/* Route lines from emergencies to ambulances */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {activeEmergencies.map((e) => {
              const amb = fleet.find((a) => a.id === e.ambulance);
              if (!amb) return null;
              return (
                <line
                  key={e.id}
                  x1={e.x} y1={e.y} x2={amb.x} y2={amb.y}
                  stroke="hsl(var(--emergency))"
                  strokeWidth="0.7"
                  strokeDasharray="2,2"
                  opacity="0.5"
                />
              );
            })}
          </svg>

          {/* Emergency pins (pulsing) */}
          {activeEmergencies.map((e) => (
            <div
              key={e.id}
              className="absolute flex flex-col items-center"
              style={{ left: `${e.x}%`, top: `${e.y}%`, transform: "translate(-50%, -50%)" }}
            >
              <div className="relative">
                <div className="absolute -inset-1.5 rounded-full bg-emergency/20 animate-emergency-pulse" />
                <div className="w-3 h-3 rounded-full bg-emergency border-2 border-card shadow-md relative z-10" />
              </div>
            </div>
          ))}

          {/* Ambulance markers */}
          {fleet.map((a) => (
            <div
              key={a.id}
              className="absolute"
              style={{ left: `${a.x}%`, top: `${a.y}%`, transform: "translate(-50%, -50%)" }}
            >
              <div
                className={`rounded-md px-1 py-0.5 shadow-sm flex items-center gap-0.5 ${
                  a.status === "Dispatched"
                    ? "bg-warning/90"
                    : a.status === "Available"
                    ? "bg-success/90"
                    : "bg-muted"
                }`}
              >
                <span className="text-[8px]">🚑</span>
                <span className="text-[7px] font-bold text-card-foreground">{a.id.replace("AMB-", "")}</span>
              </div>
            </div>
          ))}

          {/* Legend */}
          <div className="absolute bottom-2 left-2 bg-card/90 backdrop-blur-sm rounded-lg px-2 py-1.5 flex items-center gap-3 border border-border">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-emergency" />
              <span className="text-[8px] font-medium text-muted-foreground">SOS</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span className="text-[8px] font-medium text-muted-foreground">Free</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-warning" />
              <span className="text-[8px] font-medium text-muted-foreground">Busy</span>
            </div>
          </div>
        </div>

        {/* Active emergencies list */}
        <div className="flex-1 px-5 pt-3 pb-4 overflow-y-auto">
          <p
            className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2.5 animate-fade-up"
            style={{ animationDelay: "240ms" }}
          >
            Active Emergencies
          </p>
          <div className="space-y-2">
            {activeEmergencies.map((e, i) => (
              <div
                key={e.id}
                className="bg-card border border-border rounded-xl p-3.5 flex items-center gap-3 active:scale-[0.98] transition-transform cursor-pointer animate-fade-up"
                style={{ animationDelay: `${300 + i * 70}ms` }}
              >
                <div className="w-9 h-9 rounded-lg bg-emergency/10 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-4 h-4 text-emergency" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-semibold text-foreground">{e.type}</p>
                    <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${severityBadge[e.severity]}`}>
                      {e.severity.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {e.location} · {e.ambulance}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-lg font-extrabold text-emergency tabular-nums leading-none animate-countdown-pulse">
                    {e.eta}m
                  </p>
                  <p className="text-[9px] text-muted-foreground mt-0.5">ETA</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MobileShell>
  );
};

export default DispatcherScreen;
