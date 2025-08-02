import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
  EyeOff,
  TrendingUp
} from "lucide-react";

const Dashboard = () => {
  const [showSteps, setShowSteps] = useState(true);
  const [showStats, setShowStats] = useState(true);

  const navigationItems = [
    { name: "Dashboard", icon: LayoutDashboard, active: true },
    { name: "Agents", icon: Bot, active: false },
    { name: "Messages", icon: MessageSquare, active: false },
    { name: "Integrations", icon: Plug, active: false },
    { name: "Settings", icon: Settings, active: false },
    { name: "Support", icon: HelpCircle, active: false },
  ];

  const agentSteps = [
    { 
      id: 1, 
      title: "Agent Oluştur", 
      description: "Yeni bir AI agent hesabı oluşturun",
      completed: true 
    },
    { 
      id: 2, 
      title: "Görevini Belirle", 
      description: "Agent'ınızın görev tanımını yazın",
      completed: true 
    },
    { 
      id: 3, 
      title: "Bilgi Yükle", 
      description: "FAQ, ürün/hizmet bilgilerini yükleyin",
      completed: false 
    },
    { 
      id: 4, 
      title: "Entegrasyonları Tamamla", 
      description: "WhatsApp, web chat entegrasyonları",
      completed: false 
    },
    { 
      id: 5, 
      title: "Yayına Al", 
      description: "Agent'ınızı müşterilerinizle buluşturun",
      completed: false 
    },
  ];

  const currentStep = agentSteps.findIndex(step => !step.completed) + 1;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-slate-900 text-white">
        {/* Brand Section */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center space-x-2">
            <Bot className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">Nonplo</span>
          </div>
        </div>

        {/* Workspace Section */}
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-300">Çalışma Alanı</span>
            <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-slate-400 hover:text-white">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-sm font-medium">luxetfortuna</div>
          <div className="text-xs text-slate-400 mt-1">Agent API aktif değil</div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navigationItems.map((item) => (
            <a
              key={item.name}
              href="#"
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                item.active 
                  ? "bg-primary text-primary-foreground" 
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </a>
          ))}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center space-x-3 mb-3">
            <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">Efe Yıldırım</div>
              <div className="text-xs text-slate-400">luxetfortuna</div>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="w-full justify-start text-slate-300 hover:text-white">
            <LogOut className="h-4 w-4 mr-2" />
            Çıkış Yap
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64 flex-1">
        <main className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-bold text-foreground">Agent Yönetim Paneli</h1>
              <Badge variant="outline" className="text-sm">
                Adım {currentStep}/5
              </Badge>
            </div>
            <p className="text-muted-foreground text-lg">
              AI çalışanlarınızı yönetin ve kontrol edin
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Agent Setup Steps */}
            <div className="xl:col-span-3">
              {showSteps && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Bot className="h-5 w-5" />
                      <span>Agent Kurulum Adımları</span>
                    </CardTitle>
                    <CardDescription>
                      Agent'ınızı oluşturmak ve yayına almak için bu adımları takip edin
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {agentSteps.map((step, index) => (
                      <div
                        key={step.id}
                        className={`flex items-center space-x-4 p-4 rounded-lg border transition-all cursor-pointer ${
                          step.completed 
                            ? "bg-muted/50 border-muted hover:bg-muted/70" 
                            : "bg-background border-primary/20 hover:border-primary/40 hover:shadow-sm"
                        }`}
                      >
                        <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                          step.completed 
                            ? "bg-green-100 text-green-600" 
                            : "bg-primary/10 text-primary"
                        }`}>
                          {step.completed ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <span className="text-sm font-medium">{step.id}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-medium ${step.completed ? "text-muted-foreground" : "text-foreground"}`}>
                            {step.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                        {!step.completed && (
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Stats Panel */}
            {showStats && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BarChart3 className="h-5 w-5" />
                      <span>Agent İstatistikleri</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Aktif Agent</span>
                        <span className="text-2xl font-bold text-primary">1</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Günlük Mesaj</span>
                        <span className="text-2xl font-bold">0</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Toplam Etkileşim</span>
                        <span className="text-2xl font-bold">0</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5" />
                      <span>7 Günlük Trend</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-32 flex items-center justify-center text-muted-foreground">
                      <div className="text-center">
                        <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Henüz veri yok</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Bottom Utility */}
          <div className="mt-8 flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSteps(!showSteps)}
              className="flex items-center space-x-2"
            >
              {showSteps ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <span>{showSteps ? "Adımları Gizle" : "Adımları Göster"}</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowStats(!showStats)}
              className="flex items-center space-x-2"
            >
              {showStats ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <span>{showStats ? "İstatistikleri Gizle" : "İstatistikleri Göster"}</span>
            </Button>
          </div>
        </main>
      </div>

      {/* Mobile Menu Trigger - Hidden on desktop */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <Button size="icon" className="h-12 w-12 rounded-full shadow-lg">
          <LayoutDashboard className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;