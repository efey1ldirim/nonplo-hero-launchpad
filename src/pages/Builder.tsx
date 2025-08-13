import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Monitor, Zap, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AgentCreationWizard from "@/components/AgentCreationWizard";

const Builder = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [wizardOpen, setWizardOpen] = useState(false);
  const [templateModalOpen, setTemplateModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const location = useLocation();
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

  const handleTemplateUse = (template: any) => {
    setSelectedTemplate(template);
    setTemplateModalOpen(false);
    setWizardOpen(true);
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

  useEffect(() => {
    const search = new URLSearchParams(location.search);
    if (search.get("openWizard") === "1") {
      setWizardOpen(true);
      // Clean the URL
      navigate("/builder", { replace: true });
    }
  }, [location.search, navigate]);

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

      {/* Agent Creation Wizard */}
      <AgentCreationWizard
        open={wizardOpen}
        onClose={() => setWizardOpen(false)}
      />

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