"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Calendar, CheckCircle, Clock, Lightbulb, Target } from "lucide-react"

// Mock data for session details
const sessions = [
  {
    id: "1",
    date: "May 2, 2025",
    number: 12,
    duration: "45 minutes",
    summary:
      "In this session, we focused on your work-related stress and explored strategies for achieving a better work-life balance. You mentioned feeling overwhelmed by deadlines and having difficulty disconnecting from work during personal time. We discussed the importance of setting boundaries and implementing structured breaks throughout your workday.",
    struggles: [
      "Time management between multiple projects",
      "Setting boundaries with colleagues",
      "Disconnecting from work in the evenings",
      "Persistent worry about deadlines",
    ],
    insights: [
      "Recognized that perfectionism is contributing to overworking",
      "Identified that checking email before bed increases anxiety",
      "Noticed correlation between skipping breaks and end-of-day exhaustion",
    ],
    homework:
      "Practice a 10-minute meditation daily, preferably during your lunch break. Set a firm cutoff time for work emails and notifications. Use the time-blocking technique we discussed for your calendar.",
    nextFocus:
      "Next session, we'll evaluate the effectiveness of the time-blocking technique and explore additional stress reduction strategies specific to your workplace environment.",
  },
  {
    id: "2",
    date: "April 28, 2025",
    number: 11,
    duration: "50 minutes",
    summary:
      "This session centered on your relationship challenges, particularly communication patterns with your partner. You shared examples of recent misunderstandings and expressed frustration about conversations that escalate quickly. We explored active listening techniques and discussed how childhood experiences might be influencing your communication style.",
    struggles: [
      "Active listening without planning responses",
      "Expressing needs without accusatory language",
      "Managing emotional reactions during disagreements",
      "Vulnerability in sharing feelings",
    ],
    insights: [
      "Recognized pattern of defensive responses when criticized",
      "Identified fear of abandonment as underlying certain reactions",
      "Noticed tendency to withdraw rather than express hurt feelings",
    ],
    homework:
      "Practice using 'I' statements during difficult conversations. Keep a communication journal noting triggers and emotional responses. Try the 'speaker-listener' technique we discussed with your partner for one conversation this week.",
    nextFocus:
      "In our next session, we'll review your communication journal and refine strategies for managing emotional reactivity during challenging conversations.",
  },
  {
    id: "3",
    date: "April 21, 2025",
    number: 10,
    duration: "40 minutes",
    summary:
      "Today's session focused on anxiety management techniques and identifying your specific triggers. You described several recent anxiety episodes and we worked on distinguishing between productive and unproductive worry. We practiced the grounding technique and discussed how catastrophic thinking patterns contribute to your anxiety.",
    struggles: [
      "Catastrophic thinking about minor problems",
      "Physical symptoms including racing heart and tension",
      "Difficulty concentrating when anxious",
      "Sleep disruption due to worry",
    ],
    insights: [
      "Recognized connection between caffeine intake and anxiety levels",
      "Identified 'what if' thinking as a major anxiety trigger",
      "Noticed anxiety decreases with physical activity",
    ],
    homework:
      "Track anxiety triggers in your journal, noting time of day, situation, thoughts, and intensity level. Practice the 5-4-3-2-1 grounding technique when you notice anxiety building. Limit caffeine after noon as we discussed.",
    nextFocus:
      "Next session, we'll review your anxiety tracking and develop a more comprehensive anxiety management plan based on your specific triggers and patterns.",
  },
  {
    id: "4",
    date: "April 14, 2025",
    number: 9,
    duration: "45 minutes",
    summary:
      "In this session, we discussed your progress with sleep hygiene and the remaining challenges you're facing. You reported some improvement in sleep quality but continued difficulty falling asleep. We explored your evening routine in detail and identified several habits that may be interfering with your sleep onset.",
    struggles: [
      "Screen time before bed despite knowing better",
      "Maintaining a consistent sleep schedule on weekends",
      "Racing thoughts when trying to fall asleep",
      "Early morning waking without feeling rested",
    ],
    insights: [
      "Recognized correlation between evening news and sleep difficulty",
      "Identified that room temperature affects sleep quality",
      "Noticed improved sleep after evening stretching routine",
    ],
    homework:
      "Implement a 30-minute bedtime routine without screens. Try the progressive muscle relaxation recording we discussed. Keep your sleep log for another week, noting any changes from implementing these strategies.",
    nextFocus:
      "In our next session, we'll evaluate the effectiveness of your new bedtime routine and discuss cognitive techniques for managing racing thoughts at bedtime.",
  },
]

export default function SessionRundownPage() {
  const router = useRouter()
  const params = useParams()
  const sessionId = params.id as string

  const session = sessions.find((s) => s.id === sessionId)

  if (!session) {
    return <div>Session not found</div>
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <Button variant="ghost" className="mb-4 flex items-center gap-2" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4" />
        Back to Session History
      </Button>

      <div className="mb-6">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <h1 className="text-2xl font-bold md:text-3xl">Session #{session.number}</h1>
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-1 rounded-full bg-muted px-3 py-1">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{session.date}</span>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-muted px-3 py-1">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{session.duration}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="rounded-full bg-primary/10 p-1">
                <Target className="h-5 w-5 text-primary" />
              </span>
              Session Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{session.summary}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="rounded-full bg-destructive/10 p-1">
                <Target className="h-5 w-5 text-destructive" />
              </span>
              Identified Struggles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {session.struggles.map((struggle, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="mt-0.5 h-2 w-2 rounded-full bg-destructive/70" />
                  <span className="text-muted-foreground">{struggle}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="rounded-full bg-amber-500/10 p-1">
                <Lightbulb className="h-5 w-5 text-amber-500" />
              </span>
              Key Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {session.insights.map((insight, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="mt-0.5 h-2 w-2 rounded-full bg-amber-500/70" />
                  <span className="text-muted-foreground">{insight}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="rounded-full bg-green-500/10 p-1">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </span>
              Homework & Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium">Homework</h3>
              <p className="text-sm text-muted-foreground">{session.homework}</p>
            </div>
            <div>
              <h3 className="font-medium">Next Session Focus</h3>
              <p className="text-sm text-muted-foreground">{session.nextFocus}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 flex justify-center">
        <Button onClick={() => router.push("/chat")}>Start New Session</Button>
      </div>
    </div>
  )
}
