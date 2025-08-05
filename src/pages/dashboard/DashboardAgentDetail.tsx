import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Bot, Calendar, Trash2, FileText, MessageSquare, Settings, Plug } from "lucide-react";

interface Agent {
  id: string;
  name: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

const DashboardAgentDetail = () => {
  const { agentId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (agentId) {
      fetchAgent();
    }
  }, [agentId]);

  const fetchAgent = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Error",
          description: "Please log in to view agent details.",
          variant: "destructive",
        });
        navigate('/auth');
        return;
      }

      const { data, error } = await supabase
        .from('agents')
        .select('*')
        .eq('id', agentId)
        .eq('user_id', user.id)
        .single();

      if (error) {
        throw error;
      }

      if (!data) {
        toast({
          title: "Agent Not Found",
          description: "The requested agent could not be found.",
          variant: "destructive",
        });
        navigate('/dashboard/agents');
        return;
      }

      setAgent(data);
    } catch (error) {
      console.error('Error fetching agent:', error);
      toast({
        title: "Error",
        description: "Failed to load agent details. Please try again.",
        variant: "destructive",
      });
      navigate('/dashboard/agents');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (isActive: boolean) => {
    if (!agent) return;

    try {
      const { error } = await supabase
        .from('agents')
        .update({ is_active: isActive })
        .eq('id', agent.id);

      if (error) throw error;

      setAgent({ ...agent, is_active: isActive });
      toast({
        title: "Agent Updated",
        description: `Agent ${isActive ? 'activated' : 'deactivated'} successfully.`,
      });
    } catch (error) {
      console.error('Error updating agent:', error);
      toast({
        title: "Error",
        description: "Failed to update agent status.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAgent = async () => {
    if (!agent) return;

    try {
      const { error } = await supabase
        .from('agents')
        .delete()
        .eq('id', agent.id);

      if (error) throw error;

      toast({
        title: "Agent Deleted",
        description: "Agent has been successfully deleted.",
      });
      navigate('/dashboard/agents');
    } catch (error) {
      console.error('Error deleting agent:', error);
      toast({
        title: "Error",
        description: "Failed to delete agent.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="p-4 md:p-6 lg:p-8 max-w-full">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-64 mb-6"></div>
          <div className="grid gap-6">
            <div className="h-40 bg-muted rounded"></div>
            <div className="h-96 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="p-4 md:p-6 lg:p-8 max-w-full">
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-4">Agent Not Found</h3>
          <Button onClick={() => navigate('/dashboard/agents')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Agents
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-full">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/dashboard/agents')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Geri Dön
          </Button>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{agent.name}</h1>
        <p className="text-muted-foreground text-base md:text-lg">
          AI çalışanınızı yönetin ve yapılandırın
        </p>
      </div>

      {/* Agent Overview Card */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">{agent.name}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <span>{agent.role}</span>
                  <Badge variant={agent.is_active ? "default" : "secondary"}>
                    {agent.is_active ? "Aktif" : "Pasif"}
                  </Badge>
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Status:</span>
                <Switch
                  checked={agent.is_active}
                  onCheckedChange={handleToggleActive}
                />
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Sil
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Agent'ı Sil</AlertDialogTitle>
                    <AlertDialogDescription>
                      Bu işlem geri alınamaz. {agent.name} adlı AI çalışanınız kalıcı olarak silinecek.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>İptal</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteAgent} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      Sil
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Oluşturulma: {formatDate(agent.created_at)}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for different sections */}
      <Tabs defaultValue="knowledge" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="knowledge" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Bilgi Bankası
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Plug className="w-4 h-4" />
            Entegrasyonlar
          </TabsTrigger>
          <TabsTrigger value="conversations" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Konuşma Geçmişi
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Ayarlar
          </TabsTrigger>
        </TabsList>

        <TabsContent value="knowledge" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Bilgi Bankası Yönetimi</CardTitle>
              <CardDescription>
                AI çalışanınızın sahip olduğu bilgileri yönetin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <FileText className="w-6 h-6" />
                  <span>FAQ Ekle/Düzenle</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <FileText className="w-6 h-6" />
                  <span>Dosya Yükle</span>
                </Button>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Mevcut Dosyalar</h4>
                <p className="text-sm text-muted-foreground">
                  Henüz dosya yüklenmedi. .txt, .docx ve .pdf formatlarında dosya yükleyebilirsiniz.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Entegrasyonlar</CardTitle>
              <CardDescription>
                AI çalışanınızın bağlı olduğu kanalları yönetin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">WhatsApp</h4>
                    <p className="text-sm text-muted-foreground">WhatsApp Business API entegrasyonu</p>
                  </div>
                  <Button variant="outline" size="sm">Bağla</Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Website Widget</h4>
                    <p className="text-sm text-muted-foreground">Web sitenize chat widget ekleyin</p>
                  </div>
                  <Button variant="outline" size="sm">Bağla</Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Instagram</h4>
                    <p className="text-sm text-muted-foreground">Instagram DM entegrasyonu</p>
                  </div>
                  <Button variant="outline" size="sm">Bağla</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conversations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Konuşma Geçmişi</CardTitle>
              <CardDescription>
                AI çalışanınızın geçmiş konuşmalarını görüntüleyin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h4 className="font-medium mb-2">Henüz konuşma yok</h4>
                <p className="text-sm text-muted-foreground">
                  AI çalışanınız müşterilerle konuşmaya başladığında geçmiş burada görünecek.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Genel Ayarlar</CardTitle>
              <CardDescription>
                AI çalışanınızın genel ayarlarını yapılandırın
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <label className="text-sm font-medium">Karşılama Mesajı</label>
                  <textarea 
                    className="w-full mt-1 p-3 border rounded-md resize-none"
                    rows={3}
                    placeholder="Merhaba! Size nasıl yardımcı olabilirim?"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Yedek Yanıt</label>
                  <textarea 
                    className="w-full mt-1 p-3 border rounded-md resize-none"
                    rows={3}
                    placeholder="Üzgünüm, bu konuda size yardımcı olamıyorum."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Çalışma Saatleri</label>
                  <div className="mt-1 p-3 border rounded-md text-sm text-muted-foreground">
                    Pazartesi - Cuma: 09:00 - 18:00
                  </div>
                </div>
              </div>
              <Button className="mt-4">Değişiklikleri Kaydet</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardAgentDetail;