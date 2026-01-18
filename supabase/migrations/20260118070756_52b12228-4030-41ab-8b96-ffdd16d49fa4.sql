-- Add unsubscribe token column to newsletter_subscribers
ALTER TABLE public.newsletter_subscribers 
ADD COLUMN unsubscribe_token uuid DEFAULT gen_random_uuid() NOT NULL UNIQUE;

-- Create index for fast token lookup
CREATE INDEX idx_newsletter_unsubscribe_token ON public.newsletter_subscribers(unsubscribe_token);

-- Allow public to update status via unsubscribe (only status field, only to 'unsubscribed')
CREATE POLICY "Anyone can unsubscribe via token"
ON public.newsletter_subscribers
FOR UPDATE
USING (true)
WITH CHECK (status = 'unsubscribed');