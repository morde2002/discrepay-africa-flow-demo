
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import SidebarNav from "@/components/layout/Sidebar";
import FinancialSummary from "@/components/dashboard/FinancialSummary";
import TransactionList from "@/components/dashboard/TransactionList";
import ComplianceOverview from "@/components/dashboard/ComplianceOverview";
import PaymentFlow from "@/components/dashboard/PaymentFlow";
import { Button } from "@/components/ui/button";
import { Bell, Search, Settings, User, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem('isAuthenticated', 'false');
    toast.success("Logged out successfully");
    navigate('/auth');
  };
  
  const handleProfileClick = () => {
    // For now we'll just show a toast that this feature is coming soon
    toast.info("Profile management coming soon!");
    // You could navigate to a profile page once it's built
    // navigate('/profile');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <SidebarNav />
        <div className="flex-1 overflow-auto">
          <header className="sticky top-0 z-30 bg-white border-b px-4 sm:px-6 py-3 flex items-center justify-between">
            <div className="flex items-center">
              <SidebarTrigger />
              <div className="ml-4 text-lg font-medium">Dashboard</div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  className="pl-8 pr-4 py-2 text-sm border rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-discrepay-300 focus:border-transparent"
                  placeholder="Search..."
                />
              </div>
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleProfileClick}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback className="bg-discrepay-600 text-white">JD</AvatarFallback>
              </Avatar>
            </div>
          </header>
          
          <main className="px-4 sm:px-6 py-6 bg-gray-50">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Financial Control Dashboard</h1>
              <p className="text-muted-foreground">Welcome back! Here's the latest overview of your financial operations.</p>
            </div>
            
            <FinancialSummary />
            <TransactionList />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ComplianceOverview />
              <PaymentFlow />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
