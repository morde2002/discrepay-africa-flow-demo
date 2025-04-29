
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardCard from "@/components/ui/DashboardCard";
import ComplianceDashboard from "@/components/compliance/ComplianceDashboard";
import RiskAlerts from "@/components/compliance/RiskAlerts";
import RiskTrendHeatmap from "@/components/compliance/RiskTrendHeatmap";
import { ShieldCheck, AlertCircle, LineChart, Download, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Compliance = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  const handleExportData = () => {
    toast.success("Exporting compliance data...");
    // In a real app, this would trigger an export action
  };
  
  const handleFilterData = () => {
    toast.info("Filter options opened");
    // In a real app, this would open a filter dialog
  };

  return (
    <AppLayout>
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Compliance & Risk</h1>
          <p className="text-gray-600 dark:text-gray-300">Monitor and manage regulatory compliance and risk factors</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleFilterData}>
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button onClick={handleExportData}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      <Tabs 
        defaultValue="overview" 
        className="space-y-6"
        value={activeTab}
        onValueChange={setActiveTab}
      >
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
