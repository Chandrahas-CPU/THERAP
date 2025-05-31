import { NextResponse } from "next/server"

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  const health = {
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: {
      hasSupabaseUrl: !!supabaseUrl,
      hasSupabaseKey: !!supabaseAnonKey,
      supabaseUrlFormat: supabaseUrl ? "present" : "missing",
      supabaseUrlValid: false,
    },
  }

  // Check URL validity without exposing the actual URL
  if (supabaseUrl) {
    try {
      new URL(supabaseUrl)
      health.environment.supabaseUrlValid = true
    } catch (error) {
      health.environment.supabaseUrlValid = false
    }
  }

  return NextResponse.json(health)
}
