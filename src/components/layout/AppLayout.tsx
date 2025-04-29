
import { ReactNode, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  FileText, 
  ClipboardCheck, 
  ShieldCheck, 
  FileSpreadsheet, 
  Home, 
  Users,
  Settings,
  MenuIcon,
  X,
  Bell,
  User,
  Search,
  Moon,
  Sun
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type NavItemType = {
  name: string;
  path: string;
  icon: React.ElementType;
  notification?: number;
};

const navigation: NavItemType[] = [
  { name: 'Dashboard', path: '/', icon: Home },
  { name: 'Policies', path: '/policies', icon: FileText },
  { name: 'Claims', path: '/claims', icon: ClipboardCheck },
  { name: 'Reconciliation', path: '/reconciliation', icon: FileSpreadsheet },
  { name: 'Compliance', path: '/compliance', icon: ShieldCheck },
  { name: 'Customers', path: '/customers', icon: Users },
  { name: 'Invoices', path: '/invoices', icon: FileText, notification: 3 },
];

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle dark mode toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.info(`Searching for: ${searchQuery}`);
      // In a real app, this would trigger a search action
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    toast.success('Logged out successfully');
    navigate('/auth');
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar for mobile */}
      <div
        className={`fixed inset-0 z-40 transform lg:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="absolute inset-0 bg-gray-600 bg-opacity-75" onClick={toggleSidebar}></div>
        <div className="relative flex h-full w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4 dark:bg-gray-800">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={toggleSidebar}
            >
              <span className="sr-only">Close sidebar</span>
              <X className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>
          <div className="flex flex-shrink-0 items-center px-4">
            <h1 className="text-2xl font-bold text-insura-600">Discrepay</h1>
          </div>
          <div className="mt-8 flex flex-1 flex-col">
            <nav className="flex-1 space-y-1 px-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`group flex items-center rounded-md px-2 py-2 text-base font-medium ${
                      isActive
                        ? 'bg-insura-50 text-insura-600 dark:bg-gray-700 dark:text-white'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                    }`}
                  >
                    <item.icon
                      className={`mr-4 h-6 w-6 flex-shrink-0 ${
                        isActive ? 'text-insura-600 dark:text-white' : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-400'
                      }`}
                      aria-hidden="true"
                    />
                    {item.name}
                    {item.notification && (
                      <Badge className="ml-auto bg-insura-500">{item.notification}</Badge>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-gray-200 lg:bg-white lg:pt-5 lg:pb-4 dark:lg:border-gray-700 dark:lg:bg-gray-800">
        <div className="flex flex-shrink-0 items-center px-6">
          <h1 className="text-2xl font-bold text-insura-600 dark:text-white">Discrepay</h1>
        </div>
        <div className="mt-8 flex h-0 flex-1 flex-col overflow-y-auto">
          <nav className="flex-1 space-y-1 px-3">
            {navigation.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                    isActive
                      ? 'bg-insura-50 text-insura-600 dark:bg-gray-700 dark:text-white'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 flex-shrink-0 ${
                      isActive ? 'text-insura-600 dark:text-white' : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-400'
                    }`}
                    aria-hidden="true"
                  />
                  {item.name}
                  {item.notification && (
                    <Badge className="ml-auto bg-insura-500">{item.notification}</Badge>
                  )}
                </Link>
              );
            })}
          </nav>
          <div className="mt-6 px-3">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/settings">
                <Settings className="mr-3 h-5 w-5" />
                Settings
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col lg:pl-64">
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
          <button
            type="button"
            className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-insura-500 dark:border-gray-700 dark:text-gray-400 lg:hidden"
            onClick={toggleSidebar}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex flex-1 justify-between px-4">
            <div className="flex flex-1 items-center">
              <form className="w-full max-w-lg" onSubmit={handleSearch}>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input 
                    type="search" 
                    placeholder="Search..." 
                    className="pl-10 w-full lg:max-w-xs"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="ml-4 flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="relative"
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-insura-500 text-[10px] text-white flex items-center justify-center">
                      3
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="max-h-80 overflow-y-auto">
                    <DropdownMenuItem className="cursor-pointer p-3">
                      <div>
                        <p className="font-medium">New claim submitted</p>
                        <p className="text-sm text-gray-500">Claim #12345 has been submitted for review</p>
                        <p className="text-xs text-gray-400">2 minutes ago</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer p-3">
                      <div>
                        <p className="font-medium">Policy renewal reminder</p>
                        <p className="text-sm text-gray-500">5 policies are up for renewal next week</p>
                        <p className="text-xs text-gray-400">1 hour ago</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer p-3">
                      <div>
                        <p className="font-medium">Reconciliation complete</p>
                        <p className="text-sm text-gray-500">April reconciliation has been completed</p>
                        <p className="text-xs text-gray-400">3 hours ago</p>
                      </div>
                    </DropdownMenuItem>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <div className="text-center w-full">
                      <span className="text-insura-600">View all</span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-insura-100 text-insura-800">RJ</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6 dark:bg-gray-900 dark:text-gray-200">
          {children}
        </main>
      </div>
    </div>
  );
}
