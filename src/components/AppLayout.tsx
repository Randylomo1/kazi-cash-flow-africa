
import { ReactNode } from "react";
import { motion } from "framer-motion";
import BottomNavigation from "./BottomNavigation";
import OfflineBanner from "./OfflineBanner";
import { useApp } from "@/context/AppContext";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const { isOffline } = useApp();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {isOffline && <OfflineBanner />}
      <motion.main 
        className="flex-1 pb-20 pt-4 px-4 max-w-lg mx-auto w-full"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.main>
      <BottomNavigation />
    </div>
  );
};

export default AppLayout;
