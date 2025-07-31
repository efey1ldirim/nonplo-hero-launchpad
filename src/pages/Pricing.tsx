import { Button } from "@/components/ui/button";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Pricing = () => {
  const navigate = useNavigate();
  const features = [
    {
      name: "AI Ajanları",
      basic: "1",
      pro: "5", 
      business: "Sınırsız"
    },
    {
      name: "Aylık Konuşma Sayısı",
      basic: "500",
      pro: "2.500",
      business: "Sınırsız"
    },
    {
      name: "Şablonlar ve İş Akışları",
      basic: "Temel",
      pro: "Tüm şablonlar",
      business: "Tümü + Özel"
    },
    {
      name: "Destek",
      basic: "E-posta",
      pro: "Öncelikli",
      business: "Özel hesap yöneticisi"
    },
    {
      name: "Analizler",
      basic: false,
      pro: true,
      business: true
    },
    {
      name: "Özel Entegrasyonlar",
      basic: false,
      pro: true,
      business: true
    },
    {
      name: "Beyaz Etiket Seçenekleri",
      basic: false,
      pro: false,
      business: true
    },
    {
      name: "Özel Eğitim",
      basic: false,
      pro: false,
      business: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-background via-primary/5 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Her İşletme İçin Esnek Planlar
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Ücretsiz başlayın, büyüdükçe yükseltin. Gizli ücret yok.
          </p>
          <Button variant="hero" size="lg" className="text-lg px-8 py-6">
            Ücretsiz Denemeyi Başlat
          </Button>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* Trust Elements */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Kredi Kartı Gerekli Değil</h3>
              <p className="text-sm text-muted-foreground">
                Herhangi bir ödeme bilgisi olmadan ücretsiz denemenizi hemen başlatın
              </p>
            </div>
            <div>
              <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">İstediğiniz Zaman İptal Edin</h3>
              <p className="text-sm text-muted-foreground">
                Uzun vadeli sözleşme veya iptal ücreti yok. Büyüdükçe planınızı değiştirin
              </p>
            </div>
            <div>
              <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Güvenli Faturalandırma</h3>
              <p className="text-sm text-muted-foreground">
                Güvenli işlemler için Stripe tarafından desteklenen kurumsal düzeyde güvenlik
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Planları Karşılaştır
            </h2>
            <p className="text-xl text-muted-foreground">
              Her plana dahil olan özellikleri görün
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/4">Özellikler</TableHead>
                    <TableHead className="text-center">Temel</TableHead>
                    <TableHead className="text-center bg-primary/5 font-semibold">
                      Orta
                      <div className="text-xs text-primary font-normal mt-1">En Çok Tercih Edilen</div>
                    </TableHead>
                    <TableHead className="text-center">Plus</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {features.map((feature, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{feature.name}</TableCell>
                      <TableCell className="text-center">
                        {typeof feature.basic === 'boolean' ? (
                          feature.basic ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-muted-foreground mx-auto" />
                          )
                        ) : (
                          feature.basic
                        )}
                      </TableCell>
                      <TableCell className="text-center bg-primary/5">
                        {typeof feature.pro === 'boolean' ? (
                          feature.pro ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-muted-foreground mx-auto" />
                          )
                        ) : (
                          feature.pro
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {typeof feature.business === 'boolean' ? (
                          feature.business ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-muted-foreground mx-auto" />
                          )
                        ) : (
                          feature.business
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Hangi planın size uygun olduğundan emin değil misiniz?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            İşletmeniz için en uygun planı seçmenize veya özelleştirmenize yardımcı olmak için buradayız.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/#contact" 
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-primary/20 bg-background/50 text-primary hover:bg-primary hover:text-primary-foreground backdrop-blur-sm transition-all duration-300 hover:shadow-primary h-11 rounded-md px-8"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/';
                setTimeout(() => {
                  window.location.hash = 'contact';
                  setTimeout(() => {
                    const contactElement = document.getElementById('contact');
                    if (contactElement) {
                      contactElement.scrollIntoView({ behavior: 'smooth' });
                    }
                  }, 100);
                }, 100);
              }}
            >
              Bizimle İletişime Geçin
            </a>
            <Button variant="hero" size="lg">
              Satış Ekibiyle Konuş
            </Button>
          </div>
        </div>
      </section>

      
      {/* FAQ Section */}
      <FAQSection />
      
      <Footer />
    </div>
  );
};

export default Pricing;