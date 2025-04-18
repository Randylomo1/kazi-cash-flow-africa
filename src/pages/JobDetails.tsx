
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  MapPin, Clock, Tag, Star, User, ThumbsUp, Mic, 
  ArrowLeft, Calendar, Shield, SpeakerIcon, BadgeCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useApp();
  const [isReading, setIsReading] = useState(false);

  // Mock job data (in a real app, this would come from an API call)
  const job = {
    id: id,
    title: "Construction Helper",
    location: "Westlands, Nairobi",
    address: "Mpaka Road, Near Sarit Centre",
    pay: 1200,
    duration: "6-8 hours",
    distance: "4.1km",
    trustRequired: 65,
    client: "BuildRight Ltd",
    clientRating: 4.2,
    totalReviews: 48,
    description: `
      We are looking for a construction helper to assist with various tasks on our building site in Westlands.
      
      Your responsibilities will include:
      - Carrying materials and tools
      - Helping skilled workers
      - Cleaning the site
      - Ensuring safety procedures are followed
      
      No prior experience required, but you must be reliable and physically fit.
    `,
    requirements: [
      "Must be at least 18 years old",
      "Able to lift up to 25kg",
      "Reliable and punctual",
      "Follow safety instructions",
    ],
    benefits: [
      "Daily pay via M-Pesa",
      "Lunch provided",
      "Potential for regular work",
    ],
    date: "Tomorrow, 7:00 AM - 3:00 PM",
    applicationDeadline: "Today, 8:00 PM",
    postedAt: "5 hours ago",
    qualifies: true
  };

  const handleApply = () => {
    // In a real app, this would submit the application
    alert("Your application has been submitted!");
    navigate("/jobs");
  };

  const handleTextToSpeech = () => {
    setIsReading(!isReading);
    
    if (!isReading && 'speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance();
      speech.text = `Job: ${job.title}. Location: ${job.location}. Pay: ${job.pay} KES. Duration: ${job.duration}. Description: ${job.description}`;
      speech.lang = 'en-US';
      speech.rate = 0.9;
      window.speechSynthesis.speak(speech);
    } else if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
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
        <h1 className="text-xl font-bold ml-2">Job Details</h1>
      </div>

      <motion.div 
        className="kazi-card bg-card mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Job header */}
        <div className="mb-4">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold mb-1">{job.title}</h2>
            <Button
              variant="outline"
              size="icon"
              className={`rounded-full ${isReading ? 'bg-kazi-orange text-white' : ''}`}
              onClick={handleTextToSpeech}
            >
              {isReading ? <SpeakerIcon size={18} /> : <Mic size={18} />}
            </Button>
          </div>
          <div className="flex items-center text-muted-foreground mb-2">
            <MapPin size={16} className="mr-1" />
            <span>{job.location}</span>
            <span className="mx-2">•</span>
            <span>{job.distance}</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            <div className="trust-badge flex items-center">
              <Shield size={14} className="mr-1" />
              Trust {job.trustRequired}+
            </div>
            <div className="bg-muted text-muted-foreground text-xs rounded-full px-3 py-1">
              {job.postedAt}
            </div>
          </div>
        </div>

        {/* Job details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-muted rounded-lg p-3">
            <div className="flex items-center text-muted-foreground mb-1">
              <Tag size={14} className="mr-2" />
              <span className="text-xs">Pay</span>
            </div>
            <p className="font-semibold">KES {job.pay}</p>
          </div>
          <div className="bg-muted rounded-lg p-3">
            <div className="flex items-center text-muted-foreground mb-1">
              <Clock size={14} className="mr-2" />
              <span className="text-xs">Duration</span>
            </div>
            <p className="font-semibold">{job.duration}</p>
          </div>
          <div className="bg-muted rounded-lg p-3">
            <div className="flex items-center text-muted-foreground mb-1">
              <Calendar size={14} className="mr-2" />
              <span className="text-xs">Date</span>
            </div>
            <p className="font-semibold text-sm">{job.date}</p>
          </div>
          <div className="bg-muted rounded-lg p-3">
            <div className="flex items-center text-muted-foreground mb-1">
              <User size={14} className="mr-2" />
              <span className="text-xs">Client</span>
            </div>
            <div className="flex items-center">
              <p className="font-semibold text-sm mr-2">{job.client}</p>
              <div className="flex items-center">
                <Star size={12} className="text-yellow-500" />
                <span className="text-xs ml-1">{job.clientRating}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Description</h3>
          <p className="text-muted-foreground whitespace-pre-line text-sm">
            {job.description}
          </p>
        </div>

        {/* Requirements */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Requirements</h3>
          <ul className="space-y-2">
            {job.requirements.map((req, index) => (
              <li key={index} className="flex items-start text-sm">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-kazi-blue mt-1.5 mr-2"></span>
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Benefits */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Benefits</h3>
          <ul className="space-y-2">
            {job.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start text-sm">
                <ThumbsUp size={14} className="text-kazi-green mr-2 mt-0.5" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Location */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Location</h3>
          <p className="text-sm mb-2">{job.address}</p>
          <div className="h-[120px] bg-muted rounded-lg flex items-center justify-center">
            <MapPin size={24} className="text-muted-foreground" />
            <span className="ml-2">Map View</span>
          </div>
        </div>

        {/* Application deadline */}
        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-3 mb-6">
          <div className="flex items-center">
            <Clock size={16} className="text-amber-600 dark:text-amber-500 mr-2" />
            <div>
              <p className="font-medium text-amber-800 dark:text-amber-400">Application Deadline</p>
              <p className="text-sm text-amber-700 dark:text-amber-500">{job.applicationDeadline}</p>
            </div>
          </div>
        </div>

        {/* Application status */}
        {job.qualifies ? (
          <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-3 mb-6">
            <div className="flex items-center">
              <BadgeCheck size={16} className="text-green-600 dark:text-green-500 mr-2" />
              <div>
                <p className="font-medium text-green-800 dark:text-green-400">You qualify for this job</p>
                <p className="text-sm text-green-700 dark:text-green-500">Your trust score meets the requirement</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-6">
            <div className="flex items-center">
              <Shield size={16} className="text-red-600 dark:text-red-500 mr-2" />
              <div>
                <p className="font-medium text-red-800 dark:text-red-400">Trust score too low</p>
                <p className="text-sm text-red-700 dark:text-red-500">You need a trust score of {job.trustRequired} or higher</p>
              </div>
            </div>
          </div>
        )}

        {/* Apply button */}
        <Button 
          className="w-full kazi-button kazi-button-primary"
          onClick={handleApply}
          disabled={!job.qualifies}
        >
          Apply Now
        </Button>
      </motion.div>
    </div>
  );
};

export default JobDetails;
