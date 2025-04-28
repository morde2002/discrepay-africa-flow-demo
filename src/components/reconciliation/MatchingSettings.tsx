
import React, { useState, useEffect } from "react";
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
  Checkbox
} from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Play } from "lucide-react";

interface ReconciliationConfig {
  id: string;
  primaryAccountId: string;
  matchingAccountIds: string[];
  reconciliationType: string;
  createdAt: string;
}

const MatchingSettings = () => {
  const [currentReconciliation, setCurrentReconciliation] = useState<ReconciliationConfig | null>(null);
  
  useEffect(() => {
    const savedConfig = localStorage.getItem('currentReconciliation');
    if (savedConfig) {
      setCurrentReconciliation(JSON.parse(savedConfig));
    }
  }, []);
  
  const form = useForm({
    defaultValues: {
      matchAmount: true,
      matchDate: true,
      matchReference: false,
      matchCustomField: false,
      customFieldName: "",
      dateVariance: 1,
      amountVariance: 0,
    }
  });
  
  const onSubmit = (data: any) => {
    if (!currentReconciliation) {
      toast.error("No reconciliation configuration found. Please set up reconciliation first.");
      return;
    }
    
    // At least one matching criteria should be selected
    if (!data.matchAmount && !data.matchDate && !data.matchReference && !data.matchCustomField) {
      toast.error("Please select at least one matching criteria");
      return;
    }
    
    const matchingSettings = {
      ...data,
      reconciliationId: currentReconciliation.id,
    };
    
    localStorage.setItem('reconciliationMatchingSettings', JSON.stringify(matchingSettings));
    toast.success("Matching settings saved! You can now run the reconciliation");
    
    // In a real app, we might navigate to the results tab
  };
  
  if (!currentReconciliation) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Matching Settings</CardTitle>
          <CardDescription>Configure how transactions should be matched</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-md">
            <p className="text-amber-800">
              No reconciliation configuration found. Please go to the Reconciliation Setup step first.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Matching Settings</CardTitle>
          <CardDescription>
            Configure how transactions should be matched
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-base font-medium">Match On:</h3>
                
                <FormField
                  control={form.control}
                  name="matchAmount"
                  render={({ field }) => (
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="matchAmount"
                      />
                      <label
                        htmlFor="matchAmount"
                        className="text-sm font-medium leading-none"
                      >
                        Amount
                      </label>
                    </div>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="matchDate"
                  render={({ field }) => (
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="matchDate"
                      />
                      <label
                        htmlFor="matchDate"
                        className="text-sm font-medium leading-none"
                      >
                        Transaction Date
                      </label>
                    </div>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="matchReference"
                  render={({ field }) => (
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="matchReference"
                      />
                      <label
                        htmlFor="matchReference"
                        className="text-sm font-medium leading-none"
                      >
                        Reference Number
                      </label>
                    </div>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="matchCustomField"
                  render={({ field }) => (
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="matchCustomField"
                      />
                      <label
                        htmlFor="matchCustomField"
                        className="text-sm font-medium leading-none"
                      >
                        Custom Field
                      </label>
                    </div>
                  )}
                />
                
                {form.watch("matchCustomField") && (
                  <FormField
                    control={form.control}
                    name="customFieldName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Custom Field Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter field name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
              
              <div className="space-y-4">
                <h3 className="text-base font-medium">Tolerances (Optional):</h3>
                
                <FormField
                  control={form.control}
                  name="dateVariance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date Variance (days)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="0" 
                          max="30" 
                          {...field} 
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <p className="text-xs text-muted-foreground mt-1">
                        Allow transactions with dates within this many days to match
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="amountVariance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount Variance</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="0" 
                          step="0.01" 
                          {...field} 
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <p className="text-xs text-muted-foreground mt-1">
                        Allow transactions with amounts differing by up to this value to match
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <Button type="submit" className="w-full md:w-auto">
                <Play className="mr-2 h-4 w-4" /> Save Matching Settings
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default MatchingSettings;
