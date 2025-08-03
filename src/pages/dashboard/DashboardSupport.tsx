import { useState } from "react";
import { 
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
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface DashboardSupportProps {
  onClose: () => void;
}

const DashboardSupport = ({ onClose }: DashboardSupportProps) => {
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

  const quickActions = [
    {
      title: "Video Eğitimler",
      icon: PlayCircle,
      onClick: () => {
        navigate("/resources/videos");
        onClose();
      }
    },
    {
      title: "Dokümantasyon", 
      icon: BookOpen,
      onClick: () => {
        navigate("/resources/documentation");
        onClose();
      }
    }
  ];

  const faqs = [
    {
      question: "Nonplo'yu kullanmak için kodlama becerisine ihtiyacım var mı?",
      answer: "Hayır! Nonplo geliştiriciler için değil, işletme sahipleri için tasarlanmıştır. Kurulum sihirbazımızı kullanarak yapay zeka çalışanları oluşturabilir ve özelleştirebilirsiniz. E-posta veya sosyal medya kullanabiliyorsanız, Nonplo'yu da kullanabilirsiniz."
    },
    {
      question: "Bir yapay zeka çalışanı ne tür görevleri yerine getirebilir?",
      answer: "Yapay zeka çalışanları müşteri desteği, potansiyel müşteri değerlendirme, e-posta otomasyonu, randevu planlama ve veri girişinde mükemmeldir. Temel olarak, bir kalıbı takip eden herhangi bir tekrarlayan görev otomatikleştirilebilir. Her çalışan işletme tarzınızı öğrenir ve buna göre yanıt verir."
    },
    {
      question: "Nonplo'yu mevcut araçlarımla birlikte kullanabilir miyim?",
      answer: "Evet! Nonplo Gmail, Slack, Shopify, WordPress ve birçok CRM sistemi gibi popüler araçlarla entegre olur. Özel entegrasyonlar için webhook'lar ve API'ler de sağlıyoruz. Çalışanlarımız mevcut iş akışınızla birlikte çalışır."
    },
    {
      question: "Verilerim Nonplo ile güvende mi?",
      answer: "Kesinlikle. Kurumsal düzeyde şifreleme kullanıyoruz ve GDPR ile KVKK düzenlemelerine uygun çalışıyoruz. Verileriniz güvenli bir şekilde saklanır ve hiçbir zaman üçüncü taraflarla paylaşılmaz. Tam kontrole sahipsiniz ve istediğiniz zaman verilerinizi dışa aktarabilir veya silebilirsiniz."
    },
    {
      question: "Aboneliğimi iptal edersem ne olur?",
      answer: "Hiçbir sorun yok, gizli ücret yok. Kontrol panelinizden istediğiniz zaman iptal edebilirsiniz. Çalışanlarınız fatura döneminizin sonuna kadar çalışmaya devam edecek ve tüm verilerinizi dışa aktarabilirsiniz. Ayrıca fikrinizi değiştirirseniz 30 günlük yeniden aktifleştirme süresi sunuyoruz."
    },
    {
      question: "Nonplo'yu ücretsiz deneyebilir miyim?",
      answer: "Evet! Tüm özelliklere tam erişimli 14 günlük ücretsiz deneme sunuyoruz. Başlamak için kredi kartı gerekmez. 2 çalışana kadar oluşturabilir ve gerçek senaryolarla test edebilirsiniz. Sadece Nonplo'nun işletmeniz için çalıştığından emin olduğunuzda yükseltin."
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Destek Merkezi
            </h1>
            <p className="text-muted-foreground mt-1">
              AI asistanınız size yardımcı olmak için burada. Rehberlerimizi inceleyin veya ekibimizle doğrudan iletişime geçin.
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="shrink-0"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-8">
          {/* Support Ticket Form - Now at the top */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <FileText className="w-5 h-5" />
                Destek Talebi Oluştur
              </CardTitle>
              <CardDescription>
                Sorununuzu açıklayın, ekibimiz en kısa sürede size dönüş yapacaktır.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTicketSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Konu</Label>
                    <Input
                      id="subject"
                      placeholder="Sorununuzun kısa açıklaması"
                      value={ticketForm.subject}
                      onChange={(e) => setTicketForm({...ticketForm, subject: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-posta</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="sizin.email@ornek.com"
                      value={ticketForm.email}
                      onChange={(e) => setTicketForm({...ticketForm, email: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Açıklama</Label>
                  <Textarea
                    id="description"
                    placeholder="Lütfen sorununuzun detaylı açıklamasını yapın..."
                    rows={4}
                    value={ticketForm.description}
                    onChange={(e) => setTicketForm({...ticketForm, description: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file-upload">Dosya Yükleme (İsteğe Bağlı)</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center hover:border-muted-foreground/50 transition-colors">
                    <input
                      id="file-upload"
                      type="file"
                      accept=".txt,.pdf,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Yüklemek için tıklayın veya sürükleyip bırakın
                    </p>
                    <p className="text-xs text-muted-foreground mb-3">
                      Sadece .txt, .pdf veya .docx dosyaları (Maks 10MB)
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById('file-upload')?.click()}
                    >
                      Dosya Seç
                    </Button>
                    {selectedFile && (
                      <div className="mt-3 flex items-center justify-center gap-2 text-sm text-foreground">
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
                      Gönderiliyor...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Talep Gönder
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Quick Actions - Simplified */}
          <div className="flex gap-4 justify-center">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={action.onClick}
                className="flex flex-col items-center gap-2 h-auto py-4 px-6 hover:bg-primary hover:text-primary-foreground"
              >
                <action.icon className="w-6 h-6" />
                <span className="text-sm">{action.title}</span>
              </Button>
            ))}
          </div>

          {/* FAQ Section - Now at the bottom */}
          <div className="border-t border-border pt-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Sık Sorulan Sorular
              </h2>
              <p className="text-muted-foreground">
                Yapay zeka çalışanı oluşturmaya başlamak için bilmeniz gereken her şey
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border border-border/50 rounded-lg px-4 py-1 bg-card/50 hover:bg-card/80 transition-colors"
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pt-1 pb-3">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* Live Chat Widget */}
        <div className="fixed bottom-4 right-4 z-50">
          <div className="relative">
            {showChatTooltip && (
              <div className="absolute bottom-full right-0 mb-2 bg-background border border-border rounded-lg shadow-lg p-3 min-w-[200px]">
                <p className="text-sm text-foreground">Yardıma mı ihtiyacınız var? Bizimle sohbet edin.</p>
                <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-background border-r border-b border-border"></div>
              </div>
            )}
            <Button
              className="w-12 h-12 rounded-full shadow-lg hover:scale-105 transition-all"
              onMouseEnter={() => setShowChatTooltip(true)}
              onMouseLeave={() => setShowChatTooltip(false)}
              onClick={() => toast({ title: "Sohbet widget'ı", description: "Canlı sohbet özelliği yakında geliyor!" })}
            >
              <MessageCircle className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Feedback Button */}
        <div className="fixed bottom-4 left-4 z-50">
          <Button
            variant="outline"
            size="sm"
            className="shadow-lg hover:scale-105 transition-all"
            onClick={() => toast({ title: "Geri bildirim", description: "Geri bildirim özelliği yakında geliyor!" })}
          >
            <Lightbulb className="w-4 h-4 mr-2" />
             Geri Bildirim Gönder
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardSupport;