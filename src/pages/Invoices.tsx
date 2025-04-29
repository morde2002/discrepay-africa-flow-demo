
import AppLayout from '@/components/layout/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InvoiceAccountSetup } from "@/components/invoices/InvoiceAccountSetup";
import { InvoiceUpload } from "@/components/invoices/InvoiceUpload";
import { FileText, Upload, Settings } from 'lucide-react';

const Invoices = () => {
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Invoice Management</h1>
        <p className="text-gray-600">Create, upload, and manage insurance invoices</p>
      </div>
      
      <Tabs defaultValue="upload" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[600px]">
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
        </TabsList>
        
        <TabsContent value="upload" className="space-y-4">
          <InvoiceUpload />
        </TabsContent>
        
        <TabsContent value="accounts" className="space-y-4">
          <InvoiceAccountSetup />
        </TabsContent>
        
        <TabsContent value="history" className="space-y-4">
          <div className="bg-white p-8 rounded-lg shadow-sm border text-center">
            <FileText className="h-16 w-16 mx-auto text-gray-300" />
            <h3 className="mt-4 text-lg font-medium">Invoice History</h3>
            <p className="mt-2 text-gray-500 max-w-md mx-auto">
              This section will display your invoice history, including all processed and pending invoices.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default Invoices;
