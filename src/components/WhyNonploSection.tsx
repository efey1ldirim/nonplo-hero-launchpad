import { Code2, Clock, Building2, Zap } from "lucide-react";

const WhyNonploSection = () => {
  const benefits = [
    {
      icon: Code2,
      title: "No Coding Required",
      description: "Build powerful AI agents with our drag-and-drop interface. No technical expertise needed."
    },
    {
      icon: Clock,
      title: "Save Time & Cut Costs",
      description: "Automate routine tasks and reduce staff workload. Save thousands on developer fees."
    },
    {
      icon: Building2,
      title: "Built for Small Business",
      description: "Simple pricing, easy setup, and features designed specifically for growing businesses."
    },
    {
      icon: Zap,
      title: "Fast Setup, Real Results",
      description: "Deploy your AI agent in minutes and start seeing results immediately. No long implementation."
    }
  ];

  return (
    <section className="py-20 bg-background relative">
      {/* Subtle pattern background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23A855F7' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Why Nonplo?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The smart choice for business owners who want AI results without the complexity
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="group bg-card rounded-2xl p-8 shadow-card hover:shadow-primary transition-all duration-300 hover:-translate-y-1 border border-border/50"
            >
              {/* Icon */}
              <div className="mb-6">
                <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <benefit.icon className="w-8 h-8 text-primary group-hover:text-current" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA section */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 bg-accent/50 text-accent-foreground px-6 py-3 rounded-full text-sm">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            Join 500+ businesses already using Nonplo
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyNonploSection;