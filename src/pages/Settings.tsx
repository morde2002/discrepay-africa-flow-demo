import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  User, 
  Lock, 
  Bell, 
  CreditCard, 
  Shield, 
  Globe, 
  Users, 
  Terminal, 
  Save
} from "lucide-react";
import { toast } from 'sonner';
import DashboardCard from '@/components/ui/DashboardCard';

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [name, setName] = useState("RJ Logistics");
  const [email, setEmail] = useState("contact@rjlogistics.co.ke");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  
  const handleSaveProfile = () => {
    toast.success("Profile settings saved successfully");
  };

  const handleSaveNotifications = () => {
    toast.success("Notification preferences saved");
  };
  
  const handleSaveSecurity = () => {
    toast.success("Security settings updated");
  };
  
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Settings</h1>
        <p className="text-gray-600 dark:text-gray-300">Manage your account preferences and settings</p>
      </div>
      
      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="col-span-12 md:col-span-3">
          <DashboardCard title="Settings Menu">
            <nav className="space-y-1 mt-2">
              <Button 
                variant={activeTab === "profile" ? "secondary" : "ghost"} 
                className="w-full justify-start"
                onClick={() => setActiveTab("profile")}
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
              <Button 
                variant={activeTab === "notifications" ? "secondary" : "ghost"} 
                className="w-full justify-start"
                onClick={() => setActiveTab("notifications")}
              >
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </Button>
              <Button 
                variant={activeTab === "security" ? "secondary" : "ghost"} 
                className="w-full justify-start"
                onClick={() => setActiveTab("security")}
              >
                <Lock className="mr-2 h-4 w-4" />
                Security
              </Button>
              <Button 
                variant={activeTab === "billing" ? "secondary" : "ghost"} 
                className="w-full justify-start"
                onClick={() => setActiveTab("billing")}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Billing
              </Button>
              <Button 
                variant={activeTab === "compliance" ? "secondary" : "ghost"} 
                className="w-full justify-start"
                onClick={() => setActiveTab("compliance")}
              >
                <Shield className="mr-2 h-4 w-4" />
                Compliance
              </Button>
              <Button 
                variant={activeTab === "integrations" ? "secondary" : "ghost"} 
                className="w-full justify-start"
                onClick={() => setActiveTab("integrations")}
              >
                <Globe className="mr-2 h-4 w-4" />
                Integrations
              </Button>
              <Button 
                variant={activeTab === "team" ? "secondary" : "ghost"} 
                className="w-full justify-start"
                onClick={() => setActiveTab("team")}
              >
                <Users className="mr-2 h-4 w-4" />
                Team
              </Button>
              <Button 
                variant={activeTab === "developer" ? "secondary" : "ghost"} 
                className="w-full justify-start"
                onClick={() => setActiveTab("developer")}
              >
                <Terminal className="mr-2 h-4 w-4" />
                Developer
              </Button>
            </nav>
          </DashboardCard>
        </div>
        
        {/* Main content */}
        <div className="col-span-12 md:col-span-9">
          {/* Profile Settings */}
          {activeTab === "profile" && (
            <DashboardCard title="Profile Settings">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    placeholder="Your name" 
                    className="max-w-md"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    placeholder="Your email" 
                    className="max-w-md"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input 
                    id="company" 
                    value="RJ Logistics" 
                    disabled
                    className="max-w-md bg-gray-50 dark:bg-gray-700"
                  />
                  <p className="text-sm text-gray-500">Contact support to change company details</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    placeholder="e.g. +254123456789" 
                    className="max-w-md"
                  />
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button onClick={handleSaveProfile}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Profile
                  </Button>
                </div>
              </div>
            </DashboardCard>
          )}
          
          {/* Notification Settings */}
          {activeTab === "notifications" && (
            <DashboardCard title="Notification Preferences">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Email Notifications</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">New Claims</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Get notified when a new claim is submitted</p>
                    </div>
                    <Switch 
                      checked={emailNotifications} 
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Policy Renewals</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Get notified about upcoming policy renewals</p>
                    </div>
                    <Switch 
                      checked={emailNotifications} 
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Reconciliation Reports</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Get monthly reconciliation reports</p>
                    </div>
                    <Switch 
                      checked={emailNotifications} 
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Push Notifications</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Enable Push Notifications</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Receive push notifications in your browser</p>
                    </div>
                    <Switch 
                      checked={pushNotifications} 
                      onCheckedChange={setPushNotifications}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">SMS Notifications</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Enable SMS Alerts</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Receive text messages for critical alerts</p>
                    </div>
                    <Switch 
                      checked={smsNotifications} 
                      onCheckedChange={setSmsNotifications}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Marketing</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Product Updates & News</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Receive news about product updates and industry insights</p>
                    </div>
                    <Switch 
                      checked={marketingEmails} 
                      onCheckedChange={setMarketingEmails}
                    />
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button onClick={handleSaveNotifications}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Preferences
                  </Button>
                </div>
              </div>
            </DashboardCard>
          )}
          
          {/* Security Settings */}
          {activeTab === "security" && (
            <DashboardCard title="Security Settings">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Password</h3>
                  
                  <div className="space-y-2 max-w-md">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input 
                      id="current-password" 
                      type="password" 
                      placeholder="Enter your current password" 
                    />
                  </div>
                  
                  <div className="space-y-2 max-w-md">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input 
                      id="new-password" 
                      type="password" 
                      placeholder="Enter new password" 
                    />
                  </div>
                  
                  <div className="space-y-2 max-w-md">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input 
                      id="confirm-password" 
                      type="password" 
                      placeholder="Confirm new password" 
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Two-Factor Authentication</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Enable Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security to your account</p>
                    </div>
                    <Switch 
                      checked={twoFactorAuth} 
                      onCheckedChange={setTwoFactorAuth}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Session Management</h3>
                  
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md border dark:border-gray-700">
                    <h4 className="font-medium">Active Sessions</h4>
                    <div className="mt-2 space-y-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium">Current Session</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Nairobi, Kenya • Chrome • April 29, 2025</p>
                        </div>
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full dark:bg-green-900 dark:text-green-200">Current</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium">Mobile Session</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Nairobi, Kenya • iOS App • April 28, 2025</p>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => toast.success("Session revoked")}>Revoke</Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button onClick={handleSaveSecurity}>
                    <Save className="mr-2 h-4 w-4" />
                    Update Security Settings
                  </Button>
                </div>
              </div>
            </DashboardCard>
          )}
          
          {/* Other tabs */}
          {activeTab === "billing" && (
            <DashboardCard title="Billing Settings">
              <div className="space-y-4">
                <p>Manage your subscription plans and payment methods.</p>
                <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-gray-700">
                  <h3 className="font-medium mb-2">Current Plan</h3>
                  <div className="flex items-center">
                    <div className="bg-discrepay-100 dark:bg-discrepay-900 p-2 rounded-full">
                      <Shield className="h-5 w-5 text-discrepay-600 dark:text-discrepay-400" />
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium">Enterprise Plan</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">$499/month • Renews on May 15, 2025</p>
                    </div>
                    <Button variant="outline" className="ml-auto" onClick={() => toast.info("Contact support to change your plan")}>
                      Change Plan
                    </Button>
                  </div>
                </div>
                <Button className="mt-4" onClick={() => toast.info("Billing settings will be implemented soon")}>
                  Manage Payment Methods
                </Button>
              </div>
            </DashboardCard>
          )}
          
          {activeTab === "compliance" && (
            <DashboardCard title="Compliance Settings">
              <div className="space-y-4">
                <p>Configure compliance settings for regulatory requirements.</p>
                <Button onClick={() => toast.info("Compliance settings will be implemented soon")}>
                  Configure Compliance Settings
                </Button>
              </div>
            </DashboardCard>
          )}
          
          {activeTab === "integrations" && (
            <DashboardCard title="Integrations">
              <div className="space-y-4">
                <p>Connect your Discrepay account with other services.</p>
                <Button onClick={() => toast.info("Integrations will be implemented soon")}>
                  Explore Available Integrations
                </Button>
              </div>
            </DashboardCard>
          )}
          
          {activeTab === "team" && (
            <DashboardCard title="Team Management">
              <div className="space-y-4">
                <p>Manage your team members and their permissions.</p>
                <Button onClick={() => toast.info("Team management will be implemented soon")}>
                  Invite Team Members
                </Button>
              </div>
            </DashboardCard>
          )}
          
          {activeTab === "developer" && (
            <DashboardCard title="Developer Settings">
              <div className="space-y-4">
                <p>Access API keys and developer documentation.</p>
                <Button onClick={() => toast.info("Developer settings will be implemented soon")}>
                  Generate API Key
                </Button>
              </div>
            </DashboardCard>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Settings;
