import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageCircle, Clock, Send } from "lucide-react";
const ContactSection = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted");
  };
  return <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Konuşalım
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Kafanıza takılan sorular mı var? Başlamanızda size yardımcı olmak için buradayız.</p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <Card className="shadow-lg border-border/50">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-foreground mb-6">
                  Bize mesaj gönderin
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">
                        İsim *
                      </Label>
                      <Input id="name" type="text" placeholder="Adınız soyadınız" required className="bg-background border-border/50" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        E-posta *
                      </Label>
                      <Input id="email" type="email" placeholder="email@adresiniz.com" required className="bg-background border-border/50" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-sm font-medium">
                      Şirket (opsiyonel)
                    </Label>
                    <Input id="company" type="text" placeholder="Şirket adınız" className="bg-background border-border/50" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium">
                      Mesaj *
                    </Label>
                    <Textarea id="message" placeholder="İşletmeniz hakkında bilgi verin ve size nasıl yardımcı olabileceğimizi söyleyin..." required rows={5} className="bg-background border-border/50 resize-none" />
                  </div>

                  <Button type="submit" size="lg" className="w-full hover:scale-105 transition-all duration-300">
                    <Send className="w-4 h-4 mr-2" />
                    Mesaj Gönder
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-6">
                  İletişime geçin
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  İşletmenizi AI ile dönüştürmeye hazır mısınız? İster yeni başlıyor olun ister ölçeklenmede yardıma ihtiyacınız olsun, ekibimiz her adımda size rehberlik etmek için burada.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">E-posta gönder</h4>
                    <p className="text-muted-foreground">hello@nonplo.com</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Genel sorular ve destek için
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Canlı Sohbet</h4>
                    <p className="text-muted-foreground">Web sitemizde mevcut</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Pazartesi - Cuma, 09:00 - 18:00 TSİ
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Yanıt Süresi</h4>
                    <p className="text-muted-foreground">Genellikle 24 saat içinde</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Hızlı ve yardımcı yanıtlar vermeyi taahhüt ediyoruz
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-primary/5 rounded-lg border border-primary/10">
                <h4 className="font-semibold text-foreground mb-2">
                  Demo Rezervasyonu
                </h4>
                <p className="text-muted-foreground text-sm mb-4">
                  Nonplo'yu işini görürken mi görmek istiyorsunuz? Ekibimizle kişiselleştirilmiş demo planlayın.
                </p>
                <Button variant="outline" size="sm">
                  Demo Planla
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default ContactSection;