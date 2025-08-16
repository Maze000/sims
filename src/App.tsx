import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PersonalHomepage from "./pages/PersonalHomepage";
import TherapistProfile from "./pages/TherapistProfile";
import Payment from "./pages/Payment";
import CreateProfile from "./pages/CreateProfile";
import TherapistDashboard from "./pages/TherapistDashboard";
import ExploreTherapists from "./pages/ExploreTherapists";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<PersonalHomepage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/therapist/:id" element={<TherapistProfile />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/create-profile" element={<CreateProfile />} />
          <Route path="/therapist-dashboard" element={<TherapistDashboard />} />
          <Route path="/explore" element={<ExploreTherapists />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
