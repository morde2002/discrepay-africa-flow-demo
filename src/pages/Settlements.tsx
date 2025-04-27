
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import SidebarNav from "@/components/layout/Sidebar";
import { Bell, Search, Settings, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SettlementMonitoring from "@/components/settlements/SettlementMonitoring";
import SettlementAlerts from "@/components/settlements/SettlementAlerts";
import FundsFlowTracker from "@/components/settlements/FundsFlowTracker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Settlements = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <SidebarNav />
        <div className="flex-1 overflow-auto">
          <header className="sticky top-0 z-30 bg-white border-b px-4 sm:px-6 py-3 flex items-center justify-between">
            <div className="flex items-center">
              <SidebarTrigger />
              <div className="ml-4 text-lg font-medium">Settlements</div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="hidden md:flex">
                <Download className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
              <div className="relative hidden md:block">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  className="pl-8 pr-4 py-2 text-sm border rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-discrepay-300 focus:border-transparent"
                  placeholder="Search settlements..."
                />
              </div>
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback className="bg-discrepay-600 text-white">JD</AvatarFallback>
              </Avatar>
            </div>
          </header>
          
          <main className="px-4 sm:px-6 py-6 bg-gray-50">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Settlement Monitoring</h1>
              <p className="text-muted-foreground">Track and monitor all payment settlements across your financial ecosystem.</p>
            </div>
            
            <Tabs defaultValue="dashboard" className="mb-6">
              <TabsList>
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="funds-flow">Funds Flow Tracker</TabsTrigger>
                <TabsTrigger value="alerts">Settlement Alerts</TabsTrigger>
              </TabsList>
              <TabsContent value="dashboard" className="mt-6">
                <SettlementMonitoring />
              </TabsContent>
              <TabsContent value="funds-flow" className="mt-6">
                <FundsFlowTracker />
              </TabsContent>
              <TabsContent value="alerts" className="mt-6">
                <SettlementAlerts />
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Settlements;
