
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardCard from "@/components/ui/DashboardCard";
import ComplianceDashboard from "@/components/compliance/ComplianceDashboard";
import RiskAlerts from "@/components/compliance/RiskAlerts";
import RiskTrendHeatmap from "@/components/compliance/RiskTrendHeatmap";
import { ShieldCheck, AlertCircle, LineChart, Download, Filter, Plus, Calendar, ArrowUpRight } from 'lucide-react';
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

  const handleCreateReport = () => {
    toast.info("Creating new compliance report...");
    // In a real app, this would open a form to create a report
  };

  return (
    <AppLayout>
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Compliance & Risk</h1>
          <p className="text-gray-600 dark:text-gray-300">Monitor and manage regulatory compliance and risk factors</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleFilterData} className="hover:bg-gray-100 dark:hover:bg-gray-700">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" onClick={handleExportData} className="hover:bg-gray-100 dark:hover:bg-gray-700">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleCreateReport}>
            <Plus className="h-4 w-4 mr-2" />
            New Report
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <DashboardCard title="Compliance Score" variant="blue">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">94%</h2>
              <p className="text-sm opacity-80">Above industry average</p>
            </div>
            <div className="bg-white/20 p-3 rounded-full">
              <ShieldCheck className="h-6 w-6" />
            </div>
          </div>
        </DashboardCard>
        
        <DashboardCard title="Risk Alerts" variant="orange">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">7</h2>
              <p className="text-sm opacity-80">Requires attention</p>
            </div>
            <div className="bg-white/20 p-3 rounded-full">
              <AlertCircle className="h-6 w-6" />
            </div>
          </div>
        </DashboardCard>
        
        <DashboardCard title="Next Audit" variant="purple">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">May 15, 2025</h2>
              <p className="text-sm opacity-80">16 days remaining</p>
            </div>
            <div className="bg-white/20 p-3 rounded-full">
              <Calendar className="h-6 w-6" />
            </div>
          </div>
        </DashboardCard>
        
        <DashboardCard title="Regulations" variant="gradient">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">24</h2>
              <p className="text-sm opacity-80">All in compliance</p>
            </div>
            <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30" onClick={() => toast.info("Viewing regulations")}>
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </DashboardCard>
      </div>
      
      <Tabs 
        defaultValue="overview" 
        className="space-y-6"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="bg-gray-100 dark:bg-gray-800">
          <TabsTrigger value="overview" className="flex items-center data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
            <ShieldCheck className="h-4 w-4 mr-2" />
            Compliance Overview
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
            <AlertCircle className="h-4 w-4 mr-2" />
            Risk Alerts
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
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
