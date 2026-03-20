import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import HomeScreen from "./pages/HomeScreen";
import EmergencyTriggerScreen from "./pages/EmergencyTriggerScreen";
import TrackingScreen from "./pages/TrackingScreen";
import HospitalScreen from "./pages/HospitalScreen";
import DashboardScreen from "./pages/DashboardScreen";
import ProfileScreen from "./pages/ProfileScreen";
import DispatcherScreen from "./pages/DispatcherScreen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/emergency" element={<EmergencyTriggerScreen />} />
          <Route path="/tracking" element={<TrackingScreen />} />
          <Route path="/hospital" element={<HospitalScreen />} />
          <Route path="/dashboard" element={<DashboardScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
