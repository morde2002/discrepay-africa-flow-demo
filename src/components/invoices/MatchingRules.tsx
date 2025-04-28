
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Settings } from 'lucide-react';

interface MatchingRulesConfig {
  matchByInvoiceNumber: boolean;
  matchByAmount: boolean;
  matchByCounterparty: boolean;
  matchByDate: boolean;
  amountTolerance: number;
  dateTolerance: number;
}

export const MatchingRules: React.FC = () => {
  const [config, setConfig] = useState<MatchingRulesConfig>({
    matchByInvoiceNumber: true,
    matchByAmount: true,
    matchByCounterparty: false,
    matchByDate: false,
    amountTolerance: 0,
    dateTolerance: 0
  });
  const [enableAmountTolerance, setEnableAmountTolerance] = useState(false);
  const [enableDateTolerance, setEnableDateTolerance] = useState(false);

  // Load configuration from localStorage on component mount
  useEffect(() => {
    const savedConfig = localStorage.getItem('matchingRulesConfig');
    if (savedConfig) {
      const parsedConfig = JSON.parse(savedConfig);
      setConfig(parsedConfig);
      setEnableAmountTolerance(parsedConfig.amountTolerance > 0);
      setEnableDateTolerance(parsedConfig.dateTolerance > 0);
    }
  }, []);

  // Save configuration to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('matchingRulesConfig', JSON.stringify(config));
  }, [config]);

  const handleSaveConfig = () => {
    if (!config.matchByInvoiceNumber && !config.matchByAmount && !config.matchByCounterparty && !config.matchByDate) {
      toast.error("You must select at least one matching criteria");
      return;
    }
    
    // If tolerances are disabled, ensure they're set to 0
    const updatedConfig = {
      ...config,
      amountTolerance: enableAmountTolerance ? config.amountTolerance : 0,
      dateTolerance: enableDateTolerance ? config.dateTolerance : 0
    };
    
    setConfig(updatedConfig);
    localStorage.setItem('matchingRulesConfig', JSON.stringify(updatedConfig));
    
    toast.success("Matching rules saved successfully");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configure Matching Rules</CardTitle>
          <CardDescription>
            Set up how invoices and payments should be matched during reconciliation.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Match Criteria</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="match-invoice-number" 
                  checked={config.matchByInvoiceNumber}
                  onCheckedChange={(checked) => 
                    setConfig({...config, matchByInvoiceNumber: checked === true})
                  }
                />
                <Label htmlFor="match-invoice-number">Match by Invoice Number / Payment Reference</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="match-amount" 
                  checked={config.matchByAmount}
                  onCheckedChange={(checked) => 
                    setConfig({...config, matchByAmount: checked === true})
                  }
                />
                <Label htmlFor="match-amount">Match by Amount</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="match-counterparty" 
                  checked={config.matchByCounterparty}
                  onCheckedChange={(checked) => 
                    setConfig({...config, matchByCounterparty: checked === true})
                  }
                />
                <Label htmlFor="match-counterparty">Match by Counterparty Name</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="match-date" 
                  checked={config.matchByDate}
                  onCheckedChange={(checked) => 
                    setConfig({...config, matchByDate: checked === true})
                  }
                />
                <Label htmlFor="match-date">Match by Date</Label>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Tolerance Settings</h3>
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="amount-tolerance-toggle">Enable Amount Tolerance</Label>
                  <Switch 
                    id="amount-tolerance-toggle"
                    checked={enableAmountTolerance}
                    onCheckedChange={setEnableAmountTolerance}
                  />
                </div>
                
                {enableAmountTolerance && (
                  <div className="pl-6 space-y-2">
                    <Label htmlFor="amount-tolerance">Amount Variance Allowed ($)</Label>
                    <Input 
                      id="amount-tolerance" 
                      type="number" 
                      value={config.amountTolerance}
                      onChange={(e) => setConfig({...config, amountTolerance: parseFloat(e.target.value) || 0})}
                      min="0"
                      step="0.01"
                    />
                    <p className="text-sm text-gray-500">
                      Allows matches with amount differences up to ${config.amountTolerance.toFixed(2)}.
                    </p>
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="date-tolerance-toggle">Enable Date Tolerance</Label>
                  <Switch 
                    id="date-tolerance-toggle"
                    checked={enableDateTolerance}
                    onCheckedChange={setEnableDateTolerance}
                  />
                </div>
                
                {enableDateTolerance && (
                  <div className="pl-6 space-y-2">
                    <Label htmlFor="date-tolerance">Date Variance Allowed (days)</Label>
                    <Input 
                      id="date-tolerance" 
                      type="number" 
                      value={config.dateTolerance}
                      onChange={(e) => setConfig({...config, dateTolerance: parseInt(e.target.value) || 0})}
                      min="0"
                      step="1"
                    />
                    <p className="text-sm text-gray-500">
                      Allows matches with date differences up to {config.dateTolerance} day{config.dateTolerance !== 1 ? 's' : ''}.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveConfig} className="w-full">
            <Settings className="mr-2 h-4 w-4" />
            Save Matching Rules
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Matching Process Preview</CardTitle>
          <CardDescription>
            How your invoices will be reconciled.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-md bg-gray-50">
              <h4 className="font-medium mb-2">Selected Matching Criteria</h4>
              <ul className="list-disc pl-5 space-y-1">
                {config.matchByInvoiceNumber && (
                  <li>Invoice Number / Payment Reference</li>
                )}
                {config.matchByAmount && (
                  <li>Amount {enableAmountTolerance && `(with ${config.amountTolerance.toFixed(2)} tolerance)`}</li>
                )}
                {config.matchByCounterparty && (
                  <li>Counterparty Name</li>
                )}
                {config.matchByDate && (
                  <li>Date {enableDateTolerance && `(with ${config.dateTolerance} day${config.dateTolerance !== 1 ? 's' : ''} tolerance)`}</li>
                )}
              </ul>
            </div>
            
            <div className="p-4 border rounded-md">
              <h4 className="font-medium mb-2">Reconciliation Output</h4>
              <p className="text-sm text-gray-600 mb-2">
                The reconciliation process will categorize items as:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li><span className="font-medium text-green-600">Matched</span> - Invoice with corresponding payment</li>
                <li><span className="font-medium text-yellow-600">Partially Matched</span> - Underpaid or overpaid invoices</li>
                <li><span className="font-medium text-red-600">Unmatched Invoices</span> - Invoices without payments</li>
                <li><span className="font-medium text-blue-600">Unmatched Payments</span> - Payments without invoices</li>
                <li><span className="font-medium text-purple-600">Duplicate Payments</span> - Multiple payments for the same invoice</li>
              </ul>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            onClick={() => {
              // Ensure configuration is saved
              handleSaveConfig();
              toast.info("Proceed to the next step to run reconciliation");
            }}
          >
            Next: Run Reconciliation
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
