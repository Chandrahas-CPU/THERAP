"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Mic, MessageSquare, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { SessionTimer } from "@/components/session-timer"
import { SessionCompleteDialog } from "@/components/session-complete-dialog"
import { CancelSessionDialog } from "@/components/cancel-session-dialog"

export default function ChatPage() {
  const router = useRouter()
  const [isListening, setIsListening] = useState(false)
  const [pulseSize, setPulseSize] = useState(1)
  const [showVoiceInterface, setShowVoiceInterface] = useState(true)
  const [transcript, setTranscript] = useState("")
  const [sessionComplete, setSessionComplete] = useState(false)
  const [showCancelDialog, setShowCancelDialog] = useState(false)

  // Generate a mock session ID for this session
  const [sessionId] = useState("1")

  // Simulate heartbeat effect
  useEffect(() => {
    if (showVoiceInterface) {
      const interval = setInterval(() => {
        setPulseSize((prev) => (prev === 1 ? 1.1 : 1))
      }, 800)
      return () => clearInterval(interval)
    }
  }, [showVoiceInterface])

  const toggleListening = () => {
    setIsListening(!isListening)
    // In a real app, this would start/stop voice recognition
    if (!isListening) {
      // Simulate receiving transcript after a delay
      setTimeout(() => {
        setTranscript("I've been feeling anxious about my upcoming presentation at work...")
      }, 3000)
    }
  }

  const handleChatClick = () => {
    setShowVoiceInterface(false)
    // In a real app, this would switch to text chat mode
  }

  const handleCancelClick = () => {
    setShowCancelDialog(true)
  }

  const handleSessionComplete = () => {
    setSessionComplete(true)
  }

  return (
    <div className="flex h-full flex-col items-center justify-center bg-gradient-to-b from-background to-background/80 p-4">
      {/* Session Timer */}
      <div className="absolute top-4 right-4 z-10">
        <SessionTimer duration={10} onComplete={handleSessionComplete} />
      </div>

      <AnimatePresence>
        {showVoiceInterface ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col items-center justify-center"
          >
            <div className="relative mb-8 md:mb-16 flex items-center justify-center">
              {/* Outer ripple effects */}
              {isListening && (
                <>
                  <motion.div
                    initial={{ scale: 1, opacity: 0.7 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className="absolute h-32 w-32 md:h-40 md:w-40 rounded-full bg-primary/10"
                  />
                  <motion.div
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.3 }}
                    className="absolute h-32 w-32 md:h-40 md:w-40 rounded-full bg-primary/20"
                  />
                </>
              )}

              {/* Main circle with heartbeat effect */}
              <motion.div
                animate={{ scale: pulseSize }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className={`relative flex h-32 w-32 md:h-40 md:w-40 items-center justify-center rounded-full ${
                  isListening ? "bg-primary" : "bg-primary/80"
                } shadow-lg`}
              >
                <div className="absolute inset-2 rounded-full bg-gradient-to-b from-white/10 to-transparent" />

                {/* Animated waveform or equalizer effect when listening */}
                {isListening && (
                  <div className="flex h-10 md:h-12 items-end space-x-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 10 }}
                        animate={{ height: [10, 30, 15, 40, 10] }}
                        transition={{
                          duration: 1.5,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.1,
                          ease: "easeInOut",
                        }}
                        className="w-1.5 bg-white/80 rounded-full"
                      />
                    ))}
                  </div>
                )}

                {/* Mic icon when not listening */}
                {!isListening && <Mic className="h-12 w-12 md:h-16 md:w-16 text-white" />}
              </motion.div>
            </div>

            {/* Status text */}
            <div className="mb-6 md:mb-8 text-center px-4">
              <h2 className="text-lg md:text-xl font-medium text-primary">
                {isListening ? "Listening..." : "Tap the mic to start speaking"}
              </h2>
              {transcript && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 max-w-md text-muted-foreground text-sm md:text-base"
                >
                  "{transcript}"
                </motion.p>
              )}
            </div>

            {/* Control buttons */}
            <div className="flex items-center justify-center space-x-4 md:space-x-8">
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 md:h-14 md:w-14 rounded-full border-2 border-primary/30 bg-background shadow-md"
                onClick={handleChatClick}
              >
                <MessageSquare className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              </Button>

              <Button
                variant={isListening ? "destructive" : "default"}
                size="icon"
                className="h-14 w-14 md:h-16 md:w-16 rounded-full shadow-md"
                onClick={toggleListening}
              >
                <Mic className="h-7 w-7 md:h-8 md:w-8" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 md:h-14 md:w-14 rounded-full border-2 border-destructive/30 bg-background shadow-md"
                onClick={handleCancelClick}
              >
                <X className="h-5 w-5 md:h-6 md:w-6 text-destructive" />
              </Button>
            </div>
          </motion.div>
        ) : (
          <div className="w-full">
            {/* This would be your text chat interface */}
            <p>Text chat interface would go here</p>
            <Button onClick={() => setShowVoiceInterface(true)}>Switch to Voice</Button>
          </div>
        )}
      </AnimatePresence>

      {/* Session Complete Dialog */}
      <SessionCompleteDialog open={sessionComplete} onOpenChange={setSessionComplete} sessionId={sessionId} />

      {/* Cancel Session Dialog */}
      <CancelSessionDialog open={showCancelDialog} onOpenChange={setShowCancelDialog} sessionId={sessionId} />
    </div>
  )
}
