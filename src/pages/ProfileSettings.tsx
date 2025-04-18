
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, User, Key, Bell, Globe, Moon, Sun, 
  ChevronRight, LogOut, Shield, ExternalLink, HelpCircle,
  Smartphone, CheckCircle, FileText
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useApp } from "@/context/AppContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "@/components/ThemeProvider";

const ProfileSettings = () => {
  const navigate = useNavigate();
  const { user, logout, language, setLanguage } = useApp();
  const { theme, setTheme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricsEnabled, setBiometricsEnabled] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate("/login");
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
        <h1 className="text-xl font-bold ml-2">Profile Settings</h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        {/* Profile Section */}
        <div className="kazi-card bg-card mb-6">
          <div className="flex items-center mb-4">
            <div className="h-16 w-16 rounded-full bg-kazi-blue flex items-center justify-center text-white text-2xl font-bold mr-4">
              {user?.name ? user.name[0] : "U"}
            </div>
            <div>
              <h2 className="font-semibold text-lg">{user?.name || "User"}</h2>
              <p className="text-muted-foreground">{user?.phone || "+254 XXX XXX XXX"}</p>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto" onClick={() => navigate("/profile")}>
              <ChevronRight size={18} />
            </Button>
          </div>
          
          <div className="flex items-center justify-between py-2 border-t border-border">
            <div className="flex items-center">
              <User size={18} className="text-muted-foreground mr-3" />
              <span>Edit Profile</span>
            </div>
            <Button variant="ghost" size="icon">
              <ChevronRight size={18} />
            </Button>
          </div>
        </div>

        {/* Preferences */}
        <div className="kazi-card bg-card mb-6">
          <h3 className="font-semibold mb-3">Preferences</h3>
          
          <div className="space-y-4">
            {/* Theme Switcher */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {theme === "dark" ? (
                  <Moon size={18} className="text-muted-foreground mr-3" />
                ) : (
                  <Sun size={18} className="text-muted-foreground mr-3" />
                )}
                <span>Dark Mode</span>
              </div>
              <ThemeToggle />
            </div>
            
            {/* Language */}
            <div className="flex items-center justify-between py-2 border-t border-border">
              <div className="flex items-center">
                <Globe size={18} className="text-muted-foreground mr-3" />
                <span>Language</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-muted-foreground mr-2">
                  {language === "en" ? "English" : language === "sw" ? "Swahili" : "French"}
                </span>
                <Button variant="ghost" size="icon" onClick={() => navigate("/language")}>
                  <ChevronRight size={18} />
                </Button>
              </div>
            </div>
            
            {/* Notifications */}
            <div className="flex items-center justify-between py-2 border-t border-border">
              <div className="flex items-center">
                <Bell size={18} className="text-muted-foreground mr-3" />
                <span>Notifications</span>
              </div>
              <Switch 
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="kazi-card bg-card mb-6">
          <h3 className="font-semibold mb-3">Security</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Key size={18} className="text-muted-foreground mr-3" />
                <span>Change PIN</span>
              </div>
              <Button variant="ghost" size="icon">
                <ChevronRight size={18} />
              </Button>
            </div>
            
            <div className="flex items-center justify-between py-2 border-t border-border">
              <div className="flex items-center">
                <Smartphone size={18} className="text-muted-foreground mr-3" />
                <span>Biometric Login</span>
              </div>
              <Switch 
                checked={biometricsEnabled}
                onCheckedChange={setBiometricsEnabled}
              />
            </div>
            
            <div className="flex items-center justify-between py-2 border-t border-border">
              <div className="flex items-center">
                <Shield size={18} className="text-muted-foreground mr-3" />
                <span>Privacy & Security</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => navigate("/privacy")}>
                <ChevronRight size={18} />
              </Button>
            </div>
          </div>
        </div>

        {/* Support */}
        <div className="kazi-card bg-card mb-6">
          <h3 className="font-semibold mb-3">Support</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <HelpCircle size={18} className="text-muted-foreground mr-3" />
                <span>Help Center</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => navigate("/help")}>
                <ChevronRight size={18} />
              </Button>
            </div>
            
            <div className="flex items-center justify-between py-2 border-t border-border">
              <div className="flex items-center">
                <FileText size={18} className="text-muted-foreground mr-3" />
                <span>Terms & Conditions</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => navigate("/terms")}>
                <ChevronRight size={18} />
              </Button>
            </div>
            
            <div className="flex items-center justify-between py-2 border-t border-border">
              <div className="flex items-center">
                <ExternalLink size={18} className="text-muted-foreground mr-3" />
                <span>About KaziCash</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => navigate("/about")}>
                <ChevronRight size={18} />
              </Button>
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="kazi-card bg-card mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <LogOut size={18} className="text-destructive mr-3" />
              <span className="text-destructive">Logout</span>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <ChevronRight size={18} />
            </Button>
          </div>
        </div>

        {/* Version Info */}
        <div className="text-center text-sm text-muted-foreground mb-6">
          <div className="flex items-center justify-center mb-1">
            <CheckCircle size={14} className="text-kazi-green mr-1" />
            <span>KaziCash v1.0.0</span>
          </div>
          <p>© 2024 KaziCash. All rights reserved.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileSettings;
