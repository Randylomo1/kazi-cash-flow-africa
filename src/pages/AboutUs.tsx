
import { motion } from "framer-motion";
import { ArrowLeft, Globe, Users, Shield, Heart, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AboutUs = () => {
  const navigate = useNavigate();

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
        <h1 className="text-xl font-bold ml-2">About KaziCash</h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        {/* Mission */}
        <div className="kazi-card bg-card">
          <h2 className="text-lg font-semibold mb-3">Our Mission</h2>
          <p className="text-muted-foreground mb-4">
            KaziCash empowers Africa's informal and gig workers with 
            financial tools to build secure livelihoods. We bridge the gap 
            between work, payments, and financial inclusion.
          </p>
          <div className="flex items-center text-kazi-blue">
            <Globe size={18} className="mr-2" />
            <span className="font-medium">Serving communities across Africa</span>
          </div>
        </div>

        {/* Values */}
        <div className="kazi-card bg-card">
          <h2 className="text-lg font-semibold mb-3">Our Values</h2>
          <div className="space-y-4">
            <div className="flex">
              <div className="w-10 h-10 rounded-full bg-kazi-blue/10 flex items-center justify-center mr-3 shrink-0">
                <Users size={18} className="text-kazi-blue" />
              </div>
              <div>
                <h3 className="font-medium">Community First</h3>
                <p className="text-sm text-muted-foreground">
                  We prioritize the needs of workers and build solutions that address their real challenges.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-10 h-10 rounded-full bg-kazi-orange/10 flex items-center justify-center mr-3 shrink-0">
                <Shield size={18} className="text-kazi-orange" />
              </div>
              <div>
                <h3 className="font-medium">Trust & Transparency</h3>
                <p className="text-sm text-muted-foreground">
                  We build trust through clear communication and fair, transparent practices.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-10 h-10 rounded-full bg-kazi-green/10 flex items-center justify-center mr-3 shrink-0">
                <Heart size={18} className="text-kazi-green" />
              </div>
              <div>
                <h3 className="font-medium">Inclusive Innovation</h3>
                <p className="text-sm text-muted-foreground">
                  We create technologies that are accessible to everyone, regardless of literacy or tech exposure.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* The Team */}
        <div className="kazi-card bg-card">
          <h2 className="text-lg font-semibold mb-3">Our Team</h2>
          <p className="text-muted-foreground mb-4">
            Founded in 2023, KaziCash brings together experts in fintech, mobile banking, 
            and community development from across Africa.
          </p>
          <Button variant="outline" className="w-full">
            Meet The Team
          </Button>
        </div>

        {/* Contact */}
        <div className="kazi-card bg-card">
          <h2 className="text-lg font-semibold mb-3">Contact Us</h2>
          <div className="space-y-3">
            <div className="flex items-center">
              <Mail size={18} className="text-muted-foreground mr-3" />
              <span>support@kazicash.com</span>
            </div>
            <div className="flex items-center">
              <Phone size={18} className="text-muted-foreground mr-3" />
              <span>+254 712 345 678</span>
            </div>
            <div className="flex items-center">
              <MapPin size={18} className="text-muted-foreground mr-3" />
              <span>Nairobi, Kenya</span>
            </div>
          </div>
        </div>

        {/* Social Impact */}
        <div className="kazi-card bg-gradient-to-br from-kazi-blue to-indigo-900 text-white">
          <h2 className="text-lg font-semibold mb-3">Our Impact</h2>
          <p className="mb-4 text-white/90">
            KaziCash has helped over 50,000 informal workers access fair financial 
            services and build credit history through their work.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <h3 className="text-xl font-bold">$2.5M+</h3>
              <p className="text-sm text-white/80">Loans Disbursed</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <h3 className="text-xl font-bold">95%</h3>
              <p className="text-sm text-white/80">Repayment Rate</p>
            </div>
          </div>
          <Button variant="outline" className="w-full text-white border-white/20 hover:bg-white/10">
            <ExternalLink size={16} className="mr-2" />
            <span>Impact Report 2024</span>
          </Button>
        </div>

        {/* Footer links */}
        <div className="flex flex-wrap gap-2 justify-center pb-6">
          <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">
            Terms of Service
          </Link>
          <span className="text-muted-foreground">•</span>
          <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
            Privacy Policy
          </Link>
          <span className="text-muted-foreground">•</span>
          <Link to="/help" className="text-sm text-muted-foreground hover:text-foreground">
            Help Center
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutUs;
