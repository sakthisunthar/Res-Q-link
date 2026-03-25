import { ArrowLeft, Plus, Trash2, Phone, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MobileShell from "@/components/MobileShell";
import BottomNav from "@/components/BottomNav";

interface EmergencyContact {
  id: number;
  name: string;
  relation: string;
  phone: string;
  email: string;
}

const EmergencyContactsScreen = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<EmergencyContact[]>([
    { id: 1, name: "John Doe", relation: "Father", phone: "+91 98765 43210", email: "john@example.com" },
    { id: 2, name: "Jane Smith", relation: "Sister", phone: "+91 87654 32109", email: "jane@example.com" },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newContact, setNewContact] = useState({ name: "", relation: "", phone: "", email: "" });

  const addContact = () => {
    if (newContact.name && newContact.relation && newContact.phone) {
      setContacts([...contacts, { id: Date.now(), ...newContact }]);
      setNewContact({ name: "", relation: "", phone: "", email: "" });
      setShowForm(false);
    }
  };

  const deleteContact = (id: number) => {
    setContacts(contacts.filter((c) => c.id !== id));
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
            <h1 className="text-lg font-bold text-foreground">Emergency Contacts</h1>
            <p className="text-xs text-muted-foreground">Notify in case of emergency</p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {/* Add Contact Form */}
          {showForm && (
            <div className="bg-white/60 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-lg animate-fade-up space-y-3">
              <input
                type="text"
                placeholder="Name"
                value={newContact.name}
                onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy"
              />
              <input
                type="text"
                placeholder="Relation (e.g., Father, Sister)"
                value={newContact.relation}
                onChange={(e) => setNewContact({ ...newContact, relation: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy"
              />
              <input
                type="tel"
                placeholder="Phone"
                value={newContact.phone}
                onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy"
              />
              <input
                type="email"
                placeholder="Email"
                value={newContact.email}
                onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy"
              />
              <div className="flex gap-2">
                <button onClick={addContact} className="flex-1 bg-navy text-white rounded-lg py-2 font-semibold text-sm active:scale-95">
                  Add Contact
                </button>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setNewContact({ name: "", relation: "", phone: "", email: "" });
                  }}
                  className="flex-1 bg-gray-200 text-foreground rounded-lg py-2 font-semibold text-sm active:scale-95"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Contacts List */}
          {contacts.map((contact, idx) => (
            <div
              key={contact.id}
              className="bg-white/60 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-lg animate-fade-up"
              style={{ animationDelay: `${(idx + 1) * 50}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-foreground">{contact.name}</h3>
                  <p className="text-xs text-muted-foreground">{contact.relation}</p>
                </div>
                <button onClick={() => deleteContact(contact.id)} className="text-red-600 hover:text-red-700 active:scale-90">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Phone className="w-4 h-4 text-navy" />
                  <span>{contact.phone}</span>
                </div>
                {contact.email && (
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Mail className="w-4 h-4 text-navy" />
                    <span>{contact.email}</span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-navy text-navy rounded-2xl font-semibold hover:bg-navy/5 active:scale-95 animate-fade-up"
            >
              <Plus className="w-5 h-5" /> Add Emergency Contact
            </button>
          )}
        </div>

        <BottomNav />
      </div>
    </MobileShell>
  );
};

export default EmergencyContactsScreen;
