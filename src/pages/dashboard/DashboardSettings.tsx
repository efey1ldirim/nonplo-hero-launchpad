import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { getDefaultGlobalEmployeeSettings, GlobalEmployeeSettings, useGlobalEmployeeSettings } from "@/hooks/use-global-employee-settings";

const notificationsSchema = z.object({
  notifyOnNewConversation: z.boolean(),
  notifyOnMention: z.boolean(),
  notifyOnEscalation: z.boolean(),
  delivery: z.array(z.enum(["Email", "Push", "Webhook"])),
  webhookUrl: z.string().url({ message: "Enter a valid URL" }).optional(),
  digestFrequency: z.enum(["off", "hourly", "daily"]),
}).refine((val) => (!val.delivery.includes("Webhook") || !!val.webhookUrl), {
  path: ["webhookUrl"],
  message: "Webhook URL is required when Webhook delivery is selected",
});

const schema = z.object({
  general: z.object({
    defaultDisplayNamePrefix: z.string().max(40, "Max 40 characters"),
    language: z.enum(["tr", "en"]),
    timezone: z.string().min(1, "Timezone is required"),
    brandVoice: z.enum(["professional", "friendly", "concise", "playful"]),
    greetingTemplate: z.string().max(500, "Max 500 characters"),
  }),
  workingHours: z.object({
    timezone: z.string(),
    weekly: z.array(z.object({
      day: z.enum(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]),
      enabled: z.boolean(),
      from: z.string().optional(),
      to: z.string().optional(),
    })),
    holidays: z.array(z.object({ date: z.string(), label: z.string() })),
    offHoursAutoReplyEnabled: z.boolean(),
    offHoursAutoReplyMessage: z.string(),
  }),
  communication: z.object({
    defaultChannels: z.array(z.enum(["Web", "WhatsApp", "Instagram", "Email"])),
    showTypingIndicator: z.boolean(),
    expectedFirstResponseMins: z.number().min(0),
    maxConcurrentConversations: z.number().min(0),
  }),
  permissions: z.object({
    allowManualMessageSend: z.boolean(),
    allowOrderEdits: z.boolean(),
    allowRefundActions: z.boolean(),
    dataAccessScope: z.enum(["none", "own", "all"]),
    toolsAccessLevel: z.enum(["basic", "standard", "admin"]),
  }),
  notifications: notificationsSchema,
  dataPrivacy: z.object({
    piiMasking: z.boolean(),
    redactPatterns: z.array(z.string()),
    retentionDays: z.number().min(0),
    exportEnabled: z.boolean(),
  }),
  escalation: z.object({
    autoEscalateAfterMins: z.number().min(0),
    escalateTo: z.object({ email: z.string().email().optional(), phone: z.string().optional() }),
    fallbackMessage: z.string(),
  }),
  integrationsDefaults: z.object({
    tools: z.array(z.object({ key: z.string(), name: z.string(), enabled: z.boolean() })),
    requireConfirmOnToggle: z.literal(true),
  }),
  advanced: z.object({
    allowModelAutoUpdates: z.boolean(),
    resetOnboardingTips: z.boolean(),
  }),
});

const DashboardSettings: React.FC = () => {
  const { toast } = useToast();
  const { settings, isLoading, error, save, refresh } = useGlobalEmployeeSettings();
  const [activeTab, setActiveTab] = useState("general");
  const [confirmToolChange, setConfirmToolChange] = useState<{ index: number; next: boolean } | null>(null);

  const defaultValues = useMemo<GlobalEmployeeSettings>(() => settings || getDefaultGlobalEmployeeSettings(), [settings]);

  const form = useForm<GlobalEmployeeSettings>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    if (settings) {
      form.reset(settings);
    }
  }, [settings]);

  useEffect(() => {
    document.title = "Settings • Nonplo";
  }, []);

  const onSave = async (values: GlobalEmployeeSettings) => {
    try {
      await save(values);
      toast({ title: "Settings saved", description: "Global settings have been updated." });
      form.reset(values);
    } catch (e: any) {
      toast({ title: "Failed to save", description: e?.message || "Please try again.", variant: "destructive" as any });
    }
  };

  const discard = () => {
    if (settings) form.reset(settings);
  };

  const addHoliday = () => {
    const current = form.getValues("workingHours.holidays");
    form.setValue("workingHours.holidays", [...current, { date: "", label: "" }], { shouldDirty: true });
  };

  const removeHoliday = (idx: number) => {
    const current = form.getValues("workingHours.holidays");
    current.splice(idx, 1);
    form.setValue("workingHours.holidays", [...current], { shouldDirty: true });
  };

  const addTool = () => {
    const tools = form.getValues("integrationsDefaults.tools");
    form.setValue("integrationsDefaults.tools", [...tools, { key: "tool_key", name: "New Tool", enabled: false }], { shouldDirty: true });
  };

  const applyToolToggle = () => {
    if (confirmToolChange) {
      const { index, next } = confirmToolChange;
      const tools = [...form.getValues("integrationsDefaults.tools")];
      tools[index] = { ...tools[index], enabled: next };
      form.setValue("integrationsDefaults.tools", tools, { shouldDirty: true });
      setConfirmToolChange(null);
    }
  };

  return (
    <div className="max-w-[1100px] mx-auto px-4 lg:px-6 py-6">
      <header className="mb-4 md:mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Global defaults for all employees (agents)</p>
      </header>

      <Alert className="mb-4">
        <AlertDescription className="flex items-center gap-2">
          <Info className="h-4 w-4" />
          Changes here apply to ALL employees.
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="link" className="px-2">Learn more</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Global settings scope</DialogTitle>
                <DialogDescription>
                  Updates on this page establish defaults for every existing and future employee. Individual employees can override these on their profile pages.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </AlertDescription>
      </Alert>

      {error && (
        <Alert className="mb-4" variant="destructive">
          <AlertDescription>Failed to load settings. <Button variant="link" onClick={refresh}>Retry</Button></AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="sticky top-0 z-30 bg-background/80 backdrop-blur mb-4">
        <TabsList className="flex flex-wrap gap-2">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="workingHours">Working Hours</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="dataPrivacy">Data & Privacy</TabsTrigger>
          <TabsTrigger value="escalation">Escalation</TabsTrigger>
          <TabsTrigger value="integrationsDefaults">Integrations Defaults</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Content */}
      <div className="space-y-6">
        <TabsContent value="general">
          <Card className="rounded-2xl border shadow-sm p-4 lg:p-6">
            <CardHeader className="p-0 mb-4">
              <CardTitle>General</CardTitle>
              <CardDescription>Defaults that define agent identity and tone.</CardDescription>
            </CardHeader>
            <CardContent className="p-0 grid gap-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="general.defaultDisplayNamePrefix">Default Display Name Prefix</Label>
                  <Input id="general.defaultDisplayNamePrefix" {...form.register("general.defaultDisplayNamePrefix")} placeholder="Nonplo Assistant" />
                </div>
                <div>
                  <Label>Default Language</Label>
                  <Select value={form.watch("general.language")} onValueChange={(v) => form.setValue("general.language", v as any, { shouldDirty: true })}>
                    <SelectTrigger><SelectValue placeholder="Choose" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tr">TR</SelectItem>
                      <SelectItem value="en">EN</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="general.timezone">Default Timezone</Label>
                  <Input id="general.timezone" placeholder="Europe/Istanbul" {...form.register("general.timezone")} />
                </div>
                <div>
                  <Label>Brand Voice</Label>
                  <RadioGroup value={form.watch("general.brandVoice") as any} onValueChange={(v) => form.setValue("general.brandVoice", v as any, { shouldDirty: true })} className="grid grid-cols-2 gap-2">
                    {(["professional","friendly","concise","playful"] as const).map(v => (
                      <div key={v} className="flex items-center gap-2 border rounded-md p-2">
                        <RadioGroupItem id={`voice-${v}`} value={v} />
                        <Label htmlFor={`voice-${v}`} className="capitalize">{v}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
              <div>
                <Label htmlFor="general.greetingTemplate">Greeting Template</Label>
                <Textarea id="general.greetingTemplate" rows={4} {...form.register("general.greetingTemplate")} placeholder="Hi {{customerName}}, I'm {{agentName}}..." />
                <p className="text-xs text-muted-foreground mt-1">Supports variables {"{{customerName}}"} and {"{{agentName}}"}.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workingHours">
          <Card className="rounded-2xl border shadow-sm p-4 lg:p-6">
            <CardHeader className="p-0 mb-4">
              <CardTitle>Working Hours</CardTitle>
              <CardDescription>Schedule, timezones, holidays and off-hours replies.</CardDescription>
            </CardHeader>
            <CardContent className="p-0 grid gap-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="workingHours.timezone">Timezone</Label>
                  <Input id="workingHours.timezone" placeholder="Europe/Istanbul" {...form.register("workingHours.timezone")} />
                </div>
                <div className="flex items-center justify-between gap-4 border rounded-md p-3">
                  <div className="space-y-1">
                    <Label>Off-hours auto-reply</Label>
                    <p className="text-xs text-muted-foreground">Automatically reply outside working hours</p>
                  </div>
                  <Switch checked={form.watch("workingHours.offHoursAutoReplyEnabled")} onCheckedChange={(v) => form.setValue("workingHours.offHoursAutoReplyEnabled", v, { shouldDirty: true })} />
                </div>
              </div>

              <div>
                <Label>Weekly Schedule</Label>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {form.watch("workingHours.weekly").map((row, idx) => (
                    <div key={row.day} className="border rounded-md p-3 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{row.day}</span>
                        <Switch checked={row.enabled} onCheckedChange={(v) => {
                          const weekly = [...form.getValues("workingHours.weekly")];
                          weekly[idx] = { ...weekly[idx], enabled: v };
                          form.setValue("workingHours.weekly", weekly, { shouldDirty: true });
                        }} />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Input type="time" value={row.from || ""} onChange={(e) => {
                          const weekly = [...form.getValues("workingHours.weekly")];
                          weekly[idx] = { ...weekly[idx], from: e.target.value };
                          form.setValue("workingHours.weekly", weekly, { shouldDirty: true });
                        }} disabled={!row.enabled} />
                        <Input type="time" value={row.to || ""} onChange={(e) => {
                          const weekly = [...form.getValues("workingHours.weekly")];
                          weekly[idx] = { ...weekly[idx], to: e.target.value };
                          form.setValue("workingHours.weekly", weekly, { shouldDirty: true });
                        }} disabled={!row.enabled} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label>Holidays</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addHoliday}>Add</Button>
                </div>
                <div className="grid gap-2">
                  {form.watch("workingHours.holidays").length === 0 && (
                    <p className="text-sm text-muted-foreground">No holidays configured.</p>
                  )}
                  {form.watch("workingHours.holidays").map((h, idx) => (
                    <div key={idx} className="grid grid-cols-1 sm:grid-cols-[160px_1fr_auto] gap-2 items-center">
                      <Input type="date" value={h.date} onChange={(e) => {
                        const hol = [...form.getValues("workingHours.holidays")];
                        hol[idx] = { ...hol[idx], date: e.target.value };
                        form.setValue("workingHours.holidays", hol, { shouldDirty: true });
                      }} />
                      <Input placeholder="Label" value={h.label} onChange={(e) => {
                        const hol = [...form.getValues("workingHours.holidays")];
                        hol[idx] = { ...hol[idx], label: e.target.value };
                        form.setValue("workingHours.holidays", hol, { shouldDirty: true });
                      }} />
                      <Button type="button" variant="ghost" onClick={() => removeHoliday(idx)}>Remove</Button>
                    </div>
                  ))}
                </div>
              </div>

              {form.watch("workingHours.offHoursAutoReplyEnabled") && (
                <div>
                  <Label htmlFor="workingHours.offHoursAutoReplyMessage">Off-hours message</Label>
                  <Textarea id="workingHours.offHoursAutoReplyMessage" rows={3} {...form.register("workingHours.offHoursAutoReplyMessage")} />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communication">
          <Card className="rounded-2xl border shadow-sm p-4 lg:p-6">
            <CardHeader className="p-0 mb-4">
              <CardTitle>Communication</CardTitle>
              <CardDescription>Channels and realtime behavior.</CardDescription>
            </CardHeader>
            <CardContent className="p-0 grid gap-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Default Channels</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {(["Web","WhatsApp","Instagram","Email"] as const).map(ch => (
                      <label key={ch} className="flex items-center gap-2 border rounded-md p-2">
                        <Checkbox
                          checked={form.watch("communication.defaultChannels").includes(ch)}
                          onCheckedChange={(v) => {
                            const curr = new Set(form.getValues("communication.defaultChannels"));
                            if (v) curr.add(ch); else curr.delete(ch);
                            form.setValue("communication.defaultChannels", Array.from(curr) as any, { shouldDirty: true });
                          }}
                        />
                        <span>{ch}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 border rounded-md p-3">
                  <div className="space-y-1">
                    <Label>Show typing indicator</Label>
                  </div>
                  <Switch checked={form.watch("communication.showTypingIndicator")} onCheckedChange={(v) => form.setValue("communication.showTypingIndicator", v, { shouldDirty: true })} />
                </div>
                <div>
                  <Label htmlFor="communication.expectedFirstResponseMins">SLA first response (mins)</Label>
                  <Input type="number" min={0} id="communication.expectedFirstResponseMins" {...form.register("communication.expectedFirstResponseMins", { valueAsNumber: true })} />
                </div>
                <div>
                  <Label htmlFor="communication.maxConcurrentConversations">Max concurrent conversations (0 = unlimited)</Label>
                  <Input type="number" min={0} id="communication.maxConcurrentConversations" {...form.register("communication.maxConcurrentConversations", { valueAsNumber: true })} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions">
          <Card className="rounded-2xl border shadow-sm p-4 lg:p-6">
            <CardHeader className="p-0 mb-4">
              <CardTitle>Permissions</CardTitle>
              <CardDescription>Control allowed actions and data scopes.</CardDescription>
            </CardHeader>
            <CardContent className="p-0 grid gap-4">
              <div className="grid md:grid-cols-2 gap-4">
                {([
                  { key: "allowManualMessageSend", label: "Allow manual message send" },
                  { key: "allowOrderEdits", label: "Allow order edits" },
                  { key: "allowRefundActions", label: "Allow refund actions" },
                ] as const).map((t) => (
                  <div key={t.key} className="flex items-center justify-between gap-4 border rounded-md p-3">
                    <div>
                      <Label className="block">{t.label}</Label>
                      <p className="text-xs text-muted-foreground">Global default. Can be overridden per employee.</p>
                    </div>
                    <Switch
                      checked={form.watch(`permissions.${t.key}` as any) as boolean}
                      onCheckedChange={(v) => form.setValue(`permissions.${t.key}` as any, v, { shouldDirty: true })}
                    />
                  </div>
                ))}
                <div className="border rounded-md p-3">
                  <Label>Data access scope</Label>
                  <RadioGroup value={form.watch("permissions.dataAccessScope") as any} onValueChange={(v) => form.setValue("permissions.dataAccessScope", v as any, { shouldDirty: true })} className="mt-2 grid gap-2">
                    {(["none","own","all"] as const).map(v => (
                      <div key={v} className="flex items-center gap-2">
                        <RadioGroupItem id={`scope-${v}`} value={v} />
                        <Label htmlFor={`scope-${v}`} className="capitalize">{v}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                <div className="border rounded-md p-3">
                  <Label>Tools access level</Label>
                  <RadioGroup value={form.watch("permissions.toolsAccessLevel") as any} onValueChange={(v) => form.setValue("permissions.toolsAccessLevel", v as any, { shouldDirty: true })} className="mt-2 grid gap-2">
                    {(["basic","standard","admin"] as const).map(v => (
                      <div key={v} className="flex items-center gap-2">
                        <RadioGroupItem id={`tools-${v}`} value={v} />
                        <Label htmlFor={`tools-${v}`} className="capitalize">{v}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="rounded-2xl border shadow-sm p-4 lg:p-6">
            <CardHeader className="p-0 mb-4">
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Choose when and how agents are notified.</CardDescription>
            </CardHeader>
            <CardContent className="p-0 grid gap-4">
              <div className="grid md:grid-cols-2 gap-4">
                {([
                  { key: "notifyOnNewConversation", label: "Notify on new conversation" },
                  { key: "notifyOnMention", label: "Notify on mention" },
                  { key: "notifyOnEscalation", label: "Notify on escalation" },
                ] as const).map((t) => (
                  <div key={t.key} className="flex items-center justify-between gap-4 border rounded-md p-3">
                    <Label className="block">{t.label}</Label>
                    <Switch
                      checked={form.watch(`notifications.${t.key}` as any) as boolean}
                      onCheckedChange={(v) => form.setValue(`notifications.${t.key}` as any, v, { shouldDirty: true })}
                    />
                  </div>
                ))}
                <div>
                  <Label>Delivery methods</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {(["Email","Push","Webhook"] as const).map(d => (
                      <label key={d} className="flex items-center gap-2 border rounded-md p-2">
                        <Checkbox
                          checked={form.watch("notifications.delivery").includes(d)}
                          onCheckedChange={(v) => {
                            const curr = new Set(form.getValues("notifications.delivery"));
                            if (v) curr.add(d); else curr.delete(d);
                            form.setValue("notifications.delivery", Array.from(curr) as any, { shouldDirty: true });
                          }}
                        />
                        <span>{d}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Digest frequency</Label>
                  <Select value={form.watch("notifications.digestFrequency")} onValueChange={(v) => form.setValue("notifications.digestFrequency", v as any, { shouldDirty: true })}>
                    <SelectTrigger><SelectValue placeholder="Choose" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="off">Off</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {form.watch("notifications.delivery").includes("Webhook") && (
                  <div className="md:col-span-2">
                    <Label htmlFor="notifications.webhookUrl">Webhook URL</Label>
                    <Input id="notifications.webhookUrl" placeholder="https://example.com/webhook" {...form.register("notifications.webhookUrl")} />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dataPrivacy">
          <Card className="rounded-2xl border shadow-sm p-4 lg:p-6">
            <CardHeader className="p-0 mb-4">
              <CardTitle>Data & Privacy</CardTitle>
              <CardDescription>Retention, masking and exports.</CardDescription>
            </CardHeader>
            <CardContent className="p-0 grid gap-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between gap-4 border rounded-md p-3">
                  <Label>PII Masking</Label>
                  <Switch checked={form.watch("dataPrivacy.piiMasking")} onCheckedChange={(v) => form.setValue("dataPrivacy.piiMasking", v, { shouldDirty: true })} />
                </div>
                <div>
                  <Label htmlFor="dataPrivacy.retentionDays">Retention days (0 = unlimited)</Label>
                  <Input type="number" min={0} id="dataPrivacy.retentionDays" {...form.register("dataPrivacy.retentionDays", { valueAsNumber: true })} />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="dataPrivacy.redactPatterns">Redact patterns (one per line)</Label>
                  <Textarea id="dataPrivacy.redactPatterns" rows={4}
                    value={form.watch("dataPrivacy.redactPatterns").join("\n")}
                    onChange={(e) => form.setValue("dataPrivacy.redactPatterns", e.target.value.split("\n").filter(Boolean), { shouldDirty: true })}
                  />
                </div>
                <div>
                  <Button type="button" variant="outline" onClick={() => toast({ title: "Export started", description: "You'll receive a download shortly." })}>
                    Export data
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="escalation">
          <Card className="rounded-2xl border shadow-sm p-4 lg:p-6">
            <CardHeader className="p-0 mb-4">
              <CardTitle>Escalation</CardTitle>
              <CardDescription>Define escalation rules and contacts.</CardDescription>
            </CardHeader>
            <CardContent className="p-0 grid gap-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="escalation.autoEscalateAfterMins">Auto escalate after (mins, 0 = off)</Label>
                  <Input type="number" min={0} id="escalation.autoEscalateAfterMins" {...form.register("escalation.autoEscalateAfterMins", { valueAsNumber: true })} />
                </div>
                <div>
                  <Label htmlFor="escalation.escalateTo.email">Escalate to Email</Label>
                  <Input id="escalation.escalateTo.email" placeholder="ops@example.com" {...form.register("escalation.escalateTo.email")} />
                </div>
                <div>
                  <Label htmlFor="escalation.escalateTo.phone">Escalate to Phone</Label>
                  <Input id="escalation.escalateTo.phone" placeholder="+90 ..." {...form.register("escalation.escalateTo.phone")} />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="escalation.fallbackMessage">Fallback message</Label>
                  <Textarea id="escalation.fallbackMessage" rows={3} {...form.register("escalation.fallbackMessage")} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrationsDefaults">
          <Card className="rounded-2xl border shadow-sm p-4 lg:p-6">
            <CardHeader className="p-0 mb-4">
              <CardTitle>Integrations Defaults</CardTitle>
              <CardDescription>Default tools for all employees. Changes here are global.</CardDescription>
            </CardHeader>
            <CardContent className="p-0 grid gap-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">You can override per employee under Agents &gt; [Employee] &gt; Tools.</div>
                <Button type="button" variant="outline" size="sm" onClick={addTool}>Add tool</Button>
              </div>
              <div className="grid gap-2">
                {form.watch("integrationsDefaults.tools").length === 0 && (
                  <p className="text-sm text-muted-foreground">No tools configured yet.</p>
                )}
                {form.watch("integrationsDefaults.tools").map((tool, idx) => (
                  <div key={`${tool.key}-${idx}`} className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-2 items-center border rounded-md p-3">
                    <Input placeholder="Key" value={tool.key} onChange={(e) => {
                      const tools = [...form.getValues("integrationsDefaults.tools")];
                      tools[idx] = { ...tools[idx], key: e.target.value };
                      form.setValue("integrationsDefaults.tools", tools, { shouldDirty: true });
                    }} />
                    <Input placeholder="Name" value={tool.name} onChange={(e) => {
                      const tools = [...form.getValues("integrationsDefaults.tools")];
                      tools[idx] = { ...tools[idx], name: e.target.value };
                      form.setValue("integrationsDefaults.tools", tools, { shouldDirty: true });
                    }} />
                    <div className="flex items-center justify-end gap-2">
                      <Switch checked={tool.enabled} onCheckedChange={(next) => setConfirmToolChange({ index: idx, next })} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced">
          <Card className="rounded-2xl border shadow-sm p-4 lg:p-6">
            <CardHeader className="p-0 mb-4">
              <CardTitle>Advanced</CardTitle>
              <CardDescription>Controls for advanced behavior and maintenance.</CardDescription>
            </CardHeader>
            <CardContent className="p-0 grid gap-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between gap-4 border rounded-md p-3">
                  <Label>Allow model auto-updates</Label>
                  <Switch checked={form.watch("advanced.allowModelAutoUpdates")} onCheckedChange={(v) => form.setValue("advanced.allowModelAutoUpdates", v, { shouldDirty: true })} />
                </div>
                <div>
                  <Button type="button" variant="outline" onClick={() => { form.setValue("advanced.resetOnboardingTips", true, { shouldDirty: true }); toast({ title: "Onboarding tips will be reset on save" }); }}>Reset onboarding tips</Button>
                </div>
              </div>

              <div className="border rounded-2xl p-4">
                <h3 className="font-semibold mb-2 text-destructive">Danger zone</h3>
                <div className="flex flex-wrap gap-2">
                  <DangerActionButton
                    label="Reset ALL settings to defaults"
                    confirmLabel="Type RESET to confirm"
                    onConfirm={() => form.reset(getDefaultGlobalEmployeeSettings())}
                  />
                  <DangerActionButton
                    label="Delete all conversation caches"
                    confirmLabel="This will clear caches"
                    onConfirm={() => toast({ title: "Caches cleared", description: "Your agents will rebuild caches automatically." })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </div>

      {/* Sticky save bar */}
      {form.formState.isDirty && (
        <div className="sticky bottom-0 z-30 bg-background/80 backdrop-blur border-t mt-6">
          <div className="max-w-[1100px] mx-auto px-4 lg:px-6 py-3 flex items-center justify-between gap-3">
            <span className="text-sm">You have unsaved changes</span>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={discard}>Discard</Button>
              <Button type="button" onClick={form.handleSubmit(onSave)}>Save Changes</Button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm modal for tool toggles */}
      <AlertDialog open={!!confirmToolChange} onOpenChange={(open) => !open && setConfirmToolChange(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>This change will affect all employees</AlertDialogTitle>
            <AlertDialogDescription>
              Toggling a default tool updates access for every employee. Are you sure?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={applyToolToggle}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

function DangerActionButton({ label, confirmLabel, onConfirm }: { label: string; confirmLabel: string; onConfirm: () => void }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const canConfirm = text.toUpperCase() === "RESET";
  return (
    <>
      <Button variant="destructive" type="button" onClick={() => setOpen(true)}>{label}</Button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>This change will affect all employees</AlertDialogTitle>
            <AlertDialogDescription>
              {confirmLabel}. Type "RESET" to confirm.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Input placeholder="RESET" value={text} onChange={(e) => setText(e.target.value)} />
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction disabled={!canConfirm} onClick={() => { onConfirm(); setOpen(false); setText(""); }}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default DashboardSettings;
