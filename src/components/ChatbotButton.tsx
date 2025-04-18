
import { useState } from "react";
import { MessageCircle, X, Mic, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const { user } = useApp();

  const toggleChatbot = () => setIsOpen(!isOpen);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    // In a real app, would send message to backend
    setMessage("");
  };

  const quickReplies = [
    "How do I improve my trust score?",
    "Tell me about loans",
    "Help with offline mode",
  ];

  return (
    <>
      <motion.button
        className="fixed right-4 bottom-20 bg-kazi-orange text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChatbot}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8, type: "spring" }}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-x-0 bottom-20 mx-4 bg-card rounded-2xl shadow-xl z-40 overflow-hidden flex flex-col max-h-[70vh]"
            initial={{ y: 400, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 400, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
          >
            <div className="p-4 bg-kazi-blue text-white flex items-center">
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                <MessageCircle size={16} />
              </div>
              <div>
                <h3 className="font-semibold">KaziBot</h3>
                <p className="text-xs opacity-80">Ask me anything about KaziCash</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="bg-muted p-3 rounded-xl rounded-tl-none max-w-[80%]">
                <p className="text-sm">
                  Hi {user?.name || "there"}! How can I help you today?
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2 my-2">
                {quickReplies.map((reply) => (
                  <button 
                    key={reply} 
                    className="bg-muted hover:bg-muted/80 text-xs rounded-full px-3 py-1.5"
                    onClick={() => setMessage(reply)}
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 border-t flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full text-muted-foreground"
              >
                <Mic size={18} />
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
              >
                <Send size={18} />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotButton;
