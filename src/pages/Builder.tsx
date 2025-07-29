import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Bot, 
  Calendar, 
  MessageSquare, 
  ShoppingCart, 
  HeadphonesIcon,
  Users,
  ArrowRight,
  ArrowLeft,
  Zap,
  CheckCircle,
  Play,
  User,
  Package,
  UserCheck,
  Home,
  CreditCard,
  BarChart3,
  BookOpen,
  Settings,
  X,
  Eye,
  Clock,
  CheckCircle2
} from "lucide-react";
import { Link } from "react-router-dom";

interface Agent {
  id: string;
  name: string;
  lastUsed: string;
  status: "active" | "inactive" | "draft";
}

interface Template {
  id: string;
  name: string;
  description: string;
  icon: any;
  category: string;
  features: string[];
  detailedDescription: string;
}

interface StepData {
  businessName: string;
  industry: string;
  description: string;
  goals: string[];
  communicationStyle: string;
  knowledgeBase: string;
  integrations: string[];
}

const Builder = () => {
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [stepData, setStepData] = useState<StepData>({
    businessName: "",
    industry: "",
    description: "",
    goals: [],
    communicationStyle: "",
    knowledgeBase: "",
    integrations: []
  });

  // Mock agents data
  const myAgents: Agent[] = [
    {
      id: "1",
      name: "Müşteri Destek Asistanı",
      lastUsed: "Bugün kullanıldı",
      status: "active"
    },
    {
      id: "2", 
      name: "Satış Temsilcisi",
      lastUsed: "2 gün önce kullanıldı",
      status: "active"
    },
    {
      id: "3",
      name: "Randevu Sistemi",
      lastUsed: "1 hafta önce kullanıldı", 
      status: "inactive"
    }
  ];

  const templates: Template[] = [
    {
      id: "customer-service",
      name: "Müşteri Hizmetleri",
      description: "7/24 müşteri sorularına yanıt veren AI asistan",
      icon: HeadphonesIcon,
      category: "Destek",
      features: ["7/24 Destek", "Çoklu Dil", "Otomatik Yönlendirme"],
      detailedDescription: "Müşterilerinizin sorularını anında yanıtlayan, sorunları çözen ve gerektiğinde insan temsilcilere yönlendiren gelişmiş AI asistanı."
    },
    {
      id: "sales-assistant",
      name: "Satış Asistanı", 
      description: "Potansiyel müşterileri niteleyip satış sürecini destekler",
      icon: ShoppingCart,
      category: "Satış",
      features: ["Lead Niteleme", "Ürün Önerisi", "Sipariş Takibi"],
      detailedDescription: "Potansiyel müşterileri analiz eden, en uygun ürünleri öneren ve satış sürecini optimize eden AI asistanı."
    },
    {
      id: "appointment-booking",
      name: "Randevu Sistemi",
      description: "Otomatik randevu alma ve yönetimi",
      icon: Calendar,
      category: "Randevu",
      features: ["Takvim Entegrasyonu", "SMS Hatırlatma", "Otomatik Planlama"],
      detailedDescription: "Müşterilerinizin kolayca randevu alabildiği, otomatik hatırlatmalar gönderen akıllı randevu sistemi."
    },
    {
      id: "e-commerce",
      name: "E-ticaret Asistanı",
      description: "Online mağaza için sipariş ve destek",
      icon: Package,
      category: "E-ticaret",
      features: ["Ürün Arama", "Sipariş Takibi", "İade Süreçleri"],
      detailedDescription: "E-ticaret sitenizde müşteri deneyimini artıran, sipariş sürecini kolaylaştıran AI asistanı."
    },
    {
      id: "restaurant",
      name: "Restoran Asistanı",
      description: "Masa rezervasyonu ve menü bilgileri",
      icon: Users,
      category: "Restoran",
      features: ["Masa Rezervasyonu", "Menü Bilgisi", "Özel Diyet Önerileri"],
      detailedDescription: "Restoranınız için masa rezervasyonu alan, menü hakkında bilgi veren ve özel istekleri karşılayan AI asistanı."
    },
    {
      id: "healthcare",
      name: "Sağlık Asistanı",
      description: "Hasta bilgilendirme ve randevu sistemi",
      icon: UserCheck,
      category: "Sağlık",
      features: ["Randevu Alma", "Hasta Bilgilendirme", "Raporlama"],
      detailedDescription: "Sağlık kuruluşunuz için hasta randevularını yöneten ve temel sağlık bilgileri sağlayan AI asistanı."
    }
  ];

  const industries = [
    "Restoran / Kafe",
    "E-ticaret", 
    "Sağlık",
    "Güzellik / Kuaför",
    "Eğitim",
    "Gayrimenkul",
    "Finans",
    "Teknoloji",
    "Turizm",
    "Diğer"
  ];

  const goals = [
    "Müşteri sorularını yanıtlama",
    "Randevu alma", 
    "Sipariş alma",
    "Ödeme desteği",
    "Ürün önerisi",
    "Teknik destek",
    "Kayıt alma",
    "Takvim entegrasyonu"
  ];

  const communicationStyles = [
    "Resmî ve Profesyonel",
    "Samimi ve Dostane", 
    "Mizahi ve Esprili",
    "Kısa ve Öz"
  ];

  const integrationOptions = [
    "WhatsApp Business",
    "Instagram DM",
    "Website Chat",
    "Google Takvim",
    "E-ticaret Platformu",
    "CRM Sistemi"
  ];

  const totalSteps = 6;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGoalToggle = (goal: string) => {
    setStepData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal) 
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const handleIntegrationToggle = (integration: string) => {
    setStepData(prev => ({
      ...prev,
      integrations: prev.integrations.includes(integration)
        ? prev.integrations.filter(i => i !== integration)
        : [...prev.integrations, integration]
    }));
  };

  const handleFinish = () => {
    console.log("Agent oluşturuldu!", stepData);
    setIsBuilderOpen(false);
    setCurrentStep(1);
    setStepData({
      businessName: "",
      industry: "",
      description: "",
      goals: [],
      communicationStyle: "",
      knowledgeBase: "",
      integrations: []
    });
  };

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    setIsTemplateModalOpen(true);
  };

  const handleUseTemplate = () => {
    console.log("Şablon kullanılıyor:", selectedTemplate);
    setIsTemplateModalOpen(false);
    setSelectedTemplate(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Aktif</Badge>;
      case "inactive":
        return <Badge variant="secondary">Pasif</Badge>;
      case "draft":
        return <Badge variant="outline">Taslak</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const renderWizardStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">İşletmenizi Tanıyalım</h3>
              <p className="text-muted-foreground">İşletmeniz hakkında temel bilgileri öğrenelim</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="businessName">İşletmenizin adı nedir?</Label>
                <Input
                  id="businessName"
                  value={stepData.businessName}
                  onChange={(e) => setStepData(prev => ({ ...prev, businessName: e.target.value }))}
                  placeholder="İşletme adını girin"
                />
              </div>

              <div>
                <Label htmlFor="industry">Hangi sektörde faaliyet gösteriyorsunuz?</Label>
                <Select value={stepData.industry} onValueChange={(value) => setStepData(prev => ({ ...prev, industry: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sektör seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">İşletmenizi kısaca tanımlayın</Label>
                <Textarea
                  id="description"
                  value={stepData.description}
                  onChange={(e) => setStepData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="İşletmenizin ne yaptığını kısaca açıklayın..."
                  rows={3}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">AI Asistanınızın Hedefleri</h3>
              <p className="text-muted-foreground">Hangi görevleri yerine getirmesini istiyorsunuz?</p>
            </div>
            
            <div className="space-y-4">
              {goals.map((goal) => (
                <div key={goal} className="flex items-center space-x-2">
                  <Checkbox
                    id={goal}
                    checked={stepData.goals.includes(goal)}
                    onCheckedChange={() => handleGoalToggle(goal)}
                  />
                  <Label htmlFor={goal}>{goal}</Label>
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">İletişim Tarzı</h3>
              <p className="text-muted-foreground">Asistanınızın nasıl iletişim kurmasını istiyorsunuz?</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {communicationStyles.map((style) => (
                <Card 
                  key={style}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    stepData.communicationStyle === style ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setStepData(prev => ({ ...prev, communicationStyle: style }))}
                >
                  <CardContent className="p-4">
                    <h4 className="font-medium">{style}</h4>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Bilgi Bankası</h3>
              <p className="text-muted-foreground">Asistanınızın kullanacağı bilgi kaynaklarını ekleyin</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="knowledgeBase">Bilgi Bankası İçeriği</Label>
                <Textarea
                  id="knowledgeBase"
                  value={stepData.knowledgeBase}
                  onChange={(e) => setStepData(prev => ({ ...prev, knowledgeBase: e.target.value }))}
                  placeholder="FAQ, ürün bilgileri, şirket politikaları ve diğer önemli bilgileri buraya ekleyin..."
                  rows={8}
                />
              </div>

              <div className="p-4 border border-dashed rounded-lg">
                <h4 className="font-medium mb-2">Gelişmiş Seçenekler (Opsiyonel)</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• Dosya yükleme (PDF, Word, Excel)</p>
                  <p>• Web sitesi tarama</p>
                  <p>• Mesaj geçmişi analizi</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Entegrasyonlar</h3>
              <p className="text-muted-foreground">Kullanmak istediğiniz platformları seçin</p>
            </div>
            
            <div className="space-y-4">
              {integrationOptions.map((integration) => (
                <div key={integration} className="flex items-center space-x-2">
                  <Checkbox
                    id={integration}
                    checked={stepData.integrations.includes(integration)}
                    onCheckedChange={() => handleIntegrationToggle(integration)}
                  />
                  <Label htmlFor={integration}>{integration}</Label>
                </div>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Özet ve Onay</h3>
              <p className="text-muted-foreground">Girdiğiniz bilgileri gözden geçirin</p>
            </div>
            
            <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
              <div>
                <p className="font-medium">İşletme Adı:</p>
                <p className="text-muted-foreground">{stepData.businessName || "Belirtilmedi"}</p>
              </div>
              <div>
                <p className="font-medium">Sektör:</p>
                <p className="text-muted-foreground">{stepData.industry || "Belirtilmedi"}</p>
              </div>
              <div>
                <p className="font-medium">Seçilen Hedefler:</p>
                <p className="text-muted-foreground">{stepData.goals.length ? stepData.goals.join(", ") : "Belirtilmedi"}</p>
              </div>
              <div>
                <p className="font-medium">İletişim Tarzı:</p>
                <p className="text-muted-foreground">{stepData.communicationStyle || "Belirtilmedi"}</p>
              </div>
              <div>
                <p className="font-medium">Entegrasyonlar:</p>
                <p className="text-muted-foreground">{stepData.integrations.length ? stepData.integrations.join(", ") : "Belirtilmedi"}</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Bot className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">Nonplo</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                <Home className="h-4 w-4 inline mr-2" />
                Ana Sayfa
              </Link>
              <Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                <CreditCard className="h-4 w-4 inline mr-2" />
                Fiyatlandırma
              </Link>
              <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                <BarChart3 className="h-4 w-4 inline mr-2" />
                Kontrol Paneli
              </Link>
              <Link to="/resources" className="text-muted-foreground hover:text-foreground transition-colors">
                <BookOpen className="h-4 w-4 inline mr-2" />
                Kaynaklar
              </Link>
              <Link to="/account" className="text-muted-foreground hover:text-foreground transition-colors">
                <Settings className="h-4 w-4 inline mr-2" />
                Hesap
              </Link>
            </div>
            
            <Button>
              <Zap className="h-4 w-4 mr-2" />
              Oluşturmaya Başla
            </Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Top Section: My Agents + Builder Button */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* My Agents Section */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                Benim Agentlarım
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {myAgents.length > 0 ? (
                <>
                  {myAgents.map((agent) => (
                    <div key={agent.id} className="flex items-center justify-between p-3 border rounded-lg hover:shadow-sm transition-shadow">
                      <div className="flex-1">
                        <h3 className="font-medium">{agent.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{agent.lastUsed}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(agent.status)}
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          Görüntüle
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Link to="/dashboard">
                    <Button variant="outline" className="w-full mt-4">
                      Tümünü Görüntüle
                    </Button>
                  </Link>
                </>
              ) : (
                <div className="text-center py-8">
                  <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Henüz hiç agent oluşturmadınız.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Builder Button */}
          <Card className="rounded-2xl cursor-pointer hover:shadow-lg transition-all" onClick={() => setIsBuilderOpen(true)}>
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <Zap className="h-16 w-16 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Builder – Yapay Zeka Çalışanınızı 2 Dakikada Oluşturun</h2>
                <p className="text-muted-foreground">Adım adım rehber ile hızlıca kendi AI asistanınızı hayata geçirin</p>
              </div>
              <Button size="lg" className="w-full">
                <Play className="h-5 w-5 mr-2" />
                Oluşturmaya Başla
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Templates Section */}
        <div>
          <h2 className="text-4xl font-bold text-center mb-12">Şablonlar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => {
              const IconComponent = template.icon;
              return (
                <Card key={template.id} className="rounded-2xl hover:shadow-lg transition-all cursor-pointer" onClick={() => handleTemplateSelect(template)}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <IconComponent className="h-5 w-5 text-primary" />
                      {template.name}
                    </CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{template.category}</Badge>
                      <Button size="sm" variant="outline">
                        Detayları Gör
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Builder Wizard Modal */}
      <Dialog open={isBuilderOpen} onOpenChange={setIsBuilderOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto backdrop-blur-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">AI Asistan Oluşturucu</DialogTitle>
            <div className="mt-4">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Adım {currentStep} / {totalSteps}</span>
                <span>{Math.round(progressPercentage)}% tamamlandı</span>
              </div>
              <Progress value={progressPercentage} className="w-full" />
            </div>
          </DialogHeader>
          
          <div className="py-6">
            {renderWizardStep()}
          </div>
          
          <div className="flex justify-between pt-6 border-t">
            <Button 
              variant="outline" 
              onClick={handlePrev}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Geri
            </Button>
            
            {currentStep === totalSteps ? (
              <Button onClick={handleFinish}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Agent Oluştur
              </Button>
            ) : (
              <Button onClick={handleNext}>
                İleri
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Template Details Modal */}
      <Dialog open={isTemplateModalOpen} onOpenChange={setIsTemplateModalOpen}>
        <DialogContent className="max-w-2xl backdrop-blur-md">
          {selectedTemplate && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <selectedTemplate.icon className="h-6 w-6 text-primary" />
                  {selectedTemplate.name}
                </DialogTitle>
              </DialogHeader>
              
              <div className="py-6 space-y-6">
                <p className="text-muted-foreground">{selectedTemplate.detailedDescription}</p>
                
                <div>
                  <h4 className="font-semibold mb-3">Özellikler:</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {selectedTemplate.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge>{selectedTemplate.category}</Badge>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-6 border-t">
                <Button variant="outline" onClick={() => setIsTemplateModalOpen(false)}>
                  İptal
                </Button>
                <Button onClick={handleUseTemplate}>
                  <Bot className="h-4 w-4 mr-2" />
                  Bu Şablonu Kullan
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Builder;