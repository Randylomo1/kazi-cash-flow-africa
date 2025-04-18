
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Filter, List, MapIcon, Star, ChevronRight, Search, Clock, Tag, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const JobCenter = () => {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  // Mock jobs data
  const jobs = [
    {
      id: "job-1",
      title: "Delivery Driver",
      location: "Nairobi CBD",
      pay: 850,
      duration: "3-4 hours",
      distance: "2.5km",
      trustRequired: 50,
      client: "Jumia Express",
      clientRating: 4.7,
      category: "Delivery",
      postedAt: "2 hours ago"
    },
    {
      id: "job-2",
      title: "Construction Helper",
      location: "Westlands",
      pay: 1200,
      duration: "6-8 hours",
      distance: "4.1km",
      trustRequired: 65,
      client: "BuildRight Ltd",
      clientRating: 4.2,
      category: "Construction",
      postedAt: "5 hours ago"
    },
    {
      id: "job-3",
      title: "Market Vendor",
      location: "Gikomba Market",
      pay: 780,
      duration: "5 hours",
      distance: "1.8km",
      trustRequired: 40,
      client: "Mama Mboga Co-op",
      clientRating: 4.9,
      category: "Retail",
      postedAt: "1 day ago"
    },
    {
      id: "job-4",
      title: "Motorcycle Courier",
      location: "Upperhill",
      pay: 920,
      duration: "4-5 hours",
      distance: "3.2km",
      trustRequired: 55,
      client: "Swift Deliveries",
      clientRating: 4.5,
      category: "Delivery",
      postedAt: "3 hours ago"
    },
    {
      id: "job-5",
      title: "Dishwasher",
      location: "Lavington",
      pay: 700,
      duration: "6 hours",
      distance: "5.7km",
      trustRequired: 30,
      client: "Java House",
      clientRating: 4.6,
      category: "Hospitality",
      postedAt: "12 hours ago"
    },
  ];

  // Mock categories
  const categories = ["All", "Delivery", "Construction", "Hospitality", "Retail", "Cleaning"];

  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Job Center</h1>
        <p className="text-muted-foreground">Find work opportunities near you</p>
      </div>

      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input placeholder="Search jobs..." className="pl-10" />
        </div>
        <Button variant="outline" size="icon" className="h-10 w-10">
          <Filter size={18} />
        </Button>
        <Button variant="outline" size="icon" className="h-10 w-10" onClick={() => setViewMode(viewMode === "list" ? "map" : "list")}>
          {viewMode === "list" ? <MapIcon size={18} /> : <List size={18} />}
        </Button>
      </div>

      <div className="mb-4 overflow-x-auto scrollbar-none">
        <div className="flex gap-2 pb-1">
          {categories.map((category) => (
            <Button 
              key={category} 
              variant="secondary" 
              className={`rounded-full text-sm whitespace-nowrap px-4 py-1 h-auto ${category === "All" ? "bg-kazi-blue text-white" : ""}`}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <Tabs defaultValue="nearby" className="mb-6">
        <TabsList className="w-full">
          <TabsTrigger value="nearby" className="flex-1">Nearby</TabsTrigger>
          <TabsTrigger value="recommended" className="flex-1">Recommended</TabsTrigger>
          <TabsTrigger value="new" className="flex-1">New</TabsTrigger>
        </TabsList>
        
        <TabsContent value="nearby" className="mt-4">
          {viewMode === "list" ? (
            <div className="space-y-4">
              {jobs.map((job) => (
                <Link 
                  to={`/jobs/${job.id}`} 
                  key={job.id}
                  className="block"
                >
                  <motion.div 
                    className="kazi-card bg-card hover:shadow-md"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex justify-between mb-3">
                      <div className="trust-badge">
                        Trust {job.trustRequired}+
                      </div>
                      <div className="text-sm text-muted-foreground">{job.postedAt}</div>
                    </div>
                    
                    <h3 className="font-semibold text-lg mb-1">{job.title}</h3>
                    
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <MapPin size={14} className="mr-1" />
                      <span>{job.location}</span>
                      <span className="mx-2">•</span>
                      <span>{job.distance}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="flex items-center text-sm">
                        <Tag size={14} className="mr-2 text-muted-foreground" />
                        <span className="font-medium">KES {job.pay}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock size={14} className="mr-2 text-muted-foreground" />
                        <span>{job.duration}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center border-t border-border pt-3">
                      <div>
                        <p className="text-sm mb-1">{job.client}</p>
                        <div className="flex items-center">
                          <Star size={14} className="text-yellow-500 mr-1" />
                          <span className="text-sm">{job.clientRating}</span>
                        </div>
                      </div>
                      
                      <Button className="kazi-button kazi-button-primary py-2">
                        View Job
                      </Button>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="relative h-[500px] bg-muted rounded-xl flex items-center justify-center">
              <div className="text-center">
                <MapIcon size={48} className="text-muted-foreground mb-2 mx-auto" />
                <p className="font-medium">Map View</p>
                <p className="text-sm text-muted-foreground">Jobs appear here on the map</p>
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="recommended">
          <div className="text-center py-8">
            <TrendingUp size={48} className="text-muted-foreground mb-2 mx-auto" />
            <p className="font-medium">Personalized Recommendations</p>
            <p className="text-sm text-muted-foreground">Based on your trust score and history</p>
          </div>
        </TabsContent>
        
        <TabsContent value="new">
          <div className="text-center py-8">
            <Clock size={48} className="text-muted-foreground mb-2 mx-auto" />
            <p className="font-medium">New Opportunities</p>
            <p className="text-sm text-muted-foreground">Fresh jobs posted within 24 hours</p>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-8 bg-muted/50 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Can't find what you're looking for?</h3>
            <p className="text-sm text-muted-foreground">Set job alerts for new opportunities</p>
          </div>
          <Button variant="outline" className="shrink-0">
            Set Alert
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobCenter;
