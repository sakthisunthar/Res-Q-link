import { ArrowLeft, Moon, Globe, Bell, Shield, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MobileShell from "@/components/MobileShell";
import BottomNav from "@/components/BottomNav";

const SettingsScreen = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    locationSharing: true,
    emergencySharing: true,
    language: "en",
  });

  const toggleSetting = (key: string) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  return (
    <MobileShell>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="px-5 pt-4 pb-2 flex items-center gap-3 animate-fade-up">
          <button
            onClick={() => navigate("/profile")}
            className="w-8 h-8 rounded-full bg-white/60 backdrop-blur-md flex items-center justify-center active:scale-90 transition-transform border border-white/20"
          >
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-foreground">Settings</h1>
            <p className="text-xs text-muted-foreground">App preferences</p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {/* Display Settings */}
          <div className="bg-white/60 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-lg animate-fade-up" style={{ animationDelay: "100ms" }}>
            <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Moon className="w-4 h-4" /> Display
            </h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Dark Mode</p>
                <p className="text-xs text-muted-foreground">Easier on the eyes</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.darkMode}
                  onChange={() => toggleSetting("darkMode")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-navy rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-navy"></div>
              </label>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white/60 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-lg animate-fade-up" style={{ animationDelay: "150ms" }}>
            <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Bell className="w-4 h-4" /> Notifications
            </h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Push Notifications</p>
                <p className="text-xs text-muted-foreground">Real-time updates</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={() => toggleSetting("notifications")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-navy rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-navy"></div>
              </label>
            </div>
          </div>

          {/* Location & Privacy */}
          <div className="bg-white/60 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-lg animate-fade-up space-y-3" style={{ animationDelay: "200ms" }}>
            <h2 className="font-semibold text-foreground flex items-center gap-2">
              <Shield className="w-4 h-4" /> Privacy & Location
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Location Sharing</p>
                  <p className="text-xs text-muted-foreground">Share with dispatcher</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.locationSharing}
                    onChange={() => toggleSetting("locationSharing")}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-navy rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-navy"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Emergency Data Sharing</p>
                  <p className="text-xs text-muted-foreground">Medical info with hospitals</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.emergencySharing}
                    onChange={() => toggleSetting("emergencySharing")}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-navy rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-navy"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Language */}
          <div className="bg-white/60 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-lg animate-fade-up" style={{ animationDelay: "250ms" }}>
            <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Globe className="w-4 h-4" /> Language
            </h2>
            <select
              value={settings.language}
              onChange={(e) => setSettings({ ...settings, language: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी (Hindi)</option>
              <option value="es">Español (Spanish)</option>
              <option value="fr">Français (French)</option>
            </select>
          </div>

          {/* Logout */}
          <button className="w-full flex items-center justify-center gap-2 bg-red-100 text-red-700 py-3 rounded-2xl font-semibold hover:bg-red-200 active:scale-95 animate-fade-up mt-6" style={{ animationDelay: "300ms" }}>
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>

        <BottomNav />
      </div>
    </MobileShell>
  );
};

export default SettingsScreen;
