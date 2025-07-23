import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import { 
  CreditCard, 
  User, 
  Shield, 
  Crown, 
  Download, 
  Trash2, 
  Mail, 
  Building,
  Lock,
  Calendar
} from "lucide-react";

const Account = () => {
  const [personalInfo, setPersonalInfo] = useState({
    name: "John Smith",
    email: "john.smith@company.com",
    company: "Acme Corp"
  });

  const handlePersonalInfoChange = (field: string, value: string) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSavePersonalInfo = () => {
    // TODO: Implement save functionality
    console.log("Saving personal info:", personalInfo);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-background via-primary/5 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Your Account
            </h1>
            <p className="text-xl text-muted-foreground">
              Manage your subscription, billing, and preferences
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="subscription" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="subscription" className="flex items-center gap-2">
                  <Crown className="w-4 h-4" />
                  <span className="hidden sm:inline">Subscription</span>
                </TabsTrigger>
                <TabsTrigger value="payment" className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  <span className="hidden sm:inline">Payment</span>
                </TabsTrigger>
                <TabsTrigger value="personal" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Personal</span>
                </TabsTrigger>
                <TabsTrigger value="privacy" className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span className="hidden sm:inline">Privacy</span>
                </TabsTrigger>
              </TabsList>

              {/* Subscription Tab */}
              <TabsContent value="subscription">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Crown className="w-5 h-5 text-primary" />
                      Current Subscription
                    </CardTitle>
                    <CardDescription>
                      Manage your plan and billing cycle
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between p-6 border rounded-lg bg-muted/20">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="text-2xl font-semibold">Pro Plan</h3>
                          <Badge variant="secondary" className="bg-primary/10 text-primary">
                            Most Popular
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">
                          5 AI agents, 2,500 conversations/month, Priority support
                        </p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>Renews on March 15, 2024</span>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 text-right">
                        <div className="text-3xl font-bold">$19</div>
                        <div className="text-sm text-muted-foreground">per month</div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button variant="hero" className="flex-1">
                        Upgrade Plan
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Manage Subscription
                      </Button>
                    </div>
                    
                    <div className="text-center">
                      <Button variant="ghost" className="text-muted-foreground">
                        Cancel Subscription
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Payment Methods Tab */}
              <TabsContent value="payment">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-primary" />
                      Payment Methods
                    </CardTitle>
                    <CardDescription>
                      Manage your billing information and payment methods
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-8 bg-primary/10 rounded flex items-center justify-center">
                            <CreditCard className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Visa ending in 4242</p>
                            <p className="text-sm text-muted-foreground">Expires 12/2024</p>
                          </div>
                        </div>
                        <Badge variant="secondary">Default</Badge>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button variant="outline" className="flex-1">
                        Update Payment Method
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Add New Card
                      </Button>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground p-4 bg-muted/20 rounded-lg">
                      <Lock className="w-4 h-4" />
                      <span>Secure billing powered by Stripe</span>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Personal Information Tab */}
              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      Personal Information
                    </CardTitle>
                    <CardDescription>
                      Update your account details and contact information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          value={personalInfo.name}
                          onChange={(e) => handlePersonalInfoChange("name", e.target.value)}
                          placeholder="Enter your full name"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={personalInfo.email}
                          onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
                          placeholder="Enter your email"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="company" className="flex items-center gap-2">
                          <Building className="w-4 h-4" />
                          Company
                        </Label>
                        <Input
                          id="company"
                          value={personalInfo.company}
                          onChange={(e) => handlePersonalInfoChange("company", e.target.value)}
                          placeholder="Enter your company name"
                        />
                      </div>
                    </div>
                    
                    <Button onClick={handleSavePersonalInfo} className="w-full sm:w-auto">
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Privacy & Data Tab */}
              <TabsContent value="privacy">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-primary" />
                      My Data & Privacy
                    </CardTitle>
                    <CardDescription>
                      Control your data and privacy settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Download Your Data</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Get a copy of all your data in JSON format
                        </p>
                        <Button variant="outline" className="flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          Download Data
                        </Button>
                      </div>
                      
                      <Separator />
                      
                      <div className="p-4 border rounded-lg border-destructive/20">
                        <h4 className="font-medium mb-2 text-destructive">Delete Account</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Permanently delete your account and all associated data
                        </p>
                        <Button variant="destructive" className="flex items-center gap-2">
                          <Trash2 className="w-4 h-4" />
                          Request Account Deletion
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-muted/20 rounded-lg">
                      <h4 className="font-medium mb-2">Privacy Compliance</h4>
                      <p className="text-sm text-muted-foreground">
                        Your data is safe and encrypted. We comply with GDPR, CCPA, and other privacy regulations. 
                        Your privacy is our priority.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-12 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-xl font-semibold mb-2">Need Help?</h3>
            <p className="text-muted-foreground mb-4">
              Our support team is here to assist you with any questions
            </p>
            <Button variant="outline">
              Contact Support
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Account;