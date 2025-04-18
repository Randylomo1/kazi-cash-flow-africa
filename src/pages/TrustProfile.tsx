
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Star, Award, Calendar, Share2, QrCode,
  Check, ClipboardCheck, TrendingUp, ChevronRight,
  Clock, Briefcase, MapPin, User, Shield
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import TrustScoreMeter from "@/components/TrustScoreMeter";
import { useApp } from "@/context/AppContext";

const TrustProfile = () => {
  const { user } = useApp();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock badges data
  const badges = [
    { id: "badge-1", name: "Punctual", description: "Always on time", icon: Clock, acquired: true },
    { id: "badge-2", name: "Reliable", description: "Completed 10+ jobs", icon: ClipboardCheck, acquired: true },
    { id: "badge-3", name: "Quality", description: "High-rated work", icon: Star, acquired: true },
    { id: "badge-4", name: "Team Player", description: "Collaborative work", icon: User, acquired: false, progress: 70 },
    { id: "badge-5", name: "Specialist", description: "Expert in category", icon: Award, acquired: false, progress: 30 },
  ];

  // Mock completed jobs
  const completedJobs = [
    {
      id: "job-1",
      title: "Delivery Driver",
      client: "Jumia Express",
      date: "Today",
      rating: 5,
      earnings: 850,
      location: "Nairobi CBD"
    },
    {
      id: "job-2",
      title: "Construction Helper",
      client: "BuildRight Ltd",
      date: "Yesterday",
      rating: 4,
      earnings: 1200,
      location: "Westlands"
    },
    {
      id: "job-3",
      title: "Market Vendor",
      client: "Mama Mboga Co-op",
      date: "2 days ago",
      rating: 5,
      earnings: 780,
      location: "Gikomba Market"
    },
  ];

  // Mock activity feed
  const activityFeed = [
    {
      id: "activity-1",
      type: "job_completed",
      description: "Completed 3 jobs this week",
      date: "Today",
      icon: Briefcase
    },
    {
      id: "activity-2",
      type: "badge_earned",
      description: "Earned the Punctual badge",
      date: "Yesterday",
      icon: Award
    },
    {
      id: "activity-3",
      type: "trust_increase",
      description: "Trust score increased by 5 points",
      date: "3 days ago",
      icon: TrendingUp
    },
  ];

  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Trust Profile</h1>
        <p className="text-muted-foreground">Your work reputation at a glance</p>
      </div>

      {/* Profile header */}
      <motion.div 
        className="kazi-card bg-card mb-6 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-20 h-20 rounded-full bg-kazi-blue text-white flex items-center justify-center text-2xl font-bold mb-3">
          {user?.name.charAt(0) || "B"}
        </div>
        
        <h2 className="text-xl font-bold">{user?.name || "Brian"}</h2>
        <p className="text-muted-foreground mb-4">Member since October 2023</p>
        
        <div className="w-full flex flex-col items-center mb-4">
          <TrustScoreMeter score={user?.trustScore || 72} size="lg" />
        </div>
        
        <div className="grid grid-cols-3 w-full gap-2 text-center">
          <div>
            <p className="text-muted-foreground text-xs">Jobs</p>
            <p className="font-semibold">{user?.completedJobs || 27}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Badges</p>
            <p className="font-semibold">{badges.filter(b => b.acquired).length}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Rating</p>
            <div className="flex items-center justify-center">
              <Star size={14} className="text-yellow-500 mr-1" />
              <p className="font-semibold">4.8</p>
            </div>
          </div>
        </div>
        
        <div className="flex w-full justify-between mt-6 pt-4 border-t border-border">
          <Button variant="outline" className="flex items-center">
            <Share2 size={16} className="mr-2" />
            Share
          </Button>
          <Button variant="outline" className="flex items-center">
            <QrCode size={16} className="mr-2" />
            QR Code
          </Button>
        </div>
      </motion.div>

      {/* Tabs */}
      <Tabs defaultValue="overview" onValueChange={setActiveTab} className="mb-6">
        <TabsList className="w-full">
          <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
          <TabsTrigger value="badges" className="flex-1">Badges</TabsTrigger>
          <TabsTrigger value="history" className="flex-1">History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-4 space-y-6">
          {/* Progress summary */}
          <motion.div 
            className="kazi-card bg-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <h3 className="font-semibold mb-4">Trust Journey</h3>
            
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm">Progress to next level</span>
                <span className="text-sm font-medium">72%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-bar-fill bg-kazi-blue"
                  style={{ width: "72%" }}
                ></div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                28 more points to reach Gold Status
              </p>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                <div className="h-1 w-10 bg-gray-300"></div>
                <p className="text-xs text-muted-foreground mt-1">Bronze</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-kazi-blue ring-2 ring-kazi-blue/30"></div>
                <div className="h-1 w-10 bg-kazi-blue"></div>
                <p className="text-xs font-medium mt-1">Silver</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                <div className="h-1 w-10 bg-gray-300"></div>
                <p className="text-xs text-muted-foreground mt-1">Gold</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                <p className="text-xs text-muted-foreground mt-1">Platinum</p>
              </div>
            </div>
          </motion.div>

          {/* Recent badges */}
          <motion.div 
            className="kazi-card bg-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Badges</h3>
              <Button 
                variant="ghost" 
                className="text-xs h-8 px-2"
                onClick={() => setActiveTab("badges")}
              >
                See All
                <ChevronRight size={14} className="ml-1" />
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {badges.filter(badge => badge.acquired).slice(0, 3).map(badge => (
                <div key={badge.id} className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-kazi-blue mb-1">
                    <badge.icon size={20} />
                  </div>
                  <p className="text-xs font-medium">{badge.name}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Activity feed */}
          <motion.div 
            className="kazi-card bg-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <h3 className="font-semibold mb-4">Recent Activity</h3>
            
            <div className="space-y-4">
              {activityFeed.map(activity => (
                <div key={activity.id} className="flex">
                  <div className="mr-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <activity.icon size={16} />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="badges" className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {badges.map(badge => (
              <motion.div 
                key={badge.id} 
                className="kazi-card bg-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center mb-3">
                  <div className={`w-10 h-10 rounded-full mr-3 flex items-center justify-center ${
                    badge.acquired ? 'bg-blue-100 text-kazi-blue' : 'bg-muted text-muted-foreground'
                  }`}>
                    <badge.icon size={18} />
                  </div>
                  <div>
                    <h3 className="font-medium">{badge.name}</h3>
                    <p className="text-xs text-muted-foreground">{badge.description}</p>
                  </div>
                </div>
                
                {badge.acquired ? (
                  <div className="flex items-center text-kazi-green text-sm">
                    <Check size={16} className="mr-1" />
                    <span>Earned</span>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Progress</span>
                      <span>{badge.progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-bar-fill bg-muted-foreground"
                        style={{ width: `${badge.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="history" className="mt-4 space-y-4">
          <h3 className="font-semibold mb-2">Job History</h3>
          
          {completedJobs.map((job, index) => (
            <motion.div 
              key={job.id}
              className="kazi-card bg-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold">{job.title}</h3>
                  <p className="text-sm text-muted-foreground">{job.client}</p>
                </div>
                <div className="flex items-center bg-muted rounded-full px-2 py-0.5">
                  <Clock size={12} className="mr-1 text-muted-foreground" />
                  <span className="text-xs">{job.date}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mb-2">
                <div>
                  <p className="text-xs text-muted-foreground">Earned</p>
                  <p className="font-medium">KES {job.earnings}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Rating</p>
                  <div className="flex items-center">
                    <Star size={14} className="text-yellow-500 mr-1" />
                    <span className="font-medium">{job.rating}</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <div className="flex items-center">
                    <MapPin size={12} className="mr-1 text-muted-foreground" />
                    <p className="text-sm truncate">{job.location}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </TabsContent>
      </Tabs>

      {/* Trust score benefits */}
      <motion.div 
        className="kazi-card bg-gradient-to-br from-kazi-orange to-amber-500 text-white mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <div className="flex items-start mb-4">
          <Shield size={24} className="mr-3 mt-1" />
          <div>
            <h3 className="font-bold text-lg">Trust Score Benefits</h3>
            <p className="text-white/80 text-sm">Unlock more with a higher score</p>
          </div>
        </div>
        
        <ul className="space-y-2">
          <li className="flex items-center">
            <Check size={16} className="mr-2" />
            <span className="text-sm">Access to premium jobs</span>
          </li>
          <li className="flex items-center">
            <Check size={16} className="mr-2" />
            <span className="text-sm">Increased loan limits</span>
          </li>
          <li className="flex items-center">
            <Check size={16} className="mr-2" />
            <span className="text-sm">Priority payments</span>
          </li>
        </ul>
        
        <Button 
          className="w-full mt-4 bg-white text-kazi-orange hover:bg-white/90"
        >
          How to Improve Your Score
        </Button>
      </motion.div>
    </div>
  );
};

export default TrustProfile;
