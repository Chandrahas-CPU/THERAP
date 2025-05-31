import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client with comprehensive error handling
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Check if environment variables exist
  if (!supabaseUrl) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL environment variable is not set")
  }

  if (!supabaseAnonKey) {
    throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable is not set")
  }

  // Validate URL format
  try {
    new URL(supabaseUrl)
  } catch (error) {
    throw new Error(`Invalid NEXT_PUBLIC_SUPABASE_URL format: ${supabaseUrl}`)
  }

  // Validate that the URL looks like a Supabase URL
  if (!supabaseUrl.includes("supabase.co") && !supabaseUrl.includes("localhost")) {
    throw new Error(`NEXT_PUBLIC_SUPABASE_URL does not appear to be a valid Supabase URL: ${supabaseUrl}`)
  }

  try {
    return createClient(supabaseUrl, supabaseAnonKey)
  } catch (error) {
    throw new Error(`Failed to create Supabase client: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

export async function POST(request: NextRequest) {
  try {
    // Initialize Supabase client
    let supabase
    try {
      supabase = getSupabaseClient()
    } catch (error) {
      console.error("Supabase configuration error:", error)
      return NextResponse.json(
        {
          error: "Database configuration error. Please check environment variables.",
        },
        { status: 500 },
      )
    }

    // Parse request body
    let body
    try {
      body = await request.json()
    } catch (error) {
      return NextResponse.json({ error: "Invalid JSON in request body" }, { status: 400 })
    }

    const { name, email } = body

    // Validate required fields
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from("waitlist")
      .insert([
        {
          name: name || null,
          email: email.toLowerCase(),
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Supabase error:", error)

      // Handle unique constraint violation (duplicate email)
      if (error.code === "23505") {
        return NextResponse.json({ error: "Email already registered" }, { status: 409 })
      }

      // Handle table doesn't exist error
      if (error.code === "42P01") {
        return NextResponse.json(
          {
            error: "Database table not found. Please contact support.",
          },
          { status: 500 },
        )
      }

      return NextResponse.json(
        {
          error: "Failed to save to database. Please try again.",
        },
        { status: 500 },
      )
    }

    console.log("New waitlist entry:", data)

    return NextResponse.json(
      {
        message: "Successfully added to waitlist",
        id: data.id,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Unexpected error in waitlist API:", error)
    return NextResponse.json(
      {
        error: "Internal server error. Please try again later.",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    // Initialize Supabase client
    let supabase
    try {
      supabase = getSupabaseClient()
    } catch (error) {
      console.error("Supabase configuration error:", error)
      return NextResponse.json(
        {
          error: "Database configuration error. Please check environment variables.",
        },
        { status: 500 },
      )
    }

    // Get all entries with count
    const {
      data: entries,
      error,
      count,
    } = await supabase.from("waitlist").select("*", { count: "exact" }).order("created_at", { ascending: false })

    if (error) {
      console.error("Supabase error:", error)

      // Handle table doesn't exist error
      if (error.code === "42P01") {
        return NextResponse.json(
          {
            error: "Database table not found. Please contact support.",
          },
          { status: 500 },
        )
      }

      return NextResponse.json(
        {
          error: "Failed to fetch data from database.",
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      total: count || 0,
      entries: entries || [],
      latest: entries && entries.length > 0 ? entries[0].created_at : null,
    })
  } catch (error) {
    console.error("Unexpected error in waitlist GET API:", error)
    return NextResponse.json(
      {
        error: "Internal server error. Please try again later.",
      },
      { status: 500 },
    )
  }
}
