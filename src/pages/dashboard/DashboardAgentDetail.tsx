import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Calendar as CalendarIcon, MoreVertical, Trash2, Download, Copy, Pencil, Bot, ChevronRight } from "lucide-react";

interface Agent {
  id: string;
  name: string;
  role: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface IntegrationConn {
  provider: string;
  status: "connected" | "disconnected" | string;
}

const providers = [
  { key: "whatsapp", name: "WhatsApp Business API", desc: "Manage business messaging on WhatsApp." },
  { key: "instagram", name: "Instagram DM", desc: "Respond to Instagram direct messages." },
  { key: "google_calendar", name: "Google Calendar", desc: "Schedule and read calendar events." },
  { key: "shop", name: "Shopify / WooCommerce", desc: "Synchronize products and orders." },
  { key: "web_embed", name: "Web Embed", desc: "Embed the chat widget on your website." },
  { key: "slack", name: "Slack", desc: "Send notifications to Slack." },
];

export default function DashboardAgentDetail() {
  const { agentId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  // Header actions state
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [renameOpen, setRenameOpen] = useState(false);
  const [newName, setNewName] = useState("");

  // Per-agent toggles (local only for now with validation)
  const [globalConnections, setGlobalConnections] = useState<Record<string, boolean>>({});
  const [agentProviderEnabled, setAgentProviderEnabled] = useState<Record<string, boolean>>({});
  const [integrationsLoading, setIntegrationsLoading] = useState(false);

  // Settings/Knowledge draft state (unsaved guard demo)
  const [hasUnsavedDraft, setHasUnsavedDraft] = useState(false);

  useEffect(() => {
    document.title = agent ? `${agent.name} – Agent | Dashboard` : "Agent – Dashboard";
  }, [agent]);

  useEffect(() => {
    const init = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate("/auth");
          return;
        }
        setUserId(user.id);
        await Promise.all([fetchAgent(user.id), fetchGlobalConnections(user.id)]);
      } catch (e) {
        console.error(e);
        toast({ title: "Error", description: "Failed to load agent.", variant: "destructive" });
        navigate("/dashboard/agents");
      } finally {
        setLoading(false);
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agentId]);

  const fetchAgent = async (uid: string) => {
    if (!agentId) return;
    const { data, error } = await supabase
      .from("agents")
      .select("*")
      .eq("id", agentId)
      .eq("user_id", uid)
      .maybeSingle();
    if (error) throw error;
    if (!data) {
      toast({ title: "Not found", description: "Agent not found.", variant: "destructive" });
      navigate("/dashboard/agents");
      return;
    }
    setAgent(data as Agent);
    setNewName((data as Agent).name);
  };

  const fetchGlobalConnections = async (uid: string) => {
    setIntegrationsLoading(true);
    const { data, error } = await supabase
      .from("integrations_connections")
      .select("provider,status")
      .eq("user_id", uid);
    if (error) {
      console.error(error);
      setIntegrationsLoading(false);
      return;
    }
    const map: Record<string, boolean> = {};
    (data as IntegrationConn[] | null)?.forEach((r) => { map[r.provider] = r.status === "connected"; });
    setGlobalConnections(map);
    setIntegrationsLoading(false);
  };

  const formatDate = (s?: string) => s ? new Date(s).toLocaleString() : "-";

  const handleToggleActive = async (checked: boolean) => {
    if (!agent) return;
    const prev = agent.is_active;
    setAgent({ ...agent, is_active: checked });
    const { error } = await supabase.from("agents").update({ is_active: checked }).eq("id", agent.id);
    if (error) {
      console.error(error);
      setAgent({ ...agent, is_active: prev });
      toast({ title: "Failed", description: "Could not update status.", variant: "destructive" });
      return;
    }
    toast({ title: checked ? "Activated" : "Deactivated" });
  };

  const handleDelete = async () => {
    if (!agent) return;
    const { error } = await supabase.from("agents").delete().eq("id", agent.id);
    if (error) {
      toast({ title: "Delete failed", description: "Please try again.", variant: "destructive" });
      return;
    }
    toast({ title: "Agent deleted" });
    navigate("/dashboard/agents");
  };

  const handleRename = async () => {
    if (!agent || !newName.trim()) return;
    const old = agent.name;
    setAgent({ ...agent, name: newName.trim() });
    const { error } = await supabase.from("agents").update({ name: newName.trim() }).eq("id", agent.id);
    if (error) {
      setAgent({ ...agent, name: old });
      toast({ title: "Rename failed", variant: "destructive" });
      return;
    }
    toast({ title: "Renamed" });
    setRenameOpen(false);
  };

  const handleDuplicate = async () => {
    if (!agent || !userId) return;
    const payload = {
      user_id: userId,
      name: `${agent.name} Copy`,
      role: agent.role,
      is_active: false,
    };
    const { data, error } = await supabase.from("agents").insert(payload).select("id").single();
    if (error) {
      toast({ title: "Duplicate failed", variant: "destructive" });
      return;
    }
    toast({ title: "Agent duplicated" });
    navigate(`/dashboard/agents/${data?.id}`);
  };

  const handleExport = () => {
    if (!agent) return;
    const exportObj = {
      agent,
      knowledge: {},
      settings: {},
      integrations: agentProviderEnabled,
    };
    const blob = new Blob([JSON.stringify(exportObj, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `agent-config-${agent.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const onToggleAgentProvider = (providerKey: string, enabled: boolean) => {
    // Validation: require global connection first
    if (!globalConnections[providerKey] && enabled) {
      toast({ title: "Connect globally first", description: "Open Integrations & Tools to connect.", variant: "destructive" });
      return;
    }
    setAgentProviderEnabled((prev) => ({ ...prev, [providerKey]: enabled }));
    toast({ title: "Saved", description: "Per-agent setting updated." });
  };

  const headerBadges = useMemo(() => (
    <div className="flex flex-wrap gap-2 text-sm">
      <Badge variant="secondary">Created: {formatDate(agent?.created_at)}</Badge>
      <Badge variant="secondary">Updated: {formatDate(agent?.updated_at)}</Badge>
      {agent?.id && <Badge variant="outline">ID: {agent.id}</Badge>}
    </div>
  ), [agent]);

  if (loading) {
    return (
      <div className="p-4 md:p-6 lg:p-8 max-w-full">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-64 bg-muted rounded" />
          <div className="h-24 bg-muted rounded" />
          <div className="h-64 bg-muted rounded" />
        </div>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="p-4 md:p-6 lg:p-8 max-w-full">
        <Card>
          <CardHeader>
            <CardTitle>Agent not found</CardTitle>
            <CardDescription>The requested agent could not be found.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/dashboard/agents')}>Back to Agents</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-full">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted-foreground flex items-center gap-2">
        <Link to="/dashboard" className="hover:text-foreground">Dashboard</Link>
        <ChevronRight className="h-4 w-4" />
        <Link to="/dashboard/agents" className="hover:text-foreground">Agents</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{agent.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">{agent.name}</h1>
            <p className="text-muted-foreground">{agent.role || "—"}</p>
            <div className="mt-3">{headerBadges}</div>
          </div>

          <div className="flex items-center gap-2 self-start">
            <div className="flex items-center gap-2 pr-2">
              <span className="text-sm text-muted-foreground">Status</span>
              <Switch checked={agent.is_active} onCheckedChange={handleToggleActive} />
            </div>

            {/* More menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" aria-label="More actions">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Agent actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setRenameOpen(true)}>
                  <Pencil className="w-4 h-4 mr-2" /> Rename
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDuplicate}>
                  <Copy className="w-4 h-4 mr-2" /> Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleExport}>
                  <Download className="w-4 h-4 mr-2" /> Export config (JSON)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Delete */}
            <Button variant="destructive" size="sm" onClick={() => setConfirmDeleteOpen(true)}>
              <Trash2 className="w-4 h-4 mr-2" /> Delete Agent
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="sticky top-0 z-10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex flex-wrap">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="test">Test & Publish</TabsTrigger>
        </TabsList>

        {/* 1) Overview */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Status & Health</CardTitle>
                <CardDescription>Uptime and reliability snapshot</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Status</div>
                    <div className="mt-1">{agent.is_active ? "Active" : "Inactive"}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Requests (24h)</div>
                    <div className="mt-1">—</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Errors</div>
                    <div className="mt-1">—</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Latency</div>
                    <div className="mt-1">—</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-muted-foreground">Success rate</div>
                    <div className="mt-2 h-2 rounded bg-muted" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Usage</CardTitle>
                <CardDescription>Message & token usage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Today</div>
                    <div className="mt-1">—</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">This week</div>
                    <div className="mt-1">—</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">This month</div>
                    <div className="mt-1">—</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Tokens</div>
                    <div className="mt-1">—</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={() => document.querySelector<HTMLElement>('[data-tab="settings"]')?.click()}>Edit Profile</Button>
                <Button variant="outline" onClick={() => document.querySelector<HTMLElement>('[data-value="knowledge"]')?.click()}>Open Knowledge Editor</Button>
                <Button variant="outline" onClick={() => document.querySelector<HTMLElement>('[data-value="integrations"]')?.click()}>Open Integrations</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Last 7 Days Interactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-40 rounded bg-muted" />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Conversations</CardTitle>
              <CardDescription>Preview of last 5 interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">No conversations yet.</div>
              <div className="mt-3">
                <Button variant="link" onClick={() => document.querySelector<HTMLElement>('[data-value="messages"]')?.click()}>View all</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 2) Knowledge */}
        <TabsContent value="knowledge" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Business Profile</CardTitle>
              <CardDescription>Only affects this agent.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="biz-name">Name</Label>
                <Input id="biz-name" placeholder="e.g. Nonplo Support" onChange={() => setHasUnsavedDraft(true)} />
              </div>
              <div>
                <Label htmlFor="biz-sector">Sector</Label>
                <Input id="biz-sector" placeholder="Customer Support" onChange={() => setHasUnsavedDraft(true)} />
              </div>
              <div className="md:col-span-2">
                <Label>Location</Label>
                <Input placeholder="City, Country" onChange={() => setHasUnsavedDraft(true)} />
              </div>
              <div className="md:col-span-2">
                <Label>Hours / Holidays</Label>
                <Textarea rows={3} placeholder="Mon-Fri 9:00-18:00; Holidays: ..." onChange={() => setHasUnsavedDraft(true)} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tone & Style</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 md:grid-cols-3">
                {['Formal','Friendly','Humorous','Short & Direct','Storytelling'].map((t) => (
                  <Button key={t} variant="outline" onClick={() => setHasUnsavedDraft(true)}>{t}</Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>FAQs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mb-3">Add, edit, and remove common questions.</div>
              <Button variant="outline">Add FAQ</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Files</CardTitle>
              <CardDescription>Upload .txt, .pdf, .docx</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded border border-dashed p-6 text-center">
                <div className="text-sm text-muted-foreground mb-2">Drag and drop files here or click to choose</div>
                <Input type="file" multiple accept=".txt,.pdf,.docx" onChange={() => setHasUnsavedDraft(true)} />
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center gap-2">
            <Button onClick={() => { setHasUnsavedDraft(false); toast({ title: 'Saved' }); }}>Save</Button>
            <Button variant="outline" onClick={() => setHasUnsavedDraft(false)}>Cancel</Button>
            {hasUnsavedDraft && <span className="text-sm text-muted-foreground">You have unsaved changes.</span>}
          </div>
        </TabsContent>

        {/* 3) Integrations */}
        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Per‑agent Integrations</CardTitle>
              <CardDescription>
                Connections (OAuth) are managed in Integrations & Tools. Here you enable which connected services this agent will use.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {providers.map((p) => (
                <div key={p.key} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded border p-4">
                  <div>
                    <div className="font-medium">{p.name}</div>
                    <div className="text-sm text-muted-foreground">{p.desc}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!globalConnections[p.key] ? (
                      <Button variant="outline" onClick={() => navigate('/dashboard/integrations')}>Connect globally</Button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Enabled</span>
                        <Switch
                          disabled={integrationsLoading}
                          checked={!!agentProviderEnabled[p.key]}
                          onCheckedChange={(v) => onToggleAgentProvider(p.key, v)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div className="text-xs text-muted-foreground">Validation: switching ON requires a global connection.</div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 4) Messages */}
        <TabsContent value="messages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Conversation Logs</CardTitle>
              <CardDescription>Filter and review conversations. Export selected logs.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 md:grid-cols-4">
                <div>
                  <Label>Date range</Label>
                  <Input type="text" placeholder="YYYY-MM-DD to YYYY-MM-DD" />
                </div>
                <div>
                  <Label>Channel</Label>
                  <Input type="text" placeholder="Any" />
                </div>
                <div>
                  <Label>Status</Label>
                  <Input type="text" placeholder="Any" />
                </div>
                <div>
                  <Label>Search</Label>
                  <Input type="text" placeholder="Keywords" />
                </div>
              </div>
              <Separator />
              <div className="text-sm text-muted-foreground">No logs yet.</div>
              <div className="flex gap-2">
                <Button variant="outline">Export CSV</Button>
                <Button variant="outline">Export JSON</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 5) Settings */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Agent identity and appearance</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-1">
                <Label htmlFor="agent-name">Agent name</Label>
                <Input id="agent-name" value={newName} onChange={(e) => { setNewName(e.target.value); setHasUnsavedDraft(true); }} />
              </div>
              <div className="md:col-span-1">
                <Label htmlFor="agent-role">Role / Goal</Label>
                <Input id="agent-role" defaultValue={agent.role} onChange={() => setHasUnsavedDraft(true)} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Behavior</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Max response length</Label>
                <Input type="number" placeholder="e.g. 500" onChange={() => setHasUnsavedDraft(true)} />
              </div>
              <div>
                <Label>Creativity</Label>
                <Input type="number" step="0.1" min="0" max="2" placeholder="0.7" onChange={() => setHasUnsavedDraft(true)} />
              </div>
              <div className="md:col-span-2">
                <Label>Fallback message</Label>
                <Textarea rows={3} placeholder="Sorry, I couldn’t help with that." onChange={() => setHasUnsavedDraft(true)} />
              </div>
              <div className="md:col-span-2">
                <Label>Language</Label>
                <Input placeholder="Auto / en / tr ..." onChange={() => setHasUnsavedDraft(true)} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Safety</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div>
                <Label>Blocklist keywords</Label>
                <Textarea rows={3} placeholder="comma,separated,words" onChange={() => setHasUnsavedDraft(true)} />
              </div>
              <div>
                <Label>Escalation rules</Label>
                <Textarea rows={3} placeholder="If X then escalate to Y" onChange={() => setHasUnsavedDraft(true)} />
              </div>
              <div>
                <Label>PII masking</Label>
                <Input placeholder="Enabled / Disabled" onChange={() => setHasUnsavedDraft(true)} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Embed & API</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label>Embed snippet</Label>
                <Textarea readOnly value={`<script src="https://cdn.example.com/embed.js" data-agent-id="${agent.id}"></script>`} />
                <div className="mt-2"><Button variant="outline" onClick={() => navigator.clipboard.writeText(`<script src=\"https://cdn.example.com/embed.js\" data-agent-id=\"${agent.id}\"></script>`) }>Copy</Button></div>
              </div>
              <div className="flex items-center gap-2">
                <Label className="min-w-24">Public share</Label>
                <Switch />
              </div>
              <div>
                <Label>API Key/ID</Label>
                <Input readOnly value={`${agent.id.substring(0,8)}••••••••`} />
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center gap-2">
            <Button onClick={() => { if (newName.trim() && newName.trim() !== agent.name) { handleRename(); } setHasUnsavedDraft(false); }}>Save</Button>
            <Button variant="outline" onClick={() => setHasUnsavedDraft(false)}>Cancel</Button>
            {hasUnsavedDraft && <span className="text-sm text-muted-foreground">You have unsaved changes.</span>}
          </div>
        </TabsContent>

        {/* 6) Test & Publish */}
        <TabsContent value="test" className="space-y-6">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Live Test Console</CardTitle>
                <CardDescription>Try your agent with current draft settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Textarea rows={3} placeholder="Type a message to test..." />
                <Button>Send</Button>
                <Separator />
                <div className="text-sm text-muted-foreground">Response will appear here with timing and tokens.</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Versioning</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">Status: Draft</div>
                <Button onClick={() => toast({ title: 'Published', description: 'Current settings are live.' })}>Publish</Button>
                <div>
                  <Label>Version notes</Label>
                  <Textarea rows={3} placeholder="What changed in this version?" />
                </div>
                <Separator />
                <div className="text-sm text-muted-foreground">Diagnostics: No issues detected.</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Delete confirmation */}
      <AlertDialog open={confirmDeleteOpen} onOpenChange={setConfirmDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this agent and all related data?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the agent.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Rename dialog (lightweight) */}
      <AlertDialog open={renameOpen} onOpenChange={setRenameOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Rename agent</AlertDialogTitle>
            <AlertDialogDescription>Pick a clear and recognizable name.</AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-2">
            <Label htmlFor="rename">New name</Label>
            <Input id="rename" value={newName} onChange={(e) => setNewName(e.target.value)} />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRename}>Save</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
