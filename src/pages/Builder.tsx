import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, ArrowRight, ArrowLeft, Monitor, Zap, MessageSquare, Calendar, Phone, Globe, Instagram, Search, ChevronDown, Upload, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Builder = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [wizardOpen, setWizardOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [currentSubStep, setCurrentSubStep] = useState(1);
  const [templateModalOpen, setTemplateModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);
  
  // Form states
  const [wizardData, setWizardData] = useState({
    sector: "",
    businessName: "",
    location: "",
    address: "",
    weeklyHours: {
      monday: { open: "09:00", close: "18:00", closed: false },
      tuesday: { open: "09:00", close: "18:00", closed: false },
      wednesday: { open: "09:00", close: "18:00", closed: false },
      thursday: { open: "09:00", close: "18:00", closed: false },
      friday: { open: "09:00", close: "18:00", closed: false },
      saturday: { open: "10:00", close: "16:00", closed: false },
      sunday: { open: "10:00", close: "16:00", closed: true }
    },
    holidays: "",
    website: "",
    instagramUsername: "",
    twitterUsername: "",
    tiktokUsername: "",
    faq: "",
    products: "",
    messageHistory: null,
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

  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

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

  const toneOptions = [
    "Resmî",
    "Samimi", 
    "Mizahi",
    "Kısa ve direkt",
    "Yaratıcı / Hikâyeleştiren"
  ];

  const getStepDisplay = () => {
    if (currentStep === 2) {
      return `2.${currentSubStep}/2.11`;
    }
    return `${currentStep}/6`;
  };

  const validateCurrentStep = () => {
    const errors: { [key: string]: string } = {};
    
    if (currentStep === 1) {
      if (!wizardData.sector.trim()) {
        errors.sector = "Lütfen sektörünüzü seçin";
      }
    } else if (currentStep === 2) {
      switch (currentSubStep) {
        case 1:
          if (!wizardData.businessName.trim()) {
            errors.businessName = "Lütfen işletme adını girin";
          }
          break;
        case 2:
          if (!wizardData.address.trim()) {
            errors.address = "Lütfen adres bilgisini girin";
          }
          break;
        case 5:
          if (!wizardData.faq.trim()) {
            errors.faq = "Lütfen sık sorulan soruları girin";
          }
          break;
        case 6:
          if (!wizardData.products.trim()) {
            errors.products = "Lütfen ürün/hizmet bilgilerini girin";
          }
          break;
        case 8:
          if (!wizardData.tone) {
            errors.tone = "Lütfen bir ton seçin";
          }
          break;
        case 9:
          if (!wizardData.responseLength) {
            errors.responseLength = "Lütfen yanıt uzunluğunu seçin";
          }
          break;
        case 10:
          if (!wizardData.userVerification) {
            errors.userVerification = "Lütfen kullanıcı doğrulama tercihini seçin";
          }
          break;
        case 11:
          if (!wizardData.serviceType) {
            errors.serviceType = "Lütfen hizmet türünü seçin";
          }
          break;
      }
    } else if (currentStep === 3) {
      if (!wizardData.taskDescription.trim()) {
        errors.taskDescription = "Lütfen görev tanımını girin";
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) {
      return;
    }

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
    setShowExitConfirmation(true);
  };

  const confirmExit = () => {
    setWizardOpen(false);
    setShowExitConfirmation(false);
    setCurrentStep(1);
    setCurrentSubStep(1);
    setValidationErrors({});
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setWizardData(prev => ({ ...prev, messageHistory: file }));
      toast({
        title: "Dosya yüklendi",
        description: `${file.name} başarıyla yüklendi.`,
      });
    }
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
            {validationErrors.sector && (
              <p className="text-sm text-destructive">{validationErrors.sector}</p>
            )}
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
            <div className="space-y-3">
              <Input
                placeholder="Cevabını buraya yaz..."
                value={wizardData.businessName}
                onChange={(e) => setWizardData(prev => ({ ...prev, businessName: e.target.value }))}
              />
              {validationErrors.businessName && (
                <p className="text-sm text-destructive">{validationErrors.businessName}</p>
              )}
            </div>
          )
        },
        2: {
          title: "Konum bilgisi",
          content: (
            <div className="space-y-4">
              <div className="relative">
                <Input
                  placeholder="Adres arayın..."
                  value={wizardData.address}
                  onChange={(e) => setWizardData(prev => ({ ...prev, address: e.target.value }))}
                  className="pr-10"
                />
                <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              </div>
              {validationErrors.address && (
                <p className="text-sm text-destructive">{validationErrors.address}</p>
              )}
              <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/30">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Harita burada görünecek</p>
                  <p className="text-sm text-muted-foreground">Adres girdiğinizde pin gösterilecek</p>
                </div>
              </div>
            </div>
          )
        },
        3: {
          title: "Açık saatler ve tatil günleri",
          content: (
            <div className="space-y-4">
              {Object.entries(wizardData.weeklyHours).map(([day, hours]) => (
                <div key={day} className="flex items-center gap-4 p-3 border rounded-lg">
                  <div className="w-20 text-sm font-medium capitalize">
                    {day === 'monday' ? 'Pazartesi' :
                     day === 'tuesday' ? 'Salı' :
                     day === 'wednesday' ? 'Çarşamba' :
                     day === 'thursday' ? 'Perşembe' :
                     day === 'friday' ? 'Cuma' :
                     day === 'saturday' ? 'Cumartesi' : 'Pazar'}
                  </div>
                  <div className="flex items-center gap-2 flex-1">
                    <Input
                      type="time"
                      value={hours.open}
                      onChange={(e) => setWizardData(prev => ({
                        ...prev,
                        weeklyHours: {
                          ...prev.weeklyHours,
                          [day]: { ...hours, open: e.target.value }
                        }
                      }))}
                      disabled={hours.closed}
                      className="w-24"
                    />
                    <span className="text-muted-foreground">-</span>
                    <Input
                      type="time"
                      value={hours.close}
                      onChange={(e) => setWizardData(prev => ({
                        ...prev,
                        weeklyHours: {
                          ...prev.weeklyHours,
                          [day]: { ...hours, close: e.target.value }
                        }
                      }))}
                      disabled={hours.closed}
                      className="w-24"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`${day}-closed`} className="text-sm">Kapalı</Label>
                    <Switch
                      id={`${day}-closed`}
                      checked={hours.closed}
                      onCheckedChange={(checked) => setWizardData(prev => ({
                        ...prev,
                        weeklyHours: {
                          ...prev.weeklyHours,
                          [day]: { ...hours, closed: checked }
                        }
                      }))}
                    />
                  </div>
                </div>
              ))}
              <div className="mt-4">
                <Label htmlFor="holidays">Tatil Günleri (isteğe bağlı)</Label>
                <Textarea
                  id="holidays"
                  placeholder="Örn: 1 Ocak, 23 Nisan, Ramazan Bayramı..."
                  value={wizardData.holidays}
                  onChange={(e) => setWizardData(prev => ({ ...prev, holidays: e.target.value }))}
                />
              </div>
            </div>
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
                placeholder="Instagram kullanıcı adınız (örn: @kafekardesler)"
                value={wizardData.instagramUsername}
                onChange={(e) => setWizardData(prev => ({ ...prev, instagramUsername: e.target.value }))}
              />
              <Input
                placeholder="Twitter kullanıcı adınız"
                value={wizardData.twitterUsername}
                onChange={(e) => setWizardData(prev => ({ ...prev, twitterUsername: e.target.value }))}
              />
              <Input
                placeholder="TikTok kullanıcı adınız"
                value={wizardData.tiktokUsername}
                onChange={(e) => setWizardData(prev => ({ ...prev, tiktokUsername: e.target.value }))}
              />
            </div>
          )
        },
        5: {
          title: "Sık sorulan sorular",
          content: (
            <div className="space-y-3">
              <Textarea
                placeholder="Müşterilerinizin sık sorduğu sorular ve cevaplar..."
                value={wizardData.faq}
                onChange={(e) => setWizardData(prev => ({ ...prev, faq: e.target.value }))}
                className="min-h-[120px]"
              />
              {validationErrors.faq && (
                <p className="text-sm text-destructive">{validationErrors.faq}</p>
              )}
            </div>
          )
        },
        6: {
          title: "Ürün veya hizmet bilgileri",
          content: (
            <div className="space-y-3">
              <Textarea
                placeholder="Ürün/hizmetleriniz hakkında detaylı bilgi..."
                value={wizardData.products}
                onChange={(e) => setWizardData(prev => ({ ...prev, products: e.target.value }))}
                className="min-h-[120px]"
              />
              {validationErrors.products && (
                <p className="text-sm text-destructive">{validationErrors.products}</p>
              )}
            </div>
          )
        },
        7: {
          title: "Instagram veya WhatsApp mesaj geçmişiniz varsa yükleyebilirsiniz (isteğe bağlı)",
          content: (
            <div className="space-y-4">
              <div className="text-center p-8 border-2 border-dashed border-muted-foreground/30 rounded-lg">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <Button variant="outline" onClick={() => document.getElementById('file-upload')?.click()}>
                  Dosya Yükle (.txt)
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  accept=".txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                {wizardData.messageHistory && (
                  <p className="text-sm text-primary mt-2">
                    ✓ {wizardData.messageHistory.name} yüklendi
                  </p>
                )}
              </div>
            </div>
          )
        },
        8: {
          title: "Kullanıcılara hangi tonla hitap edilmeli?",
          content: (
            <div className="space-y-3">
              {toneOptions.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={option}
                    name="tone"
                    value={option}
                    checked={wizardData.tone === option}
                    onChange={(e) => setWizardData(prev => ({ ...prev, tone: e.target.value }))}
                    className="w-4 h-4 text-primary"
                  />
                  <Label htmlFor={option} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
              {validationErrors.tone && (
                <p className="text-sm text-destructive">{validationErrors.tone}</p>
              )}
            </div>
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
              {validationErrors.responseLength && (
                <p className="text-sm text-destructive">{validationErrors.responseLength}</p>
              )}
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
              {validationErrors.userVerification && (
                <p className="text-sm text-destructive">{validationErrors.userVerification}</p>
              )}
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
              {validationErrors.serviceType && (
                <p className="text-sm text-destructive">{validationErrors.serviceType}</p>
              )}
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
          <div className="p-4 bg-muted/20 rounded-lg border-l-4 border-primary">
            <p className="text-sm text-muted-foreground">
              <strong>Örn:</strong> "Müşterilerden gelen mesajlara hızlıca yanıt verip rezervasyon alacak. Gerekirse ödeme bağlantısı gönderecek."
            </p>
          </div>
          <Textarea
            placeholder="Yapay zeka asistanınızın görevlerini detaylı olarak açıklayın..."
            value={wizardData.taskDescription}
            onChange={(e) => setWizardData(prev => ({ ...prev, taskDescription: e.target.value }))}
            className="min-h-[150px]"
          />
          {validationErrors.taskDescription && (
            <p className="text-sm text-destructive">{validationErrors.taskDescription}</p>
          )}
        </div>
      );
    }

    if (currentStep === 4) {
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Araçlar</h2>
          <div className="space-y-4">
            {Object.entries({
              calendar: "Google Takvim",
              googleDocs: "Docs Paylaşımı",
              contentPermissions: "İçerik İzinleri"
            }).map(([key, label]) => (
              <div key={key} className="flex items-center justify-between p-4 border rounded-lg">
                <span className="font-medium">{label}</span>
                <Switch
                  checked={wizardData.tools[key as keyof typeof wizardData.tools]}
                  onCheckedChange={(checked) => setWizardData(prev => ({
                    ...prev,
                    tools: { ...prev.tools, [key]: checked }
                  }))}
                />
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
              whatsapp: "WhatsApp Business",
              instagram: "Instagram",
              website: "Website",
              phone: "Telefon",
              sms: "SMS"
            }).map(([key, label]) => (
              <div key={key} className="flex items-center justify-between p-4 border rounded-lg">
                <span className="font-medium">{label}</span>
                <Switch
                  checked={wizardData.integrations[key as keyof typeof wizardData.integrations]}
                  onCheckedChange={(checked) => setWizardData(prev => ({
                    ...prev,
                    integrations: { ...prev.integrations, [key]: checked }
                  }))}
                />
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
            <div><strong>Aktif Araçlar:</strong> {Object.entries(wizardData.tools).filter(([_, active]) => active).map(([key, _]) => key).join(", ") || "Hiçbiri"}</div>
            <div><strong>Entegrasyonlar:</strong> {Object.entries(wizardData.integrations).filter(([_, active]) => active).map(([key, _]) => key).join(", ") || "Hiçbiri"}</div>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="flex-1">Önizlemeyi Gör</Button>
            <Button className="flex-1">Yayına Al</Button>
          </div>
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
                Özel çalışanlar ek geliştirme ücretlerine tabidir.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Wizard Modal */}
      {wizardOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
            onClick={handleWizardClose}
          />
          
          {/* Modal Content */}
          <div className="relative bg-background border rounded-3xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden mt-30 mb-20">
            <div className="flex flex-col h-[95vh]">
              {/* Header */}
              <div className="flex items-center justify-between p-8 border-b">
                <h3 className="text-2xl font-bold text-primary">
                  Adım {getStepDisplay()}
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

      {/* Exit Confirmation Modal */}
      {showExitConfirmation && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowExitConfirmation(false)} />
          <div className="relative bg-background rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Emin misiniz?</h3>
            <p className="text-muted-foreground mb-6">
              Kurulumdan çıktığınızda bilgileriniz kaybolacaktır. Emin misiniz?
            </p>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setShowExitConfirmation(false)}>
                İptal
              </Button>
              <Button variant="destructive" onClick={confirmExit}>
                Evet, Çık
              </Button>
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