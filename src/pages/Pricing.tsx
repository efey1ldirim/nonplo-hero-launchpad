import { Button } from "@/components/ui/button";
import PricingSection from "@/components/PricingSection";
import { Check, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Pricing = () => {
  const features = [
    {
      name: "AI Agents",
      basic: "1",
      pro: "5", 
      business: "Unlimited"
    },
    {
      name: "Conversations per month",
      basic: "500",
      pro: "2,500",
      business: "Unlimited"
    },
    {
      name: "Templates & Workflows",
      basic: "Basic",
      pro: "All templates",
      business: "All + Custom"
    },
    {
      name: "Support",
      basic: "Email",
      pro: "Priority",
      business: "Dedicated manager"
    },
    {
      name: "Analytics",
      basic: false,
      pro: true,
      business: true
    },
    {
      name: "Custom Integrations",
      basic: false,
      pro: true,
      business: true
    },
    {
      name: "White-label Options",
      basic: false,
      pro: false,
      business: true
    },
    {
      name: "Custom Training",
      basic: false,
      pro: false,
      business: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-background via-primary/5 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Flexible Plans for Every Business
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Start free, upgrade when you grow. No hidden fees.
          </p>
          <Button variant="hero" size="lg" className="text-lg px-8 py-6">
            Start Free Trial
          </Button>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* Comparison Table */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Compare Plans
            </h2>
            <p className="text-xl text-muted-foreground">
              See what's included in each plan
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/4">Features</TableHead>
                    <TableHead className="text-center">Basic</TableHead>
                    <TableHead className="text-center bg-primary/5 font-semibold">
                      Pro
                      <div className="text-xs text-primary font-normal mt-1">Most Popular</div>
                    </TableHead>
                    <TableHead className="text-center">Business</TableHead>
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
            Not sure which plan fits?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're here to help you choose or customize a plan that works best for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg">
              Contact Us
            </Button>
            <Button variant="hero" size="lg">
              Talk to Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Elements */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">No Credit Card Required</h3>
              <p className="text-sm text-muted-foreground">
                Start your free trial immediately without any payment information
              </p>
            </div>
            <div>
              <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Cancel Anytime</h3>
              <p className="text-sm text-muted-foreground">
                No long-term contracts or cancellation fees. Change plans as you grow
              </p>
            </div>
            <div>
              <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Secure Billing</h3>
              <p className="text-sm text-muted-foreground">
                Enterprise-grade security powered by Stripe for safe transactions
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;