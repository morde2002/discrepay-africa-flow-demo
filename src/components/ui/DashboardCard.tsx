
import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
}

const DashboardCard = ({ title, children, className, action }: DashboardCardProps) => {
  return (
    <Card className={cn("shadow-sm", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {action && <div className="flex items-center">{action}</div>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default DashboardCard;
