
import React from "react";
import { AlertCircle, CheckCircle, XCircle, TestTube } from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import { cn } from "@/lib/utils";

type VerificationStatus = "pending" | "approved" | "rejected";

const VerificationStatusBanner = ({ isTestMode = false }: { isTestMode?: boolean }) => {
  const { user } = useAuth();
  const verificationStatus = user?.kybStatus as VerificationStatus || "pending";

  const getStatusConfig = () => {
    switch (verificationStatus) {
      case "approved":
        return {
          icon: <CheckCircle className="h-5 w-5" />,
          title: "Account Verified",
          message: "Your account has been verified and is now fully active.",
          bgColor: "bg-green-50 border-green-200",
          textColor: "text-green-700",
        };
      case "rejected":
        return {
          icon: <XCircle className="h-5 w-5" />,
          title: "Verification Failed",
          message: "Your account verification was not successful. Please contact support.",
          bgColor: "bg-red-50 border-red-200",
          textColor: "text-red-700",
        };
      case "pending":
      default:
        return {
          icon: <AlertCircle className="h-5 w-5" />,
          title: "Verification Pending",
          message: "Your account is under review. Limited features are available.",
          bgColor: "bg-amber-50 border-amber-200",
          textColor: "text-amber-700",
        };
    }
  };

  const { icon, title, message, bgColor, textColor } = getStatusConfig();

  return (
    <div className="mb-6 relative">
      <div className={cn(
        "p-4 rounded-lg border flex items-start",
        bgColor
      )}>
        <div className={cn("mr-3", textColor)}>{icon}</div>
        <div>
          <h3 className={cn("font-medium", textColor)}>{title}</h3>
          <p className={cn("text-sm", textColor)}>{message}</p>
        </div>
      </div>
      
      {isTestMode && (
        <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-bl rounded-tr flex items-center">
          <TestTube className="h-3 w-3 mr-1" />
          Test Mode
        </div>
      )}
    </div>
  );
};

export default VerificationStatusBanner;
