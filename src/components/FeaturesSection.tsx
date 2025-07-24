import { 
  Puzzle, 
  Sparkles, 
  MessageSquare, 
  LayoutDashboard, 
  Palette, 
  Shield 
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Puzzle,
      title: "Build Without Code",
      description: "Create custom AI agents using our visual builder. No programming skills required - just drag, drop, and configure."
    },
    {
      icon: Sparkles,
      title: "Ready-Made Templates",
      description: "Start instantly with pre-built agents for customer support, lead qualification, and common business tasks."
    },
    {
      icon: MessageSquare,
      title: "Smart Automation",
      description: "Automate email replies, chat support, appointment booking, and follow-ups. Your AI works 24/7."
    },
    {
      icon: LayoutDashboard,
      title: "Unified Dashboard",
      description: "Monitor, manage, and optimize all your AI agents from one central control panel. Track performance and results."
    },
    {
      icon: Palette,
      title: "Custom Personalities",
      description: "Train your agents to match your brand voice and business processes. Set rules, responses, and workflows."
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "GDPR and KVKK compliant data handling. Your business information stays secure and private."
    }
  ];

  return (
    <section className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50m-25 0a25 25 0 1 1 50 0a25 25 0 1 1 -50 0' stroke='%23A855F7' stroke-width='0.5' fill='none' opacity='0.3'/%3E%3Cpath d='M50 25m-5 0a5 5 0 1 1 10 0a5 5 0 1 1 -10 0' fill='%23A855F7' opacity='0.2'/%3E%3Cpath d='M50 75m-5 0a5 5 0 1 1 10 0a5 5 0 1 1 -10 0' fill='%23A855F7' opacity='0.2'/%3E%3Cpath d='M25 50m-5 0a5 5 0 1 1 10 0a5 5 0 1 1 -10 0' fill='%23A855F7' opacity='0.2'/%3E%3Cpath d='M75 50m-5 0a5 5 0 1 1 10 0a5 5 0 1 1 -10 0' fill='%23A855F7' opacity='0.2'/%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What Can Nonplo Do?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to build, deploy, and manage AI agents that actually help your business grow
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-background rounded-2xl p-8 shadow-card hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-2 border border-border/50 relative overflow-hidden"
            >
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:scale-110">
                    <feature.icon className="w-7 h-7 text-primary group-hover:text-current transition-colors duration-300" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;