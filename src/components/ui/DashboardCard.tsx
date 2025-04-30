
import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
  footer?: ReactNode;
  isLoading?: boolean;
}

const DashboardCard = ({ 
  title, 
  children, 
  className, 
  action, 
  footer,
  isLoading = false 
}: DashboardCardProps) => {
  return (
    <Card className={cn("shadow-sm", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {action && <div className="flex items-center">{action}</div>}
      </CardHeader>
      <CardContent className={isLoading ? "opacity-60 animate-pulse" : ""}>
        {children}
      </CardContent>
      {footer && (
        <div className="px-6 py-3 border-t">{footer}</div>
      )}
    </Card>
  );
};

export default DashboardCard;
