import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";

const PricingSection = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Temel",
      description: "AI otomasyonunu test eden girişimciler için mükemmel",
      monthlyPrice: 29,
      yearlyPrice: 290,
      features: [
        "1 AI ajanı",
        "Aylık 500 sohbet",
        "Temel şablonlar",
        "E-posta desteği",
        "Kontrol paneli erişimi"
      ],
      popular: false,
      cta: "Ücretsiz Denemeyi Başlat"
    },
    {
      name: "Pro",
      description: "Ölçeklenmeye hazır büyüyen işletmeler için ideal",
      monthlyPrice: 79,
      yearlyPrice: 790,
      features: [
        "5 AI ajanı",
        "Aylık 2.500 sohbet",
        "Tüm şablonlar ve iş akışları",
        "Öncelikli destek",
        "Gelişmiş analitik",
        "Özel entegrasyonlar"
      ],
      popular: true,
      cta: "Ücretsiz Denemeyi Başlat"
    },
    {
      name: "İşletme",
      description: "Birden fazla iş akışını yöneten ekipler için",
      monthlyPrice: 199,
      yearlyPrice: 1990,
      features: [
        "Sınırsız AI ajanı",
        "Sınırsız sohbet",
        "Beyaz etiket seçenekleri",
        "Özel hesap yöneticisi",
        "Özel eğitim",
        "Gelişmiş güvenlik"
      ],
      popular: false,
      cta: "Satış Ekibiyle İletişime Geç"
    }
  ];

  const getPrice = (plan: typeof plans[0]) => {
    return isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  };

  const getSavings = (plan: typeof plans[0]) => {
    const monthlyCost = plan.monthlyPrice * 12;
    const savings = monthlyCost - plan.yearlyPrice;
    return Math.round((savings / monthlyCost) * 100);
  };

  return (
    <section className="py-20 bg-background relative">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Planınızı Seçin
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            İşletmenizle birlikte büyüyen şeffaf fiyatlandırma. Ücretsiz başlayın, hazır olduğunuzda yükseltin.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center bg-muted rounded-lg p-1">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                !isYearly 
                  ? "bg-background text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Aylık
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 relative ${
                isYearly 
                  ? "bg-background text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Yıllık
              {isYearly && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                  %25 Tasarruf
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-card rounded-2xl p-8 border transition-all duration-300 hover:-translate-y-1 ${
                plan.popular
                  ? "border-primary shadow-primary/20 shadow-lg scale-105"
                  : "border-border shadow-card hover:shadow-primary/10"
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    En Popüler
                  </div>
                </div>
              )}

              {/* Plan header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {plan.name}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-4">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-foreground">
                      ${getPrice(plan)}
                    </span>
                    <span className="text-muted-foreground">
                      /{isYearly ? "yıl" : "ay"}
                    </span>
                  </div>
                  {isYearly && (
                    <div className="text-sm text-primary font-medium mt-1">
                      Aylığa göre %{getSavings(plan)} tasarruf
                    </div>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA button */}
              <Button
                variant={plan.popular ? "hero" : "outline"}
                className="w-full text-base py-6 h-auto"
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        {/* Bottom reassurance */}
        <div className="text-center mt-16">
          <div className="bg-muted/50 rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Risksiz Deneme
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm text-muted-foreground">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>14 günlük ücretsiz deneme</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Kredi kartı gerekmez</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>İstediğiniz zaman iptal</span>
              </div>
            </div>
            <p className="text-muted-foreground mt-4">
              Fiyatlandırma hakkında sorularınız mı var? <span className="text-primary font-medium cursor-pointer hover:underline">Satış ekibimizle iletişime geçin</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;