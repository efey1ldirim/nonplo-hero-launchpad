import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { 
  Bot, 
  Edit, 
  Trash2, 
  Copy, 
  Eye, 
  Play, 
  Pause, 
  BarChart3, 
  Plus,
  Calendar,
  MessageSquare,
  Users,
  Activity
} from "lucide-react";

interface Agent {
  id: string;
  name: string;
  type: string;
  status: "Active" | "Paused" | "Draft";
  interactions: number;
  createdAt: string;
  lastUsed: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Mock data - expanded list
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: "1",
      name: "Restaurant Booking Bot",
      type: "Reservation Assistant",
      status: "Active",
      interactions: 1247,
      createdAt: "2024-01-15",
      lastUsed: "2 hours ago"
    },
    {
      id: "2",
      name: "Lead Qualifier",
      type: "Sales Assistant", 
      status: "Paused",
      interactions: 89,
      createdAt: "2024-01-10",
      lastUsed: "3 days ago"
    },
    {
      id: "3",
      name: "Customer Support Bot",
      type: "Customer Service",
      status: "Active",
      interactions: 567,
      createdAt: "2024-01-08",
      lastUsed: "1 hour ago"
    },
    {
      id: "4",
      name: "E-commerce Helper",
      type: "Shopping Assistant",
      status: "Draft",
      interactions: 0,
      createdAt: "2024-01-05",
      lastUsed: "Never"
    },
    {
      id: "5",
      name: "Appointment Scheduler",
      type: "Healthcare Assistant",
      status: "Active",
      interactions: 334,
      createdAt: "2024-01-03",
      lastUsed: "5 hours ago"
    }
  ]);

  const handleStatusToggle = (agentId: string) => {
    setAgents(agents.map(agent => 
      agent.id === agentId 
        ? { ...agent, status: agent.status === "Active" ? "Paused" : "Active" as "Active" | "Paused" }
        : agent
    ));
  };

  const handleDelete = () => {
    if (selectedAgent) {
      setAgents(agents.filter(agent => agent.id !== selectedAgent.id));
      setIsDeleteModalOpen(false);
      setSelectedAgent(null);
    }
  };

  const handleDuplicate = (agent: Agent) => {
    const duplicatedAgent: Agent = {
      ...agent,
      id: Date.now().toString(),
      name: `${agent.name} (Copy)`,
      status: "Draft",
      interactions: 0,
      createdAt: new Date().toISOString().split('T')[0],
      lastUsed: "Never"
    };
    setAgents([duplicatedAgent, ...agents]);
  };

  const openDeleteModal = (agent: Agent) => {
    setSelectedAgent(agent);
    setIsDeleteModalOpen(true);
  };

  const getStatusColor = (status: Agent['status']) => {
    switch (status) {
      case "Active":
        return "default";
      case "Paused":
        return "secondary";
      case "Draft":
        return "outline";
      default:
        return "secondary";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "reservation assistant":
        return Calendar;
      case "sales assistant":
        return Users;
      case "customer service":
        return MessageSquare;
      case "shopping assistant":
        return Bot;
      case "healthcare assistant":
        return Activity;
      default:
        return Bot;
    }
  };

  const activeAgents = agents.filter(a => a.status === "Active").length;
  const totalInteractions = agents.reduce((sum, a) => sum + a.interactions, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Agent Dashboard</h1>
            <p className="text-muted-foreground">Manage all your AI agents in one place</p>
          </div>
          <Button 
            onClick={() => navigate('/builder')}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Create New Agent
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Bot className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Total Agents</span>
              </div>
              <p className="text-2xl font-bold mt-2">{agents.length}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Play className="h-5 w-5 text-green-600" />
                <span className="text-sm text-muted-foreground">Active Agents</span>
              </div>
              <p className="text-2xl font-bold mt-2">{activeAgents}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-muted-foreground">Total Interactions</span>
              </div>
              <p className="text-2xl font-bold mt-2">{totalInteractions.toLocaleString()}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-purple-600" />
                <span className="text-sm text-muted-foreground">Avg. Daily</span>
              </div>
              <p className="text-2xl font-bold mt-2">{Math.round(totalInteractions / 30)}</p>
            </CardContent>
          </Card>
        </div>

        {/* Agents Table */}
        <Card>
          <CardHeader>
            <CardTitle>Your Agents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {agents.map((agent) => {
                const IconComponent = getTypeIcon(agent.type);
                return (
                  <div 
                    key={agent.id} 
                    className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      
                      <div>
                        <h3 className="font-semibold">{agent.name}</h3>
                        <p className="text-sm text-muted-foreground">{agent.type}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs text-muted-foreground">
                            Created: {agent.createdAt}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Last used: {agent.lastUsed}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant={getStatusColor(agent.status)}>
                            {agent.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {agent.interactions.toLocaleString()} interactions
                        </p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleStatusToggle(agent.id)}
                          disabled={agent.status === "Draft"}
                        >
                          {agent.status === "Active" ? (
                            <Pause className="h-4 w-4" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                        </Button>
                        
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDuplicate(agent)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        
                        <Button size="sm" variant="outline">
                          <BarChart3 className="h-4 w-4" />
                        </Button>
                        
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => openDeleteModal(agent)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {agents.length === 0 && (
              <div className="text-center py-12">
                <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No agents yet</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first AI agent to get started
                </p>
                <Button onClick={() => navigate('/builder')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Agent
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Agent</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedAgent?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;