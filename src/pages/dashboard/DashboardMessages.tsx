import React, { useEffect, useMemo, useRef, useState } from "react";
import { format, formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Calendar as CalendarIcon, Filter, Search, Loader2, MoreVertical, Send, CheckCircle2, Download, ExternalLink, CircleDot } from "lucide-react";

// Types
type Conversation = {
  id: string;
  user_id: string;
  agent_id: string;
  channel: string;
  status: "open" | "pending" | "resolved" | "unanswered" | string;
  last_message_at: string;
  unread: boolean;
  meta: Record<string, any>;
  created_at: string;
  updated_at: string;
};

type Message = {
  id: string;
  conversation_id: string;
  sender: "user" | "agent" | string;
  content: string | null;
  attachments: any[];
  created_at: string;
};

type Agent = { id: string; name: string; role?: string | null };

type DateRange = {
  from?: Date;
  to?: Date;
};

const CHANNELS = [
  { key: "whatsapp", label: "WhatsApp" },
  { key: "instagram", label: "Instagram DM" },
  { key: "web", label: "Web Chat" },
  { key: "email", label: "Email" },
];

const STATUSES = [
  { key: "open", label: "Open" },
  { key: "pending", label: "Pending" },
  { key: "resolved", label: "Resolved" },
  { key: "unanswered", label: "Unanswered" },
];

const PAGE_SIZE = 20;

const MultiSelect = ({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: { key: string; label: string }[];
  selected: string[];
  onChange: (next: string[]) => void;
}) => {
  const handleToggle = (key: string, checked: boolean) => {
    const set = new Set(selected);
    if (checked) set.add(key); else set.delete(key);
    onChange(Array.from(set));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="justify-between w-full md:w-auto">
          <span>{label}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0" align="start">
        <div className="p-2 space-y-1">
          {options.map((opt) => (
            <label key={opt.key} className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-accent cursor-pointer">
              <Checkbox
                checked={selected.includes(opt.key)}
                onCheckedChange={(v) => handleToggle(opt.key, Boolean(v))}
                aria-label={opt.label}
              />
              <span className="text-sm">{opt.label}</span>
            </label>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

const DateRangePicker = ({ value, onChange }: { value: DateRange; onChange: (r: DateRange) => void }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full md:w-auto justify-start">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value.from ? (
            value.to ? (
              <span>
                {format(value.from, "d MMM yyyy", { locale: tr })} – {format(value.to, "d MMM yyyy", { locale: tr })}
              </span>
            ) : (
              <span>{format(value.from, "d MMM yyyy", { locale: tr })}</span>
            )
          ) : (
            <span>Tarih aralığı</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-3">
          <Calendar
            mode="range"
            numberOfMonths={2}
            selected={value as any}
            onSelect={(r: any) => onChange(r ?? {})}
            className="p-3 pointer-events-auto"
            initialFocus
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

const statusBadgeVariant = (status: string) => {
  switch (status) {
    case "open":
      return "secondary" as const;
    case "pending":
      return "outline" as const;
    case "resolved":
      return "default" as const;
    case "unanswered":
      return "destructive" as const;
    default:
      return "outline" as const;
  }
};

const DashboardMessages: React.FC = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [agentMap, setAgentMap] = useState<Record<string, Agent>>({});
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [lastMessageByConv, setLastMessageByConv] = useState<Record<string, Message | undefined>>({});
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [thread, setThread] = useState<Message[]>([]);
  const [reply, setReply] = useState("");

  // Filters
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<DateRange>({});
  const [search, setSearch] = useState("");
  const [unreadOnly, setUnreadOnly] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / PAGE_SIZE)), [total]);

  useEffect(() => {
    document.title = "Mesajlar Gelen Kutusu | Dashboard";
  }, []);

  // Persist & restore filters
  useEffect(() => {
    const raw = localStorage.getItem("inbox_filters");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setSelectedAgents(parsed.selectedAgents ?? []);
        setSelectedChannels(parsed.selectedChannels ?? []);
        setSelectedStatuses(parsed.selectedStatuses ?? []);
        setDateRange(parsed.dateRange ?? {});
        setUnreadOnly(!!parsed.unreadOnly);
      } catch {}
    }
  }, []);
  useEffect(() => {
    localStorage.setItem(
      "inbox_filters",
      JSON.stringify({ selectedAgents, selectedChannels, selectedStatuses, dateRange, unreadOnly })
    );
  }, [selectedAgents, selectedChannels, selectedStatuses, dateRange, unreadOnly]);

  // Load agents
  useEffect(() => {
    const loadAgents = async () => {
      const { data, error } = await supabase
        .from("agents")
        .select("id,name,role")
        .order("name", { ascending: true });
      if (error) return;
      setAgents(data || []);
      setAgentMap((data || []).reduce((acc: any, a) => ({ ...acc, [a.id]: a }), {}));
    };
    loadAgents();
  }, []);

  // Build filters into query
  const buildConversationQuery = () => {
    let query = supabase
      .from("conversations")
      .select("id,user_id,agent_id,channel,status,last_message_at,unread,meta,created_at,updated_at", { count: "exact" })
      .order("last_message_at", { ascending: false })
      .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

    if (selectedAgents.length) query = query.in("agent_id", selectedAgents);
    if (selectedChannels.length) query = query.in("channel", selectedChannels);
    if (selectedStatuses.length) query = query.in("status", selectedStatuses);
    if (unreadOnly) query = query.eq("unread", true);
    if (dateRange.from) query = query.gte("last_message_at", dateRange.from.toISOString());
    if (dateRange.to) query = query.lte("last_message_at", new Date(dateRange.to.getTime() + 24 * 60 * 60 * 1000 - 1).toISOString());

    return query;
  };

  // Optional search – find conversation IDs by messages content
  const findConversationIdsBySearch = async (q: string): Promise<string[] | null> => {
    if (!q || q.trim().length < 2) return null;
    const { data, error } = await supabase
      .from("messages")
      .select("conversation_id")
      .ilike("content", `%${q.trim()}%`)
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) return null;
    const ids = Array.from(new Set((data || []).map((r) => r.conversation_id)));
    return ids;
  };

  const loadConversations = async () => {
    setLoading(true);
    let idsFilter: string[] | null = null;
    if (search.trim().length >= 2) {
      idsFilter = await findConversationIdsBySearch(search);
      if (idsFilter && idsFilter.length === 0) {
        setConversations([]);
        setLastMessageByConv({});
        setTotal(0);
        setLoading(false);
        return;
      }
    }

    let query = buildConversationQuery();
    if (idsFilter) query = query.in("id", idsFilter);

    const { data, error, count } = await query;
    if (error) {
      setLoading(false);
      return;
    }

    setConversations(data || []);
    setTotal(count || 0);
    setLoading(false);

    // Fetch last message snippet per conversation for current page
    const snippetMap: Record<string, Message | undefined> = {};
    await Promise.all(
      (data || []).map(async (c) => {
        const { data: lm } = await supabase
          .from("messages")
          .select("id,conversation_id,sender,content,attachments,created_at")
          .eq("conversation_id", c.id)
          .order("created_at", { ascending: false })
          .limit(1);
        snippetMap[c.id] = (lm && lm[0]) || undefined;
      })
    );
    setLastMessageByConv(snippetMap);
  };

  useEffect(() => {
    loadConversations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, selectedAgents, selectedChannels, selectedStatuses, dateRange, unreadOnly]);

  // Reload when searching with debounce
  useEffect(() => {
    const t = setTimeout(() => {
      setPage(1);
      loadConversations();
    }, 400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  // Load thread
  const loadThread = async (conversationId: string) => {
    const { data, error } = await supabase
      .from("messages")
      .select("id,conversation_id,sender,content,attachments,created_at")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });
    if (!error) setThread(data || []);
  };

  useEffect(() => {
    if (!selectedConversationId) return;
    loadThread(selectedConversationId);
  }, [selectedConversationId]);

  // Mark as read when opening
  useEffect(() => {
    const markRead = async () => {
      if (!selectedConversationId) return;
      const c = conversations.find((x) => x.id === selectedConversationId);
      if (!c || !c.unread) return;
      const { error } = await supabase
        .from("conversations")
        .update({ unread: false })
        .eq("id", selectedConversationId);
      if (!error) {
        setConversations((prev) => prev.map((p) => (p.id === selectedConversationId ? { ...p, unread: false } : p)));
      }
    };
    markRead();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedConversationId]);

  // Realtime subscriptions
  useEffect(() => {
    const channel = supabase
      .channel("inbox-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload: any) => {
          const m = payload.new as Message;
          // Update list: bump conversation on new message
          setConversations((prev) => {
            const idx = prev.findIndex((c) => c.id === m.conversation_id);
            if (idx === -1) return prev;
            const updated = { ...prev[idx], last_message_at: m.created_at, unread: m.sender === "user" ? true : prev[idx].unread };
            const copy = [...prev];
            copy.splice(idx, 1);
            return [updated, ...copy];
          });
          setLastMessageByConv((prev) => ({ ...prev, [m.conversation_id]: m }));

          if (selectedConversationId === m.conversation_id) {
            setThread((prev) => [...prev, m]);
          }
        }
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "conversations" },
        (payload: any) => {
          const c = payload.new as Conversation;
          // Apply current filters quickly (best-effort)
          const passAgents = !selectedAgents.length || selectedAgents.includes(c.agent_id);
          const passChannels = !selectedChannels.length || selectedChannels.includes(c.channel);
          const passStatuses = !selectedStatuses.length || selectedStatuses.includes(c.status);
          const passUnread = !unreadOnly || c.unread;
          if (passAgents && passChannels && passStatuses && passUnread) {
            setConversations((prev) => [c, ...prev]);
          }
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "conversations" },
        (payload: any) => {
          const c = payload.new as Conversation;
          setConversations((prev) => prev.map((p) => (p.id === c.id ? { ...p, ...c } : p)));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAgents, selectedChannels, selectedStatuses, unreadOnly]);

  const resetFilters = () => {
    setSelectedAgents([]);
    setSelectedChannels([]);
    setSelectedStatuses([]);
    setDateRange({});
    setUnreadOnly(false);
    setSearch("");
    setPage(1);
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const setStatus = async (conversationId: string, next: string) => {
    const { error } = await supabase
      .from("conversations")
      .update({ status: next })
      .eq("id", conversationId);
    if (error) {
      toast({ title: "Hata", description: "Durum güncellenemedi", variant: "destructive" });
    } else {
      setConversations((prev) => prev.map((c) => (c.id === conversationId ? { ...c, status: next } : c)));
      toast({ title: "Güncellendi", description: "Durum güncellendi" });
    }
  };

  const bulkMarkRead = async () => {
    if (!selectedIds.length) return;
    const { error } = await supabase.from("conversations").update({ unread: false }).in("id", selectedIds);
    if (!error) {
      setConversations((prev) => prev.map((c) => (selectedIds.includes(c.id) ? { ...c, unread: false } : c)));
      setSelectedIds([]);
      toast({ title: "İşlem tamam", description: "Seçilen konuşmalar okundu olarak işaretlendi" });
    }
  };

  const bulkSetStatus = async (next: string) => {
    if (!selectedIds.length) return;
    const { error } = await supabase.from("conversations").update({ status: next }).in("id", selectedIds);
    if (!error) {
      setConversations((prev) => prev.map((c) => (selectedIds.includes(c.id) ? { ...c, status: next } : c)));
      setSelectedIds([]);
      toast({ title: "Güncellendi", description: `Durum: ${next}` });
    }
  };

  const exportThread = (formatKind: "json" | "csv") => {
    if (!selectedConversationId) return;
    const conv = conversations.find((c) => c.id === selectedConversationId);
    const fileName = `thread_${selectedConversationId}.${formatKind}`;

    if (formatKind === "json") {
      const payload = { conversation: conv, messages: thread };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = fileName; a.click();
      URL.revokeObjectURL(url);
      toast({ title: "Dışa aktarıldı", description: `${fileName} indirildi` });
    } else {
      // CSV: created_at,sender,content
      const rows = ["created_at,sender,content", ...thread.map((m) => `${m.created_at},${m.sender},"${(m.content || "").replace(/"/g, '""')}"`)];
      const blob = new Blob([rows.join("\n")], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = fileName; a.click();
      URL.revokeObjectURL(url);
      toast({ title: "Dışa aktarıldı", description: `${fileName} indirildi` });
    }
  };

  const sendReply = async () => {
    if (!selectedConversationId || !reply.trim()) return;
    const { error } = await supabase.from("messages").insert({
      conversation_id: selectedConversationId,
      sender: "agent",
      content: reply.trim(),
      attachments: [],
    });
    if (error) {
      toast({ title: "Hata", description: "Mesaj gönderilemedi", variant: "destructive" });
    } else {
      setReply("");
    }
  };

  const renderConversationRow = (c: Conversation) => {
    const agent = agentMap[c.agent_id];
    const last = lastMessageByConv[c.id];
    const isSelected = selectedConversationId === c.id;

    return (
      <div
        key={c.id}
        className={`flex items-start gap-3 p-3 rounded-lg border hover:bg-accent cursor-pointer ${isSelected ? "bg-accent" : ""}`}
        onClick={() => setSelectedConversationId(c.id)}
      >
        <div className="pt-1">
          {c.unread ? <CircleDot className="h-3.5 w-3.5 text-primary" /> : <span className="h-3.5 w-3.5 inline-block" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-medium truncate">{c.meta?.user_name || "Anonymous"}</span>
              {agent && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge variant="outline" className="truncate max-w-[140px]">
                        {agent.name}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="text-sm">Ajan: {agent.name}</div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              <Badge variant="secondary">{c.channel}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={statusBadgeVariant(c.status)} className="capitalize">
                {c.status}
              </Badge>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {formatDistanceToNow(new Date(c.last_message_at), { addSuffix: true, locale: tr })}
              </span>
            </div>
          </div>
          <div className="text-sm text-muted-foreground truncate">
            {last?.content || "Önizleme yok"}
          </div>
        </div>
        <div className="pl-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost" aria-label="Durum">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="z-50">
              <DropdownMenuLabel>Durum değiştir</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {STATUSES.map((s) => (
                <DropdownMenuItem key={s.key} onClick={(e) => { e.stopPropagation(); setStatus(c.id, s.key); }}>
                  {s.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="mt-2">
            <Checkbox checked={selectedIds.includes(c.id)} onCheckedChange={() => toggleSelect(c.id)} aria-label="Seç" />
          </div>
        </div>
      </div>
    );
  };

  // Mobile helpers
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [threadOpen, setThreadOpen] = useState(false);
  useEffect(() => {
    if (selectedConversationId) setThreadOpen(true);
  }, [selectedConversationId]);

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-full">
      <header className="mb-4 md:mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Mesajlar</h1>
        <p className="text-muted-foreground text-base md:text-lg">Tüm ajanlardan gelen konuşmaları tek gelen kutusunda yönetin</p>
      </header>

      {/* Actions bar */}
      <div className="flex items-center justify-between gap-2 flex-wrap mb-4">
        <div className="flex items-center gap-2 flex-1 min-w-[260px]">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Mesaj veya yanıtlarda ara..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="hidden md:flex items-center gap-2">
            <MultiSelect
              label={`Ajanlar${selectedAgents.length ? ` (${selectedAgents.length})` : ""}`}
              options={agents.map((a) => ({ key: a.id, label: a.name }))}
              selected={selectedAgents}
              onChange={setSelectedAgents}
            />
            <MultiSelect
              label={`Kanallar${selectedChannels.length ? ` (${selectedChannels.length})` : ""}`}
              options={CHANNELS}
              selected={selectedChannels}
              onChange={setSelectedChannels}
            />
            <MultiSelect
              label={`Durum${selectedStatuses.length ? ` (${selectedStatuses.length})` : ""}`}
              options={STATUSES}
              selected={selectedStatuses}
              onChange={setSelectedStatuses}
            />
            <DateRangePicker value={dateRange} onChange={setDateRange} />
            <div className="flex items-center gap-2 px-3 py-2 rounded-md border">
              <Checkbox id="unreadOnly" checked={unreadOnly} onCheckedChange={(v) => setUnreadOnly(Boolean(v))} />
              <label htmlFor="unreadOnly" className="text-sm">Sadece okunmamış</label>
            </div>
            <Button variant="secondary" onClick={() => { setPage(1); loadConversations(); }}>Uygula</Button>
            <Button variant="ghost" onClick={resetFilters}>Sıfırla</Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!!selectedIds.length && (
            <>
              <Button variant="outline" onClick={bulkMarkRead}>Okundu işaretle</Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Durum değiştir</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {STATUSES.map((s) => (
                    <DropdownMenuItem key={s.key} onClick={() => bulkSetStatus(s.key)}>{s.label}</DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
          <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
            <SheetTrigger asChild>
              <Button className="md:hidden" variant="outline">
                <Filter className="h-4 w-4 mr-2" /> Filtreler
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[85%] sm:w-[420px]">
              <SheetHeader>
                <SheetTitle>Filtreler</SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-3">
                <MultiSelect
                  label={`Ajanlar${selectedAgents.length ? ` (${selectedAgents.length})` : ""}`}
                  options={agents.map((a) => ({ key: a.id, label: a.name }))}
                  selected={selectedAgents}
                  onChange={setSelectedAgents}
                />
                <MultiSelect
                  label={`Kanallar${selectedChannels.length ? ` (${selectedChannels.length})` : ""}`}
                  options={CHANNELS}
                  selected={selectedChannels}
                  onChange={setSelectedChannels}
                />
                <MultiSelect
                  label={`Durum${selectedStatuses.length ? ` (${selectedStatuses.length})` : ""}`}
                  options={STATUSES}
                  selected={selectedStatuses}
                  onChange={setSelectedStatuses}
                />
                <DateRangePicker value={dateRange} onChange={setDateRange} />
                <div className="flex items-center gap-2 px-3 py-2 rounded-md border">
                  <Checkbox id="unreadOnly2" checked={unreadOnly} onCheckedChange={(v) => setUnreadOnly(Boolean(v))} />
                  <label htmlFor="unreadOnly2" className="text-sm">Sadece okunmamış</label>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1" onClick={() => { setPage(1); loadConversations(); setFiltersOpen(false); }}>Uygula</Button>
                  <Button className="flex-1" variant="ghost" onClick={resetFilters}>Sıfırla</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left column (filters) – visible on desktop as quick glance */}
        <aside className="hidden lg:block lg:col-span-3 space-y-3">
          <Card className="p-3 space-y-2">
            <div className="font-medium">Filtreler</div>
            <MultiSelect
              label={`Ajanlar${selectedAgents.length ? ` (${selectedAgents.length})` : ""}`}
              options={agents.map((a) => ({ key: a.id, label: a.name }))}
              selected={selectedAgents}
              onChange={setSelectedAgents}
            />
            <MultiSelect label={`Kanallar${selectedChannels.length ? ` (${selectedChannels.length})` : ""}`} options={CHANNELS} selected={selectedChannels} onChange={setSelectedChannels} />
            <MultiSelect label={`Durum${selectedStatuses.length ? ` (${selectedStatuses.length})` : ""}`} options={STATUSES} selected={selectedStatuses} onChange={setSelectedStatuses} />
            <DateRangePicker value={dateRange} onChange={setDateRange} />
            <div className="flex items-center gap-2">
              <Checkbox id="unreadOnly3" checked={unreadOnly} onCheckedChange={(v) => setUnreadOnly(Boolean(v))} />
              <label htmlFor="unreadOnly3" className="text-sm">Sadece okunmamış</label>
            </div>
            <div className="flex gap-2 pt-2">
              <Button className="flex-1" variant="secondary" onClick={() => { setPage(1); loadConversations(); }}>Uygula</Button>
              <Button className="flex-1" variant="ghost" onClick={resetFilters}>Sıfırla</Button>
            </div>
          </Card>
        </aside>

        {/* Center: list */}
        <section className="lg:col-span-5">
          <Card className="p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium">Konuşmalar</div>
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            </div>
            <Separator className="my-2" />
            <ScrollArea className="h-[60vh]">
              <div className="space-y-2 pr-2">
                {!loading && conversations.length === 0 && (
                  <div className="text-sm text-muted-foreground p-4">Sonuç bulunamadı</div>
                )}
                {conversations.map((c) => renderConversationRow(c))}
              </div>
            </ScrollArea>
            <div className="mt-2">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); setPage((p) => Math.max(1, p - 1)); }} />
                  </PaginationItem>
                  {Array.from({ length: totalPages }).slice(0, 5).map((_, i) => {
                    const p = i + 1;
                    return (
                      <PaginationItem key={p}>
                        <PaginationLink href="#" isActive={page === p} onClick={(e) => { e.preventDefault(); setPage(p); }}>
                          {p}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  <PaginationItem>
                    <PaginationNext href="#" onClick={(e) => { e.preventDefault(); setPage((p) => Math.min(totalPages, p + 1)); }} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </Card>
        </section>

        {/* Right: thread */}
        <section className="hidden lg:block lg:col-span-4">
          <Card className="p-3 h-[72vh] flex flex-col">
            {!selectedConversationId ? (
              <div className="text-sm text-muted-foreground p-4">Bir konuşma seçin</div>
            ) : (
              <>
                {(() => {
                  const conv = conversations.find((c) => c.id === selectedConversationId);
                  if (!conv) return null;
                  const agent = agentMap[conv.agent_id];
                  return (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="font-medium">{conv.meta?.user_name || "Anonymous"}</div>
                        {agent && (
                          <Badge variant="outline" className="truncate max-w-[140px]">{agent.name}</Badge>
                        )}
                        <Badge variant="secondary">{conv.channel}</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="outline" className="capitalize">{conv.status}</Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {STATUSES.map((s) => (
                              <DropdownMenuItem key={s.key} onClick={() => setStatus(conv.id, s.key)}>{s.label}</DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <Button size="icon" variant="ghost" onClick={() => exportThread("json")} aria-label="JSON indir">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => exportThread("csv")} aria-label="CSV indir">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })()}
                <Separator className="my-2" />
                <ScrollArea className="flex-1 pr-2">
                  <div className="space-y-3">
                    {thread.map((m) => (
                      <div key={m.id} className={`max-w-[85%] rounded-xl p-3 border ${m.sender === "agent" ? "ml-auto bg-accent" : "mr-auto"}`}>
                        <div className="text-xs text-muted-foreground mb-1 flex items-center justify-between gap-2">
                          <span className="capitalize">{m.sender}</span>
                          <span>{format(new Date(m.created_at), "d MMM yyyy HH:mm", { locale: tr })}</span>
                        </div>
                        <div className="whitespace-pre-wrap text-sm">{m.content}</div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="mt-2 flex items-center gap-2">
                  <Input placeholder="Yanıt yazın..." value={reply} onChange={(e) => setReply(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendReply(); } }} />
                  <Button onClick={sendReply} disabled={!reply.trim()}>
                    <Send className="h-4 w-4 mr-1" /> Gönder
                  </Button>
                </div>
              </>
            )}
          </Card>
        </section>
      </div>

      {/* Mobile thread sheet */}
      <Sheet open={threadOpen} onOpenChange={setThreadOpen}>
        <SheetContent side="right" className="w-full sm:w-[520px]">
          <SheetHeader>
            <SheetTitle>Konuşma</SheetTitle>
          </SheetHeader>
          <div className="mt-3 h-[75vh] flex flex-col">
            {!selectedConversationId ? (
              <div className="text-sm text-muted-foreground p-4">Bir konuşma seçin</div>
            ) : (
              <>
                {(() => {
                  const conv = conversations.find((c) => c.id === selectedConversationId);
                  if (!conv) return null;
                  const agent = agentMap[conv.agent_id];
                  return (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="font-medium">{conv.meta?.user_name || "Anonymous"}</div>
                        {agent && (
                          <Badge variant="outline" className="truncate max-w-[140px]">{agent.name}</Badge>
                        )}
                        <Badge variant="secondary">{conv.channel}</Badge>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="outline" className="capitalize">{conv.status}</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {STATUSES.map((s) => (
                            <DropdownMenuItem key={s.key} onClick={() => setStatus(conv.id, s.key)}>{s.label}</DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  );
                })()}
                <Separator className="my-2" />
                <ScrollArea className="flex-1 pr-2">
                  <div className="space-y-3">
                    {thread.map((m) => (
                      <div key={m.id} className={`max-w-[90%] rounded-xl p-3 border ${m.sender === "agent" ? "ml-auto bg-accent" : "mr-auto"}`}>
                        <div className="text-xs text-muted-foreground mb-1 flex items-center justify-between gap-2">
                          <span className="capitalize">{m.sender}</span>
                          <span>{format(new Date(m.created_at), "d MMM yyyy HH:mm", { locale: tr })}</span>
                        </div>
                        <div className="whitespace-pre-wrap text-sm">{m.content}</div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="mt-2 flex items-center gap-2">
                  <Input placeholder="Yanıt yazın..." value={reply} onChange={(e) => setReply(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendReply(); } }} />
                  <Button onClick={sendReply} disabled={!reply.trim()}>
                    <Send className="h-4 w-4 mr-1" /> Gönder
                  </Button>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default DashboardMessages;