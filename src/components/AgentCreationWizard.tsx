import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, ArrowRight, ArrowLeft, Monitor, Zap, MessageSquare, Calendar, Phone, Globe, Instagram, Search, ChevronDown, Upload, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AgentCreationWizardProps {
  open: boolean;
  onClose: () => void;
}

const AgentCreationWizard = ({ open, onClose }: AgentCreationWizardProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [currentSubStep, setCurrentSubStep] = useState(1);
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
      websiteIntegration: false,
      emailNotifications: false,
      whatsappIntegration: false,
      calendarBooking: false,
      socialMediaMonitoring: false,
      crmIntegration: false,
      analyticsReporting: false,
      multiLanguageSupport: false
    },
    integrations: {
      whatsapp: false,
      instagram: false,
      telegram: false,
      slack: false,
      zapier: false,
      shopify: false,
      woocommerce: false,
      hubspot: false
    }
  });

  const totalSteps = 8;

  const stepTitles = [
    "Sektör Seçimi",
    "İşletme Bilgileri", 
    "Çalışma Saatleri",
    "Sosyal Medya",
    "Ürün/Hizmet Bilgileri",
    "Kişilik & Davranış",
    "Görev Tanımı",
    "Araçlar & Entegrasyonlar"
  ];

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        if (!wizardData.sector.trim()) {
          toast({
            title: "Eksik Bilgi",
            description: "Lütfen sektörünüzü seçin.",
            variant: "destructive",
          });
          return false;
        }
        break;
      case 2:
        if (currentSubStep === 1) {
          if (!wizardData.businessName.trim()) {
            toast({
              title: "Eksik Bilgi",
              description: "Lütfen işletme adınızı girin.",
              variant: "destructive",
            });
            return false;
          }
        }
        if (currentSubStep === 2) {
          if (!wizardData.address.trim()) {
            toast({
              title: "Eksik Bilgi",
              description: "Lütfen adres bilginizi girin.",
              variant: "destructive",
            });
            return false;
          }
        }
        break;
      case 5:
        if (currentSubStep === 1) {
          if (!wizardData.faq.trim()) {
            toast({
              title: "Eksik Bilgi",
              description: "Lütfen sık sorulan sorular bilgisini girin.",
              variant: "destructive",
            });
            return false;
          }
        }
        if (currentSubStep === 2) {
          if (!wizardData.products.trim()) {
            toast({
              title: "Eksik Bilgi",
              description: "Lütfen ürün/hizmet bilgilerinizi girin.",
              variant: "destructive",
            });
            return false;
          }
        }
        break;
      case 6:
        if (currentSubStep === 1) {
          if (!wizardData.tone) {
            toast({
              title: "Eksik Bilgi",
              description: "Lütfen konuşma tarzını seçin.",
              variant: "destructive",
            });
            return false;
          }
        }
        if (currentSubStep === 2) {
          if (!wizardData.responseLength) {
            toast({
              title: "Eksik Bilgi",
              description: "Lütfen yanıt uzunluğunu seçin.",
              variant: "destructive",
            });
            return false;
          }
        }
        if (currentSubStep === 3) {
          if (!wizardData.userVerification) {
            toast({
              title: "Eksik Bilgi",
              description: "Lütfen kullanıcı doğrulama tercihini seçin.",
              variant: "destructive",
            });
            return false;
          }
        }
        if (currentSubStep === 4) {
          if (!wizardData.serviceType) {
            toast({
              title: "Eksik Bilgi",
              description: "Lütfen hizmet türünü seçin.",
              variant: "destructive",
            });
            return false;
          }
        }
        break;
      case 7:
        if (!wizardData.taskDescription.trim()) {
          toast({
            title: "Eksik Bilgi",
            description: "Lütfen görev tanımını girin.",
            variant: "destructive",
          });
          return false;
        }
        break;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;

    if (currentStep === 2 || currentStep === 5 || currentStep === 6) {
      const maxSubSteps = currentStep === 2 ? 2 : currentStep === 5 ? 3 : 4;
      if (currentSubStep < maxSubSteps) {
        setCurrentSubStep(currentSubStep + 1);
        return;
      }
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      setCurrentSubStep(1);
    }
  };

  const handlePrevious = () => {
    if (currentStep === 2 || currentStep === 5 || currentStep === 6) {
      if (currentSubStep > 1) {
        setCurrentSubStep(currentSubStep - 1);
        return;
      }
    }

    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      if (currentStep - 1 === 2 || currentStep - 1 === 5) {
        setCurrentSubStep(currentStep - 1 === 2 ? 2 : 3);
      } else if (currentStep - 1 === 6) {
        setCurrentSubStep(4);
      } else {
        setCurrentSubStep(1);
      }
    }
  };

  const handleWizardClose = () => {
    if (currentStep > 1 || wizardData.sector || wizardData.businessName) {
      setShowExitConfirmation(true);
    } else {
      onClose();
      setCurrentStep(1);
      setCurrentSubStep(1);
    }
  };

  const confirmExit = () => {
    setShowExitConfirmation(false);
    onClose();
    setCurrentStep(1);
    setCurrentSubStep(1);
    setWizardData({
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
        websiteIntegration: false,
        emailNotifications: false,
        whatsappIntegration: false,
        calendarBooking: false,
        socialMediaMonitoring: false,
        crmIntegration: false,
        analyticsReporting: false,
        multiLanguageSupport: false
      },
      integrations: {
        whatsapp: false,
        instagram: false,
        telegram: false,
        slack: false,
        zapier: false,
        shopify: false,
        woocommerce: false,
        hubspot: false
      }
    });
  };

  const handleFinish = () => {
    toast({
      title: "Agent Oluşturuldu!",
      description: "AI çalışanınız başarıyla oluşturuldu ve aktif edildi.",
    });
    onClose();
    setCurrentStep(1);
    setCurrentSubStep(1);
  };

  const renderWizardStep = () => {
    const sectors = [
      "E-ticaret", "Restoran", "Kuaför/Berber", "Emlak", "Sağlık", 
      "Eğitim", "Teknoloji", "Muhasebe", "Hukuk", "Turizm",
      "Otomotiv", "Moda", "Spor", "Güzellik", "Finans", "Diğer"
    ];

    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="sector" className="text-base font-medium">Hangi sektörde faaliyet gösteriyorsunuz?</Label>
              <Input
                id="sector"
                placeholder="Sektör adı yazın..."
                className="mt-2"
                value={wizardData.sector}
                onChange={(e) => setWizardData(prev => ({ ...prev, sector: e.target.value }))}
              />
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-3">Popüler sektörler:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {sectors.map((sector) => (
                  <Button
                    key={sector}
                    variant="outline"
                    className="justify-start h-auto p-3 text-left min-h-[44px] w-full"
                    onClick={() => setWizardData(prev => ({ ...prev, sector }))}
                  >
                    {sector}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        if (currentSubStep === 1) {
          return (
            <div className="space-y-6">
              <div>
                <Label htmlFor="businessName" className="text-base font-medium">İşletme adınız nedir?</Label>
                <Input
                  id="businessName"
                  placeholder="Örn: Mehmet'in Kuaförü"
                  className="mt-2"
                  value={wizardData.businessName}
                  onChange={(e) => setWizardData(prev => ({ ...prev, businessName: e.target.value }))}
                />
              </div>
            </div>
          );
        } else {
          return (
            <div className="space-y-6">
              <div>
                <Label htmlFor="address" className="text-base font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  İşletmenizin adresi nedir?
                </Label>
                <Textarea
                  id="address"
                  placeholder="Tam adres bilgisini girin..."
                  className="mt-2 min-h-[100px]"
                  value={wizardData.address}
                  onChange={(e) => setWizardData(prev => ({ ...prev, address: e.target.value }))}
                />
              </div>
            </div>
          );
        }

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium flex items-center gap-2 mb-4">
                <Clock className="h-4 w-4" />
                Çalışma saatlerinizi belirleyin
              </Label>
              
              <div className="space-y-4">
                {Object.entries(wizardData.weeklyHours).map(([day, hours]) => {
                  const dayNames: { [key: string]: string } = {
                    monday: "Pazartesi",
                    tuesday: "Salı", 
                    wednesday: "Çarşamba",
                    thursday: "Perşembe",
                    friday: "Cuma",
                    saturday: "Cumartesi",
                    sunday: "Pazar"
                  };

                  return (
                    <div key={day} className="flex items-center gap-4 p-3 border rounded-lg">
                      <div className="w-24 text-sm font-medium">{dayNames[day]}</div>
                      
                      <div className="flex items-center gap-2">
                        <Input
                          type="time"
                          value={hours.open}
                          onChange={(e) => setWizardData(prev => ({
                            ...prev,
                            weeklyHours: {
                              ...prev.weeklyHours,
                              [day]: { ...prev.weeklyHours[day as keyof typeof prev.weeklyHours], open: e.target.value }
                            }
                          }))}
                          disabled={hours.closed}
                          className="w-24"
                        />
                        <span className="text-xs text-muted-foreground">-</span>
                        <Input
                          type="time"
                          value={hours.close}
                          onChange={(e) => setWizardData(prev => ({
                            ...prev,
                            weeklyHours: {
                              ...prev.weeklyHours,
                              [day]: { ...prev.weeklyHours[day as keyof typeof prev.weeklyHours], close: e.target.value }
                            }
                          }))}
                          disabled={hours.closed}
                          className="w-24"
                        />
                      </div>
                      
                      <div className="flex items-center gap-2 ml-auto">
                        <Label htmlFor={`${day}-closed`} className="text-xs">Kapalı</Label>
                        <Switch
                          id={`${day}-closed`}
                          checked={hours.closed}
                          onCheckedChange={(checked) => setWizardData(prev => ({
                            ...prev,
                            weeklyHours: {
                              ...prev.weeklyHours,
                              [day]: { ...prev.weeklyHours[day as keyof typeof prev.weeklyHours], closed: checked }
                            }
                          }))}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6">
                <Label htmlFor="holidays" className="text-base font-medium">Özel tatil günleriniz (isteğe bağlı)</Label>
                <Textarea
                  id="holidays"
                  placeholder="Örn: 1 Ocak Yılbaşı, 23 Nisan Ulusal Egemenlik..."
                  className="mt-2"
                  value={wizardData.holidays}
                  onChange={(e) => setWizardData(prev => ({ ...prev, holidays: e.target.value }))}
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div>
                 <Label htmlFor="website" className="text-sm font-medium flex items-center gap-2">
                   <Globe className="h-4 w-4" />
                   Web sitesi
                 </Label>
                 <Input
                   id="website"
                   placeholder="https://ornek.com"
                   className="mt-1 w-full"
                   value={wizardData.website}
                   onChange={(e) => setWizardData(prev => ({ ...prev, website: e.target.value }))}
                 />
               </div>
               <div>
                 <Label htmlFor="instagram" className="text-sm font-medium flex items-center gap-2">
                   <Instagram className="h-4 w-4" />
                   Instagram
                 </Label>
                 <Input
                   id="instagram"
                   placeholder="kullaniciadi"
                   className="mt-1 w-full"
                   value={wizardData.instagramUsername}
                   onChange={(e) => setWizardData(prev => ({ ...prev, instagramUsername: e.target.value }))}
                 />
               </div>
               <div>
                 <Label htmlFor="twitter" className="text-sm font-medium flex items-center gap-2">
                   <X className="h-4 w-4" />
                   X (Twitter)
                 </Label>
                 <Input
                   id="twitter"
                   placeholder="@kullaniciadi"
                   className="mt-1 w-full"
                   value={wizardData.twitterUsername}
                   onChange={(e) => setWizardData(prev => ({ ...prev, twitterUsername: e.target.value }))}
                 />
               </div>
               <div>
                 <Label htmlFor="tiktok" className="text-sm font-medium">TikTok</Label>
                 <Input
                   id="tiktok"
                   placeholder="@kullaniciadi"
                   className="mt-1 w-full"
                   value={wizardData.tiktokUsername}
                   onChange={(e) => setWizardData(prev => ({ ...prev, tiktokUsername: e.target.value }))}
                 />
               </div>
             </div>
          </div>
        );

      case 5:
        if (currentSubStep === 1) {
          return (
            <div className="space-y-6">
              <div>
                <Label htmlFor="faq" className="text-base font-medium">Sık Sorulan Sorular ve Cevapları</Label>
                <Textarea
                  id="faq"
                  placeholder="S: Çalışma saatleriniz nedir?&#10;C: Pazartesi-Cuma 09:00-18:00 arası açığız.&#10;&#10;S: Rezervasyon gerekli mi?&#10;C: Evet, önceden rezervasyon yapmanızı öneririz."
                  className="mt-2 min-h-[200px]"
                  value={wizardData.faq}
                  onChange={(e) => setWizardData(prev => ({ ...prev, faq: e.target.value }))}
                />
              </div>
            </div>
          );
        } else if (currentSubStep === 2) {
          return (
            <div className="space-y-6">
              <div>
                <Label htmlFor="products" className="text-base font-medium">Ürün/Hizmet Bilgileri</Label>
                <Textarea
                  id="products"
                  placeholder="Sunduğunuz ürün ve hizmetleri, fiyatlarını ve özelliklerini detaylı şekilde açıklayın..."
                  className="mt-2 min-h-[200px]"
                  value={wizardData.products}
                  onChange={(e) => setWizardData(prev => ({ ...prev, products: e.target.value }))}
                />
              </div>
            </div>
          );
        } else {
          return (
            <div className="space-y-6">
              <div>
                <Label className="text-base font-medium">Geçmiş Mesaj Konuşmaları (İsteğe Bağlı)</Label>
                <p className="text-sm text-muted-foreground mt-1 mb-4">
                  Daha önceki müşteri konuşmalarınızı yükleyerek AI'nızın daha iyi öğrenmesini sağlayabilirsiniz.
                </p>
                
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Dosyaları buraya sürükleyin veya seçin
                  </p>
                  <Button variant="outline" size="sm">
                    Dosya Seç
                  </Button>
                  {wizardData.messageHistory && (
                    <p className="text-sm text-green-600 mt-2">
                      ✓ {wizardData.messageHistory.name} yüklendi
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        }

      case 6:
        if (currentSubStep === 1) {
          const toneOptions = [
            { value: "professional", label: "Profesyonel", description: "Resmi ve işe yönelik" },
            { value: "friendly", label: "Samimi", description: "Sıcak ve yakın" },
            { value: "casual", label: "Rahat", description: "Günlük ve doğal" }
          ];

          return (
            <div className="space-y-6">
              <div>
                <Label className="text-base font-medium">Konuşma Tarzı</Label>
                <p className="text-sm text-muted-foreground mt-1 mb-4">
                  AI çalışanınızın müşterilerle nasıl konuşmasını istiyorsunuz?
                </p>
                
                <div className="space-y-3">
                  {toneOptions.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id={`tone-${option.value}`}
                        name="tone"
                        value={option.value}
                        checked={wizardData.tone === option.value}
                        onChange={(e) => setWizardData(prev => ({ ...prev, tone: e.target.value }))}
                        className="w-4 h-4"
                      />
                      <Label htmlFor={`tone-${option.value}`} className="flex-1 cursor-pointer">
                        <div className="font-medium">{option.label}</div>
                        <div className="text-sm text-muted-foreground">{option.description}</div>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        } else if (currentSubStep === 2) {
          const responseLengths = ["Kısa", "Orta", "Uzun"];
          
          return (
            <div className="space-y-6">
              <div>
                <Label className="text-base font-medium">Yanıt Uzunluğu</Label>
                <p className="text-sm text-muted-foreground mt-1 mb-4">
                  AI çalışanınızın yanıtları ne kadar detaylı olsun?
                </p>
                
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                   {responseLengths.map((option) => (
                     <Button
                       key={option}
                       variant={wizardData.responseLength === option ? "default" : "outline"}
                       onClick={() => setWizardData(prev => ({ ...prev, responseLength: option }))}
                       className="w-full min-h-[44px]"
                     >
                       {option}
                     </Button>
                   ))}
                 </div>
              </div>
            </div>
          );
        } else if (currentSubStep === 3) {
          const verificationOptions = ["Her zaman sor", "Gerektiğinde sor", "Hiç sorma"];
          
          return (
            <div className="space-y-6">
              <div>
                <Label className="text-base font-medium">Kullanıcı Doğrulama</Label>
                <p className="text-sm text-muted-foreground mt-1 mb-4">
                  AI çalışanınız müşterilerden iletişim bilgilerini ne sıklıkla isteysin?
                </p>
                
                 <div className="space-y-2">
                   {verificationOptions.map((option) => (
                     <Button
                       key={option}
                       variant={wizardData.userVerification === option ? "default" : "outline"}
                       onClick={() => setWizardData(prev => ({ ...prev, userVerification: option }))}
                       className="w-full justify-start min-h-[44px]"
                     >
                       {option}
                     </Button>
                   ))}
                 </div>
              </div>
            </div>
          );
        } else {
          const serviceTypes = ["Ürün Satışı", "Hizmet Sunumu", "Bilgi & Destek", "Rezervasyon & Randevu"];
          
          return (
            <div className="space-y-6">
              <div>
                <Label className="text-base font-medium">Hizmet Türü</Label>
                <p className="text-sm text-muted-foreground mt-1 mb-4">
                  AI çalışanınızın temel odak noktası nedir?
                </p>
                
                 <div className="space-y-2">
                   {serviceTypes.map((option) => (
                     <Button
                       key={option}
                       variant={wizardData.serviceType === option ? "default" : "outline"}
                       onClick={() => setWizardData(prev => ({ ...prev, serviceType: option }))}
                       className="w-full justify-start min-h-[44px]"
                     >
                       {option}
                     </Button>
                   ))}
                 </div>
              </div>
            </div>
          );
        }

      case 7:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="taskDescription" className="text-base font-medium">Görev Tanımı</Label>
              <p className="text-sm text-muted-foreground mt-1 mb-4">
                AI çalışanınızın ne yapmasını istiyorsunuz? Detaylı olarak açıklayın.
              </p>
              <Textarea
                id="taskDescription"
                placeholder="Örn: Müşteri sorularını yanıtla, randevu al, ürün önerilerinde bulun, destek sağla..."
                className="mt-2 min-h-[200px]"
                value={wizardData.taskDescription}
                onChange={(e) => setWizardData(prev => ({ ...prev, taskDescription: e.target.value }))}
              />
            </div>
          </div>
        );

      case 8:
        const toolsList = [
          { key: "websiteIntegration", label: "Web Sitesi Entegrasyonu", icon: Globe },
          { key: "emailNotifications", label: "E-posta Bildirimleri", icon: MessageSquare },
          { key: "whatsappIntegration", label: "WhatsApp Entegrasyonu", icon: Phone },
          { key: "calendarBooking", label: "Takvim Rezervasyonu", icon: Calendar },
          { key: "socialMediaMonitoring", label: "Sosyal Medya Takibi", icon: Search },
          { key: "crmIntegration", label: "CRM Entegrasyonu", icon: Monitor },
          { key: "analyticsReporting", label: "Analitik Raporlama", icon: Zap },
          { key: "multiLanguageSupport", label: "Çoklu Dil Desteği", icon: Globe }
        ];

        const integrationsList = [
          { key: "whatsapp", label: "WhatsApp Business" },
          { key: "instagram", label: "Instagram Direct" },
          { key: "telegram", label: "Telegram" },
          { key: "slack", label: "Slack" },
          { key: "zapier", label: "Zapier" },
          { key: "shopify", label: "Shopify" },
          { key: "woocommerce", label: "WooCommerce" },
          { key: "hubspot", label: "HubSpot" }
        ];

        return (
          <div className="space-y-8">
            <div>
              <Label className="text-base font-medium">Kullanılacak Araçlar</Label>
              <p className="text-sm text-muted-foreground mt-1 mb-4">
                AI çalışanınızın hangi araçları kullanabilmesini istiyorsunuz?
              </p>
              
               <div className="grid grid-cols-1 gap-3">
                 {toolsList.map(({ key, label, icon: Icon }) => (
                   <div key={key} className="flex items-center space-x-3 p-3 border rounded-lg min-h-[48px]">
                     <Switch
                       id={`tool-${key}`}
                       checked={wizardData.tools[key as keyof typeof wizardData.tools]}
                       onCheckedChange={(checked) => setWizardData(prev => ({
                         ...prev,
                         tools: { ...prev.tools, [key]: checked }
                       }))}
                     />
                     <Icon className="h-4 w-4 text-muted-foreground" />
                     <Label htmlFor={`tool-${key}`} className="text-sm font-medium cursor-pointer flex-1">
                       {label}
                     </Label>
                   </div>
                 ))}
               </div>
            </div>

            <div>
              <Label className="text-base font-medium">Entegrasyonlar</Label>
              <p className="text-sm text-muted-foreground mt-1 mb-4">
                AI çalışanınızın hangi platformlarla entegre olmasını istiyorsunuz?
              </p>
              
               <div className="grid grid-cols-1 gap-3">
                 {integrationsList.map(({ key, label }) => (
                   <div key={key} className="flex items-center space-x-3 p-3 border rounded-lg min-h-[48px]">
                     <Switch
                       id={`integration-${key}`}
                       checked={wizardData.integrations[key as keyof typeof wizardData.integrations]}
                       onCheckedChange={(checked) => setWizardData(prev => ({
                         ...prev,
                         integrations: { ...prev.integrations, [key]: checked }
                       }))}
                     />
                     <Label htmlFor={`integration-${key}`} className="text-sm font-medium cursor-pointer flex-1">
                       {label}
                     </Label>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8">
            <h3 className="text-lg font-semibold mb-4">Özet</h3>
            <div className="text-left space-y-2 bg-muted p-4 rounded-lg">
              <div><strong>İşletme:</strong> {wizardData.businessName || "Belirtilmedi"}</div>
              <div><strong>Sektör:</strong> {wizardData.sector || "Belirtilmedi"}</div>
              <div><strong>Görev:</strong> {wizardData.taskDescription || "Belirtilmedi"}</div>
            </div>
          </div>
        );
    }
  };

  if (!open) return null;

  return (
    <>
      <Dialog open={open} onOpenChange={handleWizardClose}>
        <DialogContent className="max-w-4xl w-[95vw] max-h-[95vh] p-0 sm:p-6 flex flex-col">
          {/* Sticky Header */}
          <div className="sticky top-0 bg-background z-10 p-4 sm:p-6 border-b">
            <DialogHeader className="flex flex-row items-center justify-between">
              <div>
                <DialogTitle className="text-lg sm:text-xl font-bold">
                  AI Çalışan Kurulum Sihirbazı
                </DialogTitle>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Adım {currentStep} / {totalSteps}: {stepTitles[currentStep - 1]}
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={handleWizardClose} className="min-h-[44px] min-w-[44px]">
                <X className="h-4 w-4" />
              </Button>
            </DialogHeader>

            {/* Progress Bar */}
            <div className="flex items-center justify-center mt-4 overflow-x-auto">
              <div className="flex items-center space-x-1 sm:space-x-2 min-w-max pb-2">
                {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
                  <div key={step} className="flex items-center flex-shrink-0">
                    <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${
                      step < currentStep 
                        ? 'bg-primary text-primary-foreground' 
                        : step === currentStep 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted text-muted-foreground'
                    }`}>
                      {step}
                    </div>
                    {step < totalSteps && (
                      <div className={`w-6 sm:w-12 h-1 mx-1 sm:mx-2 ${
                        step < currentStep ? 'bg-primary' : 'bg-muted'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="max-w-none">
              {renderWizardStep()}
            </div>
          </div>

          {/* Sticky Navigation */}
          <div className="sticky bottom-0 bg-background border-t p-4 sm:p-6">
            <div className="flex justify-between gap-3">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1 && currentSubStep === 1}
                className="flex items-center space-x-2 min-h-[44px] flex-1 sm:flex-none"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Önceki</span>
              </Button>

              {currentStep === totalSteps ? (
                <Button onClick={handleFinish} className="bg-green-600 hover:bg-green-700 min-h-[44px] flex-1 sm:flex-none">
                  Tamamla
                </Button>
              ) : (
                <Button onClick={handleNext} className="flex items-center space-x-2 min-h-[44px] flex-1 sm:flex-none">
                  <span>Sonraki</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Exit Confirmation Dialog */}
      <Dialog open={showExitConfirmation} onOpenChange={setShowExitConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Kurulumu Bırakmak İstiyor Musunuz?</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-muted-foreground">
              Şu ana kadar girdiğiniz bilgiler kaybolacak. Emin misiniz?
            </p>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowExitConfirmation(false)}>
              Devam Et
            </Button>
            <Button variant="destructive" onClick={confirmExit}>
              Evet, Bırak
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AgentCreationWizard;