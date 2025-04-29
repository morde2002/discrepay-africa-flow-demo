
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InvoiceAccountSetup } from "@/components/invoices/InvoiceAccountSetup";
import { InvoiceUpload } from "@/components/invoices/InvoiceUpload";
import { FileText, Upload, Settings, Calendar, Download, Filter, Plus, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import DashboardCard from '@/components/ui/DashboardCard';
import { Badge } from '@/components/ui/badge';

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

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Paid':
        return <Badge className="bg-green-500">Paid</Badge>;
      case 'Pending':
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case 'Overdue':
        return <Badge className="bg-red-500">Overdue</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <AppLayout>
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Invoice Management</h1>
          <p className="text-gray-600 dark:text-gray-300">Create, upload, and manage insurance invoices</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => toast.info("Filter options opened")} className="hover:bg-gray-100 dark:hover:bg-gray-700">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button onClick={handleNewInvoice}>
            <Plus className="h-4 w-4 mr-2" />
            New Invoice
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <DashboardCard title="Total Invoices" variant="blue">
          <div className="text-center">
            <h2 className="text-4xl font-bold">758</h2>
            <p className="text-sm mt-1 opacity-80">All time</p>
          </div>
        </DashboardCard>
        
        <DashboardCard title="Pending Invoices" variant="orange">
          <div className="text-center">
            <h2 className="text-4xl font-bold">24</h2>
            <p className="text-sm mt-1 opacity-80">Awaiting payment</p>
          </div>
        </DashboardCard>
        
        <DashboardCard title="Overdue Invoices" variant="pink">
          <div className="text-center">
            <h2 className="text-4xl font-bold">8</h2>
            <p className="text-sm mt-1 opacity-80">Requires attention</p>
          </div>
        </DashboardCard>
        
        <DashboardCard title="Paid This Month" variant="gradient">
          <div className="text-center">
            <h2 className="text-4xl font-bold">KSh 1.2M</h2>
            <p className="text-sm mt-1 opacity-80">36 invoices</p>
          </div>
        </DashboardCard>
      </div>
      
      <Tabs 
        defaultValue="upload" 
        className="space-y-6"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="bg-gray-100 dark:bg-gray-800 grid w-full grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="upload" className="flex items-center data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
            <Upload className="h-4 w-4 mr-2" />
            Upload Invoices
          </TabsTrigger>
          <TabsTrigger value="accounts" className="flex items-center data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
            <Settings className="h-4 w-4 mr-2" />
            Account Setup
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
            <FileText className="h-4 w-4 mr-2" />
            History
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
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
            <Button variant="outline" size="sm" onClick={handleExport} className="hover:bg-gray-100 dark:hover:bg-gray-700">
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
                    <tr key={invoice.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <td className="py-3 font-medium">{invoice.id}</td>
                      <td className="py-3">{invoice.customer}</td>
                      <td className="py-3">{invoice.date}</td>
                      <td className="py-3">{invoice.amount}</td>
                      <td className="py-3">
                        {getStatusBadge(invoice.status)}
                      </td>
                      <td className="py-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={() => toast.info(`Viewing details for invoice ${invoice.id}`)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
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
          <DashboardCard title="Invoice Calendar" variant="purple">
            <div className="text-center py-8">
              <Calendar className="h-16 w-16 mx-auto text-white" />
              <h3 className="mt-4 text-lg font-medium">Invoice Calendar</h3>
              <p className="mt-2 opacity-80 max-w-md mx-auto">
                View your upcoming and past invoices organized by date. Track payment deadlines and manage your invoice schedule.
              </p>
              <Button className="mt-4 bg-white/20 hover:bg-white/30" onClick={() => toast.info("Calendar view will be implemented soon")}>
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
