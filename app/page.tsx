"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Brain, Shield, Clock, Users, Star, ArrowRight, Mail } from "lucide-react"
import { motion } from "framer-motion"

export default function LandingPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitted(true)
    setIsLoading(false)
    setEmail("")
  }

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Therapy",
      description: "Advanced AI technology provides personalized therapy sessions tailored to your unique needs.",
    },
    {
      icon: Shield,
      title: "100% Private & Secure",
      description: "Your conversations are encrypted and completely confidential. Your privacy is our priority.",
    },
    {
      icon: Clock,
      title: "Available 24/7",
      description: "Get support whenever you need it. No appointments necessary, just instant access to care.",
    },
    {
      icon: Users,
      title: "Evidence-Based",
      description: "Built on proven therapeutic techniques like CBT, DBT, and mindfulness practices.",
    },
  ]

  const testimonials = [
    {
      name: "Sarah M.",
      role: "Beta User",
      content:
        "THERAP has been a game-changer for my mental health journey. Having access to therapy 24/7 has made all the difference.",
      rating: 5,
    },
    {
      name: "Michael R.",
      role: "Early Adopter",
      content:
        "The AI feels incredibly human and understanding. It's like having a therapist in my pocket whenever I need support.",
      rating: 5,
    },
    {
      name: "Emma L.",
      role: "Beta Tester",
      content:
        "I was skeptical at first, but THERAP has helped me develop coping strategies that actually work in my daily life.",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <span className="text-lg font-bold text-primary-foreground">T</span>
            </div>
            <span className="text-xl font-bold">THERAP</span>
          </div>
          <Badge variant="secondary" className="hidden sm:flex">
            Coming Soon
          </Badge>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge variant="outline" className="mb-4">
              🚀 Launching Soon
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Your AI Therapist is
              <span className="block text-primary">Almost Here</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Experience personalized, accessible mental health support powered by advanced AI. Get therapy sessions
              whenever you need them, completely private and secure.
            </p>
          </motion.div>

          {/* Waitlist Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-10 max-w-md"
          >
            {isSubmitted ? (
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="flex items-center justify-center gap-2 p-6">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <p className="text-primary font-medium">You're on the waitlist! We'll be in touch soon.</p>
                </CardContent>
              </Card>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                  required
                />
                <Button type="submit" disabled={isLoading} className="sm:w-auto">
                  {isLoading ? (
                    "Joining..."
                  ) : (
                    <>
                      Join Waitlist
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            )}
            <p className="mt-3 text-sm text-muted-foreground">
              Join <strong>2,847</strong> people already on the waitlist
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold sm:text-4xl">Why Choose THERAP?</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Revolutionary AI therapy that adapts to your unique needs
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold sm:text-4xl">What Beta Users Say</h2>
          <p className="mt-4 text-lg text-muted-foreground">Early feedback from our beta testing community</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <CardDescription className="text-base italic">"{testimonial.content}"</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Mental Health?</h2>
            <p className="text-lg mb-6 opacity-90">
              Be among the first to experience the future of therapy. Join our waitlist today.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm opacity-75">
              <Mail className="h-4 w-4" />
              <span>We'll notify you as soon as we launch</span>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary">
              <span className="text-sm font-bold text-primary-foreground">T</span>
            </div>
            <span className="font-bold">THERAP</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2025 THERAP. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
