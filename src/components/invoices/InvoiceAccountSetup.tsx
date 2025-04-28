
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { PlusCircle } from "lucide-react";

interface InvoiceAccount {
  id: string;
  name: string;
  type: 'payables' | 'receivables';
  currency: string;
  counterpartyType: 'supplier' | 'customer' | 'logistics' | 'broker';
  createdAt: string;
}

export const InvoiceAccountSetup: React.FC = () => {
  const [accounts, setAccounts] = useState<InvoiceAccount[]>([]);
  const [name, setName] = useState('');
  const [type, setType] = useState<'payables' | 'receivables'>('payables');
  const [currency, setCurrency] = useState('USD');
  const [counterpartyType, setCounterpartyType] = useState<'supplier' | 'customer' | 'logistics' | 'broker'>('supplier');

  // Load accounts from localStorage on component mount
  useEffect(() => {
    const savedAccounts = localStorage.getItem('invoiceAccounts');
    if (savedAccounts) {
      setAccounts(JSON.parse(savedAccounts));
    }
  }, []);

  // Save accounts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('invoiceAccounts', JSON.stringify(accounts));
  }, [accounts]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error("Account name is required");
      return;
    }

    const newAccount: InvoiceAccount = {
      id: crypto.randomUUID(),
      name,
      type,
      currency,
      counterpartyType,
      createdAt: new Date().toISOString(),
    };

    setAccounts([...accounts, newAccount]);
    
    // Reset form
    setName('');
    setType('payables');
    setCurrency('USD');
    setCounterpartyType('supplier');
    
    toast.success("Invoice account created successfully");
  };

  const deleteAccount = (id: string) => {
    setAccounts(accounts.filter(account => account.id !== id));
    toast.success("Account deleted successfully");
  };

  // Map counterparty type to display name
  const counterpartyTypeDisplay = {
    supplier: 'Supplier / Vendor',
    customer: 'Insurance Customer / Hospital',
    logistics: 'Logistics Partner',
    broker: 'Broker / Agent'
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create Invoice Account</CardTitle>
          <CardDescription>
            Set up invoice accounts to organize your payables and receivables.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="account-name">Account Name</Label>
                <Input 
                  id="account-name" 
                  placeholder="e.g., Supplier Invoices – Warehouse A" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="account-type">Account Type</Label>
                <Select 
                  value={type} 
                  onValueChange={(value) => setType(value as 'payables' | 'receivables')}
                >
                  <SelectTrigger id="account-type">
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="payables">Payables (money going out)</SelectItem>
                    <SelectItem value="receivables">Receivables (money coming in)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                    <SelectItem value="GBP">GBP - British Pound</SelectItem>
                    <SelectItem value="KES">KES - Kenyan Shilling</SelectItem>
                    <SelectItem value="NGN">NGN - Nigerian Naira</SelectItem>
                    <SelectItem value="ZAR">ZAR - South African Rand</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="counterparty-type">Counterparty Type</Label>
                <Select 
                  value={counterpartyType}
                  onValueChange={(value) => setCounterpartyType(value as 'supplier' | 'customer' | 'logistics' | 'broker')}
                >
                  <SelectTrigger id="counterparty-type">
                    <SelectValue placeholder="Select counterparty type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="supplier">Supplier / Vendor</SelectItem>
                    <SelectItem value="customer">Insurance Customer / Hospital</SelectItem>
                    <SelectItem value="logistics">Logistics Partner</SelectItem>
                    <SelectItem value="broker">Broker / Agent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button type="submit" className="mt-2">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Account
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Invoice Accounts</CardTitle>
          <CardDescription>
            Manage your invoice accounts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {accounts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No accounts created yet. Create your first invoice account above.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Account Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Currency</TableHead>
                  <TableHead>Counterparty Type</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell className="font-medium">{account.name}</TableCell>
                    <TableCell className="capitalize">{account.type}</TableCell>
                    <TableCell>{account.currency}</TableCell>
                    <TableCell>{counterpartyTypeDisplay[account.counterpartyType]}</TableCell>
                    <TableCell>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => deleteAccount(account.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
