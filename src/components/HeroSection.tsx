import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Zap, Clock, Users } from "lucide-react";
import aiAgentHero from "@/assets/ai-agent-hero.png";

const HeroSection = () => {
  return (
    <section className="min-h-screen bg-gradient-subtle relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-glow opacity-50" />
      
      <div className="container mx-auto px-4 pt-16 pb-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">
          
          {/* Left content */}
          <div className="text-left animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-card">
              <Zap className="w-4 h-4 text-primary" />
              No Code Required
            </div>

            {/* Main headline */}
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Your AI teammate.{" "}
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                No coding needed.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-lg">
              Build personalized AI agents that handle customer support, lead qualification, and routine tasks. 
              Save time and money without hiring developers.
            </p>

            {/* Stats */}
            <div className="flex gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Setup in minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">500+ businesses</span>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="text-lg px-8 py-6 h-auto">
                Start Building Your Agent
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 h-auto">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-8 text-sm text-muted-foreground">
              ✨ Free 14-day trial • 💳 No credit card required
            </div>
          </div>

          {/* Right illustration */}
          <div className="relative lg:mt-0 mt-12">
            <div className="relative z-10 animate-float">
              <img 
                src={aiAgentHero} 
                alt="AI Agent Illustration" 
                className="w-full max-w-lg mx-auto drop-shadow-2xl"
              />
            </div>
            
            {/* Floating elements */}
            <div className="absolute top-20 -left-4 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse" />
            <div className="absolute bottom-20 -right-4 w-32 h-32 bg-primary-glow/20 rounded-full blur-2xl animate-pulse delay-300" />
            <div className="absolute top-1/2 right-8 w-16 h-16 bg-accent/30 rounded-full blur-lg animate-pulse delay-700" />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;