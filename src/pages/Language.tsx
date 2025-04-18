
import { motion } from "framer-motion";
import { ArrowLeft, Check, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";

const Language = () => {
  const navigate = useNavigate();
  const { language, setLanguage } = useApp();
  
  const languages = [
    { code: "en", name: "English", flag: "🇬🇧", description: "English (Default)" },
    { code: "sw", name: "Kiswahili", flag: "🇰🇪", description: "Swahili" },
    { code: "fr", name: "Français", flag: "🇫🇷", description: "French" }
  ];
  
  const handleLanguageChange = (langCode: "en" | "sw" | "fr") => {
    setLanguage(langCode);
    // In a real app, this might trigger a translation service
  };

  return (
    <div className="h-full">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate(-1)}
          className="-ml-2"
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-xl font-bold ml-2">Language Settings</h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <div className="kazi-card bg-card mb-6">
          <div className="flex items-start mb-4">
            <Globe size={20} className="mr-3 mt-1 text-kazi-blue" />
            <div>
              <h2 className="font-semibold mb-1">Select Your Preferred Language</h2>
              <p className="text-sm text-muted-foreground">
                Choose the language you want to use in the KaziCash app. 
                All text and content will be displayed in your selected language.
              </p>
            </div>
          </div>
          
          <div className="space-y-3 mt-4">
            {languages.map((lang) => (
              <motion.div
                key={lang.code}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${
                  language === lang.code 
                    ? "bg-kazi-blue/10 border border-kazi-blue/30" 
                    : "border border-border hover:bg-muted/50"
                }`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleLanguageChange(lang.code as "en" | "sw" | "fr")}
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{lang.flag}</span>
                  <div>
                    <p className="font-medium">{lang.name}</p>
                    <p className="text-xs text-muted-foreground">{lang.description}</p>
                  </div>
                </div>
                
                {language === lang.code && (
                  <div className="w-6 h-6 rounded-full bg-kazi-blue flex items-center justify-center">
                    <Check size={14} className="text-white" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="kazi-card bg-card">
          <h2 className="font-semibold mb-3">Language Benefits</h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-kazi-blue mt-1.5 mr-2"></span>
              <span className="text-sm text-muted-foreground">
                Receive job notifications and alerts in your preferred language
              </span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-kazi-blue mt-1.5 mr-2"></span>
              <span className="text-sm text-muted-foreground">
                Read job details and client feedback more easily
              </span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-kazi-blue mt-1.5 mr-2"></span>
              <span className="text-sm text-muted-foreground">
                Better understand loan terms and financial information
              </span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-kazi-blue mt-1.5 mr-2"></span>
              <span className="text-sm text-muted-foreground">
                Improve communication with KaziBot and support
              </span>
            </li>
          </ul>
        </div>

        <div className="p-4 bg-muted/50 rounded-xl">
          <p className="text-sm text-center text-muted-foreground">
            Language settings are saved automatically and apply across all your devices.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Language;
