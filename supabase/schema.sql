-- Florian Schatz Website - Supabase Schema
-- Run this in Supabase SQL Editor: https://app.supabase.com/project/xjgxtxtczdklrcoooekp/sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Lab Posts Table
CREATE TABLE IF NOT EXISTS lab_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  preview TEXT,
  content TEXT,
  tags TEXT[],
  published BOOLEAN DEFAULT FALSE
);

-- Availability Status Table
CREATE TABLE IF NOT EXISTS availability_status (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_name TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL CHECK (status IN ('available', 'waitlist', 'closed', 'limited')),
  slots_available INTEGER,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Now Updates Table
CREATE TABLE IF NOT EXISTS now_updates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  content TEXT NOT NULL,
  is_current BOOLEAN DEFAULT FALSE
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_lab_posts_published ON lab_posts(published);
CREATE INDEX IF NOT EXISTS idx_lab_posts_created_at ON lab_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_lab_posts_slug ON lab_posts(slug);
CREATE INDEX IF NOT EXISTS idx_now_updates_current ON now_updates(is_current);

-- Insert seed data for availability status
INSERT INTO availability_status (service_name, status, slots_available) VALUES
  ('AI Audits', 'available', 2),
  ('Equity Partnerships', 'available', NULL),
  ('Websites', 'waitlist', 0),
  ('Complyr Beta', 'limited', 10)
ON CONFLICT (service_name) DO NOTHING;

-- Insert sample lab post
INSERT INTO lab_posts (title, slug, preview, content, tags, published) VALUES
  (
    'Exploring Cursor Rules for AI-Assisted Development',
    'exploring-cursor-rules',
    'Deep dive into how AI coding assistants can be configured for maximum productivity while maintaining code quality.',
    '# Exploring Cursor Rules for AI-Assisted Development

This week I''ve been experimenting with Cursor Rules to optimize my AI-assisted development workflow. The key insight: **specificity beats generality** when it comes to AI instructions.

## What I Learned

1. **Context is King**: The more domain-specific context you provide, the better the output.
2. **Constraints Drive Quality**: Explicit constraints (TypeScript strict mode, specific libraries) reduce decision fatigue.
3. **Iteration Patterns**: Teaching the AI your preferred code review patterns saves time.

## Current Setup

```typescript
// Example rule structure
{
  "type": "architecture",
  "pattern": "Next.js App Router with Server Components",
  "constraints": ["TypeScript strict", "Tailwind CSS only", "No client-side routing"]
}
```

## Next Steps

Testing this on a real project (this website!) to see how it scales.

---

*Tags: AI, Development, Cursor, Productivity*',
    ARRAY['AI', 'Development', 'Tools', 'Productivity'],
    TRUE
  ),
  (
    'Building a Design System with Tailwind CSS v3',
    'building-design-system-tailwind',
    'Lessons learned from creating a production-ready design system with exact color specifications and mobile-first responsiveness.',
    '# Building a Design System with Tailwind CSS v3

Creating a design system is more than just picking colors - it''s about enforcing consistency and accessibility across an entire product.

## Key Decisions

### Color Philosophy
- **No Pure Black/White**: Using #0A0A0A and #FAFAFA instead for better readability
- **Semantic Naming**: `success`, `warning`, `info` instead of `green`, `yellow`, `blue`
- **WCAG AAA Compliance**: All text meets strict contrast ratios

### Component Architecture
Following Atomic Design principles:
- **Atoms**: Button, Badge, Input
- **Molecules**: Card (with composable parts)
- **Organisms**: Hero, FeaturedWork, AvailabilityBar

## Challenges

1. **Tailwind v4 Migration**: Had to roll back to v3 due to PostCSS plugin compatibility
2. **Mobile-First**: Every component designed for 320px first, then scaled up
3. **Animation Balance**: Subtle enough for professionalism, engaging enough for modern UX

## Results

- Lighthouse score: 98/100 (mobile)
- Full type safety with TypeScript
- Zero runtime CSS - all utilities purged in production

---

*Tags: Design Systems, Tailwind CSS, Frontend, UX*',
    ARRAY['Design', 'Tailwind', 'Frontend', 'UX'],
    TRUE
  )
ON CONFLICT (slug) DO NOTHING;

-- Insert sample "Now" update
INSERT INTO now_updates (content, is_current) VALUES
  (
    'Currently focusing on: Complyr Beta testing with 3 pilot customers • Building client websites with Next.js 14 • Exploring Cursor AI workflows for faster development • Reading "The Mom Test" for better customer discovery',
    TRUE
  )
ON CONFLICT DO NOTHING;

-- Enable Row Level Security (RLS)
ALTER TABLE lab_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE now_updates ENABLE ROW LEVEL SECURITY;

-- Public read access policies
CREATE POLICY "Public can read published lab posts" ON lab_posts
  FOR SELECT USING (published = TRUE);

CREATE POLICY "Public can read availability status" ON availability_status
  FOR SELECT USING (TRUE);

CREATE POLICY "Public can read current now updates" ON now_updates
  FOR SELECT USING (is_current = TRUE);

-- Note: For admin access, you'll need to create authentication policies
-- or use the Supabase dashboard for manual updates
