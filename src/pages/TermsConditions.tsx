
import { motion } from "framer-motion";
import { ArrowLeft, FileText, Scale, HandCoins, Info, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const TermsConditions = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full pb-6">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate(-1)}
          className="-ml-2"
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-xl font-bold ml-2">Terms & Conditions</h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        {/* Last Updated */}
        <div className="text-sm text-muted-foreground mb-6">
          Last Updated: April 16, 2024
        </div>

        <div className="kazi-card bg-card">
          <h2 className="text-lg font-semibold mb-3">Introduction</h2>
          <div className="flex items-start mb-4">
            <FileText size={18} className="mr-3 mt-1 text-kazi-blue" />
            <p className="text-muted-foreground">
              Welcome to KaziCash. These Terms and Conditions govern your use of the KaziCash 
              mobile application and related services. By accessing or using KaziCash, you agree 
              to be bound by these Terms and Conditions.
            </p>
          </div>
          <p className="text-muted-foreground">
            Please read these Terms carefully. If you do not agree to all of these Terms, 
            you may not access or use KaziCash. If you have any questions, please contact 
            us at support@kazicash.com.
          </p>
        </div>

        <div className="kazi-card bg-card">
          <h2 className="text-lg font-semibold mb-3">Account Registration</h2>
          
          <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
            <li>You must be at least 18 years old to create an account.</li>
            <li>You must provide accurate, current, and complete information.</li>
            <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
            <li>You are responsible for all activities that occur under your account.</li>
            <li>We reserve the right to refuse service, terminate accounts, or remove content at our discretion.</li>
          </ul>
        </div>

        <div className="kazi-card bg-card">
          <h2 className="text-lg font-semibold mb-3">Trust Score System</h2>
          
          <div className="flex items-start mb-4">
            <Scale size={18} className="mr-3 mt-1 text-kazi-blue" />
            <p className="text-muted-foreground">
              KaziCash uses a proprietary Trust Score system to determine user reliability, 
              job eligibility, and loan access. Your Trust Score is calculated based on:
            </p>
          </div>
          
          <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
            <li>Identity verification</li>
            <li>Job completion rate</li>
            <li>Client ratings and reviews</li>
            <li>Payment and loan repayment history</li>
            <li>Account activity and longevity</li>
          </ul>
          
          <p className="mt-4 text-muted-foreground">
            KaziCash reserves the right to modify Trust Score calculations at any time. 
            Trust Scores are for KaziCash use only and should not be considered a credit score 
            for purposes outside the KaziCash platform.
          </p>
        </div>

        <div className="kazi-card bg-card">
          <h2 className="text-lg font-semibold mb-3">Payment Terms</h2>
          
          <div className="flex items-start mb-4">
            <HandCoins size={18} className="mr-3 mt-1 text-kazi-blue" />
            <div>
              <p className="text-muted-foreground mb-3">
                KaziCash facilitates payments between clients and workers. By using our services:
              </p>
              
              <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
                <li>Workers agree to provide services as described in job listings</li>
                <li>Clients agree to pay the agreed-upon amount upon job completion</li>
                <li>KaziCash charges a service fee of 5% on each transaction</li>
                <li>Payments are held in escrow until job completion is confirmed</li>
                <li>Withdrawals to M-Pesa are subject to standard M-Pesa transaction fees</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="kazi-card bg-card">
          <h2 className="text-lg font-semibold mb-3">Loan Terms</h2>
          
          <div className="flex items-start mb-4">
            <Info size={18} className="mr-3 mt-1 text-kazi-blue" />
            <div>
              <p className="text-muted-foreground mb-3">
                KaziCash offers short-term loans based on Trust Score. By applying for a loan:
              </p>
              
              <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
                <li>You agree to repay the loan amount plus applicable interest by the due date</li>
                <li>Interest rates range from 5-15% depending on Trust Score</li>
                <li>Late payments will result in additional fees and reduced Trust Score</li>
                <li>Loans are subject to approval and availability</li>
                <li>KaziCash reserves the right to offset unpaid loans against future earnings</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="kazi-card bg-card">
          <h2 className="text-lg font-semibold mb-3">Prohibited Activities</h2>
          
          <p className="text-muted-foreground mb-3">
            You agree not to engage in any of the following prohibited activities:
          </p>
          
          <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
            <li>Violating any laws or regulations</li>
            <li>Providing false or misleading information</li>
            <li>Circumventing or manipulating the Trust Score system</li>
            <li>Creating multiple accounts or impersonating others</li>
            <li>Using the service for illegal or fraudulent purposes</li>
            <li>Interfering with or disrupting the service or servers</li>
            <li>Attempting to reverse engineer or breach the app's security</li>
          </ul>
        </div>

        <div className="kazi-card bg-card">
          <h2 className="text-lg font-semibold mb-3">Limitation of Liability</h2>
          
          <p className="text-muted-foreground mb-3">
            To the maximum extent permitted by law, KaziCash and its affiliates shall not be liable for:
          </p>
          
          <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
            <li>Any indirect, incidental, special, consequential, or punitive damages</li>
            <li>Any loss of profits, data, business opportunities, or reputation</li>
            <li>Any damages arising from service interruptions or system failures</li>
            <li>Any disputes between workers and clients</li>
            <li>Any content posted by users of the service</li>
          </ul>
          
          <p className="mt-4 text-muted-foreground">
            Our liability is limited to the amount you have paid to KaziCash in the 
            six months preceding the claim.
          </p>
        </div>

        <div className="kazi-card bg-card">
          <h2 className="text-lg font-semibold mb-3">Dispute Resolution</h2>
          
          <p className="text-muted-foreground mb-3">
            Any dispute arising from these Terms shall be resolved through:
          </p>
          
          <ol className="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
            <li>Informal negotiation (contact support@kazicash.com)</li>
            <li>Mediation through a mutually agreed third-party</li>
            <li>Binding arbitration under Kenyan law</li>
          </ol>
          
          <p className="mt-4 text-muted-foreground">
            You agree to resolve disputes individually, not as part of a class action.
          </p>
        </div>

        <div className="kazi-card bg-card bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
          <div className="flex items-start">
            <AlertCircle size={18} className="mr-3 mt-1 text-amber-600" />
            <div>
              <h2 className="text-lg font-semibold mb-2 text-amber-800 dark:text-amber-400">Important</h2>
              <p className="text-sm text-amber-700 dark:text-amber-500">
                By using KaziCash, you acknowledge that you have read, understood, and 
                agree to be bound by these Terms and Conditions. KaziCash reserves the 
                right to modify these Terms at any time. Continued use of the service 
                after changes constitutes acceptance of the modified Terms.
              </p>
            </div>
          </div>
        </div>

        <div className="kazi-card bg-card">
          <h2 className="text-lg font-semibold mb-3">Contact Information</h2>
          <p className="text-muted-foreground mb-2">
            If you have any questions about these Terms, please contact us at:
          </p>
          <div className="text-sm">
            <p>KaziCash Ltd.</p>
            <p>Email: legal@kazicash.com</p>
            <p>Phone: +254 712 345 678</p>
            <p>Address: Nairobi, Kenya</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TermsConditions;
