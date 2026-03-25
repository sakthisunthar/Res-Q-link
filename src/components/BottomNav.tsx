import { Home, MapPin, Activity, Building2, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: MapPin, label: "Track", path: "/tracking" },
  { icon: Activity, label: "Status", path: "/dashboard" },
  { icon: Building2, label: "Hospital", path: "/hospital" },
  { icon: User, label: "Profile", path: "/profile" },
];

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex items-center justify-around py-3 px-4 bg-white/70 backdrop-blur-lg border-t border-white/20 shadow-lg">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center gap-0.5 py-2 px-4 rounded-xl transition-all duration-200 active:scale-95 ${
              isActive
                ? "bg-navy text-white shadow-md"
                : "text-muted-foreground hover:text-foreground hover:bg-white/50"
            }`}
          >
            <item.icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;
