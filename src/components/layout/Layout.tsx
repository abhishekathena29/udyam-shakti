import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Home, BookOpen, TrendingUp, Gift, User, LogOut } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface LayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: 'Home', href: '/dashboard', icon: Home },
  { name: 'Learn', href: '/learn', icon: BookOpen },
  { name: 'Track', href: '/track', icon: TrendingUp },
  { name: 'Rewards', href: '/rewards', icon: Gift },
  { name: 'Profile', href: '/profile', icon: User },
];

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, bizCoins } = useApp();
  const { logout, userProfile } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="border-b border-sidebar-border">
          <div className="flex items-center gap-3 px-4 py-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-glow-primary">
              <span className="text-lg">🚀</span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-sm font-semibold">Udyam Shakti</span>
              <span className="text-xs text-muted-foreground">Empower Your Business</span>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className={
                          isActive
                            ? 'border-l-2 border-primary bg-primary/10 font-medium text-primary hover:bg-primary/15 hover:text-primary'
                            : 'border-l-2 border-transparent'
                        }
                      >
                        <Link to={item.href}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="border-t border-sidebar-border">
          <div className="gradient-primary m-2 flex items-center justify-between rounded-xl px-3 py-2.5 text-white shadow-soft">
            <span className="flex items-center gap-1.5 text-sm font-medium">
              <span className="text-base">🪙</span>
              BizCoins
            </span>
            <span className="font-heading font-semibold">{bizCoins.total.toLocaleString()}</span>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 px-4 shadow-soft backdrop-blur">
          <SidebarTrigger className="-ml-1" />
          <div className="flex flex-1 items-center justify-between">
            <h1 className="font-heading text-lg font-semibold">
              {navigation.find((item) => item.href === location.pathname)?.name || 'Udyam Shakti'}
            </h1>
            <div className="flex items-center gap-4">
              {userProfile && (
                <span className="text-sm text-muted-foreground">
                  Welcome, {userProfile.name}
                </span>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

