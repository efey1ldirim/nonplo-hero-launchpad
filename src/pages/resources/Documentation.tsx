import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, BookOpen, Rocket, Puzzle, Wrench, Clock } from "lucide-react";

const Documentation = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const sections = [
    {
      id: "getting-started",
      title: "Başlangıç",
      icon: Rocket,
      articles: [
        { title: "Nonplo'ya Hoş Geldiniz", lastUpdated: "2024-01-15", content: "Nonplo ile yapay zeka ajanı oluşturmanın temellerini öğrenin." },
        { title: "İlk Ajanınızı Kurma", lastUpdated: "2024-01-12", content: "İlk yapay zeka ajanınızı oluşturmak için adım adım rehber." },
        { title: "Ajan Türlerini Anlama", lastUpdated: "2024-01-10", content: "Farklı ajan türleri ve kullanım alanları." },
        { title: "Hesap Kurulumu ve Onboarding", lastUpdated: "2024-01-08", content: "Nonplo hesabınızı kurma konusunda kapsamlı rehber." }
      ]
    },
    {
      id: "building-agents",
      title: "Ajan Geliştirme",
      icon: Puzzle,
      articles: [
        { title: "Ajan Konfigürasyonu", lastUpdated: "2024-01-14", content: "Yapay zeka ajanlarınızı optimal performans için nasıl yapılandıracağınızı öğrenin." },
        { title: "Ajanınızı Eğitme", lastUpdated: "2024-01-11", content: "Yapay zeka ajanlarını verilerinizle eğitmek için en iyi uygulamalar." },
        { title: "Test ve Hata Ayıklama", lastUpdated: "2024-01-09", content: "Ajan yanıtlarını test etmek için araçlar ve teknikler." },
        { title: "Ajanınızı Yayınlama", lastUpdated: "2024-01-07", content: "Ajanınızı dağıtın ve kullanıcılara sunun." }
      ]
    },
    {
      id: "integrations",
      title: "Entegrasyonlar",
      icon: Puzzle,
      articles: [
        { title: "API Entegrasyon Rehberi", lastUpdated: "2024-01-13", content: "Nonplo'yu mevcut araçlar ve iş akışlarınızla bağlayın." },
        { title: "Webhook Kurulumu", lastUpdated: "2024-01-10", content: "Gerçek zamanlı veri senkronizasyonu için webhook'ları yapılandırın." },
        { title: "Üçüncü Taraf Bağlayıcılar", lastUpdated: "2024-01-06", content: "Popüler iş araçlarıyla mevcut entegrasyonlar." },
        { title: "Özel Entegrasyonlar", lastUpdated: "2024-01-05", content: "Geliştirici araçlarımızı kullanarak özel entegrasyonlar oluşturun." }
      ]
    },
    {
      id: "troubleshooting",
      title: "Sorun Giderme",
      icon: Wrench,
      articles: [
        { title: "Yaygın Sorunlar ve Çözümler", lastUpdated: "2024-01-12", content: "En yaygın sorunlar için hızlı çözümler." },
        { title: "Performans Optimizasyonu", lastUpdated: "2024-01-08", content: "Ajanınızın yanıt süresi ve doğruluğunu artırın." },
        { title: "Hata Kodu Referansı", lastUpdated: "2024-01-04", content: "Hata kodlarının ve anlamlarının tam listesi." },
        { title: "Destek Alma", lastUpdated: "2024-01-03", content: "Yardım için destek ekibimizle nasıl iletişime geçeceğinizi öğrenin." }
      ]
    }
  ];

  const filteredSections = sections.map(section => ({
    ...section,
    articles: section.articles.filter(article =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.articles.length > 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-background via-primary/5 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <BookOpen className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Dokümantasyon
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Nonplo'yu etkili bir şekilde kullanmak için bilmeniz gereken her şey.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Dokümantasyonda ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {filteredSections.length > 0 ? (
              <Accordion type="multiple" defaultValue={["getting-started"]} className="space-y-4">
                {filteredSections.map((section) => (
                  <AccordionItem key={section.id} value={section.id}>
                    <Card>
                      <AccordionTrigger className="px-6 py-4 hover:no-underline">
                        <div className="flex items-center gap-3">
                          <section.icon className="w-5 h-5 text-primary" />
                          <h2 className="text-xl font-semibold text-left">{section.title}</h2>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <CardContent className="pt-0">
                          <div className="space-y-3">
                            {section.articles.map((article, index) => (
                              <div key={index} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                                <div className="flex justify-between items-start mb-2">
                                  <h3 className="font-medium text-foreground">{article.title}</h3>
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Clock className="w-3 h-3" />
                                    {article.lastUpdated}
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground">{article.content}</p>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </AccordionContent>
                    </Card>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Sonuç bulunamadı</h3>
                  <p className="text-muted-foreground mb-4">
                    Arama terimlerinizi ayarlamayı deneyin veya yukarıdaki tüm bölümlere göz atın.
                  </p>
                  <Button variant="outline" onClick={() => setSearchQuery("")}>
                    Aramayı Temizle
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-12 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-xl font-semibold mb-2">Aradığınızı bulamıyor musunuz?</h3>
            <p className="text-muted-foreground mb-4">
              Destek ekibimiz Nonplo'dan en iyi şekilde faydalanmanız için burada
            </p>
            <Button variant="hero">
              Destek İle İletişime Geç
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Documentation;