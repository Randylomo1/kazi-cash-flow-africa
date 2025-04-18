
import { motion } from "framer-motion";

interface TrustScoreMeterProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

const TrustScoreMeter = ({ 
  score, 
  size = "md",
  showLabel = true 
}: TrustScoreMeterProps) => {
  // Calculate meter properties
  const radius = size === "sm" ? 30 : size === "md" ? 40 : 50;
  const strokeWidth = size === "sm" ? 4 : size === "md" ? 6 : 8;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  
  // Determine color based on score
  const getColor = () => {
    if (score < 40) return "#EF4444"; // Red for low score
    if (score < 70) return "#F59E0B"; // Amber for medium score
    return "#10B981"; // Green for high score
  };

  // Size class for the text
  const textSizeClass = size === "sm" 
    ? "text-lg" 
    : size === "md" 
      ? "text-2xl" 
      : "text-3xl";

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg 
        width={radius * 2 + strokeWidth * 2} 
        height={radius * 2 + strokeWidth * 2} 
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          className="text-muted opacity-20"
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          stroke={getColor()}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeLinecap="round"
        />
      </svg>
      
      {/* Score text */}
      <div className="absolute flex flex-col items-center justify-center">
        <motion.span 
          className={`font-bold ${textSizeClass}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {score}
        </motion.span>
        {showLabel && (
          <span className="text-xs text-muted-foreground -mt-1">Trust Score</span>
        )}
      </div>
    </div>
  );
};

export default TrustScoreMeter;
