import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Search, ChevronDown, ChevronUp, MessageCircle, Phone, Mail,
  ChevronRight
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Help = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  const faqCategories = [
    {
      title: "Account & Profile",
      questions: [
        {
          q: "How do I create an account?",
          a: "To create a KaziCash account, download the app, tap 'Get Started', enter your phone number, and follow the verification process. You'll need to complete basic KYC by providing your name and a valid ID photo."
        },
        {
          q: "How can I improve my trust score?",
          a: "Your trust score improves as you complete jobs, maintain a good client rating, make loan repayments on time, and verify your identity. Consistent work history and positive client reviews have the biggest impact."
        },
        {
          q: "How do I update my profile information?",
          a: "Go to Profile Settings, tap 'Edit Profile', and update your personal information. Some changes may require verification."
        }
      ]
    },
    {
      title: "Jobs & Payments",
      questions: [
        {
          q: "How do I find available jobs?",
          a: "Navigate to the Job Center from the bottom navigation bar. You can view jobs in List or Map view, and filter them by type, pay, or trust requirement."
        },
        {
          q: "How do I get paid after completing a job?",
          a: "After job completion and client confirmation, payment is automatically sent to your KaziWallet. You can then transfer it to M-Pesa by tapping 'Cash Out' in your wallet."
        },
        {
          q: "What if a client doesn't pay?",
          a: "KaziCash guarantees payment for verified jobs. If there's an issue, contact our support team and we'll resolve it within 24 hours."
        }
      ]
    },
    {
      title: "Loans & Credit",
      questions: [
        {
          q: "How does KaziCash determine my loan eligibility?",
          a: "Loan eligibility is based on your trust score, which factors in your work history, client ratings, and past repayment behavior. Higher trust scores unlock larger loan amounts."
        },
        {
          q: "How quickly will I receive my loan?",
          a: "Once approved, loans are disbursed to your KaziWallet within minutes, and you can immediately transfer funds to M-Pesa."
        },
        {
          q: "How do I repay my loan?",
          a: "Loan repayments can be made through M-Pesa or directly from your KaziWallet. You can also set up automatic deductions from future job payments."
        }
      ]
    },
    {
      title: "Technical Help",
      questions: [
        {
          q: "Does KaziCash work offline?",
          a: "Yes! KaziCash has offline functionality that allows you to view cached jobs and queue actions for when you're back online. A banner will show when you're in offline mode."
        },
        {
          q: "How do I update the app?",
          a: "KaziCash updates automatically. If you've disabled auto-updates, check the Google Play Store and tap 'Update' if available."
        },
        {
          q: "Why is my app running slowly?",
          a: "Try clearing the app cache in your device settings, ensure you have the latest version, and check that you have sufficient free storage space on your device."
        }
      ]
    }
  ];

  const filteredFaq = searchQuery 
    ? faqCategories.map(category => ({
        ...category,
        questions: category.questions.filter(
          q => q.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
               q.a.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.questions.length > 0)
    : faqCategories;

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
        <h1 className="text-xl font-bold ml-2">Help & FAQ</h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
            placeholder="Search help articles..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {!searchQuery && (
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { icon: MessageCircle, label: "Chat Support", route: "/support" },
              { icon: Phone, label: "Call Us", route: "tel:+254712345678" },
              { icon: Mail, label: "Email", route: "mailto:help@kazicash.com" }
            ].map((item, index) => (
              <Link 
                key={index}
                to={item.route}
                className="kazi-card bg-card h-24 flex flex-col items-center justify-center"
              >
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-2">
                  <item.icon size={18} />
                </div>
                <span className="text-sm">{item.label}</span>
              </Link>
            ))}
          </div>
        )}

        <div className="space-y-4">
          {filteredFaq.length > 0 ? (
            filteredFaq.map((category, index) => (
              <div key={index} className="kazi-card bg-card">
                <h3 className="font-semibold mb-3">{category.title}</h3>
                
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem key={faqIndex} value={`item-${index}-${faqIndex}`} className="border-b last:border-b-0">
                      <AccordionTrigger className="text-left">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground mb-2">No results found for "{searchQuery}"</p>
              <Button 
                variant="outline" 
                onClick={() => setSearchQuery("")}
              >
                Clear Search
              </Button>
            </div>
          )}
        </div>

        <div className="kazi-card bg-gradient-to-br from-kazi-blue to-indigo-900 text-white">
          <h3 className="font-semibold mb-2">Still Need Help?</h3>
          <p className="text-white/80 mb-4">
            Our support team is available 24/7 to assist you with any questions or issues.
          </p>
          <Button 
            className="w-full bg-white text-kazi-blue hover:bg-white/90"
            onClick={() => navigate("/support")}
          >
            <MessageCircle size={18} className="mr-2" />
            Contact Support
          </Button>
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <h3 className="font-semibold mb-3">Related Links</h3>
          <div className="space-y-2">
            <Link to="/terms" className="flex items-center text-muted-foreground hover:text-foreground">
              <ChevronRight size={16} className="mr-2" />
              Terms of Service
            </Link>
            <Link to="/privacy" className="flex items-center text-muted-foreground hover:text-foreground">
              <ChevronRight size={16} className="mr-2" />
              Privacy Policy
            </Link>
            <Link to="/about" className="flex items-center text-muted-foreground hover:text-foreground">
              <ChevronRight size={16} className="mr-2" />
              About KaziCash
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Help;
