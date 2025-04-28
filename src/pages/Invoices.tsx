
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InvoiceAccountSetup } from '@/components/invoices/InvoiceAccountSetup';
import { InvoiceUpload } from '@/components/invoices/InvoiceUpload';
import { PaymentRecordsUpload } from '@/components/invoices/PaymentRecordsUpload';
import { MatchingRules } from '@/components/invoices/MatchingRules';
import { ReconciliationResults } from '@/components/invoices/ReconciliationResults';
import { VarianceReview } from '@/components/invoices/VarianceReview';
import { ReportsGeneration } from '@/components/invoices/ReportsGeneration';
import { SidebarProvider } from "@/components/ui/sidebar";
import SidebarNav from '@/components/layout/Sidebar';

const Invoices: React.FC = () => {
  const [activeTab, setActiveTab] = useState("account-setup");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <SidebarNav />
        <div className="flex-1 overflow-auto">
          <div className="flex-1 overflow-auto p-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Invoice Management</h1>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-7 mb-8">
                  <TabsTrigger value="account-setup">1. Account Setup</TabsTrigger>
                  <TabsTrigger value="invoice-upload">2. Invoice Upload</TabsTrigger>
                  <TabsTrigger value="payment-records">3. Payment Records</TabsTrigger>
                  <TabsTrigger value="matching-rules">4. Matching Rules</TabsTrigger>
                  <TabsTrigger value="reconciliation">5. Reconciliation</TabsTrigger>
                  <TabsTrigger value="variance-review">6. Variance Review</TabsTrigger>
                  <TabsTrigger value="reports">7. Reports</TabsTrigger>
                </TabsList>
                
                <TabsContent value="account-setup">
                  <InvoiceAccountSetup />
                </TabsContent>
                
                <TabsContent value="invoice-upload">
                  <InvoiceUpload />
                </TabsContent>
                
                <TabsContent value="payment-records">
                  <PaymentRecordsUpload />
                </TabsContent>
                
                <TabsContent value="matching-rules">
                  <MatchingRules />
                </TabsContent>
                
                <TabsContent value="reconciliation">
                  <ReconciliationResults />
                </TabsContent>
                
                <TabsContent value="variance-review">
                  <VarianceReview />
                </TabsContent>
                
                <TabsContent value="reports">
                  <ReportsGeneration />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Invoices;
