import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageCircle, Clock, Send } from "lucide-react";

const ContactSection = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted");
  };

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Let's Talk
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions about AI automation? We're here to help you get started.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <Card className="shadow-lg border-border/50">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-foreground mb-6">
                  Send us a message
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">
                        Name *
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your full name"
                        required
                        className="bg-background border-border/50"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        required
                        className="bg-background border-border/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-sm font-medium">
                      Company (optional)
                    </Label>
                    <Input
                      id="company"
                      type="text"
                      placeholder="Your company name"
                      className="bg-background border-border/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your business and how we can help..."
                      required
                      rows={5}
                      className="bg-background border-border/50 resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full hover:scale-105 transition-all duration-300"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-6">
                  Get in touch
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  Ready to transform your business with AI? Whether you're just getting started or need help scaling up, our team is here to guide you every step of the way.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Email us</h4>
                    <p className="text-muted-foreground">hello@nonplo.com</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      For general inquiries and support
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Live Chat</h4>
                    <p className="text-muted-foreground">Available on our website</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Monday - Friday, 9 AM - 6 PM EST
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Response Time</h4>
                    <p className="text-muted-foreground">Usually within 24 hours</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      We're committed to quick, helpful responses
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-primary/5 rounded-lg border border-primary/10">
                <h4 className="font-semibold text-foreground mb-2">
                  Book a Demo
                </h4>
                <p className="text-muted-foreground text-sm mb-4">
                  Want to see Nonplo in action? Schedule a personalized demo with our team.
                </p>
                <Button variant="outline" size="sm">
                  Schedule Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;