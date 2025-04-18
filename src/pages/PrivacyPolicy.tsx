
import { motion } from "framer-motion";
import { ArrowLeft, Shield, Eye, Lock, Bell, Server, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PrivacyPolicy = () => {
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
        <h1 className="text-xl font-bold ml-2">Privacy Policy</h1>
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
            <Shield size={18} className="mr-3 mt-1 text-kazi-blue" />
            <p className="text-muted-foreground">
              KaziCash ("we", "our", or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard 
              your information when you use our mobile application KaziCash and related services.
            </p>
          </div>
          <p className="text-muted-foreground">
            Please read this Privacy Policy carefully. By accessing or using the KaziCash 
            app, you acknowledge that you have read, understood, and agree to be bound 
            by all the terms outlined in this Privacy Policy.
          </p>
        </div>

        <div className="kazi-card bg-card">
          <h2 className="text-lg font-semibold mb-3">Information We Collect</h2>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <Eye size={18} className="mr-3 mt-1 text-kazi-blue" />
              <div>
                <h3 className="font-medium">Personal Information</h3>
                <p className="text-sm text-muted-foreground">
                  • Name, phone number, email address <br />
                  • National ID or passport information <br />
                  • Profile photo for identity verification <br />
                  • M-Pesa account information <br />
                  • Employment history and skills
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Globe size={18} className="mr-3 mt-1 text-kazi-blue" />
              <div>
                <h3 className="font-medium">Automatically Collected Information</h3>
                <p className="text-sm text-muted-foreground">
                  • Device information (model, operating system) <br />
                  • IP address and location data <br />
                  • App usage statistics and behavior <br />
                  • Performance data and crash reports
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="kazi-card bg-card">
          <h2 className="text-lg font-semibold mb-3">How We Use Your Information</h2>
          
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">We use your information to:</p>
            
            <div className="flex items-start">
              <Server size={18} className="mr-3 mt-0 text-kazi-blue" />
              <div>
                <h3 className="font-medium">Core Services</h3>
                <p className="text-sm text-muted-foreground">
                  • Process job applications and payments <br />
                  • Calculate trust scores and loan eligibility <br />
                  • Facilitate communication between workers and clients <br />
                  • Manage your account and provide customer support
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Bell size={18} className="mr-3 mt-0 text-kazi-blue" />
              <div>
                <h3 className="font-medium">Communication & Improvement</h3>
                <p className="text-sm text-muted-foreground">
                  • Send service-related notifications <br />
                  • Improve our app functionality and user experience <br />
                  • Develop new features based on usage patterns <br />
                  • Troubleshoot problems and provide technical support
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="kazi-card bg-card">
          <h2 className="text-lg font-semibold mb-3">Data Security</h2>
          
          <div className="flex items-start">
            <Lock size={18} className="mr-3 mt-1 text-kazi-blue" />
            <p className="text-muted-foreground">
              We implement a variety of security measures to maintain the safety of your 
              personal information. Your personal information is contained behind secured 
              networks and is only accessible by a limited number of persons who have 
              special access rights and are required to keep the information confidential.
            </p>
          </div>
        </div>

        <div className="kazi-card bg-card">
          <h2 className="text-lg font-semibold mb-3">Data Sharing & Third Parties</h2>
          <p className="text-muted-foreground mb-4">
            We may share information with third parties in the following circumstances:
          </p>
          
          <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
            <li>With service providers who help us operate our business</li>
            <li>With financial institutions to process payments</li>
            <li>With potential employers when you apply for jobs</li>
            <li>When required by law or to protect our rights</li>
            <li>In connection with a business transfer, merger, or acquisition</li>
          </ul>
        </div>

        <div className="kazi-card bg-card">
          <h2 className="text-lg font-semibold mb-3">Your Rights & Choices</h2>
          <p className="text-muted-foreground mb-4">
            You have the following rights regarding your personal information:
          </p>
          
          <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
            <li>Access and review your personal information</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your data (subject to certain exceptions)</li>
            <li>Opt-out of certain data collection and processing</li>
            <li>Manage notification preferences</li>
          </ul>
          
          <p className="mt-4 text-muted-foreground">
            To exercise these rights, please contact us at privacy@kazicash.com
          </p>
        </div>

        <div className="kazi-card bg-card">
          <h2 className="text-lg font-semibold mb-3">Changes to Privacy Policy</h2>
          <p className="text-muted-foreground">
            We may update our Privacy Policy from time to time. We will notify you of 
            any changes by posting the new Privacy Policy on this page and updating the 
            "Last Updated" date. You are advised to review this Privacy Policy periodically 
            for any changes.
          </p>
        </div>

        <div className="kazi-card bg-card">
          <h2 className="text-lg font-semibold mb-3">Contact Us</h2>
          <p className="text-muted-foreground mb-2">
            If you have any questions or concerns about this Privacy Policy, please contact us at:
          </p>
          <div className="text-sm">
            <p>KaziCash Ltd.</p>
            <p>Email: privacy@kazicash.com</p>
            <p>Phone: +254 712 345 678</p>
            <p>Address: Nairobi, Kenya</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;
