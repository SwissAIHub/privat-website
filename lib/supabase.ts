import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Only create client if BOTH credentials exist and are valid URLs
export const supabase =
  supabaseUrl &&
  supabaseKey &&
  (supabaseUrl.startsWith('http://') || supabaseUrl.startsWith('https://'))
    ? createClient(supabaseUrl, supabaseKey)
    : null

// Helper to check if Supabase is configured
export const isSupabaseConfigured = () => !!supabase

// Types for our tables
export interface LabPost {
  id: string
  created_at: string
  title: string
  slug: string
  preview: string | null
  content: string | null
  tags: string[] | null
  published: boolean
}

export interface AvailabilityStatus {
  id: string
  service_name: string
  status: 'available' | 'waitlist' | 'closed' | 'limited'
  slots_available: number | null
  updated_at: string
}

export interface NowUpdate {
  id: string
  created_at: string
  content: string
  is_current: boolean
}
