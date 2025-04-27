
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
  FileText 
} from "lucide-react";
import { cn } from "@/lib/utils";

const SidebarNav = () => {
  const location = useLocation();
  const pathname = location.pathname;

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
      id: "use-cases",
      title: "Use Cases",
      icon: FileText,
      url: "/use-cases",
    },
    {
      id: "integrations",
      title: "Integrations",
      icon: Database,
      url: "#",
    },
    {
      id: "settings",
      title: "Settings",
      icon: Settings,
      url: "#",
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="py-6 px-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-md bg-discrepay-500 flex items-center justify-center text-white font-bold text-lg">
            D
          </div>
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
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="flex items-center text-xs text-sidebar-foreground/60">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          All systems operational
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SidebarNav;
