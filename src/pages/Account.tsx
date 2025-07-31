import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  User, 
  CreditCard, 
  Settings, 
  Crown, 
  Calendar, 
  Mail, 
  Phone, 
  Building,
  LogOut,
  Shield,
  Bell,
  Check,
  Star
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Account = () => {
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    full_name: "",
    phone: "",
    company: ""
  });
  const [currentPlan] = useState("free"); // This would come from subscription status

  const plans = [
    {
      name: "Ücretsiz",
      description: "AI otomasyonunu test eden girişimciler için ideal başlangıç",
      price: 0,
      features: ["1 AI ajanı", "Aylık 100 konuşma", "Temel şablonlar", "E-posta desteği", "Kontrol paneli erişimi", "7 gün ücretsiz deneme"],
      popular: false,
      plan: "free"
    },
    {
      name: "Orta Plan",
      description: "Büyüyen işletmeler için en çok tercih edilen çözüm",
      price: 125,
      features: ["5 AI ajanı", "Aylık 2.500 konuşma", "Tüm şablonlar ve iş akışları", "Öncelikli destek", "Gelişmiş analitik", "Özel entegrasyonlar", "WhatsApp & SMS entegrasyonu", "Multi-platform desteği"],
      popular: true,
      plan: "medium"
    },
    {
      name: "Plus Plan",
      description: "Gelişmiş analizler ve tam özelleştirme sunan premium çözüm",
      price: 250,
      features: ["Sınırsız AI ajanı", "Sınırsız konuşma", "Genişletilmiş analizler", "Özel hesap yöneticisi", "Beyaz etiket çözümler", "API erişimi", "Özel eğitim programı", "Gelişmiş güvenlik", "24/7 premium destek", "Özel entegrasyon geliştirme"],
      popular: false,
      plan: "plus"
    }
  ];

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      
      if (!user) {
        window.location.href = '/auth';
        return;
      }
      
      setUser(user);
      setProfileData({
        full_name: user.user_metadata?.full_name || "",
        phone: user.user_metadata?.phone || "",
        company: user.user_metadata?.company || ""
      });
    } catch (error: any) {
      console.error('Error checking user:', error);
      window.location.href = '/auth';
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Başarıyla çıkış yapıldı!",
        description: "Ana sayfaya yönlendiriliyorsunuz.",
      });
      
      window.location.href = '/';
    } catch (error: any) {
      toast({
        title: "Çıkış hatası!",
        description: "Çıkış yapılırken bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  const updateProfile = async () => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: profileData
      });

      if (error) throw error;

      toast({
        title: "Profil güncellendi!",
        description: "Bilgileriniz başarıyla kaydedildi.",
      });
    } catch (error: any) {
      toast({
        title: "Güncelleme hatası!",
        description: error.message || "Profil güncellenirken bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Hesap bilgileri yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8 pt-32">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Hesap Ayarları</h1>
              <p className="text-muted-foreground">
                Profilinizi ve abonelik bilgilerinizi yönetin
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Çıkış Yap
            </Button>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Profil
              </TabsTrigger>
              <TabsTrigger value="subscription" className="flex items-center gap-2">
                <Crown className="w-4 h-4" />
                Abonelik
              </TabsTrigger>
              <TabsTrigger value="billing" className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Ödeme
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Ayarlar
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Kişisel Bilgiler
                  </CardTitle>
                  <CardDescription>
                    Hesap bilgilerinizi güncelleyin
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="full_name" className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Ad Soyad
                      </Label>
                      <Input
                        id="full_name"
                        value={profileData.full_name}
                        onChange={(e) => setProfileData({
                          ...profileData,
                          full_name: e.target.value
                        })}
                        placeholder="Adınız ve soyadınız"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        E-posta Adresi
                      </Label>
                      <Input
                        id="email"
                        value={user?.email || ""}
                        disabled
                        className="bg-muted"
                      />
                      <p className="text-xs text-muted-foreground">
                        E-posta adresiniz değiştirilemez
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Telefon Numarası
                      </Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({
                          ...profileData,
                          phone: e.target.value
                        })}
                        placeholder="+90 5xx xxx xx xx"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company" className="flex items-center gap-2">
                        <Building className="w-4 h-4" />
                        Şirket
                      </Label>
                      <Input
                        id="company"
                        value={profileData.company}
                        onChange={(e) => setProfileData({
                          ...profileData,
                          company: e.target.value
                        })}
                        placeholder="Şirket adınız"
                      />
                    </div>
                  </div>

                  <Button onClick={updateProfile} className="w-full md:w-auto">
                    Bilgileri Güncelle
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Subscription Tab */}
            <TabsContent value="subscription">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="w-5 h-5" />
                    Abonelik Durumu
                  </CardTitle>
                  <CardDescription>
                    Mevcut aboneliğinizi ve kullanım detaylarınızı görün
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Crown className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Ücretsiz Plan</h3>
                        <p className="text-sm text-muted-foreground">
                          Temel özellikler ile başlayın
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">Aktif</Badge>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-primary mb-1">1</div>
                        <p className="text-sm text-muted-foreground">AI Ajanı</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-primary mb-1">100</div>
                        <p className="text-sm text-muted-foreground">Aylık Konuşma</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-primary mb-1">7</div>
                        <p className="text-sm text-muted-foreground">Gün Deneme</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <Button className="w-full" size="lg">
                      Plana Yükselt
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                          Tüm Planları Görüntüle
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-center text-2xl font-bold">
                            Planınızı Seçin
                          </DialogTitle>
                        </DialogHeader>
                        
                        <div className="grid md:grid-cols-3 gap-6 mt-6">
                          {plans.map((plan, index) => (
                            <div
                              key={index}
                              className={`relative bg-card rounded-2xl p-6 border transition-all duration-300 ${
                                plan.popular
                                  ? "border-primary shadow-primary/20 shadow-lg scale-105"
                                  : "border-border shadow-card"
                              } ${
                                currentPlan === plan.plan
                                  ? "ring-2 ring-primary"
                                  : ""
                              }`}
                            >
                              {/* Current Plan Badge */}
                              {currentPlan === plan.plan && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                  <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                                    Mevcut Planın Bu
                                  </div>
                                </div>
                              )}

                              {/* Popular badge */}
                              {plan.popular && currentPlan !== plan.plan && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                  <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                                    <Star className="w-3 h-3" />
                                    En Çok Tercih Edilen
                                  </div>
                                </div>
                              )}

                              {/* Plan header */}
                              <div className="text-center mb-6">
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                  {plan.name}
                                </h3>
                                <p className="text-muted-foreground mb-4 text-sm">
                                  {plan.description}
                                </p>

                                {/* Price */}
                                <div className="mb-4">
                                  <div className="flex items-baseline justify-center gap-1">
                                    {plan.price === 0 ? (
                                      <span className="text-3xl font-bold text-foreground">
                                        Ücretsiz
                                      </span>
                                    ) : (
                                      <>
                                        <span className="text-3xl font-bold text-foreground">
                                          ${plan.price}
                                        </span>
                                        <span className="text-muted-foreground">
                                          /ay
                                        </span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Features */}
                              <div className="mb-6">
                                <ul className="space-y-2">
                                  {plan.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-center gap-2 text-sm">
                                      <div className="w-4 h-4 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Check className="w-2.5 h-2.5 text-primary" />
                                      </div>
                                      <span className="text-foreground">{feature}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* CTA button */}
                              <Button 
                                variant={currentPlan === plan.plan ? "outline" : (plan.popular ? "default" : "outline")} 
                                className="w-full text-sm py-5 h-auto"
                                disabled={currentPlan === plan.plan}
                              >
                                {currentPlan === plan.plan ? "Mevcut Plan" : 
                                 plan.price === 0 ? "Ücretsiz Başla" : "Şimdi Başla"}
                              </Button>
                            </div>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Billing Tab */}
            <TabsContent value="billing">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Ödeme Bilgileri
                  </CardTitle>
                  <CardDescription>
                    Ödeme yöntemlerinizi ve fatura geçmişinizi yönetin
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center py-8">
                    <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">
                      Henüz ödeme yöntemi eklenmedi
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Ücretli plana geçmek için ödeme yöntemi ekleyin
                    </p>
                    <Button variant="outline">
                      Ödeme Yöntemi Ekle
                    </Button>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold text-foreground mb-4">Fatura Geçmişi</h4>
                    <div className="text-center py-8 text-muted-foreground">
                      <Calendar className="w-8 h-8 mx-auto mb-2" />
                      <p>Henüz fatura bulunmuyor</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="w-5 h-5" />
                      Bildirim Ayarları
                    </CardTitle>
                    <CardDescription>
                      E-posta ve bildirim tercihlerinizi yönetin
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">E-posta Bildirimleri</h4>
                        <p className="text-sm text-muted-foreground">
                          Önemli güncellemeler ve duyurular
                        </p>
                      </div>
                      <input type="checkbox" defaultChecked className="toggle" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Pazarlama E-postaları</h4>
                        <p className="text-sm text-muted-foreground">
                          Yeni özellikler ve promosyonlar
                        </p>
                      </div>
                      <input type="checkbox" className="toggle" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Güvenlik
                    </CardTitle>
                    <CardDescription>
                      Hesap güvenliği ve şifre ayarları
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full">
                      Şifre Değiştir
                    </Button>
                    <Button variant="outline" className="w-full">
                      İki Faktörlü Doğrulama
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-destructive/20">
                  <CardHeader>
                    <CardTitle className="text-destructive">Tehlikeli Bölge</CardTitle>
                    <CardDescription>
                      Bu işlemler geri alınamaz. Dikkatli olun.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="destructive" className="w-full">
                      Hesabı Sil
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Account;