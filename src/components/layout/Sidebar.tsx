
import { useState } from "react";
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
  SidebarTrigger,
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
  const [activeItem, setActiveItem] = useState("dashboard");

  const menuItems = [
    {
      id: "dashboard",
      title: "Dashboard",
      icon: ChartBar,
      url: "#",
    },
    {
      id: "payments",
      title: "Payments",
      icon: CreditCard,
      url: "#",
    },
    {
      id: "settlements",
      title: "Settlements",
      icon: Wallet,
      url: "#",
    },
    {
      id: "compliance",
      title: "Compliance",
      icon: ShieldCheck,
      url: "#",
    },
    {
      id: "reports",
      title: "Reports",
      icon: FileText,
      url: "#",
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
                    className={cn(
                      activeItem === item.id ? "bg-sidebar-accent text-white" : "text-sidebar-foreground/70"
                    )}
                    onClick={() => setActiveItem(item.id)}
                  >
                    <item.icon className="w-5 h-5 mr-2" />
                    <span>{item.title}</span>
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
