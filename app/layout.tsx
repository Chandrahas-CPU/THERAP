import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "THERAP AI | Your AI Therapist - Coming Soon",
  description:
    "Revolutionary AI-powered therapy sessions. Join the waitlist for personalized, accessible mental health support available 24/7.",
  keywords: "AI therapy, mental health, therapy app, AI therapist, mental wellness, online therapy",
  openGraph: {
    title: "THERAP AI | Your AI Therapist - Coming Soon",
    description:
      "Revolutionary AI-powered therapy sessions. Join the waitlist for personalized, accessible mental health support available 24/7.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "THERAP AI | Your AI Therapist - Coming Soon",
    description:
      "Revolutionary AI-powered therapy sessions. Join the waitlist for personalized, accessible mental health support available 24/7.",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Suspense fallback={null}>{children}</Suspense>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
