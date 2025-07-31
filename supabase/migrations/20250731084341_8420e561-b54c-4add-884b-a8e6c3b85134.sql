-- Create table for training requests
CREATE TABLE public.training_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email TEXT NOT NULL,
  user_name TEXT,
  topic TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.training_requests ENABLE ROW LEVEL SECURITY;

-- Create policy for anyone to submit training requests
CREATE POLICY "Anyone can submit training requests" 
ON public.training_requests 
FOR INSERT 
WITH CHECK (true);

-- Create policy for admin to view all requests (restricting public read access)
CREATE POLICY "Only admin can view training requests" 
ON public.training_requests 
FOR SELECT 
USING (false);