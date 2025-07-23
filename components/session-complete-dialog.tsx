"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

interface SessionCompleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  sessionId: string
}

export function SessionCompleteDialog({ open, onOpenChange, sessionId }: SessionCompleteDialogProps) {
  const router = useRouter()

  const handleViewSession = () => {
    router.push(`/session-history/${sessionId}`)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle className="h-8 w-8 text-primary" />
          </div>
          <DialogTitle className="text-center text-xl">Session Complete</DialogTitle>
          <DialogDescription className="text-center">
            Your 10-minute therapy session has ended. We hope it was helpful for you.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-center gap-2 mt-4">
          <Button onClick={handleViewSession} className="w-full sm:w-auto">
            View Session Summary
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
