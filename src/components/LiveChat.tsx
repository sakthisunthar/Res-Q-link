import { Send, Phone, MapPin, Clock } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import MobileShell from "@/components/MobileShell";

interface ChatMessage {
  id: number;
  sender: "user" | "dispatcher";
  text: string;
  timestamp: string;
}

const LiveChatComponent = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, sender: "dispatcher", text: "Emergency services connected. What is your emergency?", timestamp: "10:30 AM" },
    { id: 2, sender: "user", text: "I'm having chest pain", timestamp: "10:31 AM" },
    { id: 3, sender: "dispatcher", text: "Stay calm. An ambulance is on the way. Can you describe the pain?", timestamp: "10:32 AM" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const newMsg: ChatMessage = {
        id: messages.length + 1,
        sender: "user",
        text: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");

      // Simulate dispatcher response
      setTimeout(() => {
        const responses = ["Understood. Help is on the way.", "Please sit down and relax.", "We're tracking your location.", "An ambulance is 2 minutes away."];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const response: ChatMessage = {
          id: messages.length + 2,
          sender: "dispatcher",
          text: randomResponse,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, response]);
      }, 500);
    }
  };

  return (
    <MobileShell>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="px-5 pt-4 pb-3 bg-gradient-to-b from-navy/80 to-navy/40 backdrop-blur-lg text-white">
          <h1 className="text-lg font-bold">Emergency Dispatcher</h1>
          <p className="text-xs opacity-80">Connected • Live assistance</p>
          <div className="flex items-center gap-4 mt-3 text-[10px]">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>Location tracked</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>2 min ETA</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-white/40">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs px-4 py-2.5 rounded-2xl ${
                  msg.sender === "user"
                    ? "bg-navy text-white rounded-br-none"
                    : "bg-white/70 backdrop-blur-md border border-white/20 text-foreground rounded-bl-none"
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <p className={`text-[10px] mt-1 ${msg.sender === "user" ? "opacity-70" : "text-muted-foreground"}`}>{msg.timestamp}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="px-4 py-3 flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-1 bg-green-100 text-green-700 py-2 rounded-lg text-xs font-semibold active:scale-95">
            <Phone className="w-3 h-3" /> Call
          </button>
          <button className="flex-1 flex items-center justify-center gap-1 bg-blue-100 text-blue-700 py-2 rounded-lg text-xs font-semibold active:scale-95">
            <MapPin className="w-3 h-3" /> Share Location
          </button>
        </div>

        {/* Message Input */}
        <div className="px-4 py-3 border-t border-white/20 bg-white/70 backdrop-blur-md flex gap-2">
          <input
            type="text"
            placeholder="Type message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 px-3 py-2 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy"
          />
          <button
            onClick={sendMessage}
            className="w-10 h-10 bg-navy text-white rounded-lg flex items-center justify-center hover:bg-navy/90 active:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </MobileShell>
  );
};

export default LiveChatComponent;
