
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ChevronRight, Shield, Wallet, Clock, Info, 
  AlertCircle, ArrowRight, Award, CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useApp } from "@/context/AppContext";
import TrustScoreMeter from "@/components/TrustScoreMeter";

const CreditAccess = () => {
  const { user } = useApp();
  const [loanAmount, setLoanAmount] = useState(1500);
  const [loanTerm, setLoanTerm] = useState(30);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  // Calculate max loan amount based on trust score
  const maxLoanAmount = user?.trustScore ? Math.max(user.trustScore * 50, 500) : 500;
  
  // Calculate interest rate based on trust score (lower score = higher interest)
  const interestRate = user?.trustScore ? Math.max(15 - (user.trustScore / 10), 5) : 15;
  
  // Calculate repayment amount
  const calculateRepayment = () => {
    const interest = (loanAmount * (interestRate / 100) * (loanTerm / 30));
    return Math.round(loanAmount + interest);
  };

  const handleLoanApplication = () => {
    // In a real app, this would submit the loan application to a backend
    setShowSuccessModal(true);
    
    // Auto-hide success modal after 3 seconds
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 3000);
  };

  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Credit Access</h1>
        <p className="text-muted-foreground">Access short-term loans based on your work history</p>
      </div>

      {/* Trust Score Card */}
      <motion.div 
        className="kazi-card bg-card mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold">Your Trust Score</h3>
            <p className="text-sm text-muted-foreground">Determines your loan eligibility</p>
          </div>
          <Button variant="outline" size="sm" className="text-xs">
            Improve Score
          </Button>
        </div>
        
        <div className="flex flex-col items-center pb-2">
          <TrustScoreMeter score={user?.trustScore || 0} />
          <p className="text-sm mt-3">
            {user?.trustScore && user.trustScore >= 70 ? 
              "Excellent! You qualify for maximum loan amount" : 
              "Build your score to qualify for larger loans"}
          </p>
        </div>
      </motion.div>

      {/* Loan Calculator Card */}
      <motion.div 
        className="kazi-card bg-card mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <h3 className="font-semibold mb-4">Loan Calculator</h3>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm">Loan Amount (KES)</label>
            <span className="font-semibold">{loanAmount}</span>
          </div>
          <Slider 
            value={[loanAmount]} 
            min={500} 
            max={maxLoanAmount} 
            step={100} 
            onValueChange={(value) => setLoanAmount(value[0])}
            className="mb-1"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>KES 500</span>
            <span>KES {maxLoanAmount}</span>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm">Loan Term (Days)</label>
            <span className="font-semibold">{loanTerm}</span>
          </div>
          <Slider 
            value={[loanTerm]} 
            min={7} 
            max={60} 
            step={1} 
            onValueChange={(value) => setLoanTerm(value[0])}
            className="mb-1"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>7 days</span>
            <span>60 days</span>
          </div>
        </div>
        
        <div className="bg-muted p-4 rounded-lg mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm">Interest Rate</span>
            <span className="font-semibold">{interestRate.toFixed(1)}%</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-sm">Repayment Amount</span>
            <span className="font-semibold">KES {calculateRepayment()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Due Date</span>
            <span className="font-semibold">{new Date(Date.now() + (loanTerm * 24 * 60 * 60 * 1000)).toLocaleDateString()}</span>
          </div>
        </div>
        
        <Button 
          className="w-full kazi-button kazi-button-primary"
          onClick={handleLoanApplication}
          disabled={user?.trustScore ? user.trustScore < 30 : true}
        >
          Apply for Loan
        </Button>
      </motion.div>

      {/* Loan History & Tips */}
      <motion.div 
        className="space-y-4 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="kazi-card bg-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-kazi-green/10 flex items-center justify-center mr-3">
                <CheckCircle size={20} className="text-kazi-green" />
              </div>
              <div>
                <h3 className="font-semibold">Loan History</h3>
                <p className="text-sm text-muted-foreground">View your past loans</p>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <ChevronRight size={18} />
            </Button>
          </div>
        </div>
        
        <div className="kazi-card bg-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-kazi-orange/10 flex items-center justify-center mr-3">
                <Info size={20} className="text-kazi-orange" />
              </div>
              <div>
                <h3 className="font-semibold">How Loans Work</h3>
                <p className="text-sm text-muted-foreground">Learn about our loan terms</p>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <ChevronRight size={18} />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Loan Benefits */}
      <motion.div 
        className="kazi-card bg-gradient-to-br from-kazi-blue to-indigo-900 text-white mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <h3 className="font-semibold mb-4">KaziCredit Benefits</h3>
        
        <div className="space-y-3">
          <div className="flex items-start">
            <Shield size={18} className="mr-3 mt-0.5" />
            <div>
              <p className="font-medium">Trust-Based Approval</p>
              <p className="text-sm text-white/80">No collateral needed, just work history</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Wallet size={18} className="mr-3 mt-0.5" />
            <div>
              <p className="font-medium">Instant Disbursement</p>
              <p className="text-sm text-white/80">Money sent to M-Pesa in minutes</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Clock size={18} className="mr-3 mt-0.5" />
            <div>
              <p className="font-medium">Flexible Repayment</p>
              <p className="text-sm text-white/80">Choose a timeline that works for you</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Award size={18} className="mr-3 mt-0.5" />
            <div>
              <p className="font-medium">Build Credit History</p>
              <p className="text-sm text-white/80">Unlock larger loans with timely repayment</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Success Modal */}
      {showSuccessModal && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowSuccessModal(false)}></div>
          <motion.div 
            className="bg-card rounded-xl p-6 max-w-md w-full shadow-xl relative z-10"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
          >
            <div className="mb-4 w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
              <CheckCircle size={32} className="text-kazi-green" />
            </div>
            <h3 className="text-xl font-bold text-center mb-2">Application Successful!</h3>
            <p className="text-center text-muted-foreground mb-4">
              Your loan application for KES {loanAmount} is being processed. 
              You'll receive an M-Pesa notification shortly.
            </p>
            <Button 
              className="w-full kazi-button kazi-button-primary"
              onClick={() => setShowSuccessModal(false)}
            >
              Got It
            </Button>
          </motion.div>
        </motion.div>
      )}

      {/* Risk Warning */}
      <div className="mb-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
        <div className="flex items-start">
          <AlertCircle size={18} className="text-amber-600 dark:text-amber-500 mr-2 mt-0.5" />
          <div>
            <p className="font-medium text-amber-800 dark:text-amber-400">Important Notice</p>
            <p className="text-sm text-amber-700 dark:text-amber-500">
              Late repayments affect your trust score and future loan eligibility. 
              Borrow responsibly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditAccess;
