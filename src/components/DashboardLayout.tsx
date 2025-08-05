import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Bot, 
  MessageSquare, 
  Settings as SettingsIcon, 
  HelpCircle, 
  Plus, 
  User, 
  LogOut,
  Wrench,
  Menu
} from "lucide-react";
import AgentCreationWizard from "@/components/AgentCreationWizard";
import DashboardSupport from "@/pages/dashboard/DashboardSupport";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { supabase } from "@/integrations/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [showAccountPopup, setShowAccountPopup] = useState(false);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getUser();
  }, []);

  const navigationItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Bot, label: "Agents", path: "/dashboard/agents" },
    { icon: MessageSquare, label: "Messages", path: "/dashboard/messages" },
    { icon: Wrench, label: "Integrations & Tools", path: "/dashboard/integrations" },
    { icon: SettingsIcon, label: "Settings", path: "/dashboard/settings" },
    { icon: HelpCircle, label: "Support", path: "/dashboard/support" },
  ];

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const handleNavigation = (path: string) => {
    if (path === "/dashboard/support") {
      setSupportOpen(true);
    } else {
      navigate(path);
    }
  };

  const isActiveRoute = (path: string) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col bg-sidebar border-r">
        <div className="flex h-16 items-center px-6 border-b">
          <h2 className="text-lg font-semibold text-sidebar-foreground">Nonplo</h2>
        </div>
        
        {/* New Agent Button */}
        <div className="p-4 border-b">
          <Button 
            onClick={() => setWizardOpen(true)} 
            className="w-full justify-start bg-primary hover:bg-primary/90"
          >
            <Plus className="mr-3 h-4 w-4" />
            Yeni Çalışan Oluştur
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => (
            <Button
              key={item.label}
              variant={isActiveRoute(item.path) ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => handleNavigation(item.path)}
            >
              <item.icon className="mr-3 h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t relative">
          <div 
            className="flex items-center space-x-3 mb-2 cursor-pointer hover:bg-accent rounded p-2"
            onClick={() => setShowAccountPopup(!showAccountPopup)}
          >
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <User className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-medium text-sidebar-foreground">
              {user?.user_metadata?.full_name || user?.email || "Kullanıcı"}
            </span>
          </div>

          {/* Account Popup */}
          {showAccountPopup && (
            <div className="absolute bottom-full left-4 right-4 mb-2 bg-background border border-border rounded-lg shadow-lg p-4 z-50">
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {user?.user_metadata?.full_name || "Kullanıcı"}
                  </p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
                <div className="text-xs text-muted-foreground">
                  Aylık 4 agent hakkın kaldı
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => navigate('/account')}
                >
                  Hesabı Yönet
                </Button>
              </div>
            </div>
          )}

          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-start text-muted-foreground"
            onClick={handleSignOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Çıkış Yap
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b bg-background sticky top-0 z-30">
          <div className="flex items-center space-x-3">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="min-h-[48px] min-w-[48px]">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <div className="flex h-full flex-col bg-sidebar">
                  {/* Mobile Menu Header */}
                  <div className="flex h-16 items-center justify-between px-6 border-b">
                    <h2 className="text-lg font-semibold text-sidebar-foreground">Nonplo</h2>
                  </div>
                  
                  {/* New Agent Button */}
                  <div className="p-4 border-b">
                    <Button 
                      onClick={() => {
                        setWizardOpen(true);
                        setMobileMenuOpen(false);
                      }} 
                      className="w-full justify-start bg-primary hover:bg-primary/90 min-h-[48px]"
                    >
                      <Plus className="mr-3 h-4 w-4" />
                      Yeni Çalışan Oluştur
                    </Button>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex-1 p-4 space-y-2">
                    {navigationItems.map((item) => (
                      <Button
                        key={item.label}
                        variant={isActiveRoute(item.path) ? "secondary" : "ghost"}
                        className="w-full justify-start min-h-[48px] text-sidebar-foreground"
                        onClick={() => {
                          handleNavigation(item.path);
                          setMobileMenuOpen(false);
                        }}
                      >
                        <item.icon className="mr-3 h-4 w-4" />
                        {item.label}
                      </Button>
                    ))}
                  </nav>

                  {/* Mobile User Section */}
                  <div className="p-4 border-t">
                    <div className="space-y-3 mb-4">
                      <div>
                        <p className="text-sm font-medium text-sidebar-foreground">
                          {user?.user_metadata?.full_name || "Kullanıcı"}
                        </p>
                        <p className="text-xs text-muted-foreground">{user?.email}</p>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Aylık 4 agent hakkın kaldı
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full min-h-[48px]"
                        onClick={() => {
                          navigate('/account');
                          setMobileMenuOpen(false);
                        }}
                      >
                        Hesabı Yönet
                      </Button>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start text-muted-foreground min-h-[48px]"
                      onClick={handleSignOut}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Çıkış Yap
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <h1 className="text-lg font-semibold">Nonplo</h1>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>

      {/* Overlay to close popup */}
      {showAccountPopup && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setShowAccountPopup(false)}
        />
      )}

      {/* Agent Creation Wizard */}
      <AgentCreationWizard 
        open={wizardOpen} 
        onClose={() => setWizardOpen(false)} 
      />

      {/* Support Modal */}
      {supportOpen && (
        <DashboardSupport onClose={() => setSupportOpen(false)} />
      )}
    </div>
  );
};

export default DashboardLayout;