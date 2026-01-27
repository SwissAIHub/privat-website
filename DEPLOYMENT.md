# Deployment Guide - Florian Schatz Website

## Vercel Deployment (Empfohlen)

### Voraussetzungen
- [x] Vercel Account (https://vercel.com)
- [x] GitHub Repository (optional, aber empfohlen für CI/CD)
- [x] Supabase Projekt (https://app.supabase.com/project/xjgxtxtczdklrcoooekp)

---

## Schritt 1: Supabase Schema Setup

### 1.1 SQL Schema ausführen
```bash
# 1. Öffne Supabase SQL Editor:
https://app.supabase.com/project/xjgxtxtczdklrcoooekp/sql

# 2. Neue Query erstellen
# 3. Kopiere gesamten Inhalt von /supabase/schema.sql
# 4. Run (CMD/CTRL + Enter)
```

### 1.2 Credentials kopieren
```bash
# Projekt URL
https://app.supabase.com/project/xjgxtxtczdklrcoooekp/settings/api

NEXT_PUBLIC_SUPABASE_URL=https://xjgxtxtczdklrcoooekp.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Schritt 2: Vercel Projekt Setup

### 2.1 Vercel Deployment (Mit GitHub)

**Option A: GitHub Repository (Empfohlen)**

1. **GitHub Repo erstellen**
```bash
# Im Projekt-Verzeichnis:
git init
git add .
git commit -m "Initial commit: Florian Schatz Website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/florian-schatz-website.git
git push -u origin main
```

2. **Mit Vercel verbinden**
- Gehe zu https://vercel.com/new
- "Import Git Repository"
- Wähle `florian-schatz-website` Repo
- Framework Preset: **Next.js** (automatisch erkannt)
- Root Directory: `./` (Standard)
- Klicke "Deploy"

3. **Environment Variables setzen**
   - Gehe zu: Project Settings → Environment Variables
   - Füge hinzu:

   ```
   Name: NEXT_PUBLIC_SUPABASE_URL
   Value: https://xjgxtxtczdklrcoooekp.supabase.co
   Environments: Production, Preview, Development

   Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
   Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (dein Key)
   Environments: Production, Preview, Development
   ```

4. **Redeploy**
   - Settings → Deployments → Latest Deployment → "..." → Redeploy

**Option B: Vercel CLI (Ohne GitHub)**

```bash
# 1. Vercel CLI installieren
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel

# 4. Folge den Prompts:
# - Set up and deploy? Yes
# - Which scope? [Your Account]
# - Link to existing project? No
# - Project name? florian-schatz-website
# - Directory? ./
# - Override settings? No

# 5. Environment Variables setzen
vercel env add NEXT_PUBLIC_SUPABASE_URL
# → Enter value: https://xjgxtxtczdklrcoooekp.supabase.co
# → Select environments: Production, Preview, Development

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# → Enter value: [Your Anon Key]
# → Select environments: Production, Preview, Development

# 6. Production Deployment
vercel --prod
```

---

## Schritt 3: Domain Setup (Optional)

### Custom Domain verbinden

1. **Vercel Dashboard**
   - Project Settings → Domains
   - "Add Domain"
   - Eingabe: `florianschatz.com`

2. **DNS Konfiguration**

   **Bei Domain Provider (z.B. Namecheap, GoDaddy):**

   ```
   Type: A Record
   Host: @
   Value: 76.76.21.21
   TTL: Automatic

   Type: CNAME
   Host: www
   Value: cname.vercel-dns.com
   TTL: Automatic
   ```

3. **SSL Zertifikat**
   - Automatisch von Vercel bereitgestellt (Let's Encrypt)
   - Aktivierung: ~24 Stunden nach DNS-Update

---

## Schritt 4: Post-Deployment Checks

### 4.1 Funktionalität testen

```bash
# Homepage
https://florianschatz.com

# Supabase-Verbindung prüfen
# → Availability Bar sollte echte Daten zeigen (keine Console-Warnung)
# → Browser DevTools → Console → Keine "⚠️ Supabase not configured" Warnung

# Alle Routen testen
https://florianschatz.com/focus
https://florianschatz.com/work
https://florianschatz.com/journey
https://florianschatz.com/lab
https://florianschatz.com/partner

# Error Pages
https://florianschatz.com/nonexistent-page (sollte 404 zeigen)
```

### 4.2 SEO Checks

```bash
# Open Graph Preview
https://www.opengraph.xyz/?url=https://florianschatz.com

# Robots.txt
https://florianschatz.com/robots.txt

# Sitemap
https://florianschatz.com/sitemap.xml

# Google Rich Results Test
https://search.google.com/test/rich-results?url=https://florianschatz.com
```

### 4.3 Performance Audit

```bash
# Google PageSpeed Insights
https://pagespeed.web.dev/analysis?url=https://florianschatz.com

# Ziele:
# ✅ Performance: 90+
# ✅ Accessibility: 95+
# ✅ Best Practices: 95+
# ✅ SEO: 100
```

### 4.4 Vercel Analytics aktivieren

```bash
# Bereits installiert via @vercel/analytics
# 1. Vercel Dashboard → Project → Analytics
# 2. Enable "Web Analytics"
# 3. Dashboard zeigt automatisch Daten nach erstem Traffic
```

---

## Schritt 5: Content Management

### Availability Status ändern

```bash
# Supabase Dashboard
https://app.supabase.com/project/xjgxtxtczdklrcoooekp/editor

# Tabelle: availability_status
# Klicke auf Zelle → Bearbeite status/slots_available
# Speichern → Website aktualisiert sich nach 30s (Polling-Interval)
```

### Lab Posts erstellen

```sql
-- SQL Editor:
INSERT INTO lab_posts (title, slug, preview, content, tags, published)
VALUES (
  'Neuer Lab Post Titel',
  'neuer-lab-post-slug',
  'Kurze Vorschau...',
  '# Markdown Content hier...',
  ARRAY['Tag1', 'Tag2'],
  TRUE
);
```

### Now Update ändern

```sql
-- Alten Current-Status deaktivieren
UPDATE now_updates SET is_current = FALSE WHERE is_current = TRUE;

-- Neuen Update hinzufügen
INSERT INTO now_updates (content, is_current)
VALUES ('Neue Fokus-Updates hier...', TRUE);
```

---

## Troubleshooting

### ❌ "Supabase not configured" Warnung in Production

**Ursache:** Environment Variables nicht gesetzt oder falsch

**Lösung:**
```bash
# 1. Vercel Dashboard → Settings → Environment Variables
# 2. Prüfe: NEXT_PUBLIC_SUPABASE_URL und NEXT_PUBLIC_SUPABASE_ANON_KEY
# 3. Müssen "Production" Environment aktiviert haben
# 4. Redeploy triggern (Settings → Deployments → Redeploy)
```

### ❌ 404 bei /work oder /journey

**Ursache:** Pages nicht deployed oder Build-Fehler

**Lösung:**
```bash
# Lokaler Build-Test:
npm run build

# Wenn Fehler → Fix → Git Commit → Git Push
# Vercel deployed automatisch bei GitHub Push
```

### ❌ OG Image zeigt nicht an

**Ursache:** Edge Runtime-Fehler oder Font-Problem

**Lösung:**
```bash
# 1. Check Vercel Logs (Dashboard → Deployments → Latest → Logs)
# 2. OG Image Endpoint testen: https://florianschatz.com/opengraph-image
# 3. Sollte PNG zurückgeben
```

### ❌ Slow Performance

**Lösung:**
```bash
# 1. Vercel Analytics prüfen (Dashboard → Analytics → Web Vitals)
# 2. Probleme identifizieren (z.B. große Images, slow API calls)
# 3. Next.js Image Optimization nutzen (<Image> component)
# 4. Supabase Queries optimieren (Indexes, select only needed fields)
```

---

## Nächste Schritte nach Launch

### 1. Google Search Console
```bash
# 1. https://search.google.com/search-console
# 2. Property hinzufügen: florianschatz.com
# 3. Ownership bestätigen (via DNS TXT Record oder HTML file)
# 4. Sitemap einreichen: https://florianschatz.com/sitemap.xml
```

### 2. Monitoring Setup
```bash
# Vercel Analytics (bereits aktiv)
# → Real-time traffic, Web Vitals, Page Views

# Optional: Sentry für Error Tracking
# npm install @sentry/nextjs
# → Fehler-Logs in Production
```

### 3. Backup-Strategie
```bash
# Supabase: Automatische Backups in Project Settings
# Code: GitHub Repository (automatisch versioniert)
# Images/Assets: Vercel Edge Network (automatisch cached)
```

---

## Schnellreferenz: Wichtige Links

| Service | URL | Zweck |
|---------|-----|-------|
| **Production Site** | https://florianschatz.com | Live Website |
| **Vercel Dashboard** | https://vercel.com/dashboard | Deployments, Analytics, Settings |
| **Supabase Dashboard** | https://app.supabase.com/project/xjgxtxtczdklrcoooekp | Datenbank, Content Management |
| **GitHub Repo** | https://github.com/YOUR_USERNAME/florian-schatz-website | Source Code |
| **PageSpeed Insights** | https://pagespeed.web.dev | Performance Monitoring |

---

**Deployment Status:** ✅ Ready to Deploy

**Nächster Schritt:** Führe `vercel --prod` aus oder pushe zu GitHub!
