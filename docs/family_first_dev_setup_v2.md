# Family First Event Rentals — Dev Setup Documentation

## Project Overview
Full stack business website for a family-owned event rental company
based in Stone Mountain, Atlanta GA. Built with React, TypeScript,
Vite, Supabase, and EmailJS.

**Live URL:** familyfirstatl.com (pending deployment)
**GitHub:** https://github.com/DeToKn/family-first-rentals
**Local Dev:** http://localhost:8080

---

## Tech Stack
```
Frontend:     React + TypeScript + Vite
Styling:      Tailwind CSS
Database:     Supabase (PostgreSQL)
Email:        EmailJS (pending)
Hosting:      Netlify (pending)
Runtime:      Bun
Editor:       VS Code
Terminal:     WSL Ubuntu
```

---

## Phase 1 — Project Setup

### 1. Built Initial Website
- Designed full business website using Claude AI
- Black and gold color scheme matching company branding
- Sections: Hero, Trust Bar, Stats, Rentals, Packages,
  Who We Are, Occasions, Service Area, Guarantee, FAQ,
  Values, Booking Form, Footer

### 2. Exported from Lovable
- Built additional features in Lovable (AI app builder)
- Added: Quote Calculator, Availability Calendar,
  Google Maps embed, SEO meta tags
- Exported project as ZIP file
- Extracted to `D:/FamilyFirstWebsite`

### 3. Opened in VS Code
- Opened project folder in VS Code
- Installed recommended extensions:
  - Prettier
  - ESLint
  - Live Server
  - GitLens

---

## Phase 2 — Environment Setup

### 4. Installed WSL Ubuntu
```powershell
# Run in PowerShell as Administrator
wsl --install -d Ubuntu
```

### 5. Installed Bun on WSL
```bash
# Install unzip first (required by Bun)
sudo apt update && sudo apt install unzip -y

# Install Bun
curl -fsSL https://bun.sh/install | bash

# Reload terminal
source ~/.bashrc

# Verify installation
bun --version
```

### 6. Configured Environment Variables
- Created `.env` file in project root
- Added Supabase credentials:
```bash
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key
```
- Added `.env` to `.gitignore` immediately

### 7. Set Up .gitignore
```gitignore
# Environment Variables — NEVER commit these
.env
.env.local
.env.development
.env.production
.env.test

# Dependencies
node_modules/

# Build Output
dist/
dist-ssr
*.local

# Supabase
.supabase/

# Vite cache
node_modules/.vite

# OS Files
.DS_Store
.DS_Store?
._*
Thumbs.db
Desktop.ini

# VS Code
.vscode/*
!.vscode/extensions.json
.idea

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
bun-debug.log*

# TypeScript
*.tsbuildinfo

# Temp
*.tmp
*.temp
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
coverage/
```

---

## Phase 3 — Dependency Installation & Fixes

### 8. Installed Project Dependencies
```bash
cd /mnt/d/FamilyFirstWebsite
bun install
```

### 9. Fixed Folder Name Typos (Lovable export issue)
Lovable exported with misspelled folder names:
```bash
# Renamed misspelled folders
mv src/assests src/assets
mv src/intergrations-supabase src/integrations
```

### 10. Fixed Import Paths
Updated import statements across components to match
corrected folder names:

In `Rentals.tsx`:
```typescript
// Fixed
import chairImg from "@/assets/ff-chair.jpg";
import rectTableImg from "@/assets/ff-rect-table.jpg";
import roundTableImg from "@/assets/ff-round-table.jpg";
```

In `Booking.tsx`:
```typescript
// Fixed — removed supabase subfolder from path
import { supabase } from "@/integrations/client";
```

### 11. Fixed TypeScript Configuration
Added Vite client types to `vite-env.d.ts`:
```typescript
/// <reference types="vite/client" />
```

### 12. Fixed Duplicate Supabase Import
Removed duplicate import in `Booking.tsx` — had two identical
import statements which caused TypeScript errors.

### 13. Fixed Table Name Mismatch
Lovable generated code targeting `booking_requests` table
but Supabase table was named `bookings`. Resolved by
renaming the table in Supabase:
```sql
ALTER TABLE bookings RENAME TO booking_requests;
```

### 14. Added Missing Column
`Booking.tsx` was inserting `items_needed` field but column
did not exist in the database. Fixed by adding the column:
```sql
ALTER TABLE booking_requests 
ADD COLUMN items_needed TEXT;
```

---

## Phase 4 — Supabase Integration

### 15. Created Supabase Project
- Signed up at supabase.com
- Created new project: `family-first-rentals`
- Saved Project URL and anon public key to `.env`
- Rotated anon key after accidental exposure in chat

### 16. Supabase Client Configuration
Located at `src/integrations/client.ts`:
```typescript
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      storage: localStorage,
      persistSession: true,
      autoRefreshToken: true,
    }
  }
);
```

### 17. Database Schema (SQL)
```sql
CREATE TABLE booking_requests (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  event_date DATE NOT NULL,
  event_type TEXT,
  guest_count TEXT,
  package_interest TEXT,
  event_location TEXT,
  items_needed TEXT,
  notes TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 18. Row Level Security (RLS)
```sql
-- Enable RLS
ALTER TABLE booking_requests ENABLE ROW LEVEL SECURITY;

-- Allow public to insert bookings
CREATE POLICY "Anyone can insert booking"
ON booking_requests FOR INSERT
TO anon
WITH CHECK (true);

-- Allow public to read booked dates for calendar
CREATE POLICY "Anyone can read booked dates"
ON booking_requests FOR SELECT
TO anon
USING (true);
```

### 19. Verify Policies
```sql
SELECT policyname, cmd 
FROM pg_policies 
WHERE tablename = 'booking_requests';
```

---

## Phase 5 — Git & GitHub Setup

### 20. Initialized Git Repository
```bash
cd /mnt/d/FamilyFirstWebsite
git init
```

### 21. Configured Git Identity
```bash
git config --global user.email "your@email.com"
git config --global user.name "Your Name"
```

### 22. Verified .env is Ignored
```bash
git check-ignore -v .env
# Returns: .gitignore:2:.env    .env ✅
```

### 23. Initial Commit
```bash
git add .
git commit -m "Initial commit - Family First Event Rentals website with Supabase booking system"
```

### 24. Pushed to GitHub
```bash
git remote add origin https://github.com/DeToKn/family-first-rentals.git
git branch -M main
git config pull.rebase false
git pull origin main --allow-unrelated-histories
git push -u origin main
```

Note: Used Personal Access Token (fine-grained) for authentication.
Token saved with:
```bash
git config --global credential.helper store
```

---

## Phase 6 — Running Locally

### 25. Start Development Server
```bash
# Navigate to project
cd /mnt/d/FamilyFirstWebsite

# Start server
bun run dev
```

### 26. Access Local Site
```
http://localhost:8080
```

---

## Project File Structure
```
FamilyFirstWebsite/
├── src/
│   ├── assets/
│   │   ├── ff-chair.jpg
│   │   ├── ff-rect-table.jpg
│   │   └── ff-round-table.jpg
│   ├── components/
│   │   └── familyfirst/
│   │       ├── Availability.tsx
│   │       ├── Booking.tsx
│   │       ├── BookingContext.tsx
│   │       ├── Faq.tsx
│   │       ├── Footer.tsx
│   │       ├── Guarantee.tsx
│   │       ├── Hero.tsx
│   │       ├── Occasions.tsx
│   │       ├── Packages.tsx
│   │       ├── QuoteCalculator.tsx
│   │       ├── Rentals.tsx
│   │       ├── SectionHeader.tsx
│   │       ├── ServiceArea.tsx
│   │       ├── SiteNav.tsx
│   │       ├── Stats.tsx
│   │       ├── TrustBar.tsx
│   │       ├── Values.tsx
│   │       └── WhoWeAre.tsx
│   ├── integrations/
│   │   ├── client.ts
│   │   └── types.ts
│   ├── pages/
│   │   ├── Index.tsx
│   │   └── NotFound.tsx
│   ├── App.tsx
│   └── main.tsx
├── docs/
│   └── family_first_dev_setup.md
├── .env                ← never commit this
├── .gitignore
├── bun.lock
├── package.json
├── tailwind.config.ts
├── tsconfig.app.json
└── vite.config.ts
```

---

## What's Working
```
✅ Site runs locally at localhost:8080
✅ Black and gold branding
✅ Booking form submits successfully
✅ Data saves to Supabase booking_requests table
✅ RLS policies protecting customer data
✅ Availability calendar with booked dates
✅ Quote calculator (live price updates)
✅ Code pushed to GitHub
✅ Git history initialized
```

---

## Next Steps
- [ ] Phase 7  — Connect calendar to Supabase (dynamic booked dates)
- [ ] Phase 8  — EmailJS integration for booking notifications
- [ ] Phase 9  — Admin dashboard with authentication
- [ ] Phase 10 — Security audit
- [ ] Phase 11 — Deploy to Netlify with custom domain (familyfirstatl.com)

---

## Key Security Decisions Made
```
✅ Environment variables for all API keys
✅ .gitignore configured before first commit
✅ Supabase anon key used (not service role)
✅ Row Level Security enabled on booking_requests table
✅ VITE_ prefix used for intentional browser exposure
✅ API key rotated after accidental exposure in chat
✅ Personal Access Token used for GitHub authentication
✅ Fine-grained token with minimal permissions
✅ credential.helper store configured locally only
```

---

## Security Findings (For Resume/Portfolio)
```
⚠️  localStorage used for auth token storage
    → Vulnerable to XSS attacks
    → Document as finding, fix in security audit phase

⚠️  'as any' TypeScript workaround in client.ts
    → Bypasses type safety
    → Silent failures if env vars missing
    → Revert to proper types after vite-env.d.ts fix
```

---

## Commands Reference
```bash
# Start dev server
bun run dev

# Install dependencies
bun install

# Search for text across all files
grep -rn "search term" src/

# Navigate to project
cd /mnt/d/FamilyFirstWebsite

# Git commands
git status                    # check what changed
git add .                     # stage all changes
git commit -m "message"       # commit changes
git push                      # push to GitHub

# Check if file is gitignored
git check-ignore -v filename

# Find text in specific file
grep -n "search term" src/components/familyfirst/Booking.tsx
```

---

## Troubleshooting Log
```
Issue: Lovable export had misspelled folder names
Fix:   mv src/assests src/assets
       mv src/intergrations-supabase src/integrations

Issue: TypeScript error — env does not exist on ImportMeta
Fix:   Add /// <reference types="vite/client" /> to vite-env.d.ts

Issue: 404 error on form submit
Fix:   RLS policies were missing — added INSERT and SELECT policies

Issue: 400 error on form submit  
Fix:   items_needed column missing from table — added via ALTER TABLE

Issue: Table name mismatch
Fix:   Renamed bookings to booking_requests to match generated code

Issue: Duplicate supabase import in Booking.tsx
Fix:   Deleted duplicate import on line 7

Issue: git push rejected
Fix:   git config pull.rebase false
       git pull origin main --allow-unrelated-histories
       git push -u origin main

Issue: bun not recognized in PowerShell
Fix:   Switch to WSL Ubuntu terminal or reinstall Bun for Windows

Issue: rm -rf not working in PowerShell
Fix:   Use Remove-Item -Recurse -Force node_modules instead
```

---

*Documentation updated after Phase 6 completion*
*GitHub: https://github.com/DeToKn/family-first-rentals*
*Next: Open new chat for Phase 7 — Calendar Supabase integration*
