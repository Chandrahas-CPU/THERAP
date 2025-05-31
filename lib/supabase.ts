import { createClient } from "@supabase/supabase-js"

// Get environment variables with comprehensive validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Validate environment variables
if (!supabaseUrl) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable")
}

if (!supabaseAnonKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable")
}

// Validate URL format if it exists
if (supabaseUrl) {
  try {
    new URL(supabaseUrl)
  } catch (error) {
    console.error("Invalid NEXT_PUBLIC_SUPABASE_URL format:", supabaseUrl)
  }
}

// Create client only if we have valid environment variables
let supabase: ReturnType<typeof createClient> | null = null

if (supabaseUrl && supabaseAnonKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey)
  } catch (error) {
    console.error("Failed to create Supabase client:", error)
  }
}

export { supabase }

// Types for our database
export interface WaitlistEntry {
  id: string
  name: string | null
  email: string
  created_at: string
  updated_at?: string
}
