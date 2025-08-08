-- Create tools settings table for global tool toggles
CREATE TABLE IF NOT EXISTS public.tools_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  tool_key TEXT NOT NULL,
  enabled BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT tools_settings_user_tool_unique UNIQUE (user_id, tool_key)
);

-- Enable RLS and add policies
ALTER TABLE public.tools_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can select their tools settings" ON public.tools_settings;
CREATE POLICY "Users can select their tools settings"
  ON public.tools_settings
  FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can upsert their tools settings" ON public.tools_settings;
CREATE POLICY "Users can upsert their tools settings"
  ON public.tools_settings
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their tools settings" ON public.tools_settings;
CREATE POLICY "Users can update their tools settings"
  ON public.tools_settings
  FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their tools settings" ON public.tools_settings;
CREATE POLICY "Users can delete their tools settings"
  ON public.tools_settings
  FOR DELETE
  USING (auth.uid() = user_id);

-- Trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_tools_settings_updated_at ON public.tools_settings;
CREATE TRIGGER update_tools_settings_updated_at
BEFORE UPDATE ON public.tools_settings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


-- Create integrations connections table
CREATE TABLE IF NOT EXISTS public.integrations_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  provider TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'disconnected',
  meta JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT integrations_connections_user_provider_unique UNIQUE (user_id, provider)
);

-- Enable RLS and add policies
ALTER TABLE public.integrations_connections ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can select their integrations" ON public.integrations_connections;
CREATE POLICY "Users can select their integrations"
  ON public.integrations_connections
  FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their integrations" ON public.integrations_connections;
CREATE POLICY "Users can insert their integrations"
  ON public.integrations_connections
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their integrations" ON public.integrations_connections;
CREATE POLICY "Users can update their integrations"
  ON public.integrations_connections
  FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their integrations" ON public.integrations_connections;
CREATE POLICY "Users can delete their integrations"
  ON public.integrations_connections
  FOR DELETE
  USING (auth.uid() = user_id);

-- Trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_integrations_connections_updated_at ON public.integrations_connections;
CREATE TRIGGER update_integrations_connections_updated_at
BEFORE UPDATE ON public.integrations_connections
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


-- Create table for special requests submissions
CREATE TABLE IF NOT EXISTS public.tools_special_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  requested TEXT NOT NULL,
  details TEXT,
  file_path TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS and add policies
ALTER TABLE public.tools_special_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can submit special requests" ON public.tools_special_requests;
CREATE POLICY "Users can submit special requests"
  ON public.tools_special_requests
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view their own special requests" ON public.tools_special_requests;
CREATE POLICY "Users can view their own special requests"
  ON public.tools_special_requests
  FOR SELECT
  USING (auth.uid() = user_id);

-- Create a private storage bucket for request attachments
INSERT INTO storage.buckets (id, name, public)
VALUES ('requests', 'requests', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for the 'requests' bucket
-- Users can upload files into a folder named by their user id
DROP POLICY IF EXISTS "Users can upload their own request files" ON storage.objects;
CREATE POLICY "Users can upload their own request files"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'requests'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

DROP POLICY IF EXISTS "Users can view their own request files" ON storage.objects;
CREATE POLICY "Users can view their own request files"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'requests'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

DROP POLICY IF EXISTS "Users can update their own request files" ON storage.objects;
CREATE POLICY "Users can update their own request files"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'requests'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

DROP POLICY IF EXISTS "Users can delete their own request files" ON storage.objects;
CREATE POLICY "Users can delete their own request files"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'requests'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );
