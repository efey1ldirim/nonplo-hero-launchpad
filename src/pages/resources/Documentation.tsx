import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import Header from "@/components/Header";
import { Search, BookOpen, Rocket, Puzzle, Wrench, Clock } from "lucide-react";

const Documentation = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const sections = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: Rocket,
      articles: [
        { title: "Welcome to Nonplo", lastUpdated: "2024-01-15", content: "Learn the basics of AI agent building with Nonplo." },
        { title: "Setting Up Your First Agent", lastUpdated: "2024-01-12", content: "Step-by-step guide to create your first AI agent." },
        { title: "Understanding Agent Types", lastUpdated: "2024-01-10", content: "Different types of agents and their use cases." },
        { title: "Account Setup & Onboarding", lastUpdated: "2024-01-08", content: "Complete guide to setting up your Nonplo account." }
      ]
    },
    {
      id: "building-agents",
      title: "Building Agents",
      icon: Puzzle,
      articles: [
        { title: "Agent Configuration", lastUpdated: "2024-01-14", content: "How to configure your AI agents for optimal performance." },
        { title: "Training Your Agent", lastUpdated: "2024-01-11", content: "Best practices for training AI agents with your data." },
        { title: "Testing & Debugging", lastUpdated: "2024-01-09", content: "Tools and techniques for testing agent responses." },
        { title: "Publishing Your Agent", lastUpdated: "2024-01-07", content: "Deploy your agent and make it available to users." }
      ]
    },
    {
      id: "integrations",
      title: "Integrations",
      icon: Puzzle,
      articles: [
        { title: "API Integration Guide", lastUpdated: "2024-01-13", content: "Connect Nonplo with your existing tools and workflows." },
        { title: "Webhook Setup", lastUpdated: "2024-01-10", content: "Configure webhooks for real-time data synchronization." },
        { title: "Third-party Connectors", lastUpdated: "2024-01-06", content: "Available integrations with popular business tools." },
        { title: "Custom Integrations", lastUpdated: "2024-01-05", content: "Build custom integrations using our developer tools." }
      ]
    },
    {
      id: "troubleshooting",
      title: "Troubleshooting",
      icon: Wrench,
      articles: [
        { title: "Common Issues & Solutions", lastUpdated: "2024-01-12", content: "Quick fixes for the most common problems." },
        { title: "Performance Optimization", lastUpdated: "2024-01-08", content: "Improve your agent's response time and accuracy." },
        { title: "Error Code Reference", lastUpdated: "2024-01-04", content: "Complete list of error codes and their meanings." },
        { title: "Getting Support", lastUpdated: "2024-01-03", content: "How to contact our support team for help." }
      ]
    }
  ];

  const filteredSections = sections.map(section => ({
    ...section,
    articles: section.articles.filter(article =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.articles.length > 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-background via-primary/5 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <BookOpen className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Documentation
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              All you need to know to use Nonplo effectively.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {filteredSections.length > 0 ? (
              <Accordion type="multiple" defaultValue={["getting-started"]} className="space-y-4">
                {filteredSections.map((section) => (
                  <AccordionItem key={section.id} value={section.id}>
                    <Card>
                      <AccordionTrigger className="px-6 py-4 hover:no-underline">
                        <div className="flex items-center gap-3">
                          <section.icon className="w-5 h-5 text-primary" />
                          <h2 className="text-xl font-semibold text-left">{section.title}</h2>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <CardContent className="pt-0">
                          <div className="space-y-3">
                            {section.articles.map((article, index) => (
                              <div key={index} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                                <div className="flex justify-between items-start mb-2">
                                  <h3 className="font-medium text-foreground">{article.title}</h3>
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Clock className="w-3 h-3" />
                                    {article.lastUpdated}
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground">{article.content}</p>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </AccordionContent>
                    </Card>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No results found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search terms or browse all sections above.
                  </p>
                  <Button variant="outline" onClick={() => setSearchQuery("")}>
                    Clear Search
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-12 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-xl font-semibold mb-2">Can't find what you're looking for?</h3>
            <p className="text-muted-foreground mb-4">
              Our support team is here to help you get the most out of Nonplo
            </p>
            <Button variant="hero">
              Contact Support
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Documentation;