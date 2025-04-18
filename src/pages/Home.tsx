
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp, ChevronRight, Bell, Search, ExternalLink, MapPin } from "lucide-react";
import { useApp } from "@/context/AppContext";
import TrustScoreMeter from "@/components/TrustScoreMeter";

const Home = () => {
  const { user, isOffline } = useApp();
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  // Mock job suggestions
  const jobSuggestions = [
    {
      id: "job-1",
      title: "Delivery Driver",
      location: "Nairobi CBD",
      pay: 850,
      distance: "2.5km",
      trustRequired: 50,
      client: "Jumia Express"
    },
    {
      id: "job-2",
      title: "Construction Helper",
      location: "Westlands",
      pay: 1200,
      distance: "4.1km",
      trustRequired: 65,
      client: "BuildRight Ltd"
    },
    {
      id: "job-3",
      title: "Market Vendor",
      location: "Gikomba Market",
      pay: 780,
      distance: "1.8km",
      trustRequired: 40,
      client: "Mama Mboga Co-op"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="h-full"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">{greeting},</h1>
          <p className="text-muted-foreground">{user?.name || "Guest"}</p>
        </div>
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <Search size={18} />
          </button>
          <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center relative">
            <Bell size={18} />
            <span className="absolute top-0 right-0 w-3 h-3 bg-kazi-orange rounded-full border-2 border-background"></span>
          </button>
        </div>
      </motion.div>

      {/* Earnings Card */}
      <motion.div 
        variants={itemVariants}
        className="kazi-card bg-gradient-to-br from-kazi-blue to-blue-700 text-white mb-6"
      >
        <div className="flex justify-between items-start">
          <div>
            <p className="text-white/80 mb-1">Today's Earnings</p>
            <h2 className="text-3xl font-bold">KES {user?.dailyEarnings || 0}</h2>
            <div className="flex items-center mt-1 text-white/80 text-sm">
              <TrendingUp size={14} className="mr-1" />
              <span>15% higher than yesterday</span>
            </div>
          </div>
          <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20">
            <ArrowUpRight size={18} />
          </button>
        </div>
        
        <div className="mt-6 pt-4 border-t border-white/20 flex justify-between items-center">
          <span className="text-sm text-white/80">View details</span>
          <ChevronRight size={16} />
        </div>
      </motion.div>
      
      {/* Trust Score and Credit */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 mb-6">
        <div className="kazi-card bg-card flex flex-col items-center">
          <p className="text-muted-foreground text-sm mb-3">Trust Score</p>
          <TrustScoreMeter score={user?.trustScore || 0} />
          <button className="text-xs text-kazi-blue mt-3 font-medium">View Profile</button>
        </div>
        
        <div className="kazi-card bg-card">
          <p className="text-muted-foreground text-sm mb-2">Eligible Loan</p>
          <h3 className="text-2xl font-bold mb-1">KES {user?.eligibleLoan || 0}</h3>
          <div className="flex items-center text-xs text-kazi-green mt-2">
            <span className="inline-block w-2 h-2 rounded-full bg-kazi-green mr-1"></span>
            <span>Available Now</span>
          </div>
          <button className="w-full mt-3 text-center py-2 text-sm rounded-lg bg-muted hover:bg-muted/80 transition-colors">
            Apply Now
          </button>
        </div>
      </motion.div>
      
      {/* Job Suggestions */}
      <motion.div variants={itemVariants} className="mb-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Job Suggestions</h2>
          <button className="text-sm text-kazi-blue flex items-center">
            View All <ChevronRight size={16} />
          </button>
        </div>
        
        <div className="space-y-3">
          {jobSuggestions.map((job) => (
            <div 
              key={job.id}
              className="kazi-card bg-card flex justify-between p-4 hover:border-kazi-blue/20 border border-transparent transition-colors"
            >
              <div>
                <h3 className="font-semibold mb-1">{job.title}</h3>
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <MapPin size={14} className="mr-1" />
                  <span>{job.location}</span>
                  <span className="mx-2">•</span>
                  <span>{job.distance}</span>
                </div>
                <div className="flex items-center text-sm font-medium">
                  <span className="text-kazi-green">KES {job.pay}</span>
                  <div className="ml-3 trust-badge">
                    Trust {job.trustRequired}+
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <ExternalLink size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
      
      {/* Quick Actions */}
      <motion.div variants={itemVariants} className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-3">
          {["Find Jobs", "Cash Out", "Get Loan"].map((action, index) => (
            <button 
              key={index}
              className="kazi-card bg-card h-24 flex flex-col items-center justify-center"
            >
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-2">
                {index === 0 && <Search size={16} />}
                {index === 1 && <ArrowUpRight size={16} />}
                {index === 2 && <TrendingUp size={16} />}
              </div>
              <span className="text-sm">{action}</span>
            </button>
          ))}
        </div>
      </motion.div>
      
      {/* Help footer */}
      <motion.div variants={itemVariants} className="mt-auto">
        <div className="bg-muted/50 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="font-medium">Need help?</p>
            <p className="text-sm text-muted-foreground">Ask KaziBot</p>
          </div>
          <button className="kazi-button kazi-button-secondary py-2 px-4">
            Chat Now
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Home;
