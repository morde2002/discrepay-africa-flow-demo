
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import SidebarNav from "@/components/layout/Sidebar";
import { Bell, Search, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BuyPowerCase from "@/components/usecases/BuyPowerCase";
import KCBBankCase from "@/components/usecases/KCBBankCase";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const UseCases = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <SidebarNav />
        <div className="flex-1 overflow-auto">
          <header className="sticky top-0 z-30 bg-white border-b px-4 sm:px-6 py-3 flex items-center justify-between">
            <div className="flex items-center">
              <SidebarTrigger />
              <div className="ml-4 text-lg font-medium">Use Cases</div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  className="pl-8 pr-4 py-2 text-sm border rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-discrepay-300 focus:border-transparent"
                  placeholder="Search use cases..."
                />
              </div>
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback className="bg-discrepay-600 text-white">JD</AvatarFallback>
              </Avatar>
            </div>
          </header>
          
          <main className="px-4 sm:px-6 py-6 bg-gray-50">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Discrepay Use Cases</h1>
              <p className="text-muted-foreground">Explore how Discrepay empowers different financial institutions across Africa.</p>
            </div>
            
            <Tabs defaultValue="buypower" className="mb-6">
              <TabsList>
                <TabsTrigger value="buypower">BuyPower (Utility Payments)</TabsTrigger>
                <TabsTrigger value="kcb">KCB Bank Kenya (Banking)</TabsTrigger>
              </TabsList>
              <TabsContent value="buypower">
                <BuyPowerCase />
              </TabsContent>
              <TabsContent value="kcb">
                <KCBBankCase />
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default UseCases;
