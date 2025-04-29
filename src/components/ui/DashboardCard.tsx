
import React from 'react';

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

const DashboardCard = ({ title, children, action, className = "" }: DashboardCardProps) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 ${className}`}>
      <div className="flex justify-between items-center border-b dark:border-gray-700 px-6 py-4">
        <h3 className="font-medium text-gray-800 dark:text-gray-200">{title}</h3>
        {action && <div>{action}</div>}
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default DashboardCard;
