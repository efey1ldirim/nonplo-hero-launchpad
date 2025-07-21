import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";

const PricingSection = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Basic",
      description: "Perfect for entrepreneurs testing AI automation",
      monthlyPrice: 29,
      yearlyPrice: 290,
      features: [
        "1 AI agent",
        "500 conversations/month",
        "Basic templates",
        "Email support",
        "Dashboard access"
      ],
      popular: false,
      cta: "Start Free Trial"
    },
    {
      name: "Pro",
      description: "Ideal for growing businesses ready to scale",
      monthlyPrice: 79,
      yearlyPrice: 790,
      features: [
        "5 AI agents",
        "2,500 conversations/month",
        "All templates & workflows",
        "Priority support",
        "Advanced analytics",
        "Custom integrations"
      ],
      popular: true,
      cta: "Start Free Trial"
    },
    {
      name: "Business",
      description: "For teams managing multiple workflows",
      monthlyPrice: 199,
      yearlyPrice: 1990,
      features: [
        "Unlimited AI agents",
        "Unlimited conversations",
        "White-label options",
        "Dedicated account manager",
        "Custom training",
        "Advanced security"
      ],
      popular: false,
      cta: "Contact Sales"
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
            Choose Your Plan
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Transparent pricing that grows with your business. Start free, upgrade when ready.
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
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 relative ${
                isYearly 
                  ? "bg-background text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Yearly
              {isYearly && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                  Save 25%
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
                    Most Popular
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
                      /{isYearly ? "year" : "month"}
                    </span>
                  </div>
                  {isYearly && (
                    <div className="text-sm text-primary font-medium mt-1">
                      Save {getSavings(plan)}% vs monthly
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
              Risk-Free Trial
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm text-muted-foreground">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Cancel anytime</span>
              </div>
            </div>
            <p className="text-muted-foreground mt-4">
              Questions about pricing? <span className="text-primary font-medium cursor-pointer hover:underline">Contact our sales team</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;