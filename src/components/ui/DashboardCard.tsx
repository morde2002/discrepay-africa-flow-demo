
import React from 'react';

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

const DashboardCard = ({ title, children, action, className = "" }: DashboardCardProps) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border ${className}`}>
      <div className="flex justify-between items-center border-b px-6 py-4">
        <h3 className="font-medium text-gray-800">{title}</h3>
        {action && <div>{action}</div>}
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default DashboardCard;
