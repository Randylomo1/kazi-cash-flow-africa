
import { useState } from "react";
import { QrCode, X, Share2, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/context/AppContext";

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QRCodeModal = ({ isOpen, onClose }: QRCodeModalProps) => {
  const { user } = useApp();
  const [copied, setCopied] = useState(false);
  
  // This would be a real URL in production
  const profileUrl = `kazicash.app/profile/${user?.id || "user123"}`;
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${user?.name}'s KaziCash Trust Profile`,
          text: `Check out my Trust Score of ${user?.trustScore}!`,
          url: profileUrl,
        });
      } catch (error) {
        console.log('Error sharing', error);
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      handleCopyLink();
    }
  };

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
              <h2 className="text-xl font-bold">Share Trust Profile</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X size={20} />
              </Button>
            </div>
            
            <div className="bg-white p-4 rounded-lg mb-4">
              <div className="flex justify-center">
                {/* This would be an actual QR code component in production */}
                <div className="w-48 h-48 bg-muted flex items-center justify-center relative">
                  <QrCode size={100} className="text-foreground" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img src="/placeholder.svg" alt="QR Code" className="w-12 h-12 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">Profile Link:</p>
              <div className="flex items-center bg-muted rounded-lg p-2 text-sm">
                <span className="flex-1 truncate">{profileUrl}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8" 
                  onClick={handleCopyLink}
                >
                  {copied ? <Check size={16} className="text-kazi-green" /> : <Copy size={16} />}
                </Button>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1" 
                onClick={() => {
                  window.open(`https://wa.me/?text=${encodeURIComponent(`Check out my KaziCash Trust Profile: ${profileUrl}`)}`, '_blank');
                }}
              >
                WhatsApp
              </Button>
              <Button onClick={handleShare} className="flex-1 bg-kazi-blue">
                <Share2 size={16} className="mr-2" />
                Share
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QRCodeModal;
