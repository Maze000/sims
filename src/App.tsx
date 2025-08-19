import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MobileOptimizer from "./components/MobileOptimizer";
import MobilePerformance from "./components/MobilePerformance";
import MobileAccessibility from "./components/MobileAccessibility";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import PersonalHomepage from "./pages/PersonalHomepage";
import TherapistProfile from "./pages/TherapistProfile";
import Payment from "./pages/Payment";
import CreateProfile from "./pages/CreateProfile";
import EditProfile from "./pages/EditProfile";
import TherapistDashboard from "./pages/TherapistDashboard";
import ExploreTherapists from "./pages/ExploreTherapists";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <MobileOptimizer>
        <MobilePerformance>
          <MobileAccessibility>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<PersonalHomepage />} />
                <Route path="/therapists/featured" element={<Dashboard />} />
                <Route path="/therapist/:id" element={<TherapistProfile />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/create-profile" element={<CreateProfile />} />
                <Route path="/edit-profile" element={<EditProfile />} />
                <Route path="/therapist-dashboard" element={<TherapistDashboard />} />
                <Route path="/explore" element={<ExploreTherapists />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/notifications" element={<Notifications />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </MobileAccessibility>
        </MobilePerformance>
      </MobileOptimizer>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
