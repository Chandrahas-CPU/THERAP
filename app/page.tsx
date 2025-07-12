"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowRight, Loader2, AlertCircle, MessageCircle, Menu } from "lucide-react"

export default function LandingPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

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
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        let errorMessage = "Something went wrong. Please try again."
        try {
          const errorData = await response.json()
          errorMessage = errorData.error || errorMessage
        } catch (jsonError) {
          if (response.status === 500) {
            errorMessage = "Server configuration error. Please contact support."
          } else {
            errorMessage = `Server error: ${response.status} ${response.statusText}`
          }
        }
        throw new Error(errorMessage)
      }

      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setEmail("")
      }, 5000)
    } catch (error) {
      console.error("Error submitting form:", error)
      let errorMessage = "Something went wrong. Please try again."
      if (error instanceof Error) {
        errorMessage = error.message
      }
      if (errorMessage.includes("configuration")) {
        errorMessage = "We're experiencing technical difficulties. Please try again later."
      }
      setError(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600 shadow-lg">
                <span className="text-lg font-bold text-white">T</span>
              </div>
              <span className="text-xl font-bold text-purple-600">THERAP</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
                How It Works
              </a>
              <a href="#our-story" className="text-gray-600 hover:text-gray-900 transition-colors">
                Our Story
              </a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">
                Testimonials
              </a>
              <a href="#faq" className="text-gray-600 hover:text-gray-900 transition-colors">
                FAQ
              </a>
            </nav>

            {/* CTA Button */}
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium">
              Join Waitlist
            </Button>

            {/* Mobile menu button */}
            <button className="md:hidden">
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div>
              {/* Coming Soon Badge */}
              <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-600 px-4 py-2 rounded-full text-sm font-medium mb-8">
                <span className="text-purple-500">✨</span>
                Coming Soon
              </div>

              {/* Controversial Headline */}
              <h1 className="text-4xl lg:text-6xl font-bold text-black mb-6 leading-tight">
                Finally, a Therapist Who Actually <span className="text-purple-600">Listens</span>
                <br />
                <span className="text-gray-600 text-2xl lg:text-3xl">(Without Checking the Clock)</span>
              </h1>

              {/* Description */}
              <p className="text-xl text-gray-700 mb-4 leading-relaxed">
                No More Awkward Silence. Just Real Talk—Anytime You Need It.
              </p>

              <p className="text-lg text-gray-500 mb-8">Even at 3 AM when your thoughts won't shut up.</p>

              {/* Email Signup Form */}
              <div className="max-w-md mb-8">
                {submitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                    <h3 className="text-lg font-semibold text-green-800 mb-2">You're In!</h3>
                    <p className="text-green-700">We'll let you know when we're ready to fix your problems.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <AlertCircle className="h-4 w-4 text-red-600" />
                          <span className="text-red-800 text-sm font-medium">Error</span>
                        </div>
                        <p className="text-red-700 text-sm">{error}</p>
                      </div>
                    )}
                    <div className="flex gap-3">
                      <Input
                        type="email"
                        placeholder="your.email@whatever.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isSubmitting}
                        className="flex-1 h-12 text-lg border-2 border-gray-300 focus:border-purple-600 rounded-lg"
                      />
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="h-12 px-8 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium"
                      >
                        {isSubmitting ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                          <>
                            Get Early Access
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </div>

              <p className="text-sm text-gray-500">Join 50,000+ people who get real support—without the awkwardness</p>
            </div>

            {/* Right Column - Chat Preview */}
            <div className="lg:pl-8">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                {/* Chat Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600">
                      <span className="text-sm font-bold text-white">T</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-black">THERAP</h3>
                      <p className="text-sm text-gray-500">AI Therapist</p>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="p-6 space-y-4">
                  {/* AI Message */}
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 flex-shrink-0">
                      <span className="text-sm font-bold text-white">T</span>
                    </div>
                    <div className="bg-gray-50 rounded-2xl rounded-tl-md p-4 max-w-xs">
                      <p className="text-black text-sm">
                        Hi there! I'm your AI therapist. How are you feeling today? I'm here to listen and help you work
                        through whatever's on your mind.
                      </p>
                    </div>
                  </div>

                  {/* User Message */}
                  <div className="flex gap-3 justify-end">
                    <div className="bg-purple-600 rounded-2xl rounded-tr-md p-4 max-w-xs">
                      <p className="text-white text-sm">
                        I've been feeling anxious about my upcoming presentation at work...
                      </p>
                    </div>
                  </div>

                  {/* AI Response */}
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 flex-shrink-0">
                      <span className="text-sm font-bold text-white">T</span>
                    </div>
                    <div className="bg-gray-50 rounded-2xl rounded-tl-md p-4 max-w-xs">
                      <p className="text-black text-sm">
                        That's completely understandable. Public speaking can trigger anxiety for many people. Let's
                        talk about some strategies that might help you feel more prepared and confident.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Controversial Comparison Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-black mb-8">
            Is Your Therapist Secretly <span className="text-purple-600">Judging</span> You?
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-black mb-4">Traditional Therapy</h3>
              <ul className="text-left space-y-3 text-gray-700">
                <li>• $200+ per session (ouch)</li>
                <li>• Awkward small talk for 10 minutes</li>
                <li>• "How does that make you feel?" on repeat</li>
                <li>• Judgy looks when you admit weird stuff</li>
                <li>• Falls asleep during your trauma dump</li>
                <li>• Books you for 3 weeks from now</li>
                <li>• Takes notes like you're a case study</li>
                <li>• "Our time is up" mid-breakdown</li>
              </ul>
            </div>

            <div className="bg-black p-8 rounded-xl text-white">
              <h3 className="text-xl font-bold text-purple-400 mb-4">THERAP AI</h3>
              <ul className="text-left space-y-3">
                <li>• Available 24/7 (yes, even at 3 AM)</li>
                <li>• Actually remembers what you said last time</li>
                <li>• No judgment, just solutions</li>
                <li>• Costs less than your coffee addiction</li>
                <li>• Never tired, never bored</li>
                <li>• Responds in seconds, not weeks</li>
                <li>• Won't cancel on you last minute</li>
                <li>• Unlimited session time</li>
              </ul>
            </div>
          </div>

          <p className="text-xl text-gray-600">Your Therapist is Secretly Bored. Your AI Therapist is Always 'On.'</p>
        </div>
      </section>

      {/* Beta User Testimonials */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-4">Beta Users Are Obsessed</h2>
          <p className="text-center text-gray-600 mb-12">Real feedback from our early access users</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                content: "that shit works a little bit too well. like scary good at reading me",
                handle: "@sarah_codes",
                platform: "Twitter",
              },
              {
                content: "finally someone who doesn't fall asleep when I'm talking about my childhood trauma lol",
                handle: "@mike_startup",
                platform: "LinkedIn",
              },
              {
                content: "talked to it at 3am about my existential crisis and it actually helped. wild.",
                handle: "@elena_phd",
                platform: "Twitter",
              },
              {
                content: "better than my $300/hour therapist who just nods and says 'interesting'",
                handle: "@david_md",
                platform: "Instagram",
              },
              {
                content: "no more pretending I'm fine. this thing gets it. actually gets it.",
                handle: "@priya_remote",
                platform: "Twitter",
              },
              {
                content: "my therapist retired. this is better anyway. doesn't judge my 2am breakdowns.",
                handle: "@alex_parent",
                platform: "Facebook",
              },
              {
                content: "been using it for 2 weeks. haven't cried this much in years (in a good way)",
                handle: "@jenny_designer",
                platform: "Instagram",
              },
              {
                content: "told my real therapist about this. she's not happy lmao",
                handle: "@marcus_dev",
                platform: "Twitter",
              },
              {
                content: "it remembered my dog's name from 3 conversations ago. my therapist can't even remember mine",
                handle: "@lisa_marketing",
                platform: "LinkedIn",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl border-l-4 border-purple-600">
                <p className="text-black mb-4 italic">"{testimonial.content}"</p>
                <div className="flex items-center justify-between">
                  <p className="text-gray-500 text-sm font-medium">{testimonial.handle}</p>
                  <span className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded">{testimonial.platform}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-purple-600">
              <MessageCircle className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Everything you need to know about THERAP</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8">
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  question: "What is THERAP?",
                  answer:
                    "THERAP is an AI-powered therapy platform that provides 24/7 emotional support through natural conversation. It's designed to help you process emotions, work through challenges, and get real support whenever you need it—without the awkwardness or judgment of traditional therapy.",
                },
                {
                  question: "How does THERAP work?",
                  answer:
                    "THERAP uses advanced AI models to simulate natural conversations. You simply talk to the app, and it responds in real time, helping you process emotions or work through challenges. The AI understands context, remembers your previous conversations, and provides personalized support based on your unique needs.",
                },
                {
                  question: "Can THERAP replace traditional therapy?",
                  answer:
                    "THERAP provides emotional support, but it's not a replacement for professional care, especially for severe mental health conditions. Think of it as a complement to traditional therapy—available 24/7 for when you need immediate support, guidance, or just someone to talk to.",
                },
                {
                  question: "Is my data private and secure?",
                  answer:
                    "Absolutely. All conversations are encrypted and private. We don't share your personal information with anyone, and you can delete your data at any time. Your privacy and security are our top priorities—no judgment, no sharing, just support.",
                },
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200 py-2">
                  <AccordionTrigger className="text-left font-medium text-black hover:text-purple-600">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pt-2">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600">
              <span className="text-lg font-bold text-white">T</span>
            </div>
            <span className="text-xl font-bold">THERAP</span>
          </div>

          <p className="text-gray-400 mb-4">AI-powered therapy that actually works. No bullshit.</p>

          <div className="flex justify-center space-x-8 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Contact
            </a>
          </div>

          <p className="text-gray-600 text-sm mt-6">&copy; {new Date().getFullYear()} THERAP. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
