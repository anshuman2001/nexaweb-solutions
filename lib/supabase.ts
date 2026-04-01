import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getServiceRoleClient = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

// SQL to create tables - run in Supabase SQL editor
export const SETUP_SQL = `
-- Contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  service text,
  budget text,
  message text,
  created_at timestamptz DEFAULT now()
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL,
  image_url text,
  tech_stack text[],
  live_url text,
  featured boolean DEFAULT false,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text,
  excerpt text,
  category text,
  image_url text,
  published_at timestamptz DEFAULT now(),
  author text DEFAULT 'NexaWeb Team',
  read_time integer DEFAULT 5
);

-- Clients table
CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users,
  company_name text,
  project_name text,
  status text DEFAULT 'in_progress',
  progress integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Invoices table
CREATE TABLE IF NOT EXISTS invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id),
  amount numeric NOT NULL,
  status text DEFAULT 'pending',
  due_date date,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Demo requests table
CREATE TABLE IF NOT EXISTS demo_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  agent_type text,
  company text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE demo_requests ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can insert contacts" ON contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Anyone can read blog posts" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Anyone can insert demo requests" ON demo_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Clients can read own data" ON clients FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Clients can read own invoices" ON invoices FOR SELECT
  USING (client_id IN (SELECT id FROM clients WHERE user_id = auth.uid()));
`;
