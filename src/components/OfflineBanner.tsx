
import { WifiOff } from "lucide-react";
import { motion } from "framer-motion";

const OfflineBanner = () => {
  return (
    <motion.div 
      className="bg-amber-500 text-white py-2 px-4 flex items-center justify-center text-sm font-medium"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <WifiOff size={16} className="mr-2" />
      <span>You're working offline. Changes will sync when you're back online.</span>
    </motion.div>
  );
};

export default OfflineBanner;
