
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Star, Award, Clock, ChevronRight, MapPin, 
  Share2, QrCode, Calendar, FileText, BadgeCheck,
  ThumbsUp, ThumbsDown, Briefcase, Phone, Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useApp } from "@/context/AppContext";
import TrustScoreMeter from "@/components/TrustScoreMeter";
import { QRCodeModal } from "@/components/QRCodeModal";
import { BadgeDetailModal } from "@/components/BadgeDetailModal";

const TrustProfileExample = () => {
  const { user } = useApp();
  const navigate = useNavigate();
  const [showQRModal, setShowQRModal] = useState(false);
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<any>(null);
  
  // Mock data
  const completedJobs = [
    {
      id: "job-1",
      title: "Delivery Driver",
      client: "Jumia Express",
      date: "Today, 2:30 PM",
      rating: 5,
      payment: 850,
      clientFeedback: "Excellent service, very punctual and professional."
    },
    {
      id: "job-2",
      title: "Construction Helper",
      client: "BuildRight Ltd",
      date: "Yesterday",
      rating: 4,
      payment: 1200,
      clientFeedback: "Good work, helped complete the project on time."
    },
    {
      id: "job-3",
      title: "Market Vendor",
      client: "Mama Mboga Co-op",
      date: "3 days ago",
      rating: 5,
      payment: 780,
      clientFeedback: "Very reliable, will hire again."
    }
  ];
  
  const badges = [
    {
      id: "badge-1",
      name: "Verified Identity",
      icon: <BadgeCheck className="text-kazi-blue" size={24} />,
      color: "blue",
      description: "Completed identity verification with proper documentation",
      date: "Jan 15, 2024"
    },
    {
      id: "badge-2",
      name: "Punctuality Pro",
      icon: <Clock className="text-kazi-green" size={24} />,
      color: "green",
      description: "Arrived on time for 10+ consecutive jobs",
      date: "Feb 20, 2024"
    },
    {
      id: "badge-3",
      name: "Top Rated",
      icon: <Star className="text-yellow-500" size={24} />,
      color: "yellow",
      description: "Maintained 4.8+ rating for 3 months",
      date: "Mar 5, 2024"
    },
    {
      id: "badge-4",
      name: "Trusted Borrower",
      icon: <Award className="text-kazi-purple" size={24} />,
      color: "purple",
      description: "Repaid 5+ loans without delay",
      date: "Mar 18, 2024"
    }
  ];
  
  const activityFeed = [
    {
      id: "activity-1",
      type: "job_completed",
      description: "Completed a delivery job",
      date: "Today, 2:30 PM",
      points: "+5"
    },
    {
      id: "activity-2",
      type: "badge_earned",
      description: "Earned 'Punctuality Pro' badge",
      date: "Yesterday",
      points: "+15"
    },
    {
      id: "activity-3",
      type: "loan_repaid",
      description: "Repaid loan of KES 2,500",
      date: "3 days ago",
      points: "+10"
    }
  ];
  
  const handleBadgeClick = (badge: any) => {
    setSelectedBadge(badge);
    setShowBadgeModal(true);
  };
  
  return (
    <div className="h-full pb-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Trust Profile</h1>
        <p className="text-muted-foreground">Build and manage your reputation</p>
      </div>

      {/* Main Profile Card */}
      <motion.div 
        className="kazi-card bg-card mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center mb-4">
          <div className="h-16 w-16 rounded-full bg-kazi-blue flex items-center justify-center text-white text-2xl font-bold mr-4">
            {user?.name ? user.name[0] : "U"}
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-lg">{user?.name || "User"}</h2>
            <div className="flex items-center">
              <MapPin size={14} className="text-muted-foreground mr-1" />
              <span className="text-sm text-muted-foreground">{user?.location || "Nairobi, Kenya"}</span>
            </div>
            <div className="flex items-center mt-1">
              <Star size={14} className="text-yellow-500 mr-1" />
              <span className="text-sm">4.8 (27 reviews)</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs h-8 px-3 flex items-center"
              onClick={() => setShowQRModal(true)}
            >
              <QrCode size={14} className="mr-1" />
              QR Code
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs h-8 px-3 flex items-center"
            >
              <Share2 size={14} className="mr-1" />
              Share
            </Button>
          </div>
        </div>
        
        <div className="border-t border-border pt-4 pb-2">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Trust Score</h3>
            <span className="text-sm text-muted-foreground">Level 3</span>
          </div>
          <div className="flex justify-center py-2">
            <TrustScoreMeter score={user?.trustScore || 0} />
          </div>
          <p className="text-center text-sm mt-2 mb-3">
            {user?.trustScore && user.trustScore >= 70 ? 
              "Great progress! You're in the top 20% of users." : 
              "Keep going! Complete more jobs to boost your score."}
          </p>
          <Button 
            variant="outline" 
            className="w-full text-sm"
            onClick={() => navigate("/trust/improve")}
          >
            How to Improve Your Score
          </Button>
        </div>
      </motion.div>

      <Tabs defaultValue="history" className="mb-6">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="history" className="flex-1">Work History</TabsTrigger>
          <TabsTrigger value="badges" className="flex-1">Badges</TabsTrigger>
          <TabsTrigger value="activity" className="flex-1">Activity</TabsTrigger>
        </TabsList>
        
        {/* Work History Tab */}
        <TabsContent value="history" className="mt-0 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">{user?.completedJobs || 0} Jobs Completed</h3>
            <Button variant="ghost" size="sm" className="text-xs" onClick={() => navigate("/trust/history")}>
              View All <ChevronRight size={14} />
            </Button>
          </div>
          
          {completedJobs.map((job) => (
            <motion.div 
              key={job.id}
              className="kazi-card bg-card p-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">{job.title}</h4>
                  <p className="text-sm text-muted-foreground">{job.client}</p>
                </div>
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      className={i < job.rating ? "text-yellow-500" : "text-muted"}
                      fill={i < job.rating ? "currentColor" : "none"}
                    />
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-2 text-sm">
                <div className="flex items-center">
                  <Calendar size={14} className="mr-1 text-muted-foreground" />
                  <span>{job.date}</span>
                </div>
                <span className="font-medium text-kazi-green">KES {job.payment}</span>
              </div>
              
              <div className="bg-muted p-2 rounded-md text-sm italic">
                "{job.clientFeedback}"
              </div>
              
              <div className="mt-3 flex justify-end">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs h-7"
                  onClick={() => navigate(`/jobs/${job.id}/details`)}
                >
                  View Details
                </Button>
              </div>
            </motion.div>
          ))}
        </TabsContent>
        
        {/* Badges Tab */}
        <TabsContent value="badges" className="mt-0">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">{badges.length} Badges Earned</h3>
            <Button variant="ghost" size="sm" className="text-xs" onClick={() => navigate("/trust/badges")}>
              View All <ChevronRight size={14} />
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {badges.map((badge) => (
              <motion.div 
                key={badge.id}
                className="kazi-card bg-card p-3 cursor-pointer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleBadgeClick(badge)}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-2">
                    {badge.icon}
                  </div>
                  <h4 className="font-medium text-sm mb-1">{badge.name}</h4>
                  <p className="text-xs text-muted-foreground">{badge.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-4 bg-muted/50 rounded-lg p-3">
            <h4 className="font-medium mb-1">Next Badge: "Super Reliable"</h4>
            <p className="text-xs text-muted-foreground mb-2">Complete 5 more jobs with 5-star ratings</p>
            <Progress value={60} className="h-2" />
            <p className="text-xs text-right mt-1">15/25 jobs</p>
          </div>
        </TabsContent>
        
        {/* Activity Tab */}
        <TabsContent value="activity" className="mt-0">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Recent Activity</h3>
            <Button variant="ghost" size="sm" className="text-xs" onClick={() => navigate("/trust/activity")}>
              View All <ChevronRight size={14} />
            </Button>
          </div>
          
          <div className="relative pl-6 border-l border-border space-y-6">
            {activityFeed.map((activity, index) => (
              <div key={activity.id} className="relative">
                <div className="absolute -left-10 mt-1 w-4 h-4 rounded-full bg-kazi-blue"></div>
                <div className="mb-1">
                  <p className="font-medium">{activity.description}</p>
                  <p className="text-xs text-muted-foreground">{activity.date}</p>
                </div>
                <Badge className="bg-green-100 text-kazi-green hover:bg-green-100 font-normal">
                  {activity.points} Trust Points
                </Badge>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Skills Section */}
      <motion.div 
        className="kazi-card bg-card mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">Skills & Experience</h3>
          <Button variant="ghost" size="sm" className="h-8 text-xs">
            Edit
          </Button>
        </div>
        
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium mb-2">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {(user?.skills || ["Delivery", "Construction", "Cleaning"]).map((skill, index) => (
                <Badge key={index} variant="outline" className="bg-muted/50">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Experience</h4>
            <div className="space-y-2">
              <div className="flex items-start">
                <Briefcase size={16} className="mr-2 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="text-sm">Delivery Driver</p>
                  <p className="text-xs text-muted-foreground">2+ years</p>
                </div>
              </div>
              <div className="flex items-start">
                <Briefcase size={16} className="mr-2 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="text-sm">Construction Helper</p>
                  <p className="text-xs text-muted-foreground">1 year</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Contact Info */}
      <motion.div 
        className="kazi-card bg-card mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <h3 className="font-semibold mb-3">Contact Information</h3>
        
        <div className="space-y-3">
          <div className="flex items-center">
            <Phone size={16} className="mr-3 text-muted-foreground" />
            <span>{user?.phone || "+254 712 345 678"}</span>
          </div>
          <div className="flex items-center">
            <Mail size={16} className="mr-3 text-muted-foreground" />
            <span>brian@example.com</span>
          </div>
        </div>
      </motion.div>

      {/* Rate Recent Client */}
      <motion.div 
        className="kazi-card bg-gradient-to-br from-kazi-blue to-indigo-900 text-white mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <h3 className="font-semibold mb-3">Rate Your Recent Experience</h3>
        <p className="text-sm text-white/80 mb-3">
          How was your experience working with Jumia Express yesterday?
        </p>
        
        <div className="flex justify-center gap-4 mb-4">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button 
              key={rating}
              className="flex flex-col items-center"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center mb-1">
                <Star 
                  size={20} 
                  className="text-yellow-300" 
                  fill={rating <= 3 ? "none" : "currentColor"}
                />
              </div>
              <span className="text-xs">{rating}</span>
            </button>
          ))}
        </div>
        
        <div className="flex gap-3 mb-3">
          <Button variant="outline" className="flex-1 bg-white/10 border-white/10 text-white hover:bg-white/20">
            <ThumbsDown size={16} className="mr-2" />
            Issue
          </Button>
          <Button variant="outline" className="flex-1 bg-white/10 border-white/10 text-white hover:bg-white/20">
            <ThumbsUp size={16} className="mr-2" />
            Great
          </Button>
        </div>
        
        <Button className="w-full bg-white text-kazi-blue hover:bg-white/90">
          Submit Rating
        </Button>
      </motion.div>

      {/* Verification Documents */}
      <motion.div 
        className="kazi-card bg-card mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Verification Status</h3>
          <Badge variant="outline" className="bg-green-100 text-kazi-green hover:bg-green-100">
            Verified
          </Badge>
        </div>
        
        <div className="flex items-center justify-between text-sm py-2 border-t border-border">
          <div className="flex items-center">
            <FileText size={16} className="mr-2 text-muted-foreground" />
            <span>ID Verification</span>
          </div>
          <BadgeCheck size={16} className="text-kazi-green" />
        </div>
        
        <div className="flex items-center justify-between text-sm py-2 border-t border-border">
          <div className="flex items-center">
            <Phone size={16} className="mr-2 text-muted-foreground" />
            <span>Phone Verification</span>
          </div>
          <BadgeCheck size={16} className="text-kazi-green" />
        </div>
        
        <div className="flex items-center justify-between text-sm py-2 border-t border-border">
          <div className="flex items-center">
            <Mail size={16} className="mr-2 text-muted-foreground" />
            <span>Email Verification</span>
          </div>
          <BadgeCheck size={16} className="text-kazi-green" />
        </div>
      </motion.div>

      {/* QR Code Modal */}
      <QRCodeModal
        isOpen={showQRModal}
        onClose={() => setShowQRModal(false)}
        profileData={{
          name: user?.name || "Brian",
          phone: user?.phone || "+254712345678",
          trustScore: user?.trustScore || 72
        }}
      />

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <BadgeDetailModal
          isOpen={showBadgeModal}
          onClose={() => setShowBadgeModal(false)}
          badge={selectedBadge}
        />
      )}
    </div>
  );
};

export default TrustProfileExample;
