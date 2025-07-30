import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, Calendar, MessageSquare, Clock, ArrowRight, Sparkles } from "lucide-react";

const ContactSection = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-primary/5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-primary/20 to-accent/10 rounded-full blur-3xl opacity-40"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-primary/20">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            Size Nasıl <span className="text-primary">Yardımcı</span> Olabiliriz?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            AI ile işletmenizi dönüştürmeye hazır mısınız? Sorularınızı yanıtlamak ve başarı yolculuğunuzda size rehberlik etmek için buradayız.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Contact Form - Takes up 3 columns */}
            <div className="lg:col-span-3">
              <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    Hemen Başlayalım
                  </h3>
                  <p className="text-muted-foreground">
                    Formu doldurun, size 24 saat içinde dönüş yapalım.
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="name" className="text-sm font-semibold text-foreground flex items-center">
                        İsim Soyisim <span className="text-destructive ml-1">*</span>
                      </Label>
                      <Input 
                        id="name" 
                        type="text" 
                        placeholder="Adınız soyadınız" 
                        required 
                        className="h-12 bg-background/80 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all duration-300" 
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-sm font-semibold text-foreground flex items-center">
                        E-posta Adresi <span className="text-destructive ml-1">*</span>
                      </Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="ornek@email.com" 
                        required 
                        className="h-12 bg-background/80 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all duration-300" 
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="phone" className="text-sm font-semibold text-foreground">
                        Telefon Numarası
                      </Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        placeholder="+90 5xx xxx xx xx" 
                        className="h-12 bg-background/80 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all duration-300" 
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="company" className="text-sm font-semibold text-foreground">
                        Şirket Adı
                      </Label>
                      <Input 
                        id="company" 
                        type="text" 
                        placeholder="Şirket adınız" 
                        className="h-12 bg-background/80 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all duration-300" 
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="subject" className="text-sm font-semibold text-foreground">
                      Konu
                    </Label>
                    <Input 
                      id="subject" 
                      type="text" 
                      placeholder="Mesajınızın konusu" 
                      className="h-12 bg-background/80 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all duration-300" 
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="message" className="text-sm font-semibold text-foreground flex items-center">
                      Mesajınız <span className="text-destructive ml-1">*</span>
                    </Label>
                    <Textarea 
                      id="message" 
                      placeholder="İşletmeniz hakkında bilgi verin ve size nasıl yardımcı olabileceğimizi anlatın. Ne tür AI çözümlerine ihtiyacınız var?" 
                      required 
                      rows={6} 
                      className="bg-background/80 backdrop-blur-sm border-border/50 focus:border-primary/50 resize-none transition-all duration-300" 
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <Send className="w-5 h-5 mr-3" />
                    Mesajı Gönder
                    <ArrowRight className="w-5 h-5 ml-3" />
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Info - Takes up 2 columns */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact Methods */}
              <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-foreground mb-6">
                  İletişim Bilgileri
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4 group cursor-pointer">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">E-posta</h4>
                      <p className="text-primary hover:text-primary/80 transition-colors">contact@nonplo.com</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        7/24 destek için
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 group cursor-pointer">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <MessageSquare className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Canlı Destek</h4>
                      <p className="text-muted-foreground">Web sitemizde aktif</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Pazartesi-Cuma, 09:00-18:00
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 group cursor-pointer">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Yanıt Süresi</h4>
                      <p className="text-muted-foreground">24 saat içinde</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Hızlı ve detaylı yanıt garantisi
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Demo CTA */}
              <div className="backdrop-blur-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <Calendar className="w-6 h-6 text-primary mr-3" />
                  <h4 className="font-bold text-foreground">
                    Ücretsiz Demo Rezervasyonu
                  </h4>
                </div>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  Nonplo'nun işletmenizi nasıl dönüştürebileceğini canlı görmek ister misiniz? 
                  30 dakikalık kişiselleştirilmiş demo için randevu alın.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Demo Randevusu Al
                </Button>
              </div>

              {/* FAQ CTA */}
              <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6">
                <h4 className="font-bold text-foreground mb-3">
                  Sık Sorulan Sorular
                </h4>
                <p className="text-muted-foreground text-sm mb-4">
                  Merak ettiklerinizin yanıtları burada olabilir.
                </p>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-primary hover:text-primary/80 hover:bg-primary/10 p-0"
                >
                  FAQ'leri İncele
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;