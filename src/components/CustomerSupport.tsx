import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageCircle, X, Mic, Send, Phone, 
  HelpCircle, Mail, Volume2, VolumeX
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpeechToTextService } from "@/utils/speechToText";

interface CustomerSupportProps {
  isOpen: boolean;
  onClose: () => void;
}

const CustomerSupport = ({ isOpen, onClose }: CustomerSupportProps) => {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  // Mock messages
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I help you today?", timestamp: new Date().toISOString() }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message
    const newMessages = [
      ...messages,
      { sender: "user", text: message, timestamp: new Date().toISOString() }
    ];
    setMessages(newMessages);
    setMessage("");
    
    // Simulate bot response after a delay
    setTimeout(() => {
      setMessages([
        ...newMessages,
        { 
          sender: "bot", 
          text: "Thank you for your message. Our support team will get back to you shortly.",
          timestamp: new Date().toISOString()
        }
      ]);
    }, 1000);
  };

  const toggleSpeechRecognition = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
    } else {
      // Start recording
      setIsRecording(true);
      
      // Initialize speech recognition
      const speechService = new SpeechToTextService({
        onResult: (transcript, isFinal) => {
          if (isFinal) {
            setMessage(transcript);
            setIsRecording(false);
          }
        },
        onError: (error) => {
          console.error("Speech recognition error:", error);
          setIsRecording(false);
        },
        onEnd: () => {
          setIsRecording(false);
        }
      });
      
      if (speechService.isSupported()) {
        speechService.start();
      } else {
        console.error("Speech recognition not supported");
        setIsRecording(false);
      }
    }
  };

  const toggleTextToSpeech = () => {
    setIsSpeaking(!isSpeaking);
    
    if (!isSpeaking) {
      // Find the last bot message using reverse find instead of findLast
      const lastBotMessage = [...messages]
        .reverse()
        .find(msg => msg.sender === "bot");
      
      if (lastBotMessage && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(lastBotMessage.text);
        utterance.lang = 'en-US';
        speechSynthesis.speak(utterance);
      }
    } else if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div 
            className="bg-card rounded-xl w-full max-w-sm h-[80vh] flex flex-col overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 bg-kazi-blue text-white flex items-center">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                <MessageCircle size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">KaziSupport</h3>
                <p className="text-xs opacity-80">We're here to help</p>
              </div>
              <Button variant="ghost" size="icon" className="text-white" onClick={onClose}>
                <X size={20} />
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-xl ${
                      msg.sender === "user" 
                        ? "bg-kazi-blue text-white rounded-br-none" 
                        : "bg-muted rounded-tl-none"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className="text-xs opacity-70 mt-1 text-right">
                      {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Quick action buttons */}
            <div className="p-2 border-t border-border flex overflow-x-auto scrollbar-none gap-2">
              {["Call Agent", "FAQ", "Payment Help", "Job Issues"].map((action, index) => (
                <button 
                  key={index}
                  className="bg-muted px-3 py-1.5 rounded-full text-xs whitespace-nowrap"
                >
                  {action}
                </button>
              ))}
            </div>
            
            <div className="p-3 border-t flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className={`rounded-full ${isRecording ? 'text-kazi-orange animate-pulse' : 'text-muted-foreground'}`}
                onClick={toggleSpeechRecognition}
              >
                <Mic size={20} />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full text-muted-foreground"
                onClick={toggleTextToSpeech}
              >
                {isSpeaking ? <Volume2 size={20} /> : <VolumeX size={20} />}
              </Button>
              
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 bg-muted rounded-full px-4 py-2 text-sm focus:outline-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full text-kazi-blue"
                onClick={handleSendMessage}
                disabled={!message.trim()}
              >
                <Send size={20} />
              </Button>
            </div>
            
            <div className="p-3 border-t flex items-center justify-between bg-muted/50">
              <Button variant="ghost" className="text-sm flex gap-2">
                <Phone size={16} />
                Call Support
              </Button>
              
              <Button variant="ghost" className="text-sm flex gap-2">
                <Mail size={16} />
                Email
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CustomerSupport;
