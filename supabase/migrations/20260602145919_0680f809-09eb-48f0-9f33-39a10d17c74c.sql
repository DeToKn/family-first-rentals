DROP TABLE IF EXISTS public.orders CASCADE;

CREATE TABLE public.booking_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  event_date date,
  event_type text,
  guest_count text,
  package_interest text,
  items_needed text[] NOT NULL DEFAULT '{}',
  event_location text,
  notes text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.booking_requests TO anon, authenticated;
GRANT ALL ON public.booking_requests TO service_role;

ALTER TABLE public.booking_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a booking request"
  ON public.booking_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);