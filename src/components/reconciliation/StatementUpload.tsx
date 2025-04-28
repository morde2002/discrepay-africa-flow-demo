
import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "sonner";
import { FileText, Upload, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface FinancialAccount {
  id: string;
  name: string;
  type: 'bank' | 'processor' | 'wallet';
  currency: string;
  description: string;
}

interface Statement {
  id: string;
  accountId: string;
  accountName: string; 
  fileName: string;
  uploadDate: string;
}

const StatementUpload = () => {
  const [accounts, setAccounts] = useState<FinancialAccount[]>(() => {
    const savedAccounts = localStorage.getItem('financialAccounts');
    return savedAccounts ? JSON.parse(savedAccounts) : [];
  });
  
  const [statements, setStatements] = useState<Statement[]>(() => {
    const savedStatements = localStorage.getItem('financialStatements');
    return savedStatements ? JSON.parse(savedStatements) : [];
  });
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const form = useForm({
    defaultValues: {
      accountId: "",
    }
  });
  
  const onSubmit = (data: any) => {
    if (!selectedFile) {
      toast.error("Please select a file to upload");
      return;
    }
    
    const selectedAccount = accounts.find(account => account.id === data.accountId);
    
    if (!selectedAccount) {
      toast.error("Please select a valid account");
      return;
    }
    
    const newStatement: Statement = {
      id: Date.now().toString(),
      accountId: data.accountId,
      accountName: selectedAccount.name,
      fileName: selectedFile.name,
      uploadDate: new Date().toISOString(),
    };
    
    const updatedStatements = [...statements, newStatement];
    setStatements(updatedStatements);
    localStorage.setItem('financialStatements', JSON.stringify(updatedStatements));
    
    toast.success(`Statement "${selectedFile.name}" uploaded successfully`);
    form.reset();
    setSelectedFile(null);
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };
  
  const removeSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  
  const deleteStatement = (id: string) => {
    const filteredStatements = statements.filter(statement => statement.id !== id);
    setStatements(filteredStatements);
    localStorage.setItem('financialStatements', JSON.stringify(filteredStatements));
    toast.success("Statement deleted successfully");
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Statement</CardTitle>
          <CardDescription>
            Upload financial statements for your accounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          {accounts.length === 0 ? (
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-md">
              <p className="text-amber-800">
                You need to create at least one financial account before uploading statements.
                Please go to the Account Setup step first.
              </p>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="accountId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Account</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an account" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {accounts.map((account) => (
                            <SelectItem key={account.id} value={account.id}>
                              {account.name} ({account.type})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="space-y-2">
                  <FormLabel>Upload File (CSV, Excel)</FormLabel>
                  <div className="flex items-center space-x-2">
                    <Input
                      ref={fileInputRef}
                      type="file"
                      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                      onChange={handleFileChange}
                      className="flex-1"
                    />
                  </div>
                  
                  {selectedFile && (
                    <div className="flex items-center bg-blue-50 p-2 rounded">
                      <FileText className="h-4 w-4 text-blue-500 mr-2" />
                      <span className="text-sm flex-1 truncate">{selectedFile.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={removeSelectedFile}
                        className="h-7 w-7 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
                
                <Button type="submit" disabled={!selectedFile} className="w-full md:w-auto">
                  <Upload className="mr-2 h-4 w-4" /> Upload Statement
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Uploaded Statements</CardTitle>
          <CardDescription>
            Your uploaded financial statements
          </CardDescription>
        </CardHeader>
        <CardContent>
          {statements.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Account Name</TableHead>
                  <TableHead>File Name</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {statements.map((statement) => (
                  <TableRow key={statement.id}>
                    <TableCell className="font-medium">{statement.accountName}</TableCell>
                    <TableCell>{statement.fileName}</TableCell>
                    <TableCell>{formatDate(statement.uploadDate)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => deleteStatement(statement.id)}>
                        <X className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              No statements uploaded yet.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StatementUpload;
