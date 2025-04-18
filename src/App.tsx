
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "@/components/ThemeProvider";

// Pages
import Splash from "./pages/Splash";
import Onboarding from "./pages/Onboarding";
import Login from "./pages/Login";
import Home from "./pages/Home";
import JobCenter from "./pages/JobCenter";
import JobDetails from "./pages/JobDetails";
import Wallet from "./pages/Wallet";
import TrustProfile from "./pages/TrustProfile";
import CreditAccess from "./pages/CreditAccess";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import Help from "./pages/Help";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import ProfileSettings from "./pages/ProfileSettings";
import Language from "./pages/Language";

// Components
import BottomNavigation from "./components/BottomNavigation";
import AppLayout from "./components/AppLayout";
import ChatbotButton from "./components/ChatbotButton";
import OfflineBanner from "./components/OfflineBanner";

// Context
import { AppProvider } from "./context/AppContext";

const queryClient = new QueryClient();

const App = () => {
  // Check if user has visited before
  const hasVisited = localStorage.getItem('hasVisitedKaziCash');
  
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <ThemeProvider defaultTheme="light" storageKey="kazicash-theme">
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AnimatePresence mode="wait">
                <Routes>
                  {/* Initial Routes */}
                  <Route path="/" element={
                    hasVisited ? <Navigate to="/home" /> : <Splash />
                  } />
                  <Route path="/onboarding" element={<Onboarding />} />
                  <Route path="/login" element={<Login />} />
                  
                  {/* Main App Routes */}
                  <Route path="/home" element={<AppLayout><Home /></AppLayout>} />
                  <Route path="/jobs" element={<AppLayout><JobCenter /></AppLayout>} />
                  <Route path="/jobs/:id" element={<AppLayout><JobDetails /></AppLayout>} />
                  <Route path="/wallet" element={<AppLayout><Wallet /></AppLayout>} />
                  <Route path="/trust" element={<AppLayout><TrustProfile /></AppLayout>} />
                  <Route path="/credit" element={<AppLayout><CreditAccess /></AppLayout>} />
                  
                  {/* Settings & Information */}
                  <Route path="/settings" element={<AppLayout><ProfileSettings /></AppLayout>} />
                  <Route path="/about" element={<AppLayout><AboutUs /></AppLayout>} />
                  <Route path="/help" element={<AppLayout><Help /></AppLayout>} />
                  <Route path="/privacy" element={<AppLayout><PrivacyPolicy /></AppLayout>} />
                  <Route path="/terms" element={<AppLayout><TermsConditions /></AppLayout>} />
                  <Route path="/language" element={<AppLayout><Language /></AppLayout>} />
                  
                  {/* 404 */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AnimatePresence>
              <ChatbotButton />
              <OfflineBanner />
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </AppProvider>
    </QueryClientProvider>
  );
};

export default App;
