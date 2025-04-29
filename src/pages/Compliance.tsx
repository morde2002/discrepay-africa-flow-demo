
import AppLayout from '@/components/layout/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardCard from "@/components/ui/DashboardCard";
import ComplianceDashboard from "@/components/compliance/ComplianceDashboard";
import RiskAlerts from "@/components/compliance/RiskAlerts";
import RiskTrendHeatmap from "@/components/compliance/RiskTrendHeatmap";
import { ShieldCheck, AlertCircle, LineChart } from 'lucide-react';

const Compliance = () => {
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Compliance & Risk</h1>
        <p className="text-gray-600">Monitor and manage regulatory compliance and risk factors</p>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview" className="flex items-center">
            <ShieldCheck className="h-4 w-4 mr-2" />
            Compliance Overview
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            Risk Alerts
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center">
            <LineChart className="h-4 w-4 mr-2" />
            Risk Trends
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <ComplianceDashboard />
        </TabsContent>
        
        <TabsContent value="alerts">
          <RiskAlerts />
        </TabsContent>
        
        <TabsContent value="trends">
          <RiskTrendHeatmap />
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default Compliance;
