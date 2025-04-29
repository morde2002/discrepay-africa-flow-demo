
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import DashboardCard from '@/components/ui/DashboardCard';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Mail, Phone, Building, MapPin, Calendar, Award, UserCircle, FileText } from 'lucide-react';

const Profile = () => {
  const userProfile = {
    name: "RJ Logistics",
    role: "Administrator",
    company: "RJ Logistics Ltd",
    email: "rjlogistics@example.com",
    phone: "+254 712 345 678",
    location: "Nairobi, Kenya",
    joinDate: "January 2022",
    subscription: "Enterprise Plan",
    bio: "RJ Logistics specializes in transport and logistics services across East Africa, with a focus on insurance and compliance management for fleet operations."
  };
  
  const recentActivities = [
    { id: 1, action: "Updated policy #P-2025-089", date: "Today, 09:45 AM" },
    { id: 2, action: "Processed claim #C-2025-156", date: "Yesterday, 03:22 PM" },
    { id: 3, action: "Uploaded new invoice batch", date: "Apr 27, 2025, 11:15 AM" },
    { id: 4, action: "Completed compliance review", date: "Apr 25, 2025, 02:30 PM" },
    { id: 5, action: "Updated company information", date: "Apr 22, 2025, 10:05 AM" },
  ];

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">My Profile</h1>
        <p className="text-gray-600 dark:text-gray-300">View and manage your account information</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <DashboardCard title="Profile" className="h-full">
            <div className="flex flex-col items-center text-center">
              <div className="h-24 w-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-4">
                <UserCircle className="h-20 w-20 text-gray-500 dark:text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold">{userProfile.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">{userProfile.role}</p>
              <p className="text-primary mt-1">{userProfile.subscription}</p>
              
              <div className="border-t border-b dark:border-gray-700 w-full my-4 py-4">
                <p className="text-gray-700 dark:text-gray-300 text-sm">{userProfile.bio}</p>
              </div>
              
              <div className="w-full space-y-3">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{userProfile.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{userProfile.phone}</span>
                </div>
                <div className="flex items-center">
                  <Building className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{userProfile.company}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{userProfile.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Joined {userProfile.joinDate}</span>
                </div>
              </div>
              
              <div className="mt-6">
                <Button onClick={() => toast.info("Edit profile feature coming soon")}>
                  Edit Profile
                </Button>
              </div>
            </div>
          </DashboardCard>
        </div>
        
        <div className="lg:col-span-2 space-y-6">
          <DashboardCard title="Recent Activity" action={
            <Button variant="ghost" size="sm" onClick={() => toast.info("Viewing all activity logs")}>View All</Button>
          }>
            <div className="space-y-4">
              {recentActivities.map(activity => (
                <div key={activity.id} className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-gray-800 dark:text-gray-200">{activity.action}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
          
          <DashboardCard title="Achievements" action={
            <Button variant="ghost" size="sm" onClick={() => toast.info("Viewing all achievements")}>View All</Button>
          }>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center">
                <div className="mx-auto h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-2">
                  <Award className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <h4 className="font-medium">Early Adopter</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Jan 2022</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center">
                <div className="mx-auto h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-2">
                  <Award className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <h4 className="font-medium">100+ Policies</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Mar 2023</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center">
                <div className="mx-auto h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-2">
                  <Award className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="font-medium">VIP Member</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Jan 2025</p>
              </div>
            </div>
          </DashboardCard>
          
          <DashboardCard title="Subscription Details">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-lg">Enterprise Plan</h4>
                <p className="text-gray-600 dark:text-gray-400">Renewed on Apr 1, 2025</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">Next billing date: May 1, 2025</p>
              </div>
              <Button variant="outline" onClick={() => toast.info("Manage subscription options")}>
                Manage
              </Button>
            </div>
            
            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
              <h5 className="font-medium mb-2">Enterprise Features</h5>
              <ul className="text-sm space-y-1">
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  Unlimited policies
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  Advanced reconciliation tools
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  Full compliance monitoring
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  Premium support
                </li>
              </ul>
            </div>
          </DashboardCard>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
