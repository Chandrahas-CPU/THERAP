import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

export const metadata = {
  title: "THERAP - Your AI Therapist, Available 24/7",
  description: "AI-powered voice therapy for everyone. Accessible, affordable, and available 24/7.",
  generator: "v0.dev",
}
