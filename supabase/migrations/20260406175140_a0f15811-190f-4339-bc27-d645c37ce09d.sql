
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number SERIAL UNIQUE,
  stripe_session_id TEXT,
  items JSONB NOT NULL DEFAULT '[]',
  total_cents INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read orders (for order tracking by number)
CREATE POLICY "Anyone can view orders by order number"
  ON public.orders FOR SELECT
  USING (true);

-- Allow service role inserts (edge function uses service role)
CREATE POLICY "Service role can insert orders"
  ON public.orders FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Service role can update orders"
  ON public.orders FOR UPDATE
  USING (true);
