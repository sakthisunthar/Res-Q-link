import { ArrowLeft, Droplets, AlertTriangle, Phone, Pencil, Heart, User, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobileShell from "@/components/MobileShell";
import BottomNav from "@/components/BottomNav";

const profile = {
  name: "Anika Sharma",
  age: 34,
  gender: "Female",
  bloodType: "O+",
  weight: "62 kg",
  height: "165 cm",
};

const allergies = [
  { id: 1, name: "Penicillin", severity: "Severe" },
  { id: 2, name: "Peanuts", severity: "Moderate" },
  { id: 3, name: "Latex", severity: "Mild" },
];

const conditions = ["Asthma", "Mild Hypertension"];

const emergencyContacts = [
  { id: 1, name: "Rohan Sharma", relation: "Spouse", phone: "+91 98765 43210" },
  { id: 2, name: "Priya Verma", relation: "Sister", phone: "+91 87654 32109" },
  { id: 3, name: "Dr. Mehta", relation: "Physician", phone: "+91 80 2550 1234" },
];

const severityColor: Record<string, string> = {
  Severe: "bg-emergency/10 text-emergency",
  Moderate: "bg-warning/10 text-warning",
  Mild: "bg-success/10 text-success",
};

const ProfileScreen = () => {
  const navigate = useNavigate();

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
            <p className="text-sm font-bold text-foreground">Medical Profile</p>
            <p className="text-[10px] text-muted-foreground">Shared with responders</p>
          </div>
          <button className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center active:scale-90 transition-transform">
            <Pencil className="w-3.5 h-3.5 text-foreground" />
          </button>
        </div>

        <div className="flex-1 px-5 pb-4 overflow-y-auto space-y-4">
          {/* Identity card */}
          <div
            className="bg-navy rounded-2xl p-5 mt-3 animate-fade-up"
            style={{ animationDelay: "80ms" }}
          >
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-full bg-navy-foreground/10 flex items-center justify-center text-xl font-extrabold text-navy-foreground">
                AS
              </div>
              <div className="flex-1">
                <p className="text-base font-extrabold text-navy-foreground leading-tight">
                  {profile.name}
                </p>
                <p className="text-xs text-navy-foreground/60 mt-0.5">
                  {profile.age}y · {profile.gender} · {profile.weight} · {profile.height}
                </p>
              </div>
            </div>

            {/* Blood type highlight */}
            <div className="mt-4 flex items-center gap-3 bg-navy-foreground/10 rounded-xl p-3">
              <Droplets className="w-5 h-5 text-emergency" />
              <div>
                <p className="text-[10px] text-navy-foreground/60 uppercase tracking-wider font-semibold">
                  Blood Type
                </p>
                <p className="text-xl font-extrabold text-navy-foreground tabular-nums leading-none mt-0.5">
                  {profile.bloodType}
                </p>
              </div>
            </div>
          </div>

          {/* Allergies */}
          <div className="animate-fade-up" style={{ animationDelay: "160ms" }}>
            <div className="flex items-center gap-1.5 mb-2.5">
              <AlertTriangle className="w-3.5 h-3.5 text-warning" />
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Allergies
              </p>
            </div>
            <div className="space-y-2">
              {allergies.map((a) => (
                <div
                  key={a.id}
                  className="bg-card border border-border rounded-xl px-3.5 py-3 flex items-center justify-between"
                >
                  <p className="text-sm font-semibold text-foreground">{a.name}</p>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${severityColor[a.severity]}`}
                  >
                    {a.severity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Conditions */}
          <div className="animate-fade-up" style={{ animationDelay: "240ms" }}>
            <div className="flex items-center gap-1.5 mb-2.5">
              <Heart className="w-3.5 h-3.5 text-emergency" />
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Conditions
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {conditions.map((c) => (
                <span
                  key={c}
                  className="bg-secondary text-foreground text-xs font-semibold px-3 py-1.5 rounded-lg"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="animate-fade-up" style={{ animationDelay: "320ms" }}>
            <div className="flex items-center gap-1.5 mb-2.5">
              <Phone className="w-3.5 h-3.5 text-navy" />
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Emergency Contacts
              </p>
            </div>
            <div className="space-y-2">
              {emergencyContacts.map((c) => (
                <div
                  key={c.id}
                  className="bg-card border border-border rounded-xl p-3.5 flex items-center gap-3 active:scale-[0.98] transition-transform cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-full bg-navy/10 flex items-center justify-center">
                    <User className="w-4 h-4 text-navy" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{c.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {c.relation} · {c.phone}
                    </p>
                  </div>
                  <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
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

export default ProfileScreen;
