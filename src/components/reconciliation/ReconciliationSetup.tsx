
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
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  RadioGroup, 
  RadioGroupItem 
} from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ChartBar, Play } from "lucide-react";

interface FinancialAccount {
  id: string;
  name: string;
  type: 'bank' | 'processor' | 'wallet';
  currency: string;
  description: string;
}

const ReconciliationSetup = () => {
  const [accounts, setAccounts] = useState<FinancialAccount[]>(() => {
    const savedAccounts = localStorage.getItem('financialAccounts');
    return savedAccounts ? JSON.parse(savedAccounts) : [];
  });
  
  const [selectedPrimaryAccount, setSelectedPrimaryAccount] = useState<string | null>(null);
  const [selectedMatchingAccounts, setSelectedMatchingAccounts] = useState<string[]>([]);
  
  const form = useForm({
    defaultValues: {
      primaryAccountId: "",
      reconciliationType: "oneToOne"
    }
  });
  
  const onSubmit = (data: any) => {
    if (selectedMatchingAccounts.length === 0) {
      toast.error("Please select at least one matching account");
      return;
    }
    
    const reconciliationConfig = {
      id: Date.now().toString(),
      primaryAccountId: data.primaryAccountId,
      matchingAccountIds: selectedMatchingAccounts,
      reconciliationType: data.reconciliationType,
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('currentReconciliation', JSON.stringify(reconciliationConfig));
    toast.success("Reconciliation configuration saved! Proceed to Matching Settings");
    
    // In a real app, we would navigate to the next tab programmatically
  };
  
  const handlePrimaryAccountChange = (accountId: string) => {
    setSelectedPrimaryAccount(accountId);
    // Clear the matching accounts if they include the new primary account
    setSelectedMatchingAccounts(prev => 
      prev.filter(id => id !== accountId)
    );
  };
  
  const handleMatchingAccountToggle = (accountId: string) => {
    setSelectedMatchingAccounts(prev => {
      if (prev.includes(accountId)) {
        return prev.filter(id => id !== accountId);
      } else {
        return [...prev, accountId];
      }
    });
  };
  
  const filteredAccounts = accounts.filter(account => account.id !== selectedPrimaryAccount);
  const bankAccounts = accounts.filter(account => account.type === 'bank');
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Set Up Reconciliation</CardTitle>
          <CardDescription>
            Configure your reconciliation parameters
          </CardDescription>
        </CardHeader>
        <CardContent>
          {accounts.length < 2 ? (
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-md">
              <p className="text-amber-800">
                You need at least two accounts to perform reconciliation. 
                Please create more accounts in the Account Setup step.
              </p>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="primaryAccountId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Primary Account</FormLabel>
                      <Select 
                        onValueChange={(value) => {
                          field.onChange(value);
                          handlePrimaryAccountChange(value);
                        }}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select primary account" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {bankAccounts.length > 0 ? (
                            bankAccounts.map((account) => (
                              <SelectItem key={account.id} value={account.id}>
                                {account.name} ({account.type})
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="none" disabled>
                              No bank accounts available
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground mt-1">
                        Primary account is usually your bank account
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="space-y-3">
                  <FormLabel>Select Matching Accounts</FormLabel>
                  {selectedPrimaryAccount ? (
                    filteredAccounts.length > 0 ? (
                      <div className="space-y-2">
                        {filteredAccounts.map((account) => (
                          <div key={account.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`account-${account.id}`}
                              checked={selectedMatchingAccounts.includes(account.id)}
                              onCheckedChange={() => handleMatchingAccountToggle(account.id)}
                            />
                            <label
                              htmlFor={`account-${account.id}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {account.name} ({account.type})
                            </label>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No other accounts available for matching
                      </p>
                    )
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Please select a primary account first
                    </p>
                  )}
                </div>
                
                <FormField
                  control={form.control}
                  name="reconciliationType"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Reconciliation Type</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-3 space-y-0">
                            <RadioGroupItem value="oneToOne" id="r1" />
                            <label htmlFor="r1" className="font-medium">
                              1:1 (Bank ↔ Processor)
                            </label>
                          </div>
                          <div className="flex items-center space-x-3 space-y-0">
                            <RadioGroupItem value="oneToMany" id="r2" />
                            <label htmlFor="r2" className="font-medium">
                              1:M (Bank ↔ Multiple Processors)
                            </label>
                          </div>
                          <div className="flex items-center space-x-3 space-y-0">
                            <RadioGroupItem value="manyToMany" id="r3" />
                            <label htmlFor="r3" className="font-medium">
                              M:M (Multiple Banks ↔ Multiple Processors)
                            </label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full md:w-auto"
                  disabled={!selectedPrimaryAccount || selectedMatchingAccounts.length === 0}
                >
                  <ChartBar className="mr-2 h-4 w-4" /> Configure Reconciliation
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReconciliationSetup;
