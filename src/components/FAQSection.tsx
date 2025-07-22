import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const faqs = [
  {
    question: "Do I need coding skills to use Nonplo?",
    answer: "Not at all! Nonplo is designed for business owners, not developers. You can build and customize AI agents using our simple drag-and-drop interface. If you can use email or social media, you can use Nonplo."
  },
  {
    question: "What kind of tasks can an AI agent handle?",
    answer: "Our AI agents excel at customer support, lead qualification, email automation, appointment scheduling, and data entry. Basically, any repetitive task that follows a pattern can be automated. Each agent learns your business style and responds accordingly."
  },
  {
    question: "Can I use Nonplo with my existing tools?",
    answer: "Yes! Nonplo integrates with popular tools like Gmail, Slack, Shopify, WordPress, and many CRM systems. We also provide webhooks and APIs for custom integrations. Your agents work alongside your current workflow."
  },
  {
    question: "Is my data safe with Nonplo?",
    answer: "Absolutely. We use enterprise-grade encryption and comply with GDPR and KVKK regulations. Your data is stored securely and never shared with third parties. You maintain full control and can export or delete your data anytime."
  },
  {
    question: "What happens if I cancel my subscription?",
    answer: "No hassle, no hidden fees. You can cancel anytime from your dashboard. Your agents will continue working until the end of your billing period, and you can export all your data. We also offer a 30-day grace period to reactivate if you change your mind."
  },
  {
    question: "Can I try Nonplo for free?",
    answer: "Yes! We offer a 14-day free trial with full access to all features. No credit card required to start. You can build up to 2 AI agents and test them with real scenarios. Only upgrade when you're confident Nonplo works for your business."
  }
];

const FAQSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about getting started with AI automation
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-border/50 rounded-lg px-6 py-2 bg-card/50 hover:bg-card/80 transition-colors"
              >
                <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pt-2 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-12 p-8 bg-muted/30 rounded-lg">
            <MessageCircle className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Still have questions?
            </h3>
            <p className="text-muted-foreground mb-6">
              Our team is here to help you get started with AI automation
            </p>
            <Button variant="outline" size="lg" className="hover:scale-105">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;