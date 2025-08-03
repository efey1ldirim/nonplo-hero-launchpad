import { useState } from "react";
import { 
  HelpCircle, 
  MessageCircle, 
  FileText, 
  PlayCircle, 
  BookOpen, 
  Upload,
  Send,
  X,
  Lightbulb
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const DashboardSupport = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showChatTooltip, setShowChatTooltip] = useState(false);
  const [ticketForm, setTicketForm] = useState({
    subject: "",
    email: "",
    description: ""
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const helpOptions = [
    {
      title: "Sık Sorulan Sorular",
      description: "En yaygın sorular ve yanıtları bulun",
      icon: HelpCircle,
      action: "View FAQs",
      onClick: () => navigate("/#faq")
    },
    {
      title: "Video Eğitimler",
      description: "Adım adım video kılavuzları izleyin",
      icon: PlayCircle,
      action: "Watch Videos",
      onClick: () => navigate("/resources/video-tutorials")
    },
    {
      title: "Dokümantasyon",
      description: "Detaylı kullanım kılavuzları ve örnekler",
      icon: BookOpen,
      action: "Go to Docs", 
      onClick: () => navigate("/resources/documentation")
    }
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = ['.txt', '.pdf', '.docx'];
      const fileName = file.name.toLowerCase();
      const isValidType = allowedTypes.some(type => fileName.endsWith(type));
      
      if (isValidType) {
        setSelectedFile(file);
      } else {
        toast({
          title: "Desteklenmeyen dosya formatı",
          description: "Sadece .txt, .pdf veya .docx dosyaları yükleyebilirsiniz.",
          variant: "destructive"
        });
      }
    }
  };

  const handleTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Destek talebi gönderildi",
        description: "Ekibimiz en kısa sürede size dönüş yapacaktır."
      });

      // Reset form
      setTicketForm({ subject: "", email: "", description: "" });
      setSelectedFile(null);
    } catch (error) {
      toast({
        title: "Hata",
        description: "Destek talebi gönderilemedi. Lütfen tekrar deneyin.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          Support Center
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Your AI assistant is here to help. Check our guides or contact our team directly.
        </p>
      </div>

      {/* Help Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {helpOptions.map((option, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <option.icon className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-xl mb-2">{option.title}</CardTitle>
              <CardDescription className="text-sm">
                {option.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                onClick={option.onClick}
                variant="outline" 
                className="w-full hover:bg-primary hover:text-primary-foreground"
              >
                {option.action}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Support Ticket Form */}
      <Card className="max-w-2xl mx-auto mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <FileText className="w-6 h-6" />
            Create a Support Ticket
          </CardTitle>
          <CardDescription>
            Describe your issue and our team will get back to you as soon as possible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleTicketSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Brief description of your issue"
                  value={ticketForm.subject}
                  onChange={(e) => setTicketForm({...ticketForm, subject: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={ticketForm.email}
                  onChange={(e) => setTicketForm({...ticketForm, email: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Please provide a detailed description of your issue..."
                rows={5}
                value={ticketForm.description}
                onChange={(e) => setTicketForm({...ticketForm, description: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="file-upload">File Upload (Optional)</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors">
                <input
                  id="file-upload"
                  type="file"
                  accept=".txt,.pdf,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  Only .txt, .pdf, or .docx files (Max 10MB)
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  Choose File
                </Button>
                {selectedFile && (
                  <div className="mt-4 flex items-center justify-center gap-2 text-sm text-foreground">
                    <FileText className="w-4 h-4" />
                    <span>{selectedFile.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedFile(null)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  Sending...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Submit Ticket
                </div>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Live Chat Widget */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="relative">
          {showChatTooltip && (
            <div className="absolute bottom-full right-0 mb-2 bg-background border border-border rounded-lg shadow-lg p-3 min-w-[200px]">
              <p className="text-sm text-foreground">Need help? Chat with us.</p>
              <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-background border-r border-b border-border"></div>
            </div>
          )}
          <Button
            className="w-14 h-14 rounded-full shadow-lg hover:scale-105 transition-all"
            onMouseEnter={() => setShowChatTooltip(true)}
            onMouseLeave={() => setShowChatTooltip(false)}
            onClick={() => toast({ title: "Chat widget", description: "Live chat feature coming soon!" })}
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Feedback Button */}
      <div className="fixed bottom-4 left-4 z-50">
        <Button
          variant="outline"
          className="shadow-lg hover:scale-105 transition-all"
          onClick={() => toast({ title: "Feedback", description: "Feedback feature coming soon!" })}
        >
          <Lightbulb className="w-4 h-4 mr-2" />
          💡 Send Feedback
        </Button>
      </div>
    </div>
  );
};

export default DashboardSupport;