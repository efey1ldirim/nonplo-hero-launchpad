-- Create table to store a single global settings object
CREATE TABLE public.global_employee_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  singleton boolean NOT NULL DEFAULT true UNIQUE,
  settings jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.global_employee_settings ENABLE ROW LEVEL SECURITY;

-- Policies for authenticated users
CREATE POLICY "Authenticated can read global settings"
  ON public.global_employee_settings
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can insert global settings"
  ON public.global_employee_settings
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update global settings"
  ON public.global_employee_settings
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can delete global settings"
  ON public.global_employee_settings
  FOR DELETE
  TO authenticated
  USING (true);

-- Trigger to auto-update updated_at
CREATE TRIGGER update_global_employee_settings_updated_at
BEFORE UPDATE ON public.global_employee_settings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
