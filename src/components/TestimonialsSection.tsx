import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sarah Chen",
    business: "Local Café Owner",
    quote: "Nonplo's AI agent handles our customer questions 24/7. I can finally focus on making great coffee instead of answering the same questions all day.",
    avatar: "photo-1581091226825-a6a2a5aee158",
    rating: 5
  },
  {
    name: "Marcus Rodriguez",
    business: "Marketing Consultant",
    quote: "Setting up lead qualification took me 10 minutes. Our response time improved by 80% and we're closing more deals than ever.",
    avatar: "photo-1581092795360-fd1ca04f0952",
    rating: 5
  },
  {
    name: "Emma Thompson",
    business: "Online Boutique",
    quote: "The email automation agent saved me 3 hours daily. Now I can spend time designing new products instead of writing repetitive emails.",
    avatar: "photo-1581090464777-f3220bbe1b8b",
    rating: 5
  },
  {
    name: "David Kim",
    business: "Consulting Firm",
    quote: "No coding knowledge needed - I had my first AI agent running in under an hour. It's like having a digital assistant that never sleeps.",
    avatar: "photo-1519389950473-47ba0277781c",
    rating: 5
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trusted by Small Businesses
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from business owners who transformed their operations with AI
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 border-border/50">
              <CardContent className="p-8">
                <Quote className="w-8 h-8 text-primary mb-4" />
                
                <p className="text-foreground mb-6 text-lg leading-relaxed">
                  "{testimonial.quote}"
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                      <img 
                        src={`https://images.unsplash.com/${testimonial.avatar}?w=48&h=48&fit=crop&crop=face`}
                        alt={testimonial.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.business}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            Join 500+ businesses already using Nonplo to automate their workflows
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;