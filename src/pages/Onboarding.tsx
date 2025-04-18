
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Check, Smartphone, Award, CreditCard, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const [language, setLanguage] = useState<"en" | "sw" | "fr">("en");
  const navigate = useNavigate();

  const onboardingSteps = [
    {
      title: {
        en: "Get Paid Instantly",
        sw: "Lipa Mara Moja",
        fr: "Payé Instantanément"
      },
      description: {
        en: "Receive your earnings directly to your M-Pesa account as soon as you complete a job.",
        sw: "Pokea malipo yako moja kwa moja kwenye akaunti yako ya M-Pesa mara tu unapomaliza kazi.",
        fr: "Recevez vos gains directement sur votre compte M-Pesa dès que vous terminez un travail."
      },
      icon: Smartphone,
      color: "bg-kazi-blue"
    },
    {
      title: {
        en: "Build Your Trust Score",
        sw: "Jenga Alama Yako ya Uaminifu",
        fr: "Construisez Votre Score de Confiance"
      },
      description: {
        en: "Complete jobs to earn badges and increase your trust score for better opportunities.",
        sw: "Maliza kazi ili kupata beji na kuongeza alama yako ya uaminifu kwa ajili ya fursa bora zaidi.",
        fr: "Complétez des travaux pour gagner des badges et augmenter votre score de confiance pour de meilleures opportunités."
      },
      icon: Award,
      color: "bg-kazi-orange"
    },
    {
      title: {
        en: "Access Quick Loans",
        sw: "Fikia Mikopo ya Haraka",
        fr: "Accédez à des Prêts Rapides"
      },
      description: {
        en: "Your work history unlocks microloans when you need them most, no collateral required.",
        sw: "Historia yako ya kazi hufungua mikopo midogo wakati unaihitaji zaidi, bila dhamana inayohitajika.",
        fr: "Votre historique de travail débloque des microcrédits lorsque vous en avez le plus besoin, sans garantie requise."
      },
      icon: CreditCard,
      color: "bg-kazi-green"
    },
    {
      title: {
        en: "Work Offline Too",
        sw: "Fanya Kazi Nje ya Mtandao Pia",
        fr: "Travaillez Aussi Hors Ligne"
      },
      description: {
        en: "No internet? No problem. KaziCash works offline and syncs when you're back online.",
        sw: "Hakuna mtandao? Hakuna shida. KaziCash inafanya kazi nje ya mtandao na husawazisha wakati uko mtandaoni tena.",
        fr: "Pas d'Internet? Pas de problème. KaziCash fonctionne hors ligne et se synchronise lorsque vous êtes de nouveau en ligne."
      },
      icon: WifiOff,
      color: "bg-violet-600"
    }
  ];
  
  const currentStep = onboardingSteps[step];

  const nextStep = () => {
    if (step < onboardingSteps.length - 1) {
      setStep(step + 1);
    } else {
      navigate("/login");
    }
  };

  const handleLanguageChange = (lang: "en" | "sw" | "fr") => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Language selector */}
      <div className="absolute top-6 right-6 flex gap-2 z-10">
        <button 
          className={`w-10 h-10 rounded-full flex items-center justify-center ${language === "en" ? "bg-kazi-blue text-white" : "bg-muted"}`}
          onClick={() => handleLanguageChange("en")}
        >
          EN
        </button>
        <button 
          className={`w-10 h-10 rounded-full flex items-center justify-center ${language === "sw" ? "bg-kazi-blue text-white" : "bg-muted"}`}
          onClick={() => handleLanguageChange("sw")}
        >
          SW
        </button>
        <button 
          className={`w-10 h-10 rounded-full flex items-center justify-center ${language === "fr" ? "bg-kazi-blue text-white" : "bg-muted"}`}
          onClick={() => handleLanguageChange("fr")}
        >
          FR
        </button>
      </div>

      {/* Steps indicator */}
      <div className="flex justify-center mt-8">
        {onboardingSteps.map((_, i) => (
          <div 
            key={i} 
            className={`w-2 h-2 rounded-full mx-1 ${i === step ? "bg-kazi-blue" : "bg-muted"}`}
          />
        ))}
      </div>

      {/* Content area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative overflow-hidden">
        <AnimatePresence custom={step} mode="wait">
          <motion.div
            key={step}
            custom={step}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
          >
            <div className={`${currentStep.color} w-24 h-24 rounded-full flex items-center justify-center text-white mb-8`}>
              <currentStep.icon size={40} />
            </div>
            
            <h1 className="text-3xl font-bold mb-4 text-center">
              {currentStep.title[language]}
            </h1>
            
            <p className="text-center text-muted-foreground mb-6 max-w-md">
              {currentStep.description[language]}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom navigation */}
      <div className="p-8 flex justify-between items-center">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/login")}
        >
          {language === "en" ? "Skip" : language === "sw" ? "Ruka" : "Passer"}
        </Button>
        
        <Button 
          onClick={nextStep} 
          className="kazi-button kazi-button-primary"
        >
          {step === onboardingSteps.length - 1 
            ? (language === "en" ? "Let's Go" : language === "sw" ? "Tuanze" : "Allons-y") 
            : (language === "en" ? "Next" : language === "sw" ? "Endelea" : "Suivant")}
          <ChevronRight className="ml-2" size={18} />
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
