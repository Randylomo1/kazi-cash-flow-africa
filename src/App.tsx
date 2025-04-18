
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Pages
import Onboarding from "./pages/Onboarding";
import Login from "./pages/Login";
import Home from "./pages/Home";
import JobCenter from "./pages/JobCenter";
import JobDetails from "./pages/JobDetails";
import Wallet from "./pages/Wallet";
import TrustProfile from "./pages/TrustProfile";
import CreditAccess from "./pages/CreditAccess";
import NotFound from "./pages/NotFound";

// Components
import BottomNavigation from "./components/BottomNavigation";
import AppLayout from "./components/AppLayout";
import ChatbotButton from "./components/ChatbotButton";

// Context
import { AppProvider } from "./context/AppContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<AppLayout><Home /></AppLayout>} />
              <Route path="/jobs" element={<AppLayout><JobCenter /></AppLayout>} />
              <Route path="/jobs/:id" element={<AppLayout><JobDetails /></AppLayout>} />
              <Route path="/wallet" element={<AppLayout><Wallet /></AppLayout>} />
              <Route path="/trust" element={<AppLayout><TrustProfile /></AppLayout>} />
              <Route path="/credit" element={<AppLayout><CreditAccess /></AppLayout>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
          <ChatbotButton />
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
