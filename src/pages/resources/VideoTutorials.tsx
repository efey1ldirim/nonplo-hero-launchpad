import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import { Play, Clock, Video, Star } from "lucide-react";

const VideoTutorials = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const videos = [
    {
      id: 1,
      title: "Getting Started with Nonplo",
      description: "Learn the basics of creating your first AI agent in under 10 minutes.",
      duration: "9:32",
      category: "Beginner",
      difficulty: "Beginner",
      views: "12.5k",
      thumbnail: "/api/placeholder/400/225"
    },
    {
      id: 2,
      title: "Advanced Agent Configuration",
      description: "Deep dive into advanced settings and customization options for power users.",
      duration: "15:47",
      category: "Advanced",
      difficulty: "Advanced", 
      views: "8.2k",
      thumbnail: "/api/placeholder/400/225"
    },
    {
      id: 3,
      title: "Building a Customer Service Bot",
      description: "Step-by-step tutorial on creating an intelligent customer service agent.",
      duration: "22:18",
      category: "Use Case",
      difficulty: "Intermediate",
      views: "15.3k",
      thumbnail: "/api/placeholder/400/225"
    },
    {
      id: 4,
      title: "Integrating with Popular Tools",
      description: "Connect your Nonplo agents with Slack, Teams, and other business tools.",
      duration: "18:42",
      category: "Advanced",
      difficulty: "Intermediate",
      views: "9.7k",
      thumbnail: "/api/placeholder/400/225"
    },
    {
      id: 5,
      title: "Understanding Agent Analytics",
      description: "How to read and interpret your agent's performance metrics and analytics.",
      duration: "12:25",
      category: "Beginner",
      difficulty: "Beginner",
      views: "6.8k",
      thumbnail: "/api/placeholder/400/225"
    },
    {
      id: 6,
      title: "Sales Automation Use Case",
      description: "Build an AI agent to qualify leads and schedule meetings automatically.",
      duration: "28:15",
      category: "Use Case",
      difficulty: "Advanced",
      views: "11.2k",
      thumbnail: "/api/placeholder/400/225"
    },
    {
      id: 7,
      title: "Troubleshooting Common Issues",
      description: "Identify and fix the most common problems when building AI agents.",
      duration: "14:33",
      category: "Beginner",
      difficulty: "Beginner",
      views: "7.4k",
      thumbnail: "/api/placeholder/400/225"
    },
    {
      id: 8,
      title: "Custom Training Data Setup",
      description: "Learn how to prepare and upload custom training data for specialized agents.",
      duration: "19:56",
      category: "Advanced",
      difficulty: "Advanced",
      views: "5.1k",
      thumbnail: "/api/placeholder/400/225"
    },
    {
      id: 9,
      title: "HR Automation Workflow",
      description: "Streamline your HR processes with intelligent automation and screening.",
      duration: "25:07",
      category: "Use Case",
      difficulty: "Intermediate",
      views: "8.9k",
      thumbnail: "/api/placeholder/400/225"
    }
  ];

  const categories = [
    { value: "all", label: "All Videos" },
    { value: "Beginner", label: "Beginner" },
    { value: "Advanced", label: "Advanced" },
    { value: "Use Case", label: "Use Cases" }
  ];

  const filteredVideos = selectedCategory === "all" 
    ? videos 
    : videos.filter(video => video.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-500/10 text-green-700";
      case "Intermediate":
        return "bg-yellow-500/10 text-yellow-700";
      case "Advanced":
        return "bg-red-500/10 text-red-700";
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
              <Video className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Video Tutorials
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Watch step-by-step guides and learn to use Nonplo like a pro.
            </p>
          </div>
        </div>
      </section>

      {/* Video Content */}
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

            {/* Featured Video */}
            {selectedCategory === "all" && (
              <Card className="mb-8 overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <div className="aspect-video bg-muted relative group cursor-pointer">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                          <Play className="w-8 h-8 text-primary ml-1" />
                        </div>
                      </div>
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-primary text-primary-foreground">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                        22:18
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/2 p-6">
                    <Badge className={getDifficultyColor("Intermediate")} variant="secondary">
                      Intermediate
                    </Badge>
                    <h3 className="text-2xl font-bold mt-2 mb-3">
                      Building a Customer Service Bot
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Step-by-step tutorial on creating an intelligent customer service agent that can handle common inquiries, escalate complex issues, and provide 24/7 support to your customers.
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        22:18
                      </div>
                      <div className="flex items-center gap-1">
                        <Play className="w-4 h-4" />
                        15.3k views
                      </div>
                    </div>
                    <Button variant="hero" className="w-full md:w-auto">
                      Watch Now
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Video Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((video) => (
                <Card key={video.id} className="group hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
                  <div className="aspect-video bg-muted relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                        <Play className="w-5 h-5 text-primary ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute top-3 left-3">
                      <Badge className={getDifficultyColor(video.difficulty)} variant="secondary">
                        {video.difficulty}
                      </Badge>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm">
                      {video.duration}
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
                      {video.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {video.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {video.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Play className="w-4 h-4" />
                        {video.views} views
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-xl font-semibold mb-2">Want to see a specific tutorial?</h3>
            <p className="text-muted-foreground mb-4">
              Let us know what you'd like to learn and we'll create it for you
            </p>
            <Button variant="hero">
              Request a Tutorial
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VideoTutorials;