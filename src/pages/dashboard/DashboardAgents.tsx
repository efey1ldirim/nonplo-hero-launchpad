import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Bot, Calendar, MoreVertical, Edit, Trash2, Power } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import AgentCreationWizard from "@/components/AgentCreationWizard";

interface Agent {
  id: string;
  name: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

const DashboardAgents = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showWizard, setShowWizard] = useState(false);
  const [deleteAgentId, setDeleteAgentId] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Error",
          description: "Please log in to view your agents.",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase
        .from('agents')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setAgents(data || []);
    } catch (error) {
      console.error('Error fetching agents:', error);
      toast({
        title: "Error",
        description: "Failed to load agents. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAgentClick = (agentId: string) => {
    navigate(`/dashboard/agents/${agentId}`);
  };

  const handleToggleAgent = async (agentId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('agents')
        .update({ is_active: !currentStatus })
        .eq('id', agentId);

      if (error) throw error;

      setAgents(agents.map(agent => 
        agent.id === agentId 
          ? { ...agent, is_active: !currentStatus }
          : agent
      ));

      toast({
        title: "Agent Updated",
        description: `Agent ${!currentStatus ? 'activated' : 'deactivated'} successfully.`,
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

  const handleDeleteAgent = async (agentId: string) => {
    try {
      const { error } = await supabase
        .from('agents')
        .delete()
        .eq('id', agentId);

      if (error) throw error;

      setAgents(agents.filter(agent => agent.id !== agentId));
      setDeleteAgentId(null);

      toast({
        title: "Agent Deleted",
        description: "Agent has been successfully deleted.",
      });
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
      day: 'numeric'
    });
  };

  const EmptyState = () => (
    <div className="text-center py-12">
      <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
        <Bot className="w-12 h-12 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold mb-2">Henüz hiç AI çalışanınız yok</h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        İlk AI çalışanınızı oluşturmak için aşağıdaki butona tıklayın ve işletmeniz için özel olarak tasarlanmış yapay zeka asistanınızı yapılandırın.
      </p>
      <Button onClick={() => setShowWizard(true)} size="lg" className="gap-2">
        <Plus className="w-4 h-4" />
        İlk AI Çalışanını Oluştur
      </Button>
    </div>
  );

  if (loading) {
    return (
      <div className="p-4 md:p-6 lg:p-8 max-w-full">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">AI Çalışanlarım</h1>
          <p className="text-muted-foreground text-base md:text-lg">
            Tüm AI çalışanlarınızı görüntüleyin, yönetin ve yeni çalışanlar oluşturun
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-full">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">AI Çalışanlarım</h1>
        <p className="text-muted-foreground text-base md:text-lg">
          Tüm AI çalışanlarınızı görüntüleyin, yönetin ve yeni çalışanlar oluşturun
        </p>
      </div>

      {/* Agents Grid or Empty State */}
      {agents.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <Card 
              key={agent.id} 
              className="cursor-pointer hover:shadow-md transition-shadow group"
              onClick={() => handleAgentClick(agent.id)}
            >
              <CardHeader className="space-y-1">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {agent.name}
                  </CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAgentClick(agent.id);
                        }}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Agent
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleAgent(agent.id, agent.is_active);
                        }}
                      >
                        <Power className="w-4 h-4 mr-2" />
                        {agent.is_active ? 'Deactivate' : 'Activate'} Agent
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteAgentId(agent.id);
                        }}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Agent
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription className="flex items-center gap-2">
                  <Bot className="w-4 h-4" />
                  {agent.role}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant={agent.is_active ? "default" : "secondary"}>
                    {agent.is_active ? "Aktif" : "Pasif"}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {formatDate(agent.created_at)}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Agent detaylarını görüntülemek için tıklayın
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Agent Creation Wizard */}
      <AgentCreationWizard 
        open={showWizard} 
        onClose={() => {
          setShowWizard(false);
          fetchAgents(); // Refresh agents list after wizard closes
        }} 
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteAgentId} onOpenChange={() => setDeleteAgentId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Agent'ı Sil</AlertDialogTitle>
            <AlertDialogDescription>
              Bu işlem geri alınamaz. Seçili AI çalışanınız kalıcı olarak silinecek.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => deleteAgentId && handleDeleteAgent(deleteAgentId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Sil
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DashboardAgents;