import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bot, 
  Calendar, 
  MessageSquare, 
  Mail, 
  Phone, 
  Play, 
  Pause, 
  Edit, 
  Trash2, 
  Copy, 
  Eye,
  Plus,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Zap,
  Users,
  ShoppingCart,
  Headphones
} from "lucide-react";

interface Agent {
  id: string;
  name: string;
  type: string;
  status: "Active" | "Paused" | "Draft";
  interactions: number;
  createdAt: string;
}

const Builder = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAgentType, setSelectedAgentType] = useState("");
  const [businessInfo, setBusinessInfo] = useState({
    name: "",
    industry: "",
    hours: "",
    services: ""
  });
  const [personality, setPersonality] = useState({
    style: "",
    tone: ""
  });
  const [integrations, setIntegrations] = useState({
    whatsapp: false,
    email: false,
    calendar: false,
    phone: false
  });

  // Mock data for existing agents
  const [agents] = useState<Agent[]>([
    {
      id: "1",
      name: "Restaurant Booking Bot",
      type: "Reservation Assistant",
      status: "Active",
      interactions: 1247,
      createdAt: "2024-01-15"
    },
    {
      id: "2",
      name: "Lead Qualifier",
      type: "Sales Assistant",
      status: "Paused",
      interactions: 89,
      createdAt: "2024-01-10"
    }
  ]);

  const totalSteps = 5;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const agentTypes = [
    { id: "reservation", name: "Reservation Bot", description: "Handle bookings and appointments", icon: Calendar },
    { id: "support", name: "Customer Support", description: "Answer questions and resolve issues", icon: Headphones },
    { id: "sales", name: "Lead Qualifier", description: "Qualify and nurture sales leads", icon: Users },
    { id: "ecommerce", name: "Shopping Assistant", description: "Help customers with purchases", icon: ShoppingCart },
    { id: "custom", name: "Custom Agent", description: "Start from scratch", icon: Bot }
  ];

  const templates = [
    {
      id: "restaurant",
      name: "Restaurant Booking Assistant",
      description: "Perfect for restaurants, cafes, and dining establishments",
      features: ["Table reservations", "Menu inquiries", "Hours & location"],
      icon: Calendar
    },
    {
      id: "ecommerce",
      name: "E-commerce Support Bot",
      description: "Handle order tracking, returns, and product questions",
      features: ["Order status", "Product info", "Return policy"],
      icon: ShoppingCart
    },
    {
      id: "appointment",
      name: "Appointment Scheduler",
      description: "Ideal for healthcare, beauty, and professional services",
      features: ["Booking management", "Reminders", "Rescheduling"],
      icon: Calendar
    },
    {
      id: "lead",
      name: "Lead Generation Bot",
      description: "Qualify prospects and collect contact information",
      features: ["Lead scoring", "Contact forms", "Follow-up"],
      icon: Users
    }
  ];

  const communicationStyles = [
    { id: "friendly", name: "Friendly", description: "Warm and approachable" },
    { id: "professional", name: "Professional", description: "Business-focused and formal" },
    { id: "casual", name: "Casual", description: "Relaxed and conversational" },
    { id: "sales", name: "Sales-focused", description: "Persuasive and results-driven" }
  ];

  const tones = [
    { id: "cheerful", name: "Cheerful", description: "Upbeat and positive" },
    { id: "calm", name: "Calm", description: "Steady and reassuring" },
    { id: "confident", name: "Confident", description: "Authoritative and sure" },
    { id: "helpful", name: "Helpful", description: "Supportive and solution-oriented" }
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDeploy = () => {
    // Handle agent deployment
    console.log("Deploying agent...");
    setCurrentStep(1);
    setSelectedAgentType("");
    setBusinessInfo({ name: "", industry: "", hours: "", services: "" });
    setPersonality({ style: "", tone: "" });
    setIntegrations({ whatsapp: false, email: false, calendar: false, phone: false });
  };

  const renderWizardStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Choose Your Agent Type</h3>
              <p className="text-muted-foreground">What will your AI agent help you with?</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {agentTypes.map((type) => {
                const IconComponent = type.icon;
                return (
                  <Card 
                    key={type.id} 
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedAgentType === type.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedAgentType(type.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <IconComponent className="h-6 w-6 text-primary mt-1" />
                        <div>
                          <h4 className="font-medium">{type.name}</h4>
                          <p className="text-sm text-muted-foreground">{type.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Business Information</h3>
              <p className="text-muted-foreground">Tell us about your business to personalize your agent.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="business-name">Business Name</Label>
                <Input 
                  id="business-name"
                  value={businessInfo.name}
                  onChange={(e) => setBusinessInfo({...businessInfo, name: e.target.value})}
                  placeholder="Enter your business name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Input 
                  id="industry"
                  value={businessInfo.industry}
                  onChange={(e) => setBusinessInfo({...businessInfo, industry: e.target.value})}
                  placeholder="e.g., Restaurant, Healthcare, Retail"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hours">Working Hours</Label>
                <Input 
                  id="hours"
                  value={businessInfo.hours}
                  onChange={(e) => setBusinessInfo({...businessInfo, hours: e.target.value})}
                  placeholder="e.g., Mon-Fri 9AM-6PM"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="services">Services/Products</Label>
                <Textarea 
                  id="services"
                  value={businessInfo.services}
                  onChange={(e) => setBusinessInfo({...businessInfo, services: e.target.value})}
                  placeholder="Briefly describe what you offer..."
                  rows={3}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Personality & Tone</h3>
              <p className="text-muted-foreground">How should your agent communicate with customers?</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <Label className="text-base font-medium">Communication Style</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  {communicationStyles.map((style) => (
                    <Card 
                      key={style.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        personality.style === style.id ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => setPersonality({...personality, style: style.id})}
                    >
                      <CardContent className="p-4">
                        <h4 className="font-medium">{style.name}</h4>
                        <p className="text-sm text-muted-foreground">{style.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base font-medium">Tone</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  {tones.map((tone) => (
                    <Card 
                      key={tone.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        personality.tone === tone.id ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => setPersonality({...personality, tone: tone.id})}
                    >
                      <CardContent className="p-4">
                        <h4 className="font-medium">{tone.name}</h4>
                        <p className="text-sm text-muted-foreground">{tone.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Integrations</h3>
              <p className="text-muted-foreground">Connect your agent with external platforms (optional).</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { key: 'whatsapp', name: 'WhatsApp', icon: MessageSquare, description: 'Connect with WhatsApp Business' },
                { key: 'email', name: 'Email', icon: Mail, description: 'Send and receive emails' },
                { key: 'calendar', name: 'Google Calendar', icon: Calendar, description: 'Schedule appointments' },
                { key: 'phone', name: 'Phone Support', icon: Phone, description: 'Voice call integration' }
              ].map((integration) => {
                const IconComponent = integration.icon;
                return (
                  <Card key={integration.key} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <IconComponent className="h-5 w-5 text-primary" />
                        <div>
                          <h4 className="font-medium">{integration.name}</h4>
                          <p className="text-sm text-muted-foreground">{integration.description}</p>
                        </div>
                      </div>
                      <Button
                        variant={integrations[integration.key as keyof typeof integrations] ? "default" : "outline"}
                        size="sm"
                        onClick={() => setIntegrations({
                          ...integrations,
                          [integration.key]: !integrations[integration.key as keyof typeof integrations]
                        })}
                      >
                        {integrations[integration.key as keyof typeof integrations] ? "Connected" : "Connect"}
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Review & Deploy</h3>
              <p className="text-muted-foreground">Review your agent configuration before deployment.</p>
            </div>
            
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Agent Type</h4>
                    <p className="mt-1">{agentTypes.find(t => t.id === selectedAgentType)?.name || "Not selected"}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Business</h4>
                    <p className="mt-1">{businessInfo.name || "Not specified"}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Communication Style</h4>
                    <p className="mt-1">{communicationStyles.find(s => s.id === personality.style)?.name || "Not selected"}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Tone</h4>
                    <p className="mt-1">{tones.find(t => t.id === personality.tone)?.name || "Not selected"}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Integrations</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {Object.entries(integrations).filter(([_, enabled]) => enabled).map(([key, _]) => (
                      <Badge key={key} variant="secondary">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </Badge>
                    ))}
                    {Object.values(integrations).every(v => !v) && (
                      <span className="text-muted-foreground">None selected</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium">Your agent is private and secure by default</span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">AI Agent Builder</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create and manage AI agents customized for your business — no coding required.
          </p>
        </div>

        <Tabs defaultValue="create" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="create">Create Agent</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="manage">My Agents</TabsTrigger>
          </TabsList>

          {/* Agent Creation Wizard */}
          <TabsContent value="create" className="space-y-8">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Step {currentStep} of {totalSteps}</CardTitle>
                    <CardDescription>Build your AI agent step by step</CardDescription>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {Math.round(progressPercentage)}% complete
                  </div>
                </div>
                <Progress value={progressPercentage} className="mt-4" />
              </CardHeader>
              
              <CardContent className="min-h-[400px]">
                {renderWizardStep()}
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={handlePrev}
                  disabled={currentStep === 1}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                
                {currentStep === totalSteps ? (
                  <Button onClick={handleDeploy} variant="hero">
                    <Zap className="w-4 h-4 mr-2" />
                    Deploy Agent
                  </Button>
                ) : (
                  <Button onClick={handleNext}>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Prebuilt Templates */}
          <TabsContent value="templates" className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Prebuilt Agent Templates</h2>
              <p className="text-muted-foreground">Get started quickly with these ready-to-use templates.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {templates.map((template) => {
                const IconComponent = template.icon;
                return (
                  <Card key={template.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <IconComponent className="h-8 w-8 text-primary" />
                        <div>
                          <CardTitle className="text-lg">{template.name}</CardTitle>
                          <CardDescription>{template.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Features included:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {template.features.map((feature, index) => (
                            <li key={index} className="flex items-center space-x-2">
                              <CheckCircle className="h-3 w-3 text-green-600" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                    
                    <CardFooter>
                      <Button className="w-full">
                        Use this template
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Agent Management */}
          <TabsContent value="manage" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Your AI Agents</h2>
                <p className="text-muted-foreground">Manage and monitor your deployed agents.</p>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create New Agent
              </Button>
            </div>

            {agents.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Bot className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">You haven't created any agents yet.</h3>
                  <p className="text-muted-foreground mb-6">
                    Get started by creating your first AI agent using our step-by-step builder.
                  </p>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Start Building
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {agents.map((agent) => (
                  <Card key={agent.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Bot className="h-8 w-8 text-primary" />
                          <div>
                            <CardTitle className="text-lg">{agent.name}</CardTitle>
                            <CardDescription>{agent.type}</CardDescription>
                          </div>
                        </div>
                        <Badge variant={agent.status === "Active" ? "default" : agent.status === "Paused" ? "secondary" : "outline"}>
                          {agent.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Interactions:</span>
                          <span className="font-medium">{agent.interactions.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Created:</span>
                          <span className="font-medium">{new Date(agent.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter>
                      <div className="flex space-x-2 w-full">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="w-4 h-4 mr-1" />
                          Preview
                        </Button>
                        <Button variant="outline" size="sm">
                          {agent.status === "Active" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Trust & Privacy Footer */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>Your agent is private and secure by default. We comply with GDPR and KVKK regulations.</p>
        </div>
      </div>
    </div>
  );
};

export default Builder;