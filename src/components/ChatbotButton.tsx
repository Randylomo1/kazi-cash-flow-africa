
import { useState } from "react";
import { MessageCircle, X, Mic, Send, ThumbsUp, ThumbsDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { toast } from "@/components/ui/use-toast";

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{text: string; from: "user" | "bot"; timestamp: Date}[]>([
    {text: "Hi there! I'm KaziBot. How can I assist you today?", from: "bot", timestamp: new Date()}
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const { user } = useApp();

  const toggleChatbot = () => setIsOpen(!isOpen);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message
    const userMessage = {text: message, from: "user" as const, timestamp: new Date()};
    setMessages([...messages, userMessage]);
    
    // Clear input
    setMessage("");
    
    // Simulate bot response
    setTimeout(() => {
      let botResponse = "";
      
      // Simple pattern matching for common queries
      const lowerCaseMessage = message.toLowerCase();
      
      if (lowerCaseMessage.includes("trust score") || lowerCaseMessage.includes("improve score")) {
        botResponse = "To improve your trust score, complete jobs on time, maintain good ratings, and repay loans promptly. Each completed job adds points to your score!";
      } 
      else if (lowerCaseMessage.includes("loan") || lowerCaseMessage.includes("borrow")) {
        botResponse = "Your current loan eligibility is KES " + (user?.eligibleLoan || "3,500") + ". Loans are based on your trust score and repayment history.";
      }
      else if (lowerCaseMessage.includes("offline") || lowerCaseMessage.includes("no connection")) {
        botResponse = "KaziCash works offline! You can view cached jobs and your wallet. Actions will sync when you're back online.";
      }
      else if (lowerCaseMessage.includes("payment") || lowerCaseMessage.includes("cash out")) {
        botResponse = "To cash out, go to your KaziWallet and tap 'Cash Out'. Funds will be sent to your linked M-Pesa account instantly.";
      }
      else if (lowerCaseMessage.includes("job") || lowerCaseMessage.includes("work") || lowerCaseMessage.includes("find")) {
        botResponse = "To find jobs, go to the Job Center tab. You can filter by location, pay rate, and trust requirements to find the perfect match!";
      }
      else {
        botResponse = "Thanks for your message! I'm still learning. For complex questions, you can contact our support team directly through the Help Center.";
      }
      
      const botMessageObj = {text: botResponse, from: "bot" as const, timestamp: new Date()};
      setMessages(prevMessages => [...prevMessages, botMessageObj]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const startVoiceRecording = () => {
    setIsRecording(true);
    
    // Simulate voice recording - in a real app, this would use the Web Speech API
    toast({
      title: "Voice recording started",
      description: "In a real app, this would use your device's microphone.",
      duration: 3000,
    });
    
    // Simulate ending recording after 3 seconds
    setTimeout(() => {
      setIsRecording(false);
      setMessage("Help me find jobs near me");
      
      toast({
        title: "Voice recording completed",
        description: "Text transcribed from your voice input.",
        duration: 2000,
      });
    }, 3000);
  };

  const quickReplies = [
    "How do I improve my trust score?",
    "Tell me about loans",
    "Help with offline mode",
    "How to cash out?",
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
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`${
                    msg.from === 'bot' 
                      ? 'bg-muted rounded-xl rounded-tl-none max-w-[80%] self-start' 
                      : 'bg-kazi-blue text-white rounded-xl rounded-tr-none max-w-[80%] ml-auto'
                  } p-3`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-xs opacity-60 mt-1">
                    {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                  
                  {msg.from === 'bot' && (
                    <div className="flex items-center justify-end gap-2 mt-2">
                      <button className="opacity-60 hover:opacity-100">
                        <ThumbsUp size={12} />
                      </button>
                      <button className="opacity-60 hover:opacity-100">
                        <ThumbsDown size={12} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
              
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
                className={`rounded-full ${isRecording ? 'text-kazi-red animate-pulse' : 'text-muted-foreground'}`}
                onClick={startVoiceRecording}
              >
                <Mic size={18} />
              </Button>
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 bg-muted rounded-full px-4 py-2 text-sm focus:outline-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full text-kazi-blue"
                onClick={handleSendMessage}
                disabled={!message.trim()}
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
