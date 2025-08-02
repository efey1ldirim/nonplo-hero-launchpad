import { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  Bot, 
  MessageSquare, 
  Settings as SettingsIcon, 
  HelpCircle, 
  Plus, 
  User, 
  LogOut,
  BarChart3,
  Wrench
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [showAccountPopup, setShowAccountPopup] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getUser();
  }, []);

  const navigationItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard", active: true },
    { icon: Bot, label: "Agents", path: "/dashboard/agents", active: false },
    { icon: MessageSquare, label: "Messages", path: "/dashboard/messages", active: false },
    { icon: Wrench, label: "Integrations & Tools", path: "/dashboard/integrations", active: false },
    { icon: SettingsIcon, label: "Settings", path: "/dashboard/settings", active: false },
    { icon: HelpCircle, label: "Support", path: "/dashboard/support", active: false },
  ];

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
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
            onClick={() => navigate('/builder')} 
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
              variant={item.active ? "secondary" : "ghost"}
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
                  onClick={() => navigate('/dashboard/settings')}
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
        <div className="lg:hidden flex items-center justify-between p-4 border-b bg-background">
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <Button variant="outline" size="sm">
            <LayoutDashboard className="h-4 w-4" />
          </Button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Agent Yönetim Paneli
              </h1>
              <p className="text-muted-foreground text-lg">
                AI çalışanlarınızı yönetin ve kontrol edin
              </p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Aktif Agent Sayısı
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">2</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Günlük Mesaj
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">147</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Toplam Etkileşim
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">1.2k</div>
                </CardContent>
              </Card>
            </div>

            {/* Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Son 7 Gün Etkileşim Trendi</span>
                </CardTitle>
                <CardDescription>
                  Günlük mesaj ve etkileşim istatistikleri
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-lg flex items-end justify-center space-x-2 p-4">
                  {[20, 35, 45, 30, 55, 40, 60].map((height, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-t from-primary to-purple-500 rounded-t-sm w-8 transition-all hover:opacity-80"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-4 text-xs text-muted-foreground">
                  <span>Pzt</span>
                  <span>Sal</span>
                  <span>Çar</span>
                  <span>Per</span>
                  <span>Cum</span>
                  <span>Cmt</span>
                  <span>Paz</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Overlay to close popup */}
      {showAccountPopup && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setShowAccountPopup(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;