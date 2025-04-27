
import { ArrowRight } from "lucide-react";
import StepCard from "./StepCard";

const StepsTimeline = () => {
  const steps = [
    {
      number: 1,
      title: "Access Discrepay Dashboard",
      items: [
        "Secure login to view operational metrics",
        "Overview of funds, settlements, variances, and alerts"
      ]
    },
    {
      number: 2,
      title: "Live Funds Monitoring",
      items: [
        "Real-time transaction tracking with detailed status",
        "Monitor initiated amounts, settled amounts, and variances"
      ]
    },
    {
      number: 3,
      title: "Variance Detection Alerts",
      items: [
        "Real-time alerts for missing or delayed settlements",
        "Actionable insights for settlement issues"
      ]
    }
  ];

  return (
    <div className="flex relative pb-12">
      <div className="absolute inset-0 flex justify-center">
        <div className="h-full w-1 bg-gradient-to-b from-green-300 to-green-600"></div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center w-full">
        {steps.map((step, index) => (
          <>
            <StepCard key={step.number} {...step} />
            {index < steps.length - 1 && (
              <div className="flex justify-center mb-8">
                <ArrowRight className="h-6 w-6 text-green-500" />
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default StepsTimeline;
