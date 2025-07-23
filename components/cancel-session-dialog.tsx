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
import { AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"

interface CancelSessionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  sessionId: string
}

export function CancelSessionDialog({ open, onOpenChange, sessionId }: CancelSessionDialogProps) {
  const router = useRouter()

  const handleCancel = () => {
    router.push(`/session-history/${sessionId}`)
  }

  const handleContinue = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          <DialogTitle className="text-center text-xl">End Session?</DialogTitle>
          <DialogDescription className="text-center">
            Are you sure you want to end your therapy session? Your progress will be saved.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-center gap-2 mt-4">
          <Button variant="outline" onClick={handleContinue} className="w-full sm:w-auto">
            Continue Session
          </Button>
          <Button variant="destructive" onClick={handleCancel} className="w-full sm:w-auto">
            End Session
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
