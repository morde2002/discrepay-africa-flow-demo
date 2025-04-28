
import React, { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Plus, Trash2 } from "lucide-react";

interface FinancialAccount {
  id: string;
  name: string;
  type: 'bank' | 'processor' | 'wallet';
  currency: string;
  description: string;
}

const AccountSetup = () => {
  const [accounts, setAccounts] = useState<FinancialAccount[]>(() => {
    const savedAccounts = localStorage.getItem('financialAccounts');
    return savedAccounts ? JSON.parse(savedAccounts) : [];
  });
  
  const form = useForm({
    defaultValues: {
      name: "",
      type: "bank",
      currency: "",
      description: ""
    }
  });
  
  const onSubmit = (data: any) => {
    const newAccount = {
      id: Date.now().toString(),
      ...data
    };
    
    const updatedAccounts = [...accounts, newAccount];
    setAccounts(updatedAccounts);
    localStorage.setItem('financialAccounts', JSON.stringify(updatedAccounts));
    
    toast.success("Financial account created successfully");
    form.reset();
  };
  
  const deleteAccount = (id: string) => {
    const filteredAccounts = accounts.filter(account => account.id !== id);
    setAccounts(filteredAccounts);
    localStorage.setItem('financialAccounts', JSON.stringify(filteredAccounts));
    toast.success("Account deleted successfully");
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create Financial Account</CardTitle>
          <CardDescription>
            Add a new financial account for reconciliation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., KCB Bank Settlement Account" 
                          {...field} 
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Type</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select account type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="bank">Bank Account</SelectItem>
                          <SelectItem value="processor">Processor Account</SelectItem>
                          <SelectItem value="wallet">Mobile Wallet Account</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., USD, KES, NGN" 
                          {...field} 
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Additional details about this account" 
                        className="h-24"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full md:w-auto">
                <Plus className="mr-2 h-4 w-4" /> Create Account
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Financial Accounts</CardTitle>
          <CardDescription>
            Your configured accounts for reconciliation
          </CardDescription>
        </CardHeader>
        <CardContent>
          {accounts.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Account Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Currency</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell className="font-medium">{account.name}</TableCell>
                    <TableCell className="capitalize">{account.type}</TableCell>
                    <TableCell>{account.currency}</TableCell>
                    <TableCell className="truncate max-w-xs">{account.description || "-"}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => deleteAccount(account.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              No accounts created yet. Add your first account above.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountSetup;
