
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { 
  CreditCard, 
  Wallet, 
  ChartBar, 
  Database,
  Settings, 
  ShieldCheck,
  LogOut,
  User,
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const SidebarNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  
  const handleLogout = () => {
    localStorage.setItem('isAuthenticated', 'false');
    toast.success("Logged out successfully");
    navigate("/auth");
  };

  const menuItems = [
    {
      id: "dashboard",
      title: "Dashboard",
      icon: ChartBar,
      url: "/",
    },
    {
      id: "payments",
      title: "Payments",
      icon: CreditCard,
      url: "/payouts",
    },
    {
      id: "settlements",
      title: "Settlements",
      icon: Wallet,
      url: "/settlements",
    },
    {
      id: "compliance",
      title: "Compliance",
      icon: ShieldCheck,
      url: "/compliance",
    },
    {
      id: "reconciliation",
      title: "Reconciliation",
      icon: Database,
      url: "/reconciliation",
    },
    {
      id: "invoices",
      title: "Invoices",
      icon: FileText,
      url: "/invoices",
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="py-6 px-4">
        <div className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/c6b58a34-ac83-45c0-8be4-4c26b436414d.png" 
            alt="Discrepay Logo" 
            className="w-8 h-8 object-contain"
          />
          <span className="font-bold text-lg text-white">Discrepay</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    asChild
                    className={cn(
                      pathname === item.url ? "bg-sidebar-accent text-white" : "text-sidebar-foreground/70"
                    )}
                  >
                    <Link to={item.url}>
                      <item.icon className="w-5 h-5 mr-2" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              
              {/* Add settings and integrations as disabled items */}
              <SidebarMenuItem>
                <SidebarMenuButton 
                  className="text-sidebar-foreground/50 cursor-not-allowed"
                  disabled
                >
                  <Database className="w-5 h-5 mr-2" />
                  <span>Integrations</span>
                  <span className="ml-2 text-xs bg-gray-700 px-1.5 py-0.5 rounded">Coming Soon</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  className="text-sidebar-foreground/50 cursor-not-allowed"
                  disabled
                >
                  <Settings className="w-5 h-5 mr-2" />
                  <span>Settings</span>
                  <span className="ml-2 text-xs bg-gray-700 px-1.5 py-0.5 rounded">Coming Soon</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center text-xs text-sidebar-foreground/60 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            All systems operational
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start text-sidebar-foreground/70"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SidebarNav;
