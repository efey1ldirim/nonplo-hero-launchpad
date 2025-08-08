import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Shield, ShieldCheck, Brain, Clock, BarChart, MessageCircle, Instagram, Calendar, ShoppingBag, Globe, Slack } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const TOOLS = [
  { key: "content_sanitizer", name: "Content Sanitizer", desc: "Cleanse incoming/outgoing content for safety.", icon: Shield },
  { key: "safe_reply_guard", name: "Safe Reply Guard", desc: "Block unsafe or sensitive responses.", icon: ShieldCheck },
  { key: "conversation_memory", name: "Conversation Memory", desc: "Remember context across messages.", icon: Brain },
  { key: "business_hours_gate", name: "Business Hours Gate", desc: "Respect your configured business hours.", icon: Clock },
  { key: "analytics_tracking", name: "Analytics Tracking", desc: "Track conversations for insights.", icon: BarChart },
] as const;

type ToolKey = typeof TOOLS[number]["key"];

const INTEGRATIONS = [
  { provider: "whatsapp", name: "WhatsApp Business API", desc: "Connect WhatsApp for customer messaging.", icon: MessageCircle },
  { provider: "instagram", name: "Instagram DM", desc: "Enable Instagram direct messages.", icon: Instagram },
  { provider: "google_calendar", name: "Google Calendar", desc: "Sync events and availability.", icon: Calendar },
  { provider: "shop_platform", name: "Shopify / WooCommerce", desc: "Integrate store data and orders.", icon: ShoppingBag },
  { provider: "web_embed", name: "Web Embed", desc: "Install the chat widget on your site.", icon: Globe },
  { provider: "slack", name: "Slack / Teams", desc: "Receive notifications in your workspace.", icon: Slack },
] as const;

type ProviderKey = typeof INTEGRATIONS[number]["provider"];

const requestSchema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  requested: z.string().min(1, "Required"),
  details: z.string().optional(),
  file: z
    .any()
    .refine(
      (fileList) =>
        !fileList ||
        fileList.length === 0 ||
        (fileList.length === 1 &&
          ["text/plain", "application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(fileList[0]?.type)),
      "Only .txt, .pdf, .docx files are allowed"
    )
    .optional(),
});

type RequestValues = z.infer<typeof requestSchema>;

const DashboardIntegrations: React.FC = () => {
  const { toast } = useToast();
  const [userId, setUserId] = useState<string | null>(null);

  // Tools state
  const [toolsState, setToolsState] = useState<Record<string, boolean>>({});
  const [loadingTools, setLoadingTools] = useState<boolean>(true);
  const [savingToolKey, setSavingToolKey] = useState<ToolKey | null>(null);
  const [confirmTool, setConfirmTool] = useState<{ key: ToolKey; nextValue: boolean } | null>(null);

  // Integrations state
  const [integrationsState, setIntegrationsState] = useState<Record<string, "connected" | "disconnected">>({});
  const [connecting, setConnecting] = useState<Record<string, boolean>>({});
  const [confirmDisconnect, setConfirmDisconnect] = useState<ProviderKey | null>(null);

  // Special requests form
  const form = useForm<RequestValues>({ resolver: zodResolver(requestSchema) });
  const isSubmitting = form.formState.isSubmitting;

  useEffect(() => {
    const init = async () => {
      const { data: auth } = await supabase.auth.getUser();
      const uid = auth.user?.id ?? null;
      setUserId(uid);
      if (!uid) return;

      // Load tools settings
      const { data: toolRows, error: toolErr } = await supabase
        .from("tools_settings")
        .select("tool_key, enabled")
        .eq("user_id", uid);
      if (toolErr) {
        toast({ title: "Couldn't load tools", description: toolErr.message, variant: "destructive" });
      } else {
        const map: Record<string, boolean> = {};
        toolRows?.forEach((r) => (map[r.tool_key] = r.enabled));
        setToolsState(map);
      }

      // Load integrations
      const { data: integRows, error: integErr } = await supabase
        .from("integrations_connections")
        .select("provider, status")
        .eq("user_id", uid);
      if (integErr) {
        toast({ title: "Couldn't load integrations", description: integErr.message, variant: "destructive" });
      } else {
        const imap: Record<string, "connected" | "disconnected"> = {};
        integRows?.forEach((r) => (imap[r.provider] = (r.status as any) || "disconnected"));
        setIntegrationsState(imap);
      }

      setLoadingTools(false);
    };
    init();
  }, [toast]);

  const onToggleToolIntent = (key: ToolKey, next: boolean) => {
    setConfirmTool({ key, nextValue: next });
  };

  const persistToolChange = async () => {
    if (!userId || !confirmTool) return;
    const { key, nextValue } = confirmTool;
    setSavingToolKey(key);
    try {
      const { error } = await supabase
        .from("tools_settings")
        .upsert({ user_id: userId, tool_key: key, enabled: nextValue }, { onConflict: "user_id,tool_key" });
      if (error) throw error;
      setToolsState((prev) => ({ ...prev, [key]: nextValue }));
      toast({ title: "Updated", description: `"${TOOLS.find((t) => t.key === key)?.name}" is now ${nextValue ? "ON" : "OFF"}.` });
    } catch (e: any) {
      toast({ title: "Update failed", description: e.message, variant: "destructive" });
    } finally {
      setSavingToolKey(null);
      setConfirmTool(null);
    }
  };

  const connectProvider = async (provider: ProviderKey) => {
    if (!userId) return;
    setConnecting((s) => ({ ...s, [provider]: true }));
    try {
      // Placeholder connect flow: mark as connected
      const { error } = await supabase
        .from("integrations_connections")
        .upsert({ user_id: userId, provider, status: "connected", meta: {} }, { onConflict: "user_id,provider" });
      if (error) throw error;
      setIntegrationsState((s) => ({ ...s, [provider]: "connected" }));
      toast({ title: "Connected", description: `${INTEGRATIONS.find((i) => i.provider === provider)?.name} connected.` });
    } catch (e: any) {
      toast({ title: "Connection failed", description: e.message, variant: "destructive" });
    } finally {
      setConnecting((s) => ({ ...s, [provider]: false }));
    }
  };

  const confirmDisconnectProvider = async () => {
    if (!userId || !confirmDisconnect) return;
    const provider = confirmDisconnect;
    setConnecting((s) => ({ ...s, [provider]: true }));
    try {
      const { error } = await supabase
        .from("integrations_connections")
        .upsert({ user_id: userId, provider, status: "disconnected", meta: {} }, { onConflict: "user_id,provider" });
      if (error) throw error;
      setIntegrationsState((s) => ({ ...s, [provider]: "disconnected" }));
      toast({ title: "Disconnected", description: `${INTEGRATIONS.find((i) => i.provider === provider)?.name} disconnected.` });
    } catch (e: any) {
      toast({ title: "Disconnect failed", description: e.message, variant: "destructive" });
    } finally {
      setConnecting((s) => ({ ...s, [provider]: false }));
      setConfirmDisconnect(null);
    }
  };

  const onSubmitRequest = async (values: RequestValues) => {
    if (!userId) return;
    try {
      let uploadedPath: string | null = null;
      const fileList: FileList | undefined = (values as any).file;
      const file = fileList && fileList.length > 0 ? fileList[0] : null;
      if (file) {
        const fileName = `${crypto.randomUUID()}-${file.name}`;
        const path = `${userId}/${fileName}`;
        const { error: upErr } = await supabase.storage.from("requests").upload(path, file, { contentType: file.type });
        if (upErr) throw upErr;
        uploadedPath = path;
      }

      const { error: insertErr } = await supabase.from("tools_special_requests").insert({
        user_id: userId,
        name: values.name,
        email: values.email,
        requested: values.requested,
        details: values.details ?? null,
        file_path: uploadedPath,
      });
      if (insertErr) throw insertErr;

      toast({ title: "Thanks!", description: "We’ll review your request." });
      form.reset();
    } catch (e: any) {
      toast({ title: "Submission failed", description: e.message, variant: "destructive" });
    }
  };

  const toolItems = useMemo(() => TOOLS, []);
  const integrationItems = useMemo(() => INTEGRATIONS, []);

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      <header className="mb-6 md:mb-8 text-center md:text-left">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Integrations & Tools</h1>
        <p className="text-muted-foreground text-base md:text-lg">Manage system-wide tools and connect third‑party services.</p>
      </header>

      {/* Section A — Tools (global) */}
      <section className="mb-10">
        <div className="text-center mb-6">
          <h2 className="text-xl md:text-2xl font-semibold">Tools</h2>
          <p className="text-sm md:text-base text-muted-foreground mt-2">
            These tools are system‑wide. Changing a toggle here affects all of your AI workers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {toolItems.map(({ key, name, desc, icon: Icon }) => (
            <Card key={key} className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-primary" />
                    <div>
                      <CardTitle className="text-base md:text-lg">{name}</CardTitle>
                      <CardDescription className="text-sm">{desc}</CardDescription>
                    </div>
                  </div>
                  <Switch
                    checked={!!toolsState[key]}
                    onCheckedChange={(v) => onToggleToolIntent(key, v)}
                    disabled={loadingTools || savingToolKey === key}
                    aria-label={`Toggle ${name}`}
                  />
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        <p className="text-xs text-muted-foreground mt-3 text-center">
          You can still override tools per worker inside each worker’s admin panel.
        </p>
      </section>

      {/* Divider */}
      <div className="my-10 border-t border-border" />

      {/* Section B — Integrations */}
      <section className="mb-12">
        <div className="text-center mb-6">
          <h2 className="text-xl md:text-2xl font-semibold">Integrations</h2>
          <p className="text-sm md:text-base text-muted-foreground mt-2">
            Connect third‑party accounts here. Note: Connecting an account on this page does not automatically enable it for every AI worker. To use an integration for a specific worker, enable it in that worker’s admin panel.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {integrationItems.map(({ provider, name, desc, icon: Icon }) => {
            const status = integrationsState[provider] || "disconnected";
            const isLoading = !!connecting[provider];
            return (
              <Card key={provider}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-primary" />
                      <div>
                        <CardTitle className="text-base md:text-lg">{name}</CardTitle>
                        <CardDescription className="text-sm">{desc}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {status === "connected" ? (
                        <>
                          <Badge variant="secondary">Connected</Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setConfirmDisconnect(provider)}
                            disabled={isLoading}
                          >
                            Disconnect
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => connectProvider(provider)}
                          disabled={isLoading}
                        >
                          {isLoading ? "Connecting..." : "Connect"}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Special Requests form */}
      <section className="mb-6">
        <div className="text-center mb-6">
          <h2 className="text-xl md:text-2xl font-semibold">Special requests</h2>
          <p className="text-sm md:text-base text-muted-foreground mt-2">
            Tell us which tools or integrations you’d like us to add.
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              onSubmit={form.handleSubmit(onSubmitRequest)}
            >
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" {...form.register("name")} />
                {form.formState.errors.name && (
                  <p className="text-sm text-destructive">{form.formState.errors.name.message as string}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" {...form.register("email")} />
                {form.formState.errors.email && (
                  <p className="text-sm text-destructive">{form.formState.errors.email.message as string}</p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="requested">Requested tool/integration</Label>
                <Input id="requested" placeholder="e.g., Zendesk, Stripe, Salesforce..." {...form.register("requested")} />
                {form.formState.errors.requested && (
                  <p className="text-sm text-destructive">{form.formState.errors.requested.message as string}</p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="details">Use case / details</Label>
                <Textarea id="details" rows={5} placeholder="Tell us how you’d use this." {...form.register("details")} />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="file">Optional file upload (.txt, .pdf, .docx)</Label>
                <Input id="file" type="file" accept=".txt,.pdf,.docx" {...form.register("file")} />
                {form.formState.errors.file && (
                  <p className="text-sm text-destructive">{form.formState.errors.file.message as string}</p>
                )}
              </div>

              <div className="md:col-span-2 flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send request"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>

      {/* Confirm dialogs */}
      <Dialog open={!!confirmTool} onOpenChange={(open) => !open && setConfirmTool(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Apply this change globally?</DialogTitle>
            <DialogDescription>
              This change will affect all AI workers. Are you sure?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmTool(null)} disabled={savingToolKey !== null}>
              Cancel
            </Button>
            <Button onClick={persistToolChange} disabled={savingToolKey !== null}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!confirmDisconnect} onOpenChange={(open) => !open && setConfirmDisconnect(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Disconnect integration?</DialogTitle>
            <DialogDescription>
              This will revoke access and disable usage until reconnected.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDisconnect(null)}>
              Cancel
            </Button>
            <Button onClick={confirmDisconnectProvider}>Disconnect</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardIntegrations;
