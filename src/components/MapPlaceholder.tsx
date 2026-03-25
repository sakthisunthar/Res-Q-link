import { MapPin } from "lucide-react";

interface MapPlaceholderProps {
  showAmbulance?: boolean;
  showRoute?: boolean;
  className?: string;
  latitude?: number;
  longitude?: number;
  zoom?: number;
}

const MapPlaceholder = ({
  showAmbulance,
  showRoute,
  className = "",
  latitude = 28.613939,
  longitude = 77.209023,
  zoom = 14,
}: MapPlaceholderProps) => {
  const query = `${latitude},${longitude}`;
  const googleMapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

  return (
    <div className={`relative bg-secondary rounded-2xl overflow-hidden ${className}`}>
      {/* Grid pattern to simulate map */}
      <div className="absolute inset-0 opacity-[0.08]">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={`h-${i}`} className="absolute w-full border-t border-foreground" style={{ top: `${(i + 1) * 8}%` }} />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={`v-${i}`} className="absolute h-full border-l border-foreground" style={{ left: `${(i + 1) * 12}%` }} />
        ))}
      </div>

      {/* Simulated roads */}
      <div className="absolute inset-0 opacity-[0.06]">
        <div className="absolute top-[30%] left-0 right-0 h-1 bg-foreground" />
        <div className="absolute top-[60%] left-0 right-0 h-0.5 bg-foreground" />
        <div className="absolute left-[40%] top-0 bottom-0 w-1 bg-foreground" />
        <div className="absolute left-[70%] top-0 bottom-0 w-0.5 bg-foreground" />
      </div>

      {/* Route line */}
      {showRoute && (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d="M 30 75 Q 35 50 45 45 Q 55 40 65 30"
            fill="none"
            stroke="hsl(var(--navy))"
            strokeWidth="1.5"
            strokeDasharray="3,2"
            opacity="0.6"
          />
          <path
            d="M 30 75 Q 35 50 45 45 Q 55 40 65 30"
            fill="none"
            stroke="hsl(var(--emergency))"
            strokeWidth="1"
            opacity="0.9"
          />
        </svg>
      )}

      {/* User location pin */}
      <div className="absolute bottom-[22%] left-[28%] flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-navy border-2 border-card shadow-lg" />
        <div className="w-1.5 h-1.5 rounded-full bg-navy/30 mt-0.5" />
      </div>

      {/* Ambulance marker */}
      {showAmbulance && (
        <div className="absolute top-[28%] right-[30%] animate-ambulance-move">
          <div className="bg-emergency rounded-lg px-1.5 py-1 shadow-lg flex items-center gap-1">
            <span className="text-[10px]">🚑</span>
            <span className="text-[8px] font-bold text-emergency-foreground">AMB-42</span>
          </div>
        </div>
      )}

      {/* Center crosshair */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-8 h-8 rounded-full border-2 border-navy/20 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-navy/40" />
        </div>
      </div>

      <div className="absolute bottom-3 right-3 z-10">
        <a
          href={googleMapsSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-navy text-navy-foreground px-3 py-1.5 text-xs font-semibold rounded-lg shadow-lg hover:bg-navy/90 transition"
        >
          Open in Google Maps
        </a>
      </div>
    </div>
  );
};

export default MapPlaceholder;
