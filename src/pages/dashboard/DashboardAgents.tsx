import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Bot, Calendar, MoreVertical } from "lucide-react";
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
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">AI Agents</h1>
            <p className="text-muted-foreground">View and manage all of your AI workers.</p>
          </div>
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Agents</h1>
          <p className="text-muted-foreground">View and manage all of your AI workers.</p>
        </div>
        <Button onClick={() => setShowWizard(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Yeni Agent Oluştur
        </Button>
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
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle more options
                    }}
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button>
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
    </div>
  );
};

export default DashboardAgents;