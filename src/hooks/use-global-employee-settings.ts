import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export type GlobalEmployeeSettings = {
  general: {
    defaultDisplayNamePrefix: string;
    language: "tr" | "en";
    timezone: string; // IANA tz
    brandVoice: "professional" | "friendly" | "concise" | "playful";
    greetingTemplate: string;
  };
  workingHours: {
    timezone: string;
    weekly: Array<{
      day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
      enabled: boolean;
      from?: string; // HH:mm
      to?: string; // HH:mm
    }>;
    holidays: { date: string; label: string }[];
    offHoursAutoReplyEnabled: boolean;
    offHoursAutoReplyMessage: string;
  };
  communication: {
    defaultChannels: Array<"Web" | "WhatsApp" | "Instagram" | "Email">;
    showTypingIndicator: boolean;
    expectedFirstResponseMins: number;
    maxConcurrentConversations: number; // 0 = unlimited
  };
  permissions: {
    allowManualMessageSend: boolean;
    allowOrderEdits: boolean;
    allowRefundActions: boolean;
    dataAccessScope: "none" | "own" | "all";
    toolsAccessLevel: "basic" | "standard" | "admin";
  };
  notifications: {
    notifyOnNewConversation: boolean;
    notifyOnMention: boolean;
    notifyOnEscalation: boolean;
    delivery: Array<"Email" | "Push" | "Webhook">;
    webhookUrl?: string;
    digestFrequency: "off" | "hourly" | "daily";
  };
  dataPrivacy: {
    piiMasking: boolean;
    redactPatterns: string[];
    retentionDays: number; // 0 = unlimited
    exportEnabled: boolean;
  };
  escalation: {
    autoEscalateAfterMins: number; // 0 = off
    escalateTo: { email?: string; phone?: string };
    fallbackMessage: string;
  };
  integrationsDefaults: {
    tools: Array<{ key: string; name: string; enabled: boolean }>;
    requireConfirmOnToggle: boolean; // always true here
  };
  advanced: {
    allowModelAutoUpdates: boolean;
    resetOnboardingTips: boolean;
  };
};

export const getDefaultGlobalEmployeeSettings = (): GlobalEmployeeSettings => ({
  general: {
    defaultDisplayNamePrefix: "Nonplo Assistant",
    language: "en",
    timezone: "Europe/Istanbul",
    brandVoice: "professional",
    greetingTemplate: "Hi {{customerName}}, I'm {{agentName}}. How can I help you today?",
  },
  workingHours: {
    timezone: "Europe/Istanbul",
    weekly: [
      { day: "Mon", enabled: true, from: "09:00", to: "18:00" },
      { day: "Tue", enabled: true, from: "09:00", to: "18:00" },
      { day: "Wed", enabled: true, from: "09:00", to: "18:00" },
      { day: "Thu", enabled: true, from: "09:00", to: "18:00" },
      { day: "Fri", enabled: true, from: "09:00", to: "18:00" },
      { day: "Sat", enabled: false },
      { day: "Sun", enabled: false },
    ],
    holidays: [],
    offHoursAutoReplyEnabled: false,
    offHoursAutoReplyMessage: "We're currently offline. We'll get back to you as soon as possible.",
  },
  communication: {
    defaultChannels: ["Web", "Email"],
    showTypingIndicator: true,
    expectedFirstResponseMins: 30,
    maxConcurrentConversations: 0,
  },
  permissions: {
    allowManualMessageSend: true,
    allowOrderEdits: false,
    allowRefundActions: false,
    dataAccessScope: "own",
    toolsAccessLevel: "standard",
  },
  notifications: {
    notifyOnNewConversation: true,
    notifyOnMention: true,
    notifyOnEscalation: true,
    delivery: ["Email"],
    digestFrequency: "daily",
  },
  dataPrivacy: {
    piiMasking: true,
    redactPatterns: [],
    retentionDays: 90,
    exportEnabled: true,
  },
  escalation: {
    autoEscalateAfterMins: 0,
    escalateTo: {},
    fallbackMessage: "We're escalating your request to a human specialist.",
  },
  integrationsDefaults: {
    tools: [],
    requireConfirmOnToggle: true,
  },
  advanced: {
    allowModelAutoUpdates: true,
    resetOnboardingTips: false,
  },
});

export function useGlobalEmployeeSettings() {
  const [settings, setSettings] = useState<GlobalEmployeeSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from("global_employee_settings")
      .select("settings")
      .limit(1)
      .single();

    if (error) {
      // If no row exists yet, initialize with defaults in memory
      setSettings(getDefaultGlobalEmployeeSettings());
      setLoading(false);
      return;
    }

    const loaded = (data?.settings as GlobalEmployeeSettings) || getDefaultGlobalEmployeeSettings();
    setSettings(loaded);
    setLoading(false);
  }, []);

  const save = useCallback(async (newSettings: GlobalEmployeeSettings) => {
    setError(null);
    const { error } = await supabase
      .from("global_employee_settings")
      .upsert(
        { singleton: true, settings: newSettings },
        { onConflict: "singleton" }
      );
    if (error) {
      setError(error.message);
      throw error;
    }
    setSettings(newSettings);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { settings, setSettings, isLoading: loading, error, refresh: load, save };
}
