ALTER TABLE public.pre_registrations
  ADD COLUMN IF NOT EXISTS admin_notification_sent_at TIMESTAMP WITH TIME ZONE;

ALTER TABLE public.contact_requests
  ADD COLUMN IF NOT EXISTS admin_notification_sent_at TIMESTAMP WITH TIME ZONE;

COMMENT ON COLUMN public.pre_registrations.admin_notification_sent_at
  IS 'Timestamp of the successfully sent admin notification email.';

COMMENT ON COLUMN public.contact_requests.admin_notification_sent_at
  IS 'Timestamp of the successfully sent admin notification email.';
