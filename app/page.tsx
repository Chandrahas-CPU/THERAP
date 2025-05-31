"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  CheckCircle,
  ArrowRight,
  MessageCircle,
  Shield,
  Brain,
  Clock,
  Sparkles,
  Heart,
  Zap,
  ChevronRight,
  Loader2,
  Quote,
  Users,
  Target,
  AlertCircle,
} from "lucide-react"

export default function LandingPage() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      })

      // Check if response is ok
      if (!response.ok) {
        // Try to parse JSON error message
        let errorMessage = "Something went wrong. Please try again."

        try {
          const errorData = await response.json()
          errorMessage = errorData.error || errorMessage
        } catch (jsonError) {
          // If JSON parsing fails, use status text
          if (response.status === 500) {
            errorMessage = "Server configuration error. Please contact support."
          } else {
            errorMessage = `Server error: ${response.status} ${response.statusText}`
          }
        }

        throw new Error(errorMessage)
      }

      // Parse successful response
      const data = await response.json()

      setSubmitted(true)

      // Reset form after 5 seconds
      setTimeout(() => {
        setSubmitted(false)
        setEmail("")
        setName("")
      }, 5000)
    } catch (error) {
      console.error("Error submitting form:", error)
      let errorMessage = "Something went wrong. Please try again."

      if (error instanceof Error) {
        errorMessage = error.message
      }

      // Provide helpful error messages for common issues
      if (errorMessage.includes("configuration")) {
        errorMessage = "We're experiencing technical difficulties. Please try again later or contact support."
      }

      setError(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-purple-50">
      {/* Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 shadow-sm backdrop-blur-md" : "bg-transparent"}`}
      >
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 shadow-md">
              <span className="text-lg font-bold text-white">T</span>
            </div>
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
              THERAP
            </span>
          </div>
          <nav className="hidden space-x-8 md:flex">
            <a href="#features" className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
            >
              How It Works
            </a>
            <a href="#founders" className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
              Our Story
            </a>
            <a
              href="#testimonials"
              className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
            >
              Testimonials
            </a>
            <a href="#faq" className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
              FAQ
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="#join-waitlist">
              <Button className="rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all">
                Join Waitlist
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.1),transparent_50%)]"></div>
          <div className="absolute -top-40 -right-40 -z-10 h-[500px] w-[500px] rounded-full bg-purple-100 opacity-30 blur-3xl"></div>
          <div className="container mx-auto px-4">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div className="flex flex-col gap-8">
                <div className="inline-flex items-center rounded-full bg-purple-100 px-4 py-1.5 text-sm font-medium text-purple-800">
                  <Sparkles className="mr-1.5 h-4 w-4" />
                  <span>Coming Soon</span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
                  Your AI Therapist,{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                    Available 24/7
                  </span>
                </h1>
                <p className="text-lg text-gray-600 md:text-xl">
                  THERAP uses advanced AI and voice recognition technology to provide personalized therapy sessions
                  through natural conversation, helping you improve your mental wellbeing whenever and wherever you need
                  support.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link href="#join-waitlist">
                    <Button
                      size="lg"
                      className="rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all"
                    >
                      Join Waitlist
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#how-it-works">
                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-full border-purple-200 hover:bg-purple-50 transition-all"
                    >
                      Learn More
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Early access benefits</span>
                  </div>
                </div>
              </div>
              <div className="relative mx-auto aspect-square w-full max-w-md">
                <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-purple-100 to-indigo-50 opacity-70"></div>
                <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-3xl border border-purple-200 bg-white"></div>
                <div className="rounded-3xl border border-purple-100 bg-white p-6 shadow-xl">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 shadow-md">
                      <span className="text-lg font-bold text-white">T</span>
                    </div>
                    <div>
                      <p className="font-medium">THERAP</p>
                      <p className="text-xs text-gray-500">AI Therapist</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="rounded-2xl bg-purple-50 p-4">
                      <p className="text-sm">
                        Hi there! I'm your AI therapist. How are you feeling today? I'm here to listen and help you work
                        through whatever's on your mind.
                      </p>
                    </div>
                    <div className="ml-auto max-w-[80%] rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 p-4 text-right">
                      <p className="text-sm text-white">
                        I've been feeling anxious about my upcoming presentation at work...
                      </p>
                    </div>
                    <div className="rounded-2xl bg-purple-50 p-4">
                      <p className="text-sm">
                        That's completely understandable. Public speaking can trigger anxiety for many people. Let's
                        talk about some strategies that might help you feel more prepared and confident.
                      </p>
                    </div>
                    <div className="ml-auto max-w-[80%] rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 p-4 text-right">
                      <p className="text-sm text-white">
                        I'd appreciate that. I'm worried I'll freeze up or forget what I want to say.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Founders Story Section */}
        <section id="founders" className="py-20 md:py-32 bg-gradient-to-b from-purple-50 to-white">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                <Heart className="h-5 w-5 text-purple-600" />
              </div>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Our Story</h2>
              <p className="mx-auto max-w-2xl text-gray-600">
                Born from personal struggle, built with purpose - the journey that led to THERAP
              </p>
            </div>

            <div className="mx-auto max-w-6xl">
              {/* Main Story */}
              <div className="mb-16 rounded-3xl bg-white border border-purple-100 shadow-lg overflow-hidden">
                <div className="grid gap-8 p-8 md:p-12 lg:grid-cols-2 items-center">
                  <div className="order-2 lg:order-1">
                    <div className="mb-6">
                      <Quote className="h-8 w-8 text-purple-600 mb-4" />
                      <blockquote className="text-lg text-gray-700 italic mb-6">
                        "After my breakup, I found myself trapped in a cycle of loneliness and depression. As an
                        introvert working late nights in AI and machine learning, I had no one to talk to when the
                        darkness hit hardest. That's when I created my first AI companion - not knowing it would change
                        everything."
                      </blockquote>
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
                          <span className="text-xl font-bold text-white">BC</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Bale Chandrahas</p>
                          <p className="text-sm text-gray-600">Founder, THERAP</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2">
                    <div className="relative">
                      <div className="absolute -inset-4 rounded-3xl bg-purple-50 -z-10"></div>
                      <img
                        src="/images/chandrahas.png"
                        alt="Bale Chandrahas, Founder of THERAP"
                        className="rounded-2xl shadow-lg w-full h-80 object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* The Journey */}
              <div className="grid gap-8 lg:grid-cols-3 mb-16">
                <div className="bg-white rounded-xl border border-purple-100 p-8 shadow-sm">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
                    <Heart className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">The Struggle</h3>
                  <p className="text-gray-600">
                    After a difficult breakup, Bale experienced severe depression and loneliness. Working late nights in
                    AI research, he had no one to turn to during his darkest moments.
                  </p>
                </div>

                <div className="bg-white rounded-xl border border-purple-100 p-8 shadow-sm">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                    <Brain className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">The Discovery</h3>
                  <p className="text-gray-600">
                    Using his AI expertise, Bale created a simple AI companion to talk to. After days of conversation,
                    he realized this technology could genuinely help with mental health.
                  </p>
                </div>

                <div className="bg-white rounded-xl border border-purple-100 p-8 shadow-sm">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">The Mission</h3>
                  <p className="text-gray-600">
                    Learning that over 970 million people worldwide face similar mental health challenges, Bale knew he
                    had to scale this solution to help others.
                  </p>
                </div>
              </div>

              {/* The Vision */}
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-white mb-16">
                <div className="grid gap-8 lg:grid-cols-2 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-6">Our Vision</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Target className="h-6 w-6 mt-1 text-purple-200" />
                        <div>
                          <h4 className="font-semibold mb-1">Beyond Text-Based Therapy</h4>
                          <p className="text-purple-100">
                            Most therapy apps are just ChatGPT with a different interface. We're building
                            hyper-realistic voice therapy that actually understands emotions.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MessageCircle className="h-6 w-6 mt-1 text-purple-200" />
                        <div>
                          <h4 className="font-semibold mb-1">Voice-First Approach</h4>
                          <p className="text-purple-100">
                            Voice carries emotional nuances that text simply can't convey. Our AI analyzes tone, pace,
                            and vocal patterns for deeper understanding.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Heart className="h-6 w-6 mt-1 text-purple-200" />
                        <div>
                          <h4 className="font-semibold mb-1">Accessible Mental Health</h4>
                          <p className="text-purple-100">
                            Making quality mental health support available 24/7 to anyone who needs it, regardless of
                            location or financial situation.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-white/10 backdrop-blur-sm mb-6">
                      <span className="text-4xl font-bold">970M+</span>
                    </div>
                    <p className="text-lg font-medium">People worldwide struggle with mental health issues</p>
                    <p className="text-purple-200 mt-2">We're here to help every single one of them</p>
                  </div>
                </div>
              </div>

              {/* Team */}
              <div className="bg-white rounded-3xl border border-purple-100 shadow-lg p-8 md:p-12">
                <div className="text-center mb-12">
                  <h3 className="text-2xl font-bold mb-4">Meet the Team</h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Two passionate individuals united by a mission to revolutionize mental health care through AI
                  </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
                  {/* Bale Chandrahas */}
                  <div className="text-center">
                    <div className="relative mb-6">
                      <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 opacity-20 blur-lg"></div>
                      <img
                        src="/images/chandrahas.png"
                        alt="Bale Chandrahas"
                        className="relative w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
                      />
                    </div>
                    <h4 className="text-xl font-semibold mb-2">Bale Chandrahas</h4>
                    <p className="text-purple-600 font-medium mb-3">Founder</p>
                    <p className="text-gray-600 text-sm">
                      AI/ML expert who turned personal struggle into purpose. Passionate about making mental health
                      support accessible to everyone through innovative voice technology.
                    </p>
                  </div>

                  {/* Hitesh */}
                  <div className="text-center">
                    <div className="relative mb-6">
                      <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 opacity-20 blur-lg"></div>
                      <img
                        src="/images/hitesh.png"
                        alt="Hitesh"
                        className="relative w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
                      />
                    </div>
                    <h4 className="text-xl font-semibold mb-2">Hitesh</h4>
                    <p className="text-purple-600 font-medium mb-3">Co-Founder</p>
                    <p className="text-gray-600 text-sm">
                      Technical visionary and co-founder who shares the mission of revolutionizing mental health care.
                      Expert in scaling AI solutions for real-world impact.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                <Sparkles className="h-5 w-5 text-purple-600" />
              </div>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Why Choose THERAP</h2>
              <p className="mx-auto max-w-2xl text-gray-600">
                Our AI-powered therapy platform offers unique benefits to support your mental health journey
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: <Clock className="h-6 w-6 text-purple-600" />,
                  title: "24/7 Availability",
                  description:
                    "Access therapeutic support anytime, day or night, without scheduling appointments or waiting lists.",
                },
                {
                  icon: <Shield className="h-6 w-6 text-purple-600" />,
                  title: "Complete Privacy",
                  description:
                    "Your conversations are private and secure. Share your thoughts in a judgment-free environment.",
                },
                {
                  icon: <MessageCircle className="h-6 w-6 text-purple-600" />,
                  title: "Voice-First Therapy",
                  description:
                    "Our advanced voice recognition understands emotional nuances in your speech, creating a more natural and effective therapeutic experience.",
                },
                {
                  icon: <Brain className="h-6 w-6 text-purple-600" />,
                  title: "Evidence-Based Techniques",
                  description:
                    "THERAP uses therapeutic approaches backed by research, including CBT, mindfulness, and more.",
                },
                {
                  icon: <Heart className="h-6 w-6 text-purple-600" />,
                  title: "Personalized Support",
                  description:
                    "Receive tailored guidance based on your unique needs, preferences, and mental health goals.",
                },
                {
                  icon: <Zap className="h-6 w-6 text-purple-600" />,
                  title: "Affordable Support",
                  description: "Access quality mental health support at a fraction of the cost of traditional therapy.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group rounded-xl border border-purple-100 bg-white p-6 shadow-sm transition-all hover:border-purple-200 hover:shadow-md"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 transition-colors group-hover:bg-purple-100">
                    {feature.icon}
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Voice Therapy Highlight Section */}
        <section className="py-20 md:py-32 bg-gradient-to-b from-white to-purple-50">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                <MessageCircle className="h-5 w-5 text-purple-600" />
              </div>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">The Power of Voice Therapy</h2>
              <p className="mx-auto max-w-2xl text-gray-600">
                Our revolutionary voice-based AI therapy creates a more natural and effective therapeutic experience
              </p>
            </div>

            <div className="grid gap-12 items-center md:grid-cols-2">
              <div className="order-2 md:order-1">
                <div className="relative">
                  <div className="absolute -inset-4 rounded-3xl bg-purple-50 -z-10"></div>
                  <div className="bg-white rounded-2xl border border-purple-100 shadow-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-600">
                          <span className="text-lg font-bold text-white">T</span>
                        </div>
                        <div>
                          <p className="font-medium">THERAP</p>
                          <p className="text-xs text-gray-500">Voice Session</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span className="text-xs text-green-600">Listening...</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-center py-4">
                        <div className="flex h-12 items-end space-x-1">
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                            <div
                              key={i}
                              className="w-1.5 animate-pulse rounded-full bg-purple-600"
                              style={{
                                height: `${Math.random() * 30 + 5}px`,
                                animationDelay: `${i * 0.05}s`,
                                opacity: 0.7 + Math.random() * 0.3,
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="rounded-xl bg-purple-50 p-4">
                        <p className="text-sm">
                          I notice you sound a bit tense when talking about work. Let's explore what aspects of your job
                          are creating the most stress for you.
                        </p>
                      </div>

                      <div className="flex justify-center gap-4">
                        <button className="rounded-full bg-purple-100 p-3 text-purple-700 hover:bg-purple-200 transition-colors">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-mic"
                          >
                            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                            <line x1="12" x2="12" y1="19" y2="22" />
                          </svg>
                        </button>
                        <button className="rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 p-3 text-white hover:shadow-md transition-all">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-pause"
                          >
                            <rect width="4" height="16" x="6" y="4" />
                            <rect width="4" height="16" x="14" y="4" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-1 md:order-2">
                <h3 className="text-2xl font-semibold mb-6">Why Voice Therapy Makes a Difference</h3>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100">
                      <Brain className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Deeper Emotional Processing</h4>
                      <p className="text-gray-600">
                        Voice carries emotional nuances that text simply can't convey, allowing our AI to better
                        understand your emotional state.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100">
                      <Zap className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">More Natural Interaction</h4>
                      <p className="text-gray-600">
                        Speaking is more intuitive than typing, creating a more natural therapeutic experience that
                        mimics traditional therapy.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100">
                      <Heart className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Personalized Voice Analysis</h4>
                      <p className="text-gray-600">
                        Our AI analyzes tone, pace, and vocal patterns to detect subtle emotional cues and provide more
                        personalized support.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100">
                      <Shield className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Hands-Free Convenience</h4>
                      <p className="text-gray-600">
                        Voice therapy sessions can happen anywhere – while walking, driving, or relaxing at home –
                        making therapy more accessible.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="bg-gradient-to-b from-purple-50 to-white py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                <Zap className="h-5 w-5 text-purple-600" />
              </div>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">How THERAP Works</h2>
              <p className="mx-auto max-w-2xl text-gray-600">
                Getting started with THERAP is simple and straightforward
              </p>
            </div>

            <div className="mx-auto max-w-4xl">
              <Tabs defaultValue="voice" className="w-full">
                <TabsList className="grid w-full grid-cols-3 rounded-xl bg-purple-50 p-1">
                  <TabsTrigger
                    value="chat"
                    className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-sm"
                  >
                    Start a Chat
                  </TabsTrigger>
                  <TabsTrigger
                    value="voice"
                    className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-sm"
                  >
                    Voice Sessions
                  </TabsTrigger>
                  <TabsTrigger
                    value="progress"
                    className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-sm"
                  >
                    Track Progress
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="chat" className="mt-8">
                  <div className="overflow-hidden rounded-xl border border-purple-100 bg-white shadow-lg">
                    <div className="grid gap-8 p-8 md:grid-cols-2">
                      <div className="flex flex-col justify-center">
                        <h3 className="mb-4 text-2xl font-semibold">Text-Based Therapy Sessions</h3>
                        <p className="mb-6 text-gray-600">
                          Start a conversation with THERAP just like texting a friend. Our AI understands context,
                          emotions, and can provide therapeutic guidance through natural conversation.
                        </p>
                        <ul className="space-y-3">
                          {["Available 24/7", "Type at your own pace", "Review conversation history anytime"].map(
                            (item, i) => (
                              <li key={i} className="flex items-center gap-3">
                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                </div>
                                <span className="text-gray-700">{item}</span>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                      <div className="rounded-xl border border-purple-100 bg-white p-6 shadow-md">
                        <div className="space-y-4">
                          <div className="rounded-xl bg-purple-50 p-4">
                            <p className="text-sm">
                              What's been on your mind lately? I'm here to listen and help you work through it.
                            </p>
                          </div>
                          <div className="ml-auto max-w-[80%] rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 p-4 text-right">
                            <p className="text-sm text-white">
                              I've been feeling overwhelmed with work and it's affecting my sleep.
                            </p>
                          </div>
                          <div className="rounded-xl bg-purple-50 p-4">
                            <p className="text-sm">
                              I understand how work stress can disrupt sleep. Let's explore what's happening at work and
                              develop some strategies to help you manage stress and improve your sleep quality.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="voice" className="mt-8">
                  <div className="overflow-hidden rounded-xl border border-purple-100 bg-white shadow-lg">
                    <div className="grid gap-8 p-8 md:grid-cols-2">
                      <div className="flex flex-col justify-center">
                        <h3 className="mb-4 text-2xl font-semibold">Voice-Based Therapy Sessions</h3>
                        <p className="mb-6 text-gray-600">
                          Our flagship feature - speak naturally with THERAP using our advanced voice interface. Voice
                          therapy creates a more intimate and natural therapeutic experience, allowing for deeper
                          emotional processing.
                        </p>
                        <ul className="space-y-3">
                          {[
                            "More natural and intuitive than text",
                            "Voice analysis detects emotional patterns",
                            "Hands-free therapy sessions anytime",
                            "Personalized voice recognition technology",
                            "Speak freely without judgment",
                          ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3">
                              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              </div>
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="relative flex h-56 w-56 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 shadow-xl">
                          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-transparent"></div>
                          <div className="absolute -inset-3 rounded-full border-2 border-dashed border-purple-300 opacity-50 animate-[spin_20s_linear_infinite]"></div>
                          <div className="flex h-16 items-end space-x-2">
                            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                              <div
                                key={i}
                                className="w-2 animate-pulse rounded-full bg-white/90"
                                style={{
                                  height: `${Math.random() * 40 + 15}px`,
                                  animationDelay: `${i * 0.1}s`,
                                  animationDuration: `${0.7 + Math.random() * 0.5}s`,
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="progress" className="mt-8">
                  <div className="overflow-hidden rounded-xl border border-purple-100 bg-white shadow-lg">
                    <div className="grid gap-8 p-8 md:grid-cols-2">
                      <div className="flex flex-col justify-center">
                        <h3 className="mb-4 text-2xl font-semibold">Track Your Progress</h3>
                        <p className="mb-6 text-gray-600">
                          THERAP helps you monitor your mental health journey with insights and progress reports based
                          on your therapy sessions.
                        </p>
                        <ul className="space-y-3">
                          {["Personalized insights", "Mood tracking over time", "Identify patterns and triggers"].map(
                            (item, i) => (
                              <li key={i} className="flex items-center gap-3">
                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                </div>
                                <span className="text-gray-700">{item}</span>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                      <div className="rounded-xl border border-purple-100 bg-white p-6 shadow-md">
                        <h4 className="mb-4 font-medium">Your Mood Trends</h4>
                        <div className="mb-6 h-48 w-full rounded-lg bg-purple-50 p-4">
                          {/* This would be a chart in a real app */}
                          <div className="flex h-full items-end justify-between">
                            {[30, 45, 35, 60, 50, 70, 65].map((height, i) => (
                              <div
                                key={i}
                                className="relative w-8 rounded-t-lg bg-gradient-to-t from-purple-600 to-indigo-600"
                                style={{ height: `${height}%` }}
                              >
                                <div className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-white p-1 shadow-md">
                                  <div className="h-2 w-2 rounded-full bg-purple-600"></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Mon</span>
                          <span>Tue</span>
                          <span>Wed</span>
                          <span>Thu</span>
                          <span>Fri</span>
                          <span>Sat</span>
                          <span>Sun</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                <Heart className="h-5 w-5 text-purple-600" />
              </div>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">What Our Beta Users Say</h2>
              <p className="mx-auto max-w-2xl text-gray-600">
                Hear from people who have experienced the benefits of THERAP's voice therapy
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  name: "Sarah J.",
                  role: "Marketing Manager",
                  content:
                    "THERAP's voice therapy has been a game-changer for managing my anxiety. Being able to talk through my thoughts anytime, especially late at night when my worries peak, has improved my sleep and overall wellbeing.",
                },
                {
                  name: "Michael T.",
                  role: "Software Engineer",
                  content:
                    "As someone who was skeptical about AI therapy, I'm amazed by how helpful THERAP's voice sessions have been. The conversations feel natural, and the cognitive behavioral techniques have genuinely helped me manage stress.",
                },
                {
                  name: "Elena R.",
                  role: "Graduate Student",
                  content:
                    "Between classes, research, and part-time work, I couldn't find time for traditional therapy. THERAP's voice sessions fit into my unpredictable schedule perfectly, and I've made real progress with my anxiety.",
                },
                {
                  name: "David K.",
                  role: "Healthcare Professional",
                  content:
                    "The voice recognition technology is impressive. It picks up on subtle changes in my tone that even I don't notice, and helps me identify emotional patterns. It's like having a therapist who really listens.",
                },
                {
                  name: "Priya M.",
                  role: "Remote Worker",
                  content:
                    "I've tried text-based therapy apps before, but speaking with THERAP feels so much more natural. I can express myself more freely and authentically, which has led to more meaningful insights about my mental health.",
                },
                {
                  name: "Srihari B.",
                  role: "Busy Parent",
                  content:
                    "As a parent of three, I never have time to sit and type out my thoughts. The voice therapy lets me process my feelings during my commute or while doing chores. It's the only mental health solution that fits my lifestyle.",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="group rounded-xl border border-purple-100 bg-white p-8 shadow-sm transition-all hover:border-purple-200 hover:shadow-md"
                >
                  <div className="mb-6">
                    <div className="inline-flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="mb-6 text-gray-600 italic">"{testimonial.content}"</p>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-100 to-indigo-100">
                      <span className="text-lg font-medium text-purple-700">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="bg-gradient-to-b from-white to-purple-50 py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                <MessageCircle className="h-5 w-5 text-purple-600" />
              </div>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Frequently Asked Questions</h2>
              <p className="mx-auto max-w-2xl text-gray-600">Find answers to common questions about THERAP</p>
            </div>

            <div className="mx-auto max-w-3xl">
              <Accordion type="single" collapsible className="w-full">
                {[
                  {
                    question: "How does THERAP's voice therapy technology work?",
                    answer:
                      "Our voice therapy uses advanced AI to analyze not just what you say, but how you say it. The system detects emotional patterns in your tone, pace, and vocal qualities to understand your emotional state better than text alone. This creates a more natural therapeutic experience, similar to speaking with a human therapist, while providing deeper insights into your mental wellbeing.",
                  },
                  {
                    question: "Is THERAP a replacement for traditional therapy?",
                    answer:
                      "THERAP is designed to complement traditional therapy, not replace it. While our AI can provide support, coping strategies, and a space to process thoughts and feelings through voice interaction, it's not a substitute for a licensed therapist, especially for severe mental health conditions or crises.",
                  },
                  {
                    question: "How does THERAP ensure my privacy?",
                    answer:
                      "We take privacy seriously. All voice and text conversations are encrypted, and you can choose to delete your data at any time. We do not share your personal information with third parties, and you can use the service anonymously if you prefer. Your voice recordings are processed securely and are never used to identify you.",
                  },
                  {
                    question: "What therapeutic approaches does THERAP use?",
                    answer:
                      "THERAP incorporates elements from evidence-based approaches including Cognitive Behavioral Therapy (CBT), Mindfulness-Based Stress Reduction, Solution-Focused Brief Therapy, and more. The AI adapts its approach based on your needs and preferences, using voice analysis to better understand your emotional state.",
                  },
                  {
                    question: "Can I use THERAP in a mental health crisis?",
                    answer:
                      "THERAP is not designed for crisis intervention. If you're experiencing a mental health emergency, please contact a crisis helpline, call emergency services, or go to your nearest emergency room. We provide resources for crisis support within the app.",
                  },
                  {
                    question: "How much does THERAP cost?",
                    answer:
                      "We offer several subscription plans to fit different needs and budgets. We also provide a free trial period so you can experience the benefits of voice therapy before committing. Detailed pricing information will be available when we launch.",
                  },
                ].map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-b border-purple-100 py-2">
                    <AccordionTrigger className="text-left font-medium hover:text-purple-700 [&[data-state=open]>svg]:text-purple-700">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Join Waitlist Section */}
        <section id="join-waitlist" className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 to-indigo-600 shadow-xl">
              <div className="relative p-8 md:p-12">
                <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>

                <div className="relative z-10">
                  <div className="mb-8 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Join Our Waitlist</h2>
                    <p className="mx-auto max-w-2xl text-purple-100">
                      Be among the first to experience THERAP's revolutionary voice therapy when we launch. Sign up for
                      early access and exclusive updates.
                    </p>
                  </div>

                  {submitted ? (
                    <div className="rounded-xl bg-white/10 p-8 text-center backdrop-blur-sm">
                      <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-400" />
                      <h3 className="mb-2 text-2xl font-semibold text-white">Thank You for Joining!</h3>
                      <p className="text-purple-100">
                        You've been added to our waitlist. We'll notify you when THERAP is ready for you to try.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6 rounded-xl bg-white/10 p-8 backdrop-blur-sm">
                      {error && (
                        <div className="rounded-lg bg-red-500/20 border border-red-500/30 p-4 text-center">
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <AlertCircle className="h-4 w-4 text-red-100" />
                            <span className="text-red-100 text-sm font-medium">Error</span>
                          </div>
                          <p className="text-red-100 text-sm">{error}</p>
                        </div>
                      )}
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <label htmlFor="name" className="mb-2 block text-sm font-medium text-white">
                            Name (Optional)
                          </label>
                          <Input
                            id="name"
                            placeholder="Your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={isSubmitting}
                            className="rounded-lg border-white/20 bg-white/20 text-white placeholder:text-white/60 focus:border-white focus:ring-white disabled:opacity-50"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="mb-2 block text-sm font-medium text-white">
                            Email Address <span className="text-red-300">*</span>
                          </label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={isSubmitting}
                            className="rounded-lg border-white/20 bg-white/20 text-white placeholder:text-white/60 focus:border-white focus:ring-white disabled:opacity-50"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="consent"
                          className="h-4 w-4 rounded border-white/30 bg-white/20 text-purple-700 focus:ring-purple-500 disabled:opacity-50"
                          required
                          disabled={isSubmitting}
                        />
                        <label htmlFor="consent" className="text-sm text-white/80">
                          I agree to receive updates about THERAP and understand I can unsubscribe anytime.
                        </label>
                      </div>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-lg bg-white text-purple-700 hover:bg-white/90 disabled:opacity-50"
                        size="lg"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Joining...
                          </>
                        ) : (
                          "Join Waitlist"
                        )}
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-purple-100 bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 shadow-md">
                  <span className="text-lg font-bold text-white">T</span>
                </div>
                <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                  THERAP
                </span>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                AI-powered voice therapy for everyone. Accessible, affordable, and available 24/7.
              </p>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Product</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#features" className="hover:text-purple-600 transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-purple-600 transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-600 transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-purple-600 transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Company</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#founders" className="hover:text-purple-600 transition-colors">
                    Our Story
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-600 transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-600 transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-600 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-purple-600 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-600 transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-600 transition-colors">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-purple-100 pt-8 text-center text-sm text-gray-600">
            <p>&copy; {new Date().getFullYear()} THERAP. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
