import { useState } from "react";
import { 
  LayoutDashboard, 
  Bot, 
  MessageSquare, 
  Plug, 
  Settings, 
  HelpCircle, 
  Plus, 
  User, 
  LogOut,
  Check,
  ChevronRight,
  BarChart3,
  Eye,
  EyeOff
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const [showSteps, setShowSteps] = useState(true);
  const [showStats, setShowStats] = useState(true);

  const navigationItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: Bot, label: "Agents", active: false },
    { icon: MessageSquare, label: "Messages", active: false },
    { icon: Plug, label: "Integrations", active: false },
    { icon: Settings, label: "Settings", active: false },
    { icon: HelpCircle, label: "Support", active: false },
  ];

  const agentSteps = [
    { id: 1, title: "Agent oluştur", completed: true },
    { id: 2, title: "Görevini belirle", completed: true },
    { id: 3, title: "Bilgi yükle (FAQ, ürün/hizmet)", completed: false },
    { id: 4, title: "Entegrasyonları tamamla", completed: false },
    { id: 5, title: "Yayına al", completed: false },
  ];

  const completedSteps = agentSteps.filter(step => step.completed).length;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col bg-sidebar border-r">
        <div className="flex h-16 items-center px-6 border-b">
          <h2 className="text-lg font-semibold text-sidebar-foreground">Nonplo</h2>
        </div>
        
        {/* Brand Section */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-sidebar-foreground">luxetfortuna</span>
            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Badge variant="outline" className="text-xs">
            Agent API aktif değil
          </Badge>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => (
            <Button
              key={item.label}
              variant={item.active ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <item.icon className="mr-3 h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t">
          <div className="flex items-center space-x-3 mb-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <User className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-medium text-sidebar-foreground">Kullanıcı</span>
          </div>
          <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground">
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
              <p className="text-muted-foreground text-lg mb-4">
                AI çalışanlarınızı yönetin ve kontrol edin
              </p>
              <div className="text-sm text-muted-foreground">
                Adım {completedSteps + 1}/5
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Agent Setup Checklist */}
              <div className="xl:col-span-2">
                {showSteps && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Agent Kurulum Adımları</CardTitle>
                      <CardDescription>
                        AI agentinizi kurmak için bu adımları tamamlayın
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {agentSteps.map((step) => (
                        <div
                          key={step.id}
                          className={`flex items-center justify-between p-4 rounded-lg border transition-all hover:shadow-md cursor-pointer ${
                            step.completed 
                              ? "bg-muted text-muted-foreground" 
                              : "bg-background hover:bg-accent"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`h-6 w-6 rounded-full flex items-center justify-center ${
                              step.completed 
                                ? "bg-primary text-primary-foreground" 
                                : "bg-muted text-muted-foreground"
                            }`}>
                              {step.completed ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <span className="text-xs font-medium">{step.id}</span>
                              )}
                            </div>
                            <span className={step.completed ? "line-through" : ""}>{step.title}</span>
                          </div>
                          {!step.completed && (
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Stats Panel */}
              <div className="space-y-6">
                {showStats && (
                  <>
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <BarChart3 className="h-5 w-5" />
                          <span>Agent İstatistikleri</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                          <div className="text-center p-4 rounded-lg bg-accent">
                            <div className="text-2xl font-bold text-foreground">2</div>
                            <div className="text-sm text-muted-foreground">Aktif Agent</div>
                          </div>
                          <div className="text-center p-4 rounded-lg bg-accent">
                            <div className="text-2xl font-bold text-foreground">147</div>
                            <div className="text-sm text-muted-foreground">Günlük Mesaj</div>
                          </div>
                          <div className="text-center p-4 rounded-lg bg-accent">
                            <div className="text-2xl font-bold text-foreground">1.2k</div>
                            <div className="text-sm text-muted-foreground">Toplam Etkileşim</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Son 7 Gün Etkileşim Trendi</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-24 bg-accent rounded flex items-end justify-center space-x-1 p-2">
                          {[20, 35, 45, 30, 55, 40, 60].map((height, index) => (
                            <div
                              key={index}
                              className="bg-primary rounded-sm w-3"
                              style={{ height: `${height}%` }}
                            />
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>
            </div>

            {/* Bottom Utility */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                variant="outline"
                onClick={() => setShowSteps(!showSteps)}
                className="flex items-center space-x-2"
              >
                {showSteps ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span>{showSteps ? "Adımları Gizle" : "Adımları Göster"}</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowStats(!showStats)}
                className="flex items-center space-x-2"
              >
                {showStats ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span>{showStats ? "Grafiği Gizle" : "Grafiği Göster"}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;