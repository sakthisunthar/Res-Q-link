import { ArrowLeft, Plus, Trash2, Heart, AlertCircle, Pill } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MobileShell from "@/components/MobileShell";
import BottomNav from "@/components/BottomNav";

interface MedicalInfo {
  bloodType: string;
  allergies: string[];
  medications: string[];
  conditions: string[];
  donorStatus: boolean;
}

const MedicalProfileScreen = () => {
  const navigate = useNavigate();
  const [medicalInfo, setMedicalInfo] = useState<MedicalInfo>({
    bloodType: "O+",
    allergies: ["Penicillin", "Aspirin"],
    medications: ["Metformin 500mg", "Lisinopril 10mg"],
    conditions: ["Type 2 Diabetes", "Hypertension"],
    donorStatus: true,
  });
  const [newItem, setNewItem] = useState("");
  const [editMode, setEditMode] = useState<string | null>(null);

  const addAllergy = () => {
    if (newItem.trim()) {
      setMedicalInfo({
        ...medicalInfo,
        allergies: [...medicalInfo.allergies, newItem],
      });
      setNewItem("");
    }
  };

  const removeAllergy = (index: number) => {
    setMedicalInfo({
      ...medicalInfo,
      allergies: medicalInfo.allergies.filter((_, i) => i !== index),
    });
  };

  const addMedication = () => {
    if (newItem.trim()) {
      setMedicalInfo({
        ...medicalInfo,
        medications: [...medicalInfo.medications, newItem],
      });
      setNewItem("");
    }
  };

  const removeMedication = (index: number) => {
    setMedicalInfo({
      ...medicalInfo,
      medications: medicalInfo.medications.filter((_, i) => i !== index),
    });
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
            <h1 className="text-lg font-bold text-foreground">Medical Profile</h1>
            <p className="text-xs text-muted-foreground">Critical health information</p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {/* Blood Type Card */}
          <div className="bg-white/60 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-lg animate-fade-up" style={{ animationDelay: "100ms" }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                <Heart className="w-4 h-4 text-red-600" />
              </div>
              <h2 className="font-semibold text-foreground">Blood Type</h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-xl bg-red-100 flex items-center justify-center">
                <span className="text-2xl font-bold text-red-700">{medicalInfo.bloodType}</span>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Your blood type</p>
                <p className="text-sm font-semibold text-foreground">Universal donor: {medicalInfo.donorStatus ? "Yes" : "No"}</p>
              </div>
            </div>
          </div>

          {/* Allergies */}
          <div className="bg-white/60 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-lg animate-fade-up" style={{ animationDelay: "150ms" }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                <AlertCircle className="w-4 h-4 text-orange-600" />
              </div>
              <h2 className="font-semibold text-foreground">Allergies</h2>
            </div>
            <div className="space-y-2 mb-3">
              {medicalInfo.allergies.map((allergy, idx) => (
                <div key={idx} className="flex items-center justify-between bg-orange-50 px-3 py-2 rounded-lg border border-orange-200">
                  <span className="text-sm font-medium text-orange-900">{allergy}</span>
                  <button onClick={() => removeAllergy(idx)} className="text-orange-600 hover:text-orange-700 active:scale-90">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
            {editMode === "allergies" ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add allergy..."
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  className="flex-1 px-3 py-2 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy"
                />
                <button
                  onClick={() => {
                    addAllergy();
                    setEditMode(null);
                  }}
                  className="px-3 py-2 bg-navy text-white rounded-lg text-xs font-semibold active:scale-95"
                >
                  Add
                </button>
              </div>
            ) : (
              <button
                onClick={() => setEditMode("allergies")}
                className="w-full flex items-center justify-center gap-2 py-2 border border-orange-200 text-orange-700 rounded-lg text-sm font-semibold hover:bg-orange-50 active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" /> Add Allergy
              </button>
            )}
          </div>

          {/* Medications */}
          <div className="bg-white/60 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-lg animate-fade-up" style={{ animationDelay: "200ms" }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <Pill className="w-4 h-4 text-blue-600" />
              </div>
              <h2 className="font-semibold text-foreground">Current Medications</h2>
            </div>
            <div className="space-y-2 mb-3">
              {medicalInfo.medications.map((med, idx) => (
                <div key={idx} className="flex items-center justify-between bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
                  <span className="text-sm font-medium text-blue-900">{med}</span>
                  <button onClick={() => removeMedication(idx)} className="text-blue-600 hover:text-blue-700 active:scale-90">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
            {editMode === "medications" ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add medication..."
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  className="flex-1 px-3 py-2 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy"
                />
                <button
                  onClick={() => {
                    addMedication();
                    setEditMode(null);
                  }}
                  className="px-3 py-2 bg-navy text-white rounded-lg text-xs font-semibold active:scale-95"
                >
                  Add
                </button>
              </div>
            ) : (
              <button
                onClick={() => setEditMode("medications")}
                className="w-full flex items-center justify-center gap-2 py-2 border border-blue-200 text-blue-700 rounded-lg text-sm font-semibold hover:bg-blue-50 active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" /> Add Medication
              </button>
            )}
          </div>

          {/* Health Conditions */}
          <div className="bg-white/60 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-lg animate-fade-up" style={{ animationDelay: "250ms" }}>
            <h2 className="font-semibold text-foreground mb-3">Health Conditions</h2>
            <div className="space-y-2">
              {medicalInfo.conditions.map((cond, idx) => (
                <div key={idx} className="flex items-center gap-2 px-3 py-2 bg-purple-50 rounded-lg border border-purple-200">
                  <span className="text-sm font-medium text-purple-900">{cond}</span>
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

export default MedicalProfileScreen;
