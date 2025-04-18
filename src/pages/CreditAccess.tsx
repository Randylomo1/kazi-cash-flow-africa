
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  DollarSign, Calendar, ArrowRight, CreditCard,
  Shield, BadgeCheck, Clock, Info, AlertCircle
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import TrustScoreMeter from "@/components/TrustScoreMeter";
import { useApp } from "@/context/AppContext";

const CreditAccess = () => {
  const { user } = useApp();
  const maxLoanAmount = user?.eligibleLoan || 3500;
  
  const [loanAmount, setLoanAmount] = useState(Math.floor(maxLoanAmount / 2));
  const [loanTerm, setLoanTerm] = useState(14); // days
  
  // Calculate repayment details
  const interestRate = 0.05; // 5%
  const interestAmount = loanAmount * interestRate;
  const totalRepayment = loanAmount + interestAmount;
  const weeklyPayment = Math.ceil(totalRepayment / (loanTerm / 7));

  // Trust score bonus calculation
  const trustBonus = Math.floor((user?.trustScore || 0) / 10) * 500;
  
  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">KaziCredit</h1>
        <p className="text-muted-foreground">Quick loans based on your work history</p>
      </div>

      {/* Loan Simulator */}
      <motion.div 
        className="kazi-card bg-card mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="font-semibold mb-4">Loan Simulator</h2>
        
        {/* Loan Amount Slider */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm text-muted-foreground">Loan Amount</label>
            <span className="font-bold text-lg">KES {loanAmount}</span>
          </div>
          
          <Slider
            value={[loanAmount]}
            min={500}
            max={maxLoanAmount}
            step={100}
            onValueChange={(value) => setLoanAmount(value[0])}
            className="mb-2"
          />
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>KES 500</span>
            <span>KES {maxLoanAmount}</span>
          </div>
        </div>
        
        {/* Loan Term Slider */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm text-muted-foreground">Repayment Period</label>
            <span className="font-medium">{loanTerm} days</span>
          </div>
          
          <Slider
            value={[loanTerm]}
            min={7}
            max={30}
            step={7}
            onValueChange={(value) => setLoanTerm(value[0])}
            className="mb-2"
          />
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>7 days</span>
            <span>30 days</span>
          </div>
        </div>
        
        {/* Repayment Summary */}
        <div className="bg-muted rounded-xl p-4 mb-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm">Loan Amount</span>
            <span className="font-medium">KES {loanAmount}</span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm">Interest (5%)</span>
            <span className="font-medium">KES {interestAmount}</span>
          </div>
          <div className="flex justify-between items-center mb-3 pt-3 border-t border-border">
            <span className="font-medium">Total Repayment</span>
            <span className="font-semibold">KES {totalRepayment}</span>
          </div>
          <div className="flex justify-between items-center text-kazi-green">
            <span className="text-sm">Weekly Payment</span>
            <span className="font-medium">KES {weeklyPayment}</span>
          </div>
        </div>
        
        <Button className="w-full kazi-button kazi-button-green">
          Apply for Loan
        </Button>
      </motion.div>

      {/* Trust Score & Eligibility */}
      <motion.div 
        className="grid grid-cols-2 gap-4 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="kazi-card bg-card flex flex-col items-center">
          <p className="text-muted-foreground text-sm mb-2">Trust Score</p>
          <TrustScoreMeter score={user?.trustScore || 72} size="md" />
          <p className="text-xs text-center mt-2 text-muted-foreground">
            Higher score = larger loans
          </p>
        </div>
        
        <div className="kazi-card bg-card">
          <p className="text-muted-foreground text-sm mb-2">You're Eligible For</p>
          <h3 className="text-2xl font-bold mb-1">KES {maxLoanAmount}</h3>
          <div className="text-xs text-kazi-blue flex items-center">
            <Shield size={12} className="mr-1" />
            <span>Based on work history</span>
          </div>
        </div>
      </motion.div>

      {/* Trust Bonus Banner */}
      <motion.div 
        className="kazi-card bg-gradient-to-r from-kazi-blue to-blue-700 text-white mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="flex items-center">
          <BadgeCheck size={24} className="mr-3" />
          <div>
            <h3 className="font-bold text-lg">Trust Score Bonus</h3>
            <p className="text-white/80 text-sm">For your excellent work history</p>
          </div>
        </div>
        
        <div className="mt-4 bg-white/10 rounded-xl p-3">
          <div className="flex justify-between items-center">
            <span>Your bonus</span>
            <span className="font-semibold">+KES {trustBonus}</span>
          </div>
        </div>
      </motion.div>

      {/* Loan History */}
      <motion.div 
        className="kazi-card bg-card mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Loan History</h3>
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <Calendar size={14} className="mr-1" />
            View All
          </Button>
        </div>
        
        <div className="text-center py-6">
          <Clock size={32} className="mx-auto text-muted-foreground mb-2" />
          <p className="font-medium">No Previous Loans</p>
          <p className="text-sm text-muted-foreground">Your loan history will appear here</p>
        </div>
      </motion.div>

      {/* Quick Access Cards */}
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <h3 className="font-semibold mb-3">Quick Access</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="kazi-card bg-card">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500 mr-3">
                <AlertCircle size={20} />
              </div>
              <div>
                <h4 className="font-medium">Emergency Loan</h4>
                <p className="text-xs text-muted-foreground">Instant processing</p>
              </div>
            </div>
            <Button variant="ghost" className="w-full mt-3 justify-between">
              <span>Apply</span>
              <ArrowRight size={16} />
            </Button>
          </div>
          
          <div className="kazi-card bg-card">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-kazi-green mr-3">
                <CreditCard size={20} />
              </div>
              <div>
                <h4 className="font-medium">Business Loan</h4>
                <p className="text-xs text-muted-foreground">For equipment</p>
              </div>
            </div>
            <Button variant="ghost" className="w-full mt-3 justify-between">
              <span>Apply</span>
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Info Banner */}
      <motion.div 
        className="bg-muted rounded-xl p-4 text-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <div className="flex items-start">
          <Info size={16} className="text-muted-foreground mr-2 mt-0.5" />
          <div>
            <p className="mb-1">
              <span className="font-medium">How KaziCredit works: </span> 
              Your loan limit is based on your work history and trust score.
            </p>
            <p>Complete more jobs and increase your trust score to qualify for larger loans.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CreditAccess;
