
import { X, Award, Check, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface BadgeDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  badge: {
    id: string;
    name: string;
    description: string;
    icon: any;
    acquired: boolean;
    progress?: number;
    requirements?: string[];
    benefits?: string[];
  };
}

const BadgeDetailModal = ({ isOpen, onClose, badge }: BadgeDetailModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div 
            className="bg-card rounded-xl w-full max-w-sm p-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{badge.name} Badge</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X size={20} />
              </Button>
            </div>
            
            <div className="flex items-center mb-6">
              <div className={`w-16 h-16 rounded-full mr-4 flex items-center justify-center ${
                badge.acquired ? 'bg-blue-100 text-kazi-blue' : 'bg-muted text-muted-foreground'
              }`}>
                <badge.icon size={32} />
              </div>
              <div>
                <p className="font-medium mb-1">{badge.description}</p>
                {badge.acquired ? (
                  <div className="flex items-center text-kazi-green text-sm">
                    <Check size={16} className="mr-1" />
                    <span>Badge Earned</span>
                  </div>
                ) : (
                  <div className="flex items-center text-amber-500 text-sm">
                    <Clock size={16} className="mr-1" />
                    <span>In Progress: {badge.progress}%</span>
                  </div>
                )}
              </div>
            </div>
            
            {badge.requirements && (
              <div className="mb-4">
                <h3 className="font-medium mb-2">Requirements</h3>
                <ul className="space-y-2">
                  {badge.requirements.map((req, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-muted flex items-center justify-center mr-2 mt-0.5">
                        {index + 1}
                      </span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {badge.benefits && (
              <div>
                <h3 className="font-medium mb-2">Benefits</h3>
                <ul className="space-y-2">
                  {badge.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <Check size={16} className="mr-2 text-kazi-green flex-shrink-0 mt-0.5" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {!badge.acquired && (
              <Button className="w-full mt-6 bg-kazi-blue">
                <Award size={16} className="mr-2" />
                View Related Jobs
              </Button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BadgeDetailModal;
