
import { NavLink } from "react-router-dom";
import { Home, Briefcase, Wallet, Medal, MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";

const BottomNavigation = () => {
  const navItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/jobs", label: "Jobs", icon: Briefcase },
    { to: "/wallet", label: "Wallet", icon: Wallet },
    { to: "/trust", label: "Trust", icon: Medal },
    { to: "/credit", label: "Credit", icon: MoreHorizontal },
  ];

  return (
    <motion.nav 
      className="fixed bottom-0 left-0 right-0 flex justify-around items-center h-16 bg-card dark:bg-card shadow-lg border-t border-border dark:border-border z-50 px-2"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
    >
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => 
            `nav-item ${isActive ? "nav-item-active" : "text-muted-foreground"}`
          }
        >
          {({ isActive }) => (
            <>
              <item.icon size={20} className={isActive ? "animate-scale-in" : ""} />
              <span>{item.label}</span>
              {isActive && (
                <motion.div 
                  layoutId="nav-indicator"
                  className="absolute -top-1 w-1 h-1 rounded-full bg-kazi-orange"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </>
          )}
        </NavLink>
      ))}
    </motion.nav>
  );
};

export default BottomNavigation;
