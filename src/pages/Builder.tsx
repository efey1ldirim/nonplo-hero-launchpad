import { useState } from "react";
import Header from "@/components/Header";
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
  UserCheck
} from "lucide-react";

interface Template {
  id: string;
  name: string;
  description: string;
  icon: any;
  category: string;
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

const Sihirbaz = () => {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
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

  // Mock account data
  const accountData = {
    name: "Ahmet Yılmaz",
    plan: "Premium Plan",
    monthlyUsage: {
      used: 7500,
      total: 10000,
      percentage: 75
    }
  };

  const templates: Template[] = [
    {
      id: "customer-service",
      name: "Müşteri Hizmetleri",
      description: "7/24 müşteri sorularına yanıt veren AI asistan",
      icon: HeadphonesIcon,
      category: "Destek"
    },
    {
      id: "sales-assistant",
      name: "Satış Asistanı", 
      description: "Potansiyel müşterileri niteleyip satış sürecini destekler",
      icon: ShoppingCart,
      category: "Satış"
    },
    {
      id: "appointment-booking",
      name: "Randevu Sistemi",
      description: "Otomatik randevu alma ve yönetimi",
      icon: Calendar,
      category: "Randevu"
    },
    {
      id: "e-commerce",
      name: "E-ticaret Asistanı",
      description: "Online mağaza için sipariş ve destek",
      icon: Package,
      category: "E-ticaret"
    },
    {
      id: "restaurant",
      name: "Restoran Asistanı",
      description: "Masa rezervasyonu ve menü bilgileri",
      icon: Users,
      category: "Restoran"
    },
    {
      id: "healthcare",
      name: "Sağlık Asistanı",
      description: "Hasta bilgilendirme ve randevu sistemi",
      icon: UserCheck,
      category: "Sağlık"
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

  const totalSteps = 5;
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
    setIsWizardOpen(false);
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

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Top Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Account Info Card */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Hesap Bilgileri
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Hesap Adı</p>
                <p className="font-medium">{accountData.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Güncel Plan</p>
                <Badge variant="default">{accountData.plan}</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Aylık Kullanım Hakkı</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{accountData.monthlyUsage.used.toLocaleString()}</span>
                    <span>{accountData.monthlyUsage.total.toLocaleString()}</span>
                  </div>
                  <Progress value={accountData.monthlyUsage.percentage} className="w-full" />
                  <p className="text-xs text-muted-foreground">
                    {accountData.monthlyUsage.percentage}% kullanıldı
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Setup Wizard Card */}
          <Card className="bg-white cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setIsWizardOpen(true)}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Kurulum Sihirbazı
              </CardTitle>
              <CardDescription>
                Yapay zeka çalışanınızı 5 dakikada hazır hale getirin
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button size="lg" className="w-full">
                <Bot className="h-4 w-4 mr-2" />
                Sihirbazı Başlat
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Templates Section */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-8">Şablonlar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => {
              const IconComponent = template.icon;
              return (
                <Card key={template.id} className="bg-white hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <IconComponent className="h-5 w-5" />
                      {template.name}
                    </CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary">{template.category}</Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Wizard Modal */}
      <Dialog open={isWizardOpen} onOpenChange={setIsWizardOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Kurulum Sihirbazı</DialogTitle>
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
                Tamamla
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
    </div>
  );
};

export default Sihirbaz;