import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Bot, 
  Calendar, 
  MessageSquare, 
  ShoppingCart, 
  CreditCard,
  HeadphonesIcon,
  FileText,
  Users,
  ArrowRight,
  ArrowLeft,
  Eye,
  Zap,
  Clock,
  X,
  Upload,
  Instagram,
  Globe,
  UserCheck,
  Settings,
  CheckCircle,
  Play
} from "lucide-react";

interface Agent {
  id: string;
  name: string;
  lastUsed: string;
  status: "Active" | "Paused";
}

interface Template {
  id: string;
  name: string;
  description: string;
  features: string[];
}

interface StepData {
  industry: string;
  businessName: string;
  website: string;
  instagram: string;
  twitter: string;
  tasks: string[];
  customTask: string;
  communicationStyle: string;
  customCharacter?: {
    name: string;
    age: string;
    gender: string;
    style: string;
  };
  knowledgeBase: {
    faq: string;
    productInfo: string;
    websiteLinks: string;
  };
  integrations: {
    googleCalendar: boolean;
    whatsappBusiness: boolean;
    instagramDM: boolean;
    websiteEmbed: boolean;
    shopify: boolean;
    crm: boolean;
  };
}

const Builder = () => {
  const navigate = useNavigate();
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [stepData, setStepData] = useState<StepData>({
    industry: "",
    businessName: "",
    website: "",
    instagram: "",
    twitter: "",
    tasks: [],
    customTask: "",
    communicationStyle: "",
    knowledgeBase: {
      faq: "",
      productInfo: "",
      websiteLinks: ""
    },
    integrations: {
      googleCalendar: false,
      whatsappBusiness: false,
      instagramDM: false,
      websiteEmbed: false,
      shopify: false,
      crm: false
    }
  });

  // Mock data
  const agents: Agent[] = [
    { id: "1", name: "Agent 1", lastUsed: "son used on Today", status: "Active" },
    { id: "2", name: "Agent 2", lastUsed: "last used on This Week", status: "Active" },
    { id: "3", name: "Agent 3", lastUsed: "last used on This Month", status: "Active" }
  ];

  const templates: Template[] = [
    {
      id: "customer-service",
      name: "Müşteri Hizmetleri",
      description: "7/24 müşteri sorularına yanıt veren AI asistan",
      features: ["Sık sorulan sorular", "Ürün bilgileri", "Destek talepleri"]
    },
    {
      id: "sales-assistant",
      name: "Satış Asistanı", 
      description: "Potansiyel müşterileri niteleyip satış sürecini destekler",
      features: ["Lead niteleme", "Ürün önerileri", "Fiyat bilgileri"]
    },
    {
      id: "appointment-booking",
      name: "Randevu Sistemi",
      description: "Otomatik randevu alma ve yönetimi",
      features: ["Takvim entegrasyonu", "Randevu hatırlatma", "Yeniden planlama"]
    },
    {
      id: "e-commerce",
      name: "E-ticaret Asistanı",
      description: "Online mağaza için sipariş ve destek",
      features: ["Sipariş takibi", "Ürün önerileri", "İade süreçleri"]
    },
    {
      id: "restaurant",
      name: "Restoran Asistanı",
      description: "Masa rezervasyonu ve menü bilgileri",
      features: ["Masa rezervasyonu", "Menü sorguları", "Çalışma saatleri"]
    },
    {
      id: "healthcare",
      name: "Sağlık Asistanı",
      description: "Hasta bilgilendirme ve randevu sistemi",
      features: ["Randevu alma", "Genel bilgiler", "Hatırlatmalar"]
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

  const taskOptions = [
    "Müşteri sorularını cevaplasın",
    "Randevu alsın", 
    "Sipariş alsın",
    "Ödeme yardımcı olsun",
    "Ürün önerisi sunsun",
    "Teknik destek",
    "Başvuru/kayıt alsın",
    "Takvimle entegre olsun"
  ];

  const communicationStyles = [
    "Resmî",
    "Samimi", 
    "Mizahi",
    "Sessiz",
    "Özgün Karakter"
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

  const handleTaskToggle = (task: string) => {
    setStepData(prev => ({
      ...prev,
      tasks: prev.tasks.includes(task) 
        ? prev.tasks.filter(t => t !== task)
        : [...prev.tasks, task]
    }));
  };

  const handleIntegrationToggle = (integration: keyof StepData['integrations']) => {
    setStepData(prev => ({
      ...prev,
      integrations: {
        ...prev.integrations,
        [integration]: !prev.integrations[integration]
      }
    }));
  };

  const handleDeploy = () => {
    // Handle deployment logic
    console.log("Agent deployed!", stepData);
    setIsWizardOpen(false);
    setCurrentStep(1);
    // Reset form data if needed
  };

  const openTemplateModal = (template: Template) => {
    setSelectedTemplate(template);
    setIsTemplateModalOpen(true);
  };

  const useTemplate = () => {
    // Apply template to wizard
    setIsTemplateModalOpen(false);
    setIsWizardOpen(true);
  };

  const renderWizardStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">İşletmeni Tanıyalım</h3>
              <p className="text-muted-foreground">İşletmen hakkında temel bilgileri öğrenelim</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="industry">İşletmen hangi sektörde faaliyet gösteriyor?</Label>
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
                <Label htmlFor="businessName">İşletmenin adı nedir?</Label>
                <Input
                  id="businessName"
                  value={stepData.businessName}
                  onChange={(e) => setStepData(prev => ({ ...prev, businessName: e.target.value }))}
                  placeholder="İşletme adını girin"
                />
              </div>

              <div>
                <Label className="text-sm font-medium">Web siten ya da sosyal medya adresin var mı? (Opsiyonel)</Label>
                <div className="space-y-3 mt-2">
                  <Input
                    value={stepData.website}
                    onChange={(e) => setStepData(prev => ({ ...prev, website: e.target.value }))}
                    placeholder="Web sitesi"
                  />
                  <Input
                    value={stepData.instagram}
                    onChange={(e) => setStepData(prev => ({ ...prev, instagram: e.target.value }))}
                    placeholder="Instagram"
                  />
                  <Input
                    value={stepData.twitter}
                    onChange={(e) => setStepData(prev => ({ ...prev, twitter: e.target.value }))}
                    placeholder="Twitter"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Bu Agent Ne İş Yapacak?</h3>
              <p className="text-muted-foreground">Hangi görevleri yerine getirmesini istiyorsun?</p>
            </div>
            
            <div className="space-y-4">
              {taskOptions.map((task) => (
                <div key={task} className="flex items-center space-x-2">
                  <Checkbox
                    id={task}
                    checked={stepData.tasks.includes(task)}
                    onCheckedChange={() => handleTaskToggle(task)}
                  />
                  <Label htmlFor={task}>{task}</Label>
                </div>
              ))}
              
              <div className="pt-4">
                <Label htmlFor="customTask">Diğer (özel görev)</Label>
                <Textarea
                  id="customTask"
                  value={stepData.customTask}
                  onChange={(e) => setStepData(prev => ({ ...prev, customTask: e.target.value }))}
                  placeholder="Özel bir görev varsa açıklayın..."
                  rows={3}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Nasıl Davransın?</h3>
              <p className="text-muted-foreground">İletişim tarzını seç</p>
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

            {stepData.communicationStyle === "Özgün Karakter" && (
              <div className="space-y-4 p-4 border rounded-lg">
                <h4 className="font-medium">Karakter Detayları</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="charName">İsim</Label>
                    <Input
                      id="charName"
                      value={stepData.customCharacter?.name || ""}
                      onChange={(e) => setStepData(prev => ({
                        ...prev,
                        customCharacter: { ...prev.customCharacter, name: e.target.value } as any
                      }))}
                      placeholder="Karakter ismi"
                    />
                  </div>
                  <div>
                    <Label htmlFor="charAge">Yaş</Label>
                    <Input
                      id="charAge"
                      value={stepData.customCharacter?.age || ""}
                      onChange={(e) => setStepData(prev => ({
                        ...prev,
                        customCharacter: { ...prev.customCharacter, age: e.target.value } as any
                      }))}
                      placeholder="Yaş"
                    />
                  </div>
                  <div>
                    <Label htmlFor="charGender">Cinsiyet</Label>
                    <Input
                      id="charGender"
                      value={stepData.customCharacter?.gender || ""}
                      onChange={(e) => setStepData(prev => ({
                        ...prev,
                        customCharacter: { ...prev.customCharacter, gender: e.target.value } as any
                      }))}
                      placeholder="Cinsiyet"
                    />
                  </div>
                  <div>
                    <Label htmlFor="charStyle">Konuşma Tarzı</Label>
                    <Input
                      id="charStyle"
                      value={stepData.customCharacter?.style || ""}
                      onChange={(e) => setStepData(prev => ({
                        ...prev,
                        customCharacter: { ...prev.customCharacter, style: e.target.value } as any
                      }))}
                      placeholder="Konuşma tarzı"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Hangi Bilgilerle Çalışsın?</h3>
              <p className="text-muted-foreground">Agent'ın kullanacağı bilgi kaynaklarını ekle</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="faq">FAQ (Sık Sorulan Sorular)</Label>
                <Textarea
                  id="faq"
                  value={stepData.knowledgeBase.faq}
                  onChange={(e) => setStepData(prev => ({
                    ...prev,
                    knowledgeBase: { ...prev.knowledgeBase, faq: e.target.value }
                  }))}
                  placeholder="Sık sorulan sorular ve cevapları..."
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="productInfo">Ürün-Hizmet Bilgisi</Label>
                <div className="space-y-2">
                  <Textarea
                    id="productInfo"
                    value={stepData.knowledgeBase.productInfo}
                    onChange={(e) => setStepData(prev => ({
                      ...prev,
                      knowledgeBase: { ...prev.knowledgeBase, productInfo: e.target.value }
                    }))}
                    placeholder="Ürün ve hizmet detayları..."
                    rows={4}
                  />
                  <div className="flex items-center gap-2 p-3 border border-dashed rounded-lg">
                    <Upload className="h-4 w-4" />
                    <span className="text-sm text-muted-foreground">Google Sheet yükle (opsiyonel)</span>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="websiteLinks">Web Sayfaları Linkleri</Label>
                <Textarea
                  id="websiteLinks"
                  value={stepData.knowledgeBase.websiteLinks}
                  onChange={(e) => setStepData(prev => ({
                    ...prev,
                    knowledgeBase: { ...prev.knowledgeBase, websiteLinks: e.target.value }
                  }))}
                  placeholder="İlgili web sayfası linklerini ekle..."
                  rows={3}
                />
              </div>

              <div className="p-4 border border-dashed rounded-lg">
                <h4 className="font-medium mb-2">Opsiyonel</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• Instagram mesaj geçmişi</p>
                  <p>• WhatsApp mesaj geçmişi</p>
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
              <p className="text-muted-foreground">Kullanmak istediğin platformları seç</p>
            </div>
            
            <div className="space-y-4">
              {[
                { key: 'googleCalendar', name: 'Google Takvim', icon: Calendar },
                { key: 'whatsappBusiness', name: 'WhatsApp Business API', icon: MessageSquare },
                { key: 'instagramDM', name: 'Instagram DM', icon: Instagram },
                { key: 'websiteEmbed', name: 'Website Embed', icon: Globe },
                { key: 'shopify', name: 'Shopify/WooCommerce', icon: ShoppingCart },
                { key: 'crm', name: 'CRM/ERP', icon: Users }
              ].map((integration) => {
                const IconComponent = integration.icon;
                return (
                  <div key={integration.key} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <IconComponent className="h-5 w-5 text-primary" />
                      <span className="font-medium">{integration.name}</span>
                    </div>
                    <Switch
                      checked={stepData.integrations[integration.key as keyof typeof stepData.integrations]}
                      onCheckedChange={() => handleIntegrationToggle(integration.key as keyof typeof stepData.integrations)}
                    />
                  </div>
                );
              })}
              
              <div className="text-center pt-4">
                <Button variant="ghost" className="text-muted-foreground">
                  Şimdilik geç
                </Button>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Önizleme ve Yayınla</h3>
              <p className="text-muted-foreground">Agent'ın son halini kontrol et</p>
            </div>
            
            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Agent Adı</h4>
                  <p className="mt-1">{stepData.businessName || "Belirtilmedi"} Agent'ı</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Görev Özeti</h4>
                  <div className="mt-1 space-y-1">
                    {stepData.tasks.map((task, index) => (
                      <Badge key={index} variant="secondary" className="mr-1 mb-1">{task}</Badge>
                    ))}
                    {stepData.customTask && (
                      <Badge variant="secondary" className="mr-1 mb-1">{stepData.customTask}</Badge>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Persona Özeti</h4>
                  <p className="mt-1">{stepData.communicationStyle || "Belirtilmedi"}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Entegrasyon Özeti</h4>
                  <div className="mt-1 space-y-1">
                    {Object.entries(stepData.integrations)
                      .filter(([_, enabled]) => enabled)
                      .map(([key, _]) => (
                        <Badge key={key} variant="outline" className="mr-1 mb-1">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </Badge>
                      ))}
                  </div>
                </div>
              </div>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="w-full">
                <Eye className="w-4 h-4 mr-2" />
                Önizlemeyi Gör
              </Button>
              <Button onClick={handleDeploy} className="w-full">
                <Play className="w-4 h-4 mr-2" />
                Yayına Al
              </Button>
              <Button variant="ghost" className="w-full">
                Daha sonra düzenle
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* LEFT PANEL */}
          <div className="space-y-8">
            
            {/* My Agents Card */}
            <Card className="bg-gradient-to-br from-background to-muted/20 backdrop-blur-sm border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  My Agents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {agents.map((agent) => (
                  <div key={agent.id} className="flex items-center justify-between p-3 border rounded-lg bg-background/50">
                    <div>
                      <p className="font-medium">{agent.name}</p>
                      <p className="text-sm text-muted-foreground">{agent.lastUsed}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={agent.status === "Active" ? "default" : "secondary"}>
                        {agent.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button 
                  variant="ghost" 
                  className="w-full mt-4"
                  onClick={() => navigate('/dashboard')}
                >
                  View All
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Templates Section */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Templates</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {templates.map((template) => (
                  <Card key={template.id} className="hover:shadow-lg transition-all cursor-pointer group">
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">{template.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                      <div className="space-y-1 mb-4">
                        {template.features.map((feature, index) => (
                          <div key={index} className="text-xs text-muted-foreground flex items-center gap-1">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            {feature}
                          </div>
                        ))}
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground"
                        onClick={() => openTemplateModal(template)}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="flex items-start justify-center lg:pt-20">
            <Card className="w-full max-w-md bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Builder</h2>
                  <p className="text-muted-foreground">Create your AI worker in 2 mins!</p>
                </div>
                
                <Button 
                  size="lg" 
                  className="w-full h-12 text-lg"
                  onClick={() => setIsWizardOpen(true)}
                >
                  <Bot className="h-5 w-5 mr-2" />
                  Start Building
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Wizard Modal */}
      <Dialog open={isWizardOpen} onOpenChange={setIsWizardOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto backdrop-blur-xl bg-background/95">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle>Adım {currentStep}/6</DialogTitle>
              <Button variant="ghost" size="sm" onClick={() => setIsWizardOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <Progress value={progressPercentage} className="mt-4" />
          </DialogHeader>
          
          <div className="py-6 min-h-[400px]">
            {renderWizardStep()}
          </div>
          
          <div className="flex justify-between pt-6 border-t">
            <Button 
              variant="outline" 
              onClick={handlePrev}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Geri
            </Button>
            
            <Button 
              onClick={currentStep === totalSteps ? handleDeploy : handleNext}
            >
              {currentStep === totalSteps ? (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Yayına Al
                </>
              ) : (
                <>
                  İleri
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Template Modal */}
      <Dialog open={isTemplateModalOpen} onOpenChange={setIsTemplateModalOpen}>
        <DialogContent className="max-w-2xl backdrop-blur-xl bg-background/95">
          <DialogHeader>
            <DialogTitle>{selectedTemplate?.name}</DialogTitle>
          </DialogHeader>
          
          {selectedTemplate && (
            <div className="space-y-6 py-4">
              <p className="text-muted-foreground">{selectedTemplate.description}</p>
              
              <div>
                <h4 className="font-medium mb-3">Özellikler:</h4>
                <div className="space-y-2">
                  {selectedTemplate.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <Button onClick={useTemplate} className="w-full">
                  <Zap className="h-4 w-4 mr-2" />
                  Use This Template
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Builder;