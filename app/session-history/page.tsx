import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronRight } from "lucide-react"

// Mock data for session history
const sessions = [
  {
    id: "1",
    date: "May 2, 2025",
    number: 12,
    summary: "Discussed work-related stress and strategies for better work-life balance.",
    struggles: ["Time management", "Setting boundaries"],
    homework: "Practice 10-minute meditation daily",
  },
  {
    id: "2",
    date: "April 28, 2025",
    number: 11,
    summary: "Explored relationship challenges and communication patterns.",
    struggles: ["Active listening", "Expressing needs"],
    homework: "Use 'I' statements in difficult conversations",
  },
  {
    id: "3",
    date: "April 21, 2025",
    number: 10,
    summary: "Focused on anxiety management techniques and identifying triggers.",
    struggles: ["Catastrophic thinking", "Physical symptoms"],
    homework: "Track anxiety triggers in journal",
  },
  {
    id: "4",
    date: "April 14, 2025",
    number: 9,
    summary: "Discussed progress with sleep hygiene and remaining challenges.",
    struggles: ["Screen time before bed", "Consistent schedule"],
    homework: "Implement bedtime routine without screens",
  },
]

export default function SessionHistoryPage() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold md:text-3xl">Session History</h1>
        <p className="text-muted-foreground">Review your past therapy sessions and track your progress</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sessions.map((session) => (
          <Link href={`/session-history/${session.id}`} key={session.id}>
            <Card className="h-full transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{session.date}</span>
                  </div>
                  <div className="rounded-full bg-primary/10 px-2 py-1">
                    <span className="text-xs font-medium text-primary">Session #{session.number}</span>
                  </div>
                </div>
                <CardTitle className="mt-2 text-lg">Session Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="line-clamp-3">{session.summary}</CardDescription>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {session.struggles.slice(0, 2).map((struggle) => (
                      <span key={struggle} className="rounded-full bg-muted px-2 py-1 text-xs">
                        {struggle}
                      </span>
                    ))}
                  </div>
                  <Button variant="ghost" size="icon" className="ml-auto">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
