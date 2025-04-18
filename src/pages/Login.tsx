
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Smartphone, User, ShieldCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApp } from "@/context/AppContext";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [step, setStep] = useState<"phone" | "otp" | "loading">("phone");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const { login } = useApp();

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;
    setStep("otp");
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return;
    
    setStep("loading");
    
    try {
      await login(phoneNumber);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      setStep("otp");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <motion.div 
        className="h-1/3 bg-kazi-blue rounded-b-[40px] flex items-center justify-center relative overflow-hidden"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <svg viewBox="0 0 400 400" className="absolute -top-[50%] -right-[20%] w-[120%] h-[200%] text-white/10">
            <defs>
              <pattern id="pattern-circles" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
                <circle id="pattern-circle" cx="10" cy="10" r="1.6257413380501518" fill="none" stroke="currentColor" strokeWidth="1"></circle>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pattern-circles)"></rect>
          </svg>
        </div>
        
        <div className="z-10 text-center text-white">
          <motion.h1 
            className="text-4xl font-bold mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            KaziCash
          </motion.h1>
          <motion.p 
            className="text-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Africa's Digital Work Wallet
          </motion.p>
        </div>
      </motion.div>

      <div className="flex-1 px-6 py-10 flex flex-col items-center">
        <motion.div 
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {step === "phone" && (
            <>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
                <p className="text-muted-foreground">Enter your phone number to continue</p>
              </div>

              <form onSubmit={handlePhoneSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <Smartphone size={18} className="text-muted-foreground" />
                    </div>
                    <Input
                      type="tel"
                      placeholder="+254 712 345 678"
                      className="pl-10 py-6 text-lg"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full py-6 text-lg kazi-button kazi-button-primary"
                >
                  Continue
                </Button>
              </form>

              <div className="mt-8">
                <div className="relative flex items-center">
                  <div className="flex-grow border-t border-border"></div>
                  <span className="flex-shrink mx-4 text-muted-foreground">or continue with</span>
                  <div className="flex-grow border-t border-border"></div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <Button variant="outline" className="py-6">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline" className="py-6">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z" />
                    </svg>
                    Apple
                  </Button>
                </div>
              </div>
            </>
          )}

          {step === "otp" && (
            <>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Verify Your Number</h2>
                <p className="text-muted-foreground">We've sent a code to {phoneNumber}</p>
              </div>

              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Enter OTP Code</label>
                  <div className="flex gap-2 justify-center">
                    {[...Array(4)].map((_, i) => (
                      <Input
                        key={i}
                        type="text"
                        maxLength={1}
                        className="w-12 h-12 text-center text-xl"
                        value={otp[i] || ""}
                        onChange={(e) => {
                          const newOtp = otp.split("");
                          newOtp[i] = e.target.value;
                          setOtp(newOtp.join(""));
                          
                          // Auto-focus next input
                          if (e.target.value && i < 3) {
                            const nextInput = e.target.parentElement?.nextElementSibling?.querySelector("input");
                            if (nextInput) nextInput.focus();
                          }
                        }}
                        required
                      />
                    ))}
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full py-6 text-lg kazi-button kazi-button-primary"
                >
                  Verify & Login
                </Button>
              </form>

              <div className="mt-6 text-center">
                <Button variant="link" onClick={() => setStep("phone")}>
                  Use a different number
                </Button>
              </div>
            </>
          )}

          {step === "loading" && (
            <div className="flex flex-col items-center justify-center py-10">
              <Loader2 size={40} className="animate-spin text-kazi-blue mb-4" />
              <h3 className="text-xl font-medium mb-1">Signing In...</h3>
              <p className="text-muted-foreground">Just a moment</p>
            </div>
          )}
        </motion.div>

        <div className="w-full max-w-md mt-auto">
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center">
              <User size={16} className="mr-1" />
              <span>Simple Sign-up</span>
            </div>
            <div className="flex items-center">
              <ShieldCheck size={16} className="mr-1" />
              <span>Secure & Private</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
