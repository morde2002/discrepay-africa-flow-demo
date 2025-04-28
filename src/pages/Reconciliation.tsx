
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import SidebarNav from "@/components/layout/Sidebar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AccountSetup from "@/components/reconciliation/AccountSetup";
import StatementUpload from "@/components/reconciliation/StatementUpload";
import ReconciliationSetup from "@/components/reconciliation/ReconciliationSetup";
import MatchingSettings from "@/components/reconciliation/MatchingSettings";
import ReconciliationResults from "@/components/reconciliation/ReconciliationResults";

const Reconciliation = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <SidebarNav />
        <div className="flex-1 overflow-auto">
          <header className="sticky top-0 z-30 bg-white border-b px-4 sm:px-6 py-3">
            <h1 className="text-2xl font-bold">Reconciliation Portal</h1>
          </header>
          
          <main className="px-4 sm:px-6 py-6 bg-gray-50">
            <div className="mb-6">
              <p className="text-muted-foreground mb-6">
                Manage your financial reconciliation process from account setup to variance review.
              </p>
              
              <Tabs defaultValue="account-setup" className="w-full">
                <TabsList className="grid grid-cols-5 mb-8">
                  <TabsTrigger value="account-setup">1. Account Setup</TabsTrigger>
                  <TabsTrigger value="statement-upload">2. Statement Upload</TabsTrigger>
                  <TabsTrigger value="reconciliation-setup">3. Reconciliation Setup</TabsTrigger>
                  <TabsTrigger value="matching-settings">4. Matching Settings</TabsTrigger>
                  <TabsTrigger value="reconciliation-results">5. Results & Review</TabsTrigger>
                </TabsList>
                
                <TabsContent value="account-setup">
                  <AccountSetup />
                </TabsContent>
                
                <TabsContent value="statement-upload">
                  <StatementUpload />
                </TabsContent>
                
                <TabsContent value="reconciliation-setup">
                  <ReconciliationSetup />
                </TabsContent>
                
                <TabsContent value="matching-settings">
                  <MatchingSettings />
                </TabsContent>
                
                <TabsContent value="reconciliation-results">
                  <ReconciliationResults />
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Reconciliation;
