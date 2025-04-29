
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InvoiceAccountSetup } from "@/components/invoices/InvoiceAccountSetup";
import { InvoiceUpload } from "@/components/invoices/InvoiceUpload";
import { FileText, Upload, Settings, Calendar, Download, Filter, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import DashboardCard from '@/components/ui/DashboardCard';

const Invoices = () => {
  const [activeTab, setActiveTab] = useState("upload");
  
  const handleNewInvoice = () => {
    toast.info("Creating new invoice...");
    // In a real app, this would open a new invoice form
  };
  
  const handleExport = () => {
    toast.success("Exporting invoices...");
    // In a real app, this would trigger an export action
  };
  
  const sampleInvoices = [
    { id: "INV-2025-001", customer: "John Kamau", date: "2025-04-15", amount: "KSh 45,000", status: "Paid" },
    { id: "INV-2025-002", customer: "Mary Wangari", date: "2025-04-18", amount: "KSh 32,500", status: "Pending" },
    { id: "INV-2025-003", customer: "Peter Odhiambo", date: "2025-04-20", amount: "KSh 78,200", status: "Overdue" },
    { id: "INV-2025-004", customer: "Sarah Njeri", date: "2025-04-25", amount: "KSh 15,400", status: "Paid" },
  ];

  return (
    <AppLayout>
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Invoice Management</h1>
          <p className="text-gray-600 dark:text-gray-300">Create, upload, and manage insurance invoices</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => toast.info("Filter options opened")}>
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button onClick={handleNewInvoice}>
            <Plus className="h-4 w-4 mr-2" />
            New Invoice
          </Button>
        </div>
      </div>
      
      <Tabs 
        defaultValue="upload" 
        className="space-y-6"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="upload" className="flex items-center">
            <Upload className="h-4 w-4 mr-2" />
            Upload Invoices
          </TabsTrigger>
          <TabsTrigger value="accounts" className="flex items-center">
            <Settings className="h-4 w-4 mr-2" />
            Account Setup
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            History
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Calendar
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload" className="space-y-4">
          <InvoiceUpload />
        </TabsContent>
        
        <TabsContent value="accounts" className="space-y-4">
          <InvoiceAccountSetup />
        </TabsContent>
        
        <TabsContent value="history" className="space-y-4">
          <DashboardCard title="Invoice History" action={
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          }>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b dark:border-gray-700">
                    <th className="pb-3 font-medium">Invoice ID</th>
                    <th className="pb-3 font-medium">Customer</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleInvoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b dark:border-gray-700">
                      <td className="py-3">{invoice.id}</td>
                      <td className="py-3">{invoice.customer}</td>
                      <td className="py-3">{invoice.date}</td>
                      <td className="py-3">{invoice.amount}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          invoice.status === 'Paid' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                            : invoice.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                        }`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="py-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toast.info(`Viewing details for invoice ${invoice.id}`)}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DashboardCard>
        </TabsContent>
        
        <TabsContent value="calendar" className="space-y-4">
          <DashboardCard title="Invoice Calendar">
            <div className="text-center py-8">
              <Calendar className="h-16 w-16 mx-auto text-gray-300 dark:text-gray-500" />
              <h3 className="mt-4 text-lg font-medium">Invoice Calendar</h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                View your upcoming and past invoices organized by date. Track payment deadlines and manage your invoice schedule.
              </p>
              <Button className="mt-4" onClick={() => toast.info("Calendar view will be implemented soon")}>
                Schedule View
              </Button>
            </div>
          </DashboardCard>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default Invoices;
