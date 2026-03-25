import { useState, useEffect } from "react";
import { X, Phone, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobileShell from "@/components/MobileShell";
import MapPlaceholder from "@/components/MapPlaceholder";

const EmergencyTriggerScreen = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"searching" | "found">("searching");
  const [eta, setEta] = useState(8);

  useEffect(() => {
    const timer = setTimeout(() => setStep("found"), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (step === "found") {
      const interval = setInterval(() => {
        setEta((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            navigate("/tracking");
            return 0;
          }
          return prev - 1;
        });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [step, navigate]);

  return (
    <MobileShell>
      <div className="flex flex-col h-full">
        {/* Alert banner */}
        <div className="bg-emergency px-5 py-3 flex items-center justify-between animate-fade-up md:px-8 lg:px-12 md:py-4">
          <div className="flex items-center gap-2">
            <span className="text-lg animate-countdown-pulse md:text-xl">🚨</span>
            <div>
              <p className="text-xs font-bold text-emergency-foreground md:text-sm">EMERGENCY ACTIVE</p>
              <p className="text-[10px] text-emergency-foreground/80 md:text-xs">Help is on the way</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/")}
            className="w-7 h-7 rounded-full bg-emergency-foreground/20 flex items-center justify-center active:scale-90 transition-transform md:w-9 md:h-9"
          >
            <X className="w-3.5 h-3.5 text-emergency-foreground md:w-4 md:h-4" />
          </button>
        </div>

        {/* Map */}
        <MapPlaceholder
          showAmbulance={step === "found"}
          showRoute={step === "found"}
          className="flex-1 mx-4 mt-4 min-h-[240px] md:mx-8 lg:mx-12 md:min-h-[350px]"
          latitude={28.613939}
          longitude={77.209023}
          zoom={12}
        />

        {/* Info panel */}
        <div className="px-5 pb-5 pt-4 space-y-4 md:px-8 lg:px-12 md:pb-8 md:pt-6 md:space-y-6">
          {step === "searching" ? (
            <div className="text-center animate-fade-up md:max-w-md md:mx-auto">
              <div className="w-10 h-10 mx-auto rounded-full border-2 border-emergency border-t-transparent animate-spin mb-3 md:w-12 md:h-12 md:mb-4" />
              <p className="text-sm font-bold text-foreground md:text-lg">Locating nearest ambulance...</p>
              <p className="text-xs text-muted-foreground mt-1 md:text-sm">Scanning 3 ambulances nearby</p>
            </div>
          ) : (
            <div className="animate-fade-up space-y-3 md:space-y-4 md:max-w-2xl md:mx-auto">
              {/* Ambulance card */}
              <div className="bg-secondary rounded-2xl p-4 md:p-6">
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <div className="flex items-center gap-2 md:gap-3">
                    <span className="text-lg animate-ambulance-move md:text-xl">🚑</span>
                    <div>
                      <p className="text-sm font-bold text-foreground md:text-lg">AMB-42</p>
                      <p className="text-[10px] text-muted-foreground md:text-sm">Advanced Life Support</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-extrabold text-emergency tabular-nums animate-countdown-pulse md:text-3xl">{eta}m</p>
                    <p className="text-[10px] text-muted-foreground md:text-sm">ETA</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 md:gap-2">
                  <div className="h-1 flex-1 rounded-full bg-border overflow-hidden md:h-1.5">
                    <div className="h-full bg-emergency rounded-full transition-all duration-1000" style={{ width: `${((8 - eta) / 8) * 100}%` }} />
                  </div>
                  <span className="text-[10px] font-medium text-muted-foreground md:text-sm">2.4 km</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 md:gap-3 md:max-w-md md:mx-auto">
                <button className="flex-1 bg-navy text-navy-foreground rounded-xl py-3 text-xs font-bold flex items-center justify-center gap-1.5 active:scale-[0.97] transition-transform md:py-4 md:text-sm">
                  <Phone className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  Call Driver
                </button>
                <button className="flex-1 bg-secondary text-foreground rounded-xl py-3 text-xs font-bold flex items-center justify-center gap-1.5 active:scale-[0.97] transition-transform border border-border md:py-4 md:text-sm">
                  <MessageSquare className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  Message
                </button>
              </div>

              {/* Cancel */}
              <button
                onClick={() => navigate("/")}
                className="w-full py-2.5 text-xs font-semibold text-emergency rounded-xl border border-emergency/20 active:scale-[0.97] transition-transform md:py-3 md:text-sm md:max-w-md md:mx-auto"
              >
                Cancel Emergency
              </button>
            </div>
          )}
        </div>
      </div>
    </MobileShell>
  );
};

export default EmergencyTriggerScreen;
