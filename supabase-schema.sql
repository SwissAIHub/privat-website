-- Florian Schatz Website - Supabase Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Table: lab_posts (for /lab Blog Feed)
CREATE TABLE IF NOT EXISTS lab_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  preview TEXT,
  content TEXT,
  tags TEXT[],
  published BOOLEAN DEFAULT false
);

-- Table: availability_status (Live Status Bar on Homepage)
CREATE TABLE IF NOT EXISTS availability_status (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_name TEXT NOT NULL UNIQUE,
  status TEXT CHECK (status IN ('available', 'waitlist', 'closed', 'limited')) NOT NULL,
  slots_available INTEGER,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Table: now_updates (Optional /now page)
CREATE TABLE IF NOT EXISTS now_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  content TEXT NOT NULL,
  is_current BOOLEAN DEFAULT false
);

-- Seed Data for availability_status
INSERT INTO availability_status (service_name, status, slots_available)
VALUES
  ('AI Audits', 'available', 2),
  ('Equity Partnerships', 'available', NULL),
  ('Websites', 'waitlist', 0),
  ('Complyr Beta', 'limited', 10)
ON CONFLICT (service_name) DO NOTHING;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_lab_posts_published ON lab_posts(published, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_lab_posts_slug ON lab_posts(slug);
CREATE INDEX IF NOT EXISTS idx_now_updates_current ON now_updates(is_current) WHERE is_current = true;

-- Row Level Security (RLS) Policies
-- Enable RLS on all tables
ALTER TABLE lab_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE now_updates ENABLE ROW LEVEL SECURITY;

-- Public read access for published lab posts
CREATE POLICY "Public can view published lab posts"
  ON lab_posts FOR SELECT
  USING (published = true);

-- Public read access for availability status
CREATE POLICY "Public can view availability status"
  ON availability_status FOR SELECT
  USING (true);

-- Public read access for current now updates
CREATE POLICY "Public can view current now updates"
  ON now_updates FOR SELECT
  USING (is_current = true);

-- Note: Admin write access should be configured via Supabase Dashboard
-- or with additional service_role policies
