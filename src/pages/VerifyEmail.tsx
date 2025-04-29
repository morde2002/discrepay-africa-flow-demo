
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { toast } from "sonner";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useAuth } from "@/components/auth/AuthContext";

const VerifyEmail = () => {
  const { user, updateUserData } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const navigate = useNavigate();

  const handleVerifyEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (verificationCode.length !== 6) {
      toast.error("Please enter a valid verification code");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call for email verification
    setTimeout(() => {
      setIsLoading(false);
      
      // Update user verification status
      updateUserData({ verificationStatus: "approved" });
      
      toast.success("Email verified successfully!");
      navigate("/kyb-verification");
    }, 1500);
  };

  const handleResendCode = () => {
    toast.success("Verification code resent to your email");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center">
          <img
            src="/lovable-uploads/c6b58a34-ac83-45c0-8be4-4c26b436414d.png"
            alt="Discrepay Logo"
            className="mx-auto h-12 w-auto"
          />
          <h1 className="text-3xl font-bold text-primary">Discrepay</h1>
          <p className="text-gray-500">Monitor, Control and Settle Your Financial Operations in Real Time</p>
        </div>

        <Card className="border-primary/20 shadow-lg">
          <CardHeader>
            <CardTitle>Email Verification</CardTitle>
            <CardDescription>
              Step 2: Verify your email address. We've sent a verification code to {user?.email || "your email"}.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleVerifyEmail}>
            <CardContent className="space-y-6">
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-500">Enter the 6-digit verification code</p>
                <div className="flex justify-center">
                  <InputOTP maxLength={6} value={verificationCode} onChange={setVerificationCode}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>
              
              <div className="text-center">
                <button 
                  type="button" 
                  onClick={handleResendCode} 
                  className="text-sm text-primary hover:underline"
                >
                  Didn't receive a code? Resend
                </button>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-3">
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-primary to-primary/80"
                disabled={isLoading || verificationCode.length !== 6}
              >
                {isLoading ? "Verifying..." : "Verify & Continue"}
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                className="w-full"
                onClick={() => navigate("/auth")}
              >
                Back to Sign Up
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className="text-center text-xs text-gray-500">
          <p>Check your spam folder if you don't see the verification email.</p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
