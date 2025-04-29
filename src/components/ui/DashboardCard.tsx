
import React from 'react';

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'purple' | 'blue' | 'pink' | 'orange' | 'gradient';
}

const DashboardCard = ({ 
  title, 
  children, 
  action, 
  className = "", 
  variant = "default" 
}: DashboardCardProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'purple':
        return 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white';
      case 'blue':
        return 'bg-gradient-to-br from-blue-500 to-cyan-600 text-white';
      case 'pink':
        return 'bg-gradient-to-br from-pink-500 to-rose-600 text-white';
      case 'orange':
        return 'bg-gradient-to-br from-orange-500 to-red-600 text-white';
      case 'gradient':
        return 'bg-gradient-to-br from-discrepay-500 to-secondary-400 text-white';
      default:
        return 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className={`rounded-xl shadow-sm border dark:border-gray-700 transition-all hover:shadow-md ${getVariantClasses()} ${className}`}>
      <div className={`flex justify-between items-center border-b ${variant === 'default' ? 'dark:border-gray-700 border-gray-200' : 'border-white/10'} px-6 py-4`}>
        <h3 className="font-medium">{title}</h3>
        {action && <div>{action}</div>}
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default DashboardCard;
