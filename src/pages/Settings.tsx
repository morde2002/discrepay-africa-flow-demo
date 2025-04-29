
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import DashboardCard from '@/components/ui/DashboardCard';
import { toast } from 'sonner';
import { User, Bell, Lock, Globe, Shield, UserCircle, Mail, Phone } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [profileForm, setProfileForm] = useState({
    firstName: "RJ",
    lastName: "Logistics", 
    email: "rjlogistics@example.com",
    phone: "+254 712 345 678",
    company: "RJ Logistics Ltd"
  });
  
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    weeklyDigest: true
  });
  
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated successfully");
  };
  
  const handleNotificationsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Notification preferences updated");
  };
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Settings</h1>
        <p className="text-gray-600 dark:text-gray-300">Manage your account and application preferences</p>
      </div>
      
      <Tabs 
        defaultValue="profile" 
        className="space-y-6"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList>
          <TabsTrigger value="profile" className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <Lock className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center">
            <Globe className="h-4 w-4 mr-2" />
            Preferences
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-6">
          <DashboardCard title="Personal Information">
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    name="firstName" 
                    value={profileForm.firstName} 
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    name="lastName" 
                    value={profileForm.lastName} 
                    onChange={handleProfileChange}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={profileForm.email} 
                  onChange={handleProfileChange}
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input 
                  id="phone" 
                  name="phone" 
                  value={profileForm.phone} 
                  onChange={handleProfileChange}
                />
              </div>
              
              <div>
                <Label htmlFor="company">Company</Label>
                <Input 
                  id="company" 
                  name="company" 
                  value={profileForm.company} 
                  onChange={handleProfileChange}
                />
              </div>
              
              <Button type="submit">Save Changes</Button>
            </form>
          </DashboardCard>
          
          <DashboardCard title="Profile Picture">
            <div className="flex items-center space-x-4">
              <div className="h-20 w-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <UserCircle className="h-16 w-16 text-gray-500 dark:text-gray-400" />
              </div>
              <div className="space-y-2">
                <Button variant="outline" onClick={() => toast.info("Upload photo feature coming soon")}>
                  Upload Photo
                </Button>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  JPG, GIF or PNG. Max size 1MB.
                </p>
              </div>
            </div>
          </DashboardCard>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <DashboardCard title="Notification Preferences">
            <form onSubmit={handleNotificationsSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Receive email for important updates</p>
                    </div>
                  </div>
                  <Switch 
                    checked={notifications.email} 
                    onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Push Notifications</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Receive push notifications in app</p>
                    </div>
                  </div>
                  <Switch 
                    checked={notifications.push} 
                    onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">SMS Notifications</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Receive SMS for critical alerts</p>
                    </div>
                  </div>
                  <Switch 
                    checked={notifications.sms} 
                    onCheckedChange={(checked) => setNotifications({...notifications, sms: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Weekly Digest</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Receive weekly summary reports</p>
                    </div>
                  </div>
                  <Switch 
                    checked={notifications.weeklyDigest} 
                    onCheckedChange={(checked) => setNotifications({...notifications, weeklyDigest: checked})}
                  />
                </div>
              </div>
              
              <Button type="submit">Save Preferences</Button>
            </form>
          </DashboardCard>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-6">
          <DashboardCard title="Change Password">
            <form onSubmit={(e) => { 
              e.preventDefault(); 
              toast.success("Password updated successfully"); 
            }} 
            className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              <Button type="submit">Update Password</Button>
            </form>
          </DashboardCard>
          
          <DashboardCard title="Two-Factor Authentication">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Enable 2FA</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Button variant="outline" onClick={() => toast.info("2FA setup coming soon")}>
                Setup
              </Button>
            </div>
          </DashboardCard>
        </TabsContent>
        
        <TabsContent value="preferences" className="space-y-6">
          <DashboardCard title="System Preferences">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Language</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Select your preferred language
                  </p>
                </div>
                <select className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                  <option>English</option>
                  <option>Swahili</option>
                  <option>French</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Time Zone</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Set your local time zone
                  </p>
                </div>
                <select className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                  <option>East Africa Time (EAT)</option>
                  <option>Central Africa Time (CAT)</option>
                  <option>West Africa Time (WAT)</option>
                  <option>Greenwich Mean Time (GMT)</option>
                </select>
              </div>
              
              <Button onClick={() => toast.success("Preferences saved")}>Save Preferences</Button>
            </div>
          </DashboardCard>
          
          <DashboardCard title="Privacy Settings">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Data Sharing</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Allow system to collect usage data
                  </p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Cookies</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Allow cookies for enhanced experience
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </DashboardCard>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default Settings;
