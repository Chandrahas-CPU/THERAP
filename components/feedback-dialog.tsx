"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CheckCircle, Star } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"

interface FeedbackDialogProps {
  trigger?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function FeedbackDialog({ trigger, open, onOpenChange }: FeedbackDialogProps) {
  const [rating, setRating] = useState<string | null>(null)
  const [comment, setComment] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [category, setCategory] = useState<string>("general")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send the feedback to a server
    console.log({ rating, comment, category })
    setSubmitted(true)

    // Reset form after 2 seconds
    setTimeout(() => {
      setSubmitted(false)
      setRating(null)
      setComment("")
      setCategory("general")
      if (onOpenChange) onOpenChange(false)
    }, 2000)
  }

  const resetForm = () => {
    setSubmitted(false)
    setRating(null)
    setComment("")
    setCategory("general")
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        if (onOpenChange) onOpenChange(newOpen)
        if (!newOpen) resetForm()
      }}
    >
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        {submitted ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <DialogTitle className="text-2xl text-center">Thank You!</DialogTitle>
            <DialogDescription className="text-center mt-2">
              Your feedback has been submitted successfully. We appreciate your input!
            </DialogDescription>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Share Your Feedback</DialogTitle>
              <DialogDescription>Help us improve THERAP by sharing your thoughts and experiences</DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-3">
                <Label>What would you like to provide feedback about?</Label>
                <RadioGroup value={category} onValueChange={setCategory} className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="general" id="general" />
                    <Label htmlFor="general">General Experience</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="therapy" id="therapy" />
                    <Label htmlFor="therapy">Therapy Sessions</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="interface" id="interface" />
                    <Label htmlFor="interface">User Interface</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="suggestions" id="suggestions" />
                    <Label htmlFor="suggestions">Feature Suggestions</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>How would you rate your experience?</Label>
                <div className="flex gap-2 justify-center">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setRating(value.toString())}
                      className={`flex h-12 w-12 items-center justify-center rounded-full border transition-colors ${
                        rating === value.toString()
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-input hover:border-primary/50 hover:bg-primary/5"
                      }`}
                    >
                      <Star
                        className={`h-6 w-6 ${
                          rating === value.toString() ? "fill-primary text-primary" : "text-muted-foreground"
                        }`}
                      />
                      <span className="sr-only">{value} stars</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="comment">Tell us more about your experience</Label>
                <Textarea
                  id="comment"
                  placeholder="Share your thoughts, suggestions, or concerns..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={!rating}>
                Submit Feedback
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
