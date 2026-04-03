cd DigiAgentix-solutions

# 2. Initialize git here
git init

# 3. Stage all source files
git add .

# 4. Commit
git commit -m "Initial commit: DigiAgentix full-stack website"

git remote add origin https://github.com/YOUR_USERNAME/DigiAgentix-solutions.git

# 2. Rename branch to main
git branch -M main

# 3. Push
git push -u origin main

git remote add origin https://github.com/anshuman112001/DigiAgentix-solutions.git

How to Add a New Client (takes 2 minutes)
Step 1 — Client signs up at /portal
They create an account with email + password. Copy their User ID from Supabase → Authentication → Users.

Step 2 — Add their project in Supabase
INSERT INTO clients (user_id, company_name, project_name, status, progress)
VALUES (
  'paste-their-user-id-here',
  'Client Company Name',
  'Their Project Name',
  'in_progress',   -- or: completed, review, on_hold
  30               -- progress % (0-100)
);

Step 3 — Add their invoices
INSERT INTO invoices (client_id, amount, status, description, due_date)
VALUES (
  'paste-client-id-here',
  35000,
  'pending',       -- or: paid, overdue
  'AI Agent Setup - 50% Advance',
  '2025-02-01'
);

That's it! ✅
Client logs in → sees their own project + invoices automatically. No code changes needed ever! 🎉

