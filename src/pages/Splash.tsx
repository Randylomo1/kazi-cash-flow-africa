
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Splash = () => {
  const navigate = useNavigate();

  // After 3 seconds, show the get started button
  useEffect(() => {
    const timer = setTimeout(() => {
      const getStartedBtn = document.getElementById("get-started-btn");
      if (getStartedBtn) {
        getStartedBtn.classList.remove("opacity-0");
        getStartedBtn.classList.add("opacity-100");
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    // Set the flag and navigate to onboarding
    localStorage.setItem('hasVisitedKaziCash', 'true');
    navigate('/onboarding');
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-gradient-to-b from-[#223866] to-blue-800 z-50 flex flex-col items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <motion.div 
          className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-6"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        >
          <div className="text-[#223866] text-3xl font-bold">K</div>
        </motion.div>
        
        <motion.h1 
          className="text-4xl font-bold text-white mb-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Kazi<span className="text-[#F57C00]">Cash</span>
        </motion.h1>
        
        <motion.p 
          className="text-white/80 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Work. Earn. Prosper.
        </motion.p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-12"
      >
        <Button
          id="get-started-btn"
          onClick={handleGetStarted}
          className="kazi-button kazi-button-primary bg-kazi-orange hover:bg-kazi-orange/90 text-white px-8 py-6 text-lg opacity-0 transition-opacity duration-500"
        >
          Get Started
        </Button>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-10 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="dot-loader mb-3">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        <p className="text-white/60 text-sm">Connecting you to opportunities</p>
      </motion.div>

      <style>
        {`
          .dot-loader {
            display: flex;
            gap: 6px;
          }
          .dot {
            width: 8px;
            height: 8px;
            background-color: white;
            border-radius: 50%;
            opacity: 0.6;
            animation: pulse 1.5s infinite ease-in-out;
          }
          .dot:nth-child(2) {
            animation-delay: 0.2s;
          }
          .dot:nth-child(3) {
            animation-delay: 0.4s;
          }
          @keyframes pulse {
            0%, 100% {
              transform: scale(0.8);
              opacity: 0.6;
            }
            50% {
              transform: scale(1.2);
              opacity: 1;
            }
          }
        `}
      </style>
    </motion.div>
  );
};

export default Splash;
