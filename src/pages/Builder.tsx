import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, ArrowRight, ArrowLeft, Monitor, Zap, MessageSquare, Calendar, Phone, Globe, Instagram, Search, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Builder = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [wizardOpen, setWizardOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [currentSubStep, setCurrentSubStep] = useState(1);
  const [templateModalOpen, setTemplateModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  
  // Form states
  const [wizardData, setWizardData] = useState({
    sector: "",
    businessName: "",
    location: "",
    hours: "",
    website: "",
    instagram: "",
    twitter: "",
    tiktok: "",
    faq: "",
    products: "",
    tone: "",
    responseLength: "",
    userVerification: "",
    serviceType: "",
    taskDescription: "",
    tools: {
      calendar: false,
      googleDocs: false,
      contentPermissions: false
    },
    integrations: {
      whatsapp: false,
      instagram: false,
      website: false,
      phone: false,
      sms: false
    }
  });

  const [customRequest, setCustomRequest] = useState({
    fullName: "",
    email: "",
    businessName: "",
    description: ""
  });

  const templates = [
    {
      id: 1,
      title: "Müşteri Destek Asistanı",
      description: "7/24 müşteri sorularını yanıtlar ve destek sağlar",
      details: "Müşterilerinizin sorularını anında yanıtlar, sipariş takibi yapar ve teknik destek sağlar.",
      useCase: "E-ticaret siteleri, SaaS platformları"
    },
    {
      id: 2,
      title: "Rezervasyon Asistanı",
      description: "Otomatik randevu alır ve takvim yönetimi yapar",
      details: "Müşteri rezervasyonlarını otomatik olarak alır, uygun saatleri gösterir ve takvimi günceller.",
      useCase: "Restoranlar, kuaförler, klinikler"
    },
    {
      id: 3,
      title: "Satış Danışmanı",
      description: "Ürün önerileri yapar ve satış sürecini yönetir",
      details: "Müşteri ihtiyaçlarını analiz eder, uygun ürünleri önerir ve satış sürecini takip eder.",
      useCase: "Perakende, e-ticaret"
    },
    {
      id: 4,
      title: "Emlak Danışmanı",
      description: "Gayrimenkul sorularını yanıtlar ve tur ayarlar",
      details: "Emlak portföyünüzü tanıtır, müşteri sorularını yanıtlar ve gezme randevuları ayarlar.",
      useCase: "Emlak ofisleri, gayrimenkul yatırımcıları"
    },
    {
      id: 5,
      title: "Fitness Koçu",
      description: "Egzersiz planları ve beslenme tavsiyeleri verir",
      details: "Kişiselleştirilmiş antrenman programları oluşturur ve beslenme önerileri sunar.",
      useCase: "Spor salonları, fitness antrenörleri"
    },
    {
      id: 6,
      title: "Eğitim Asistanı",
      description: "Öğrenci sorularını yanıtlar ve ders programı yönetir",
      details: "Kurs içerikleri hakkında bilgi verir, ödev takibi yapar ve öğrenci ilerlemesini izler.",
      useCase: "Eğitim kurumları, online kurslar"
    }
  ];

  const sectors = ["Restoran", "E-Ticaret", "Güzellik Salonu", "Sağlık", "Eğitim"];

  const totalSteps = currentStep === 2 ? 11 : 6;
  const stepNumber = currentStep === 2 ? currentSubStep : currentStep;

  const handleNext = () => {
    if (currentStep === 2) {
      if (currentSubStep < 11) {
        setCurrentSubStep(currentSubStep + 1);
      } else {
        setCurrentStep(3);
        setCurrentSubStep(1);
      }
    } else if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep === 2) {
      if (currentSubStep > 1) {
        setCurrentSubStep(currentSubStep - 1);
      } else {
        setCurrentStep(1);
      }
    } else if (currentStep === 3) {
      setCurrentStep(2);
      setCurrentSubStep(11);
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleWizardClose = () => {
    if (confirm("İlerlemeniz kaybolacak. Emin misiniz?")) {
      setWizardOpen(false);
      setCurrentStep(1);
      setCurrentSubStep(1);
    }
  };

  const handleTemplateUse = (template: any) => {
    setSelectedTemplate(template);
    setTemplateModalOpen(false);
    setWizardOpen(true);
    setWizardData(prev => ({ ...prev, taskDescription: template.details }));
  };

  const handleCustomRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Talebiniz alındı!",
      description: "Ekibimiz en kısa sürede sizinle iletişime geçecek.",
    });
    
    setCustomRequest({
      fullName: "",
      email: "",
      businessName: "",
      description: ""
    });
  };

  const renderWizardStep = () => {
    if (currentStep === 1) {
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Hangi sektörde faaliyet gösteriyorsunuz?</h2>
          <div className="space-y-4">
            <div className="relative">
              <Input
                placeholder="Cevabını buraya yaz..."
                value={wizardData.sector}
                onChange={(e) => setWizardData(prev => ({ ...prev, sector: e.target.value }))}
                className="pr-10"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            </div>
            <div className="flex flex-wrap gap-2">
              {sectors.map((sector) => (
                <Button
                  key={sector}
                  variant="outline"
                  size="sm"
                  onClick={() => setWizardData(prev => ({ ...prev, sector }))}
                  className="text-primary border-primary/20"
                >
                  {sector}
                </Button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (currentStep === 2) {
      const step2Content = {
        1: {
          title: "İşletmenin adı nedir?",
          content: (
            <Input
              placeholder="Cevabını buraya yaz..."
              value={wizardData.businessName}
              onChange={(e) => setWizardData(prev => ({ ...prev, businessName: e.target.value }))}
            />
          )
        },
        2: {
          title: "Konum bilgisi",
          content: (
            <Input
              placeholder="Şehir, ilçe bilgisi..."
              value={wizardData.location}
              onChange={(e) => setWizardData(prev => ({ ...prev, location: e.target.value }))}
            />
          )
        },
        3: {
          title: "Açık saatler ve tatil günleri",
          content: (
            <Textarea
              placeholder="Örn: Pazartesi-Cuma 09:00-18:00, Cumartesi 10:00-16:00..."
              value={wizardData.hours}
              onChange={(e) => setWizardData(prev => ({ ...prev, hours: e.target.value }))}
            />
          )
        },
        4: {
          title: "Web siten ya da sosyal medya adresin var mı?",
          content: (
            <div className="space-y-3">
              <Input
                placeholder="Web sitesi"
                value={wizardData.website}
                onChange={(e) => setWizardData(prev => ({ ...prev, website: e.target.value }))}
              />
              <Input
                placeholder="Instagram"
                value={wizardData.instagram}
                onChange={(e) => setWizardData(prev => ({ ...prev, instagram: e.target.value }))}
              />
              <Input
                placeholder="Twitter"
                value={wizardData.twitter}
                onChange={(e) => setWizardData(prev => ({ ...prev, twitter: e.target.value }))}
              />
              <Input
                placeholder="Tiktok"
                value={wizardData.tiktok}
                onChange={(e) => setWizardData(prev => ({ ...prev, tiktok: e.target.value }))}
              />
            </div>
          )
        },
        5: {
          title: "Sık sorulan sorular",
          content: (
            <Textarea
              placeholder="Müşterilerinizin sık sorduğu sorular ve cevaplar..."
              value={wizardData.faq}
              onChange={(e) => setWizardData(prev => ({ ...prev, faq: e.target.value }))}
            />
          )
        },
        6: {
          title: "Ürün veya hizmet bilgileri",
          content: (
            <Textarea
              placeholder="Ürün/hizmetleriniz hakkında detaylı bilgi..."
              value={wizardData.products}
              onChange={(e) => setWizardData(prev => ({ ...prev, products: e.target.value }))}
            />
          )
        },
        7: {
          title: "Mesaj geçmişi (Instagram / WhatsApp) [İsteğe bağlı]",
          content: (
            <div className="text-center p-8 border-2 border-dashed border-muted-foreground/30 rounded-lg">
              <p className="text-muted-foreground">Dosya yüklemek için tıklayın</p>
            </div>
          )
        },
        8: {
          title: "Kullanıcılara hangi tonla hitap edilmeli?",
          content: (
            <Textarea
              placeholder="Örn: Samimi ve yardımsever, profesyonel, eğlenceli..."
              value={wizardData.tone}
              onChange={(e) => setWizardData(prev => ({ ...prev, tone: e.target.value }))}
            />
          )
        },
        9: {
          title: "Cevaplar kısa mı, uzun mu?",
          content: (
            <div className="space-y-3">
              {["Kısa ve öz", "Orta uzunluk", "Detaylı açıklamalar"].map((option) => (
                <Button
                  key={option}
                  variant={wizardData.responseLength === option ? "default" : "outline"}
                  onClick={() => setWizardData(prev => ({ ...prev, responseLength: option }))}
                  className="w-full justify-start"
                >
                  {option}
                </Button>
              ))}
            </div>
          )
        },
        10: {
          title: "Kullanıcı doğrulama gerekiyor mu?",
          content: (
            <div className="space-y-3">
              {["Evet, gerekli", "Hayır, herkese açık"].map((option) => (
                <Button
                  key={option}
                  variant={wizardData.userVerification === option ? "default" : "outline"}
                  onClick={() => setWizardData(prev => ({ ...prev, userVerification: option }))}
                  className="w-full justify-start"
                >
                  {option}
                </Button>
              ))}
            </div>
          )
        },
        11: {
          title: "Fiziksel mi, dijital mi hizmet veriyorsunuz?",
          content: (
            <div className="space-y-3">
              {["Fiziksel mağaza/ofis", "Tamamen dijital", "Karma (hibrit)"].map((option) => (
                <Button
                  key={option}
                  variant={wizardData.serviceType === option ? "default" : "outline"}
                  onClick={() => setWizardData(prev => ({ ...prev, serviceType: option }))}
                  className="w-full justify-start"
                >
                  {option}
                </Button>
              ))}
            </div>
          )
        }
      };

      const currentContent = step2Content[currentSubStep as keyof typeof step2Content];
      
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">{currentContent.title}</h2>
          {currentContent.content}
        </div>
      );
    }

    if (currentStep === 3) {
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Yapay zekâ çalışanınız ne iş yapsın?</h2>
          <Textarea
            placeholder="Yapay zeka asistanınızın görevlerini detaylı olarak açıklayın..."
            value={wizardData.taskDescription}
            onChange={(e) => setWizardData(prev => ({ ...prev, taskDescription: e.target.value }))}
            className="min-h-[150px]"
          />
        </div>
      );
    }

    if (currentStep === 4) {
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Araçlar</h2>
          <div className="space-y-4">
            {Object.entries({
              calendar: "Takvim senkronizasyonu",
              googleDocs: "Google Docs",
              contentPermissions: "İçerik izinleri"
            }).map(([key, label]) => (
              <div key={key} className="flex items-center justify-between p-4 border rounded-lg">
                <span>{label}</span>
                <Button
                  variant={wizardData.tools[key as keyof typeof wizardData.tools] ? "default" : "outline"}
                  onClick={() => setWizardData(prev => ({
                    ...prev,
                    tools: { ...prev.tools, [key]: !prev.tools[key as keyof typeof prev.tools] }
                  }))}
                >
                  {wizardData.tools[key as keyof typeof wizardData.tools] ? "Aktif" : "Pasif"}
                </Button>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (currentStep === 5) {
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Entegrasyonlar</h2>
          <div className="space-y-4">
            {Object.entries({
              whatsapp: "WhatsApp",
              instagram: "Instagram",
              website: "Website",
              phone: "Telefon",
              sms: "SMS"
            }).map(([key, label]) => (
              <div key={key} className="flex items-center justify-between p-4 border rounded-lg">
                <span>{label}</span>
                <Button
                  variant={wizardData.integrations[key as keyof typeof wizardData.integrations] ? "default" : "outline"}
                  onClick={() => setWizardData(prev => ({
                    ...prev,
                    integrations: { ...prev.integrations, [key]: !prev.integrations[key as keyof typeof prev.integrations] }
                  }))}
                >
                  {wizardData.integrations[key as keyof typeof wizardData.integrations] ? "Aktif" : "Pasif"}
                </Button>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (currentStep === 6) {
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Önizleme ve Yayınlama</h2>
          <div className="space-y-4 p-6 bg-muted/20 rounded-lg">
            <div><strong>İşletme:</strong> {wizardData.businessName || "Belirtilmedi"}</div>
            <div><strong>Sektör:</strong> {wizardData.sector || "Belirtilmedi"}</div>
            <div><strong>Görev:</strong> {wizardData.taskDescription || "Belirtilmedi"}</div>
            <div><strong>Ton:</strong> {wizardData.tone || "Belirtilmedi"}</div>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="flex-1">Önizlemeyi Gör</Button>
            <Button className="flex-1">Yayına Al</Button>
          </div>
          <Button variant="ghost" className="w-full">Daha Sonra Düzenle</Button>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-20">
        {/* Top Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/dashboard')}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Monitor className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>Çalışan Dashboard'una Git</CardTitle>
                  <CardDescription>Oluşturduğunuz tüm yapay zeka çalışanlarını tek yerden yönetin.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Dashboard'u Aç</Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setWizardOpen(true)}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Zap className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>Çalışan Oluşturucu Başlat</CardTitle>
                  <CardDescription>Yapay zeka çalışanınızı 5 dakikada adım adım oluşturun.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Sihirbazı Başlat</Button>
            </CardContent>
          </Card>
        </div>

        {/* Templates Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-2">Çalışan Şablonları</h2>
          <p className="text-muted-foreground mb-8">Hazır şablonlarla hızlıca başlayın</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{template.title}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setSelectedTemplate(template);
                      setTemplateModalOpen(true);
                    }}
                  >
                    Detayları Gör
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Custom Request Form */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <MessageSquare className="h-6 w-6 text-primary" />
              Özel Yapay Zeka Çalışanına İhtiyacınız Var mı?
            </CardTitle>
            <CardDescription>
              Ekibimiz sizin için özel bir tane oluşturabilir. İhtiyacınızı bize anlatın.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCustomRequestSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Ad Soyad</Label>
                  <Input
                    id="fullName"
                    value={customRequest.fullName}
                    onChange={(e) => setCustomRequest(prev => ({ ...prev, fullName: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">E-posta</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customRequest.email}
                    onChange={(e) => setCustomRequest(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="businessName">İşletme Adı</Label>
                <Input
                  id="businessName"
                  value={customRequest.businessName}
                  onChange={(e) => setCustomRequest(prev => ({ ...prev, businessName: e.target.value }))}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">İhtiyaç Açıklaması</Label>
                <Textarea
                  id="description"
                  placeholder="İhtiyacınız olan yapay zeka çalışanını detaylı olarak açıklayın..."
                  value={customRequest.description}
                  onChange={(e) => setCustomRequest(prev => ({ ...prev, description: e.target.value }))}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full">
                Talep Gönder
              </Button>
              
              <p className="text-sm text-muted-foreground text-center">
                Özel ajanslar ek geliştirme ücretlerine tabidir.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Wizard Modal */}
      {wizardOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
            onClick={handleWizardClose}
          />
          
          {/* Modal Content */}
          <div className="relative bg-background border rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] mx-4 overflow-hidden">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-8 border-b">
                <h3 className="text-2xl font-bold text-primary">
                  Adım {stepNumber}/{totalSteps}
                </h3>
                <Button variant="ghost" size="icon" onClick={handleWizardClose}>
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-auto p-8">
                {renderWizardStep()}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between p-8 border-t bg-muted/20">
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Geri
                </Button>
                
                <Button 
                  onClick={handleNext} 
                  disabled={currentStep === 6}
                  className="flex items-center gap-2"
                >
                  İleri
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Template Details Modal */}
      <Dialog open={templateModalOpen} onOpenChange={setTemplateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedTemplate?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>{selectedTemplate?.details}</p>
            <div>
              <h4 className="font-semibold mb-2">Kullanım Alanı:</h4>
              <p className="text-muted-foreground">{selectedTemplate?.useCase}</p>
            </div>
            <Button 
              onClick={() => handleTemplateUse(selectedTemplate)} 
              className="w-full"
            >
              Bu Şablonu Kullan
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Builder;