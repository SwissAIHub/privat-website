# Supabase Setup Guide

## Quick Setup (5 Minuten)

### 1. Supabase Dashboard öffnen
```
https://app.supabase.com/project/xjgxtxtczdklrcoooekp
```

### 2. SQL Editor öffnen
1. Klicke auf "SQL Editor" in der linken Sidebar
2. Klicke auf "+ New Query"

### 3. Schema ausführen
1. Öffne `/supabase/schema.sql` aus diesem Projekt
2. Kopiere den gesamten Inhalt
3. Füge ihn in den SQL Editor ein
4. Klicke "Run" (oder CMD/CTRL + Enter)

### 4. Verifizierung
Nach erfolgreicher Ausführung solltest du sehen:
- ✅ 3 neue Tabellen: `lab_posts`, `availability_status`, `now_updates`
- ✅ 4 Availability Status Einträge (AI Audits, Equity Partnerships, Websites, Complyr Beta)
- ✅ 2 Beispiel Lab Posts
- ✅ 1 "Now" Update

## Tabellen-Übersicht

### `lab_posts`
Blog-Style-Posts für /lab Seite
- Felder: `id`, `created_at`, `title`, `slug`, `preview`, `content`, `tags[]`, `published`
- RLS: Public kann nur `published = true` Posts lesen

### `availability_status`
Live Status-Anzeige auf Homepage
- Felder: `id`, `service_name`, `status`, `slots_available`, `updated_at`
- Status Options: `'available' | 'waitlist' | 'closed' | 'limited'`
- RLS: Public read-only

### `now_updates`
/now Seite - aktuelle Fokus-Updates
- Felder: `id`, `created_at`, `content`, `is_current`
- RLS: Public kann nur `is_current = true` Updates lesen

## Daten verwalten

### Option 1: Supabase Table Editor (Einfach)
```
https://app.supabase.com/project/xjgxtxtczdklrcoooekp/editor
```
- Klicke auf Tabelle (z.B. `availability_status`)
- "Insert row" für neue Einträge
- Klicke auf Zelle zum Bearbeiten

### Option 2: SQL Queries (Fortgeschritten)
```sql
-- Availability Status ändern
UPDATE availability_status
SET status = 'waitlist', slots_available = 0
WHERE service_name = 'AI Audits';

-- Neuer Lab Post
INSERT INTO lab_posts (title, slug, preview, content, tags, published)
VALUES (
  'My New Post',
  'my-new-post',
  'Short preview text',
  '# Full Markdown Content Here',
  ARRAY['Tag1', 'Tag2'],
  TRUE
);

-- Now Update ändern
UPDATE now_updates SET is_current = FALSE WHERE is_current = TRUE;
INSERT INTO now_updates (content, is_current)
VALUES ('New focus areas...', TRUE);
```

## Troubleshooting

### Website zeigt Mock Data
**Symptom:** Console Warning: "⚠️ Supabase not configured - using mock data"

**Lösung:**
1. Check `.env.local` hat korrekte Werte (bereits gesetzt)
2. Restart dev server: `npm run dev`
3. Check Browser Console für Errors

### "Row Level Security" Fehler
**Symptom:** "new row violates row-level security policy"

**Lösung:**
- Nutze Supabase Dashboard Table Editor (umgeht RLS)
- Oder: Disable RLS temporär für Admin-Zugriff (nicht empfohlen für Production)

### Schema Update nach Changes
```sql
-- Neue Spalte hinzufügen
ALTER TABLE lab_posts ADD COLUMN views INTEGER DEFAULT 0;

-- Index hinzufügen
CREATE INDEX idx_lab_posts_tags ON lab_posts USING GIN(tags);
```

## Nächste Schritte

Nach Schema-Setup:
1. ✅ Refresh Website - sollte jetzt echte Supabase-Daten anzeigen
2. ✅ Test: Availability Status in Supabase ändern → Homepage sollte sich nach 30s update
3. ✅ Test: Neuen Lab Post erstellen → sollte auf /lab erscheinen
4. ✅ Deploy to Vercel (ENV vars müssen dort auch gesetzt werden)
