
import { Check } from "lucide-react";

interface StepCardProps {
  stepNumber: number;
  title: string;
  items: string[];
}

const StepCard = ({ stepNumber, title, items }: StepCardProps) => {
  return (
    <div className="flex items-center justify-center mb-8 w-full">
      <div className="w-full md:w-3/4 flex flex-col md:flex-row bg-white rounded-lg shadow-sm border">
        <div className="bg-green-600 text-white p-4 flex items-center justify-center rounded-t-lg md:rounded-l-lg md:rounded-r-none">
          <div className="font-bold text-xl">Step {stepNumber}</div>
        </div>
        <div className="flex-1 p-4">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <ul className="space-y-1 text-sm">
            {items.map((item, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StepCard;
