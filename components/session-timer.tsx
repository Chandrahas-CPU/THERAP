"use client"

import { useState, useEffect, useCallback } from "react"
import { Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface SessionTimerProps {
  duration: number // in minutes
  onComplete: () => void
  className?: string
}

export function SessionTimer({ duration, onComplete, className }: SessionTimerProps) {
  // Convert minutes to milliseconds
  const totalTime = duration * 60 * 1000
  const [timeLeft, setTimeLeft] = useState(totalTime)
  const [isRunning, setIsRunning] = useState(true)

  const formatTime = useCallback((ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }, [])

  // Calculate progress percentage
  const progress = (timeLeft / totalTime) * 100

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1000
          if (newTime <= 0) {
            setIsRunning(false)
            onComplete()
            return 0
          }
          return newTime
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, timeLeft, onComplete])

  return (
    <div className={cn("flex items-center gap-2 rounded-full bg-background/90 px-3 py-1.5 shadow-md", className)}>
      <div className="relative h-5 w-5">
        <Clock className="h-5 w-5 text-primary" />
        <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 24 24">
          <circle
            cx="12"
            cy="12"
            r="10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="text-primary/20"
          />
          <circle
            cx="12"
            cy="12"
            r="10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 10}`}
            strokeDashoffset={`${2 * Math.PI * 10 * (1 - progress / 100)}`}
            className="text-primary"
          />
        </svg>
      </div>
      <span className="font-medium text-sm">{formatTime(timeLeft)}</span>
    </div>
  )
}
