# Family First Event Rentals — Dev Setup Documentation

## Project Overview
Full stack business website for a family-owned event rental company
based in Stone Mountain, Atlanta GA. Built with React, TypeScript,
Vite, Supabase, and EmailJS.

**Live URL:** familyfirstatl.com (pending deployment)
**Local Dev:** http://localhost:8080

---

## Tech Stack
```
Frontend:     React + TypeScript + Vite
Styling:      Tailwind CSS
Database:     Supabase (PostgreSQL)
Email:        EmailJS
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
.env
.env.local
.env.development
.env.production
node_modules/
dist/
build/
.vscode/
.DS_Store
*.log
```

---

## Phase 3 — Dependency Installation & Fix

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
// Fixed
import { supabase } from "@/integrations/client";
```

### 11. Fixed TypeScript Configuration
Added Vite client types to `vite-env.d.ts`:
```typescript
/// <reference types="vite/client" />
```

---

## Phase 4 — Supabase Integration

### 12. Created Supabase Project
- Signed up at supabase.com
- Created new project: `family-first-rentals`
- Saved Project URL and anon public key to `.env`

### 13. Supabase Client Configuration
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

### 14. Database Schema (SQL)
Run in Supabase SQL editor:
```sql
CREATE TABLE bookings (
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
  notes TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 15. Row Level Security (RLS)
```sql
-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Allow public to insert bookings
CREATE POLICY "Anyone can insert booking"
ON bookings FOR INSERT
TO anon
WITH CHECK (true);

-- Only authenticated admin can read bookings
CREATE POLICY "Only admin can read bookings"
ON bookings FOR SELECT
TO authenticated
USING (true);
```

---

## Phase 5 — Running Locally

### 16. Start Development Server
```bash
# Navigate to project
cd /mnt/d/FamilyFirstWebsite

# Start server
bun run dev
```

### 17. Access Local Site
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
├── .env                ← never commit this
├── .gitignore
├── bun.lock
├── package.json
├── tailwind.config.ts
├── tsconfig.app.json
└── vite.config.ts
```

---

## Next Steps
- [ ] Phase 2 — EmailJS integration for booking notifications
- [ ] Phase 3 — Complete Supabase booking system
- [ ] Phase 4 — Admin dashboard with authentication
- [ ] Phase 5 — Security audit
- [ ] Phase 6 — Deploy to Netlify with custom domain

---

## Key Security Decisions Made
```
✅ Environment variables for all API keys
✅ .gitignore configured before first commit
✅ Supabase anon key used (not service role)
✅ Row Level Security enabled on bookings table
✅ VITE_ prefix used for intentional browser exposure
✅ API key rotated after accidental exposure in chat
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
```

---

*Documentation created during development session*
*Next: Open new chat for EmailJS integration — Phase 2*

- Added items_needed column to booking_requests
- Fixed duplicate supabase import in Booking.tsx
- Fixed import path from integrations/supabase/client 
  to integrations/client