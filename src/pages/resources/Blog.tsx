import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, User, ArrowRight, PenTool } from "lucide-react";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const blogPosts = [
    {
      id: 1,
      title: "The Future of Business Automation with AI Agents",
      excerpt: "Discover how AI agents are transforming business operations and what this means for your company's future.",
      author: "Sarah Chen",
      publishDate: "2024-01-15",
      category: "Industry Insights",
      thumbnail: "/api/placeholder/400/240",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Nonplo 2.0: Enhanced Agent Builder and New Integrations",
      excerpt: "We're excited to announce major updates to our platform, including a redesigned agent builder and 20+ new integrations.",
      author: "Mike Rodriguez",
      publishDate: "2024-01-12",
      category: "Product Updates",
      thumbnail: "/api/placeholder/400/240",
      readTime: "3 min read"
    },
    {
      id: 3,
      title: "5 Ways to Optimize Your Customer Service with AI Agents",
      excerpt: "Learn practical strategies to improve customer satisfaction and reduce response times using intelligent automation.",
      author: "Emma Thompson",
      publishDate: "2024-01-10",
      category: "Tips & Tutorials",
      thumbnail: "/api/placeholder/400/240",
      readTime: "7 min read"
    },
    {
      id: 4,
      title: "Case Study: How TechCorp Reduced Support Tickets by 60%",
      excerpt: "A detailed look at how one of our clients transformed their customer support using Nonplo's AI agents.",
      author: "David Park",
      publishDate: "2024-01-08",
      category: "Tips & Tutorials",
      thumbnail: "/api/placeholder/400/240",
      readTime: "6 min read"
    },
    {
      id: 5,
      title: "Security Best Practices for AI-Powered Business Applications",
      excerpt: "Essential security considerations when implementing AI agents in your business workflows.",
      author: "Lisa Wang",
      publishDate: "2024-01-05",
      category: "Industry Insights",
      thumbnail: "/api/placeholder/400/240",
      readTime: "8 min read"
    },
    {
      id: 6,
      title: "New Feature: Advanced Analytics Dashboard",
      excerpt: "Get deeper insights into your agent performance with our new analytics dashboard and reporting tools.",
      author: "Alex Johnson",
      publishDate: "2024-01-03",
      category: "Product Updates",
      thumbnail: "/api/placeholder/400/240",
      readTime: "4 min read"
    }
  ];

  const categories = [
    { value: "all", label: "All Posts" },
    { value: "Product Updates", label: "Product Updates" },
    { value: "Tips & Tutorials", label: "Tips & Tutorials" },
    { value: "Industry Insights", label: "Industry Insights" }
  ];

  const filteredPosts = selectedCategory === "all" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Product Updates":
        return "bg-primary/10 text-primary";
      case "Tips & Tutorials":
        return "bg-green-500/10 text-green-700";
      case "Industry Insights":
        return "bg-purple-500/10 text-purple-700";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-background via-primary/5 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <PenTool className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Insights & Updates
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Read about business automation, AI trends, and Nonplo news.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Category Filter */}
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
              <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
                {categories.map((category) => (
                  <TabsTrigger key={category.value} value={category.value}>
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {/* Blog Posts Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="group hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <PenTool className="w-12 h-12 text-primary/60" />
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getCategoryColor(post.category)}>
                        {post.category}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{post.readTime}</span>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.publishDate).toLocaleDateString()}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Newsletter CTA */}
            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
              <CardContent className="text-center py-12">
                <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Get the latest insights on AI automation, product updates, and industry trends delivered to your inbox.
                </p>
                <Button variant="hero" size="lg">
                  Subscribe to Newsletter
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Archive Section */}
      <section className="py-12 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h3 className="text-xl font-semibold mb-2">Looking for older posts?</h3>
            <p className="text-muted-foreground mb-4">
              Browse our complete archive of articles and insights
            </p>
            <Button variant="outline">
              View Archive
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Blog;