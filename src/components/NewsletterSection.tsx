import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

const NewsletterSection = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription here
    console.log("Newsletter subscription submitted");
  };

  return (
    <section className="py-16 bg-gradient-to-r from-muted/30 to-muted/50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Stay in the Loop
            </h2>
          </div>
          
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Get product updates, business automation tips, and exclusive offers — straight to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-4">
            <Input
              type="email"
              placeholder="Enter your email"
              required
              className="flex-1 bg-background border-border/50 text-center sm:text-left"
            />
            <Button 
              type="submit" 
              size="lg"
              className="whitespace-nowrap hover:scale-105 transition-all duration-300"
            >
              Subscribe
            </Button>
          </form>

          <p className="text-sm text-muted-foreground">
            We respect your inbox. No spam, ever.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;