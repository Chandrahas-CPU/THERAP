"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sun, Bell, Volume2, Trash2, Download } from "lucide-react"
import { useTheme } from "next-themes"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [notifications, setNotifications] = useState(true)
  const [sessionReminders, setSessionReminders] = useState(true)
  const [voiceVolume, setVoiceVolume] = useState(80)
  const [voiceSpeed, setVoiceSpeed] = useState(1)
  const [autoSave, setAutoSave] = useState(true)

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold md:text-3xl">Settings</h1>
        <p className="text-muted-foreground">Customize your therapy experience and application preferences</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sun className="h-5 w-5" />
              <span>Appearance</span>
            </CardTitle>
            <CardDescription>Customize how THERAP looks and feels</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label className="text-base">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
              </div>
              <Switch checked={theme === "dark"} onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")} />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label className="text-base">Font Size</Label>
                <p className="text-sm text-muted-foreground">Adjust the text size throughout the app</p>
              </div>
              <Select defaultValue="medium">
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
            </CardTitle>
            <CardDescription>Manage your notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label className="text-base">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications for important updates</p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label className="text-base">Session Reminders</Label>
                <p className="text-sm text-muted-foreground">Get reminders for scheduled therapy sessions</p>
              </div>
              <Switch checked={sessionReminders} onCheckedChange={setSessionReminders} />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label className="text-base">Reminder Time</Label>
                <p className="text-sm text-muted-foreground">How far in advance to send reminders</p>
              </div>
              <Select defaultValue="15">
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 minutes</SelectItem>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="h-5 w-5" />
              <span>Voice & Audio</span>
            </CardTitle>
            <CardDescription>Customize the voice and audio settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="voice-volume">Voice Volume</Label>
                <span className="text-sm text-muted-foreground">{voiceVolume}%</span>
              </div>
              <Slider
                id="voice-volume"
                min={0}
                max={100}
                step={1}
                value={[voiceVolume]}
                onValueChange={(value) => setVoiceVolume(value[0])}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="voice-speed">Voice Speed</Label>
                <span className="text-sm text-muted-foreground">{voiceSpeed}x</span>
              </div>
              <Slider
                id="voice-speed"
                min={0.5}
                max={2}
                step={0.1}
                value={[voiceSpeed]}
                onValueChange={(value) => setVoiceSpeed(value[0])}
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label className="text-base">Voice Type</Label>
                <p className="text-sm text-muted-foreground">Select the AI therapist voice</p>
              </div>
              <Select defaultValue="female">
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Select voice" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="neutral">Neutral</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              <span>Data & Privacy</span>
            </CardTitle>
            <CardDescription>Manage your data and privacy settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label className="text-base">Auto-Save Sessions</Label>
                <p className="text-sm text-muted-foreground">Automatically save therapy sessions</p>
              </div>
              <Switch checked={autoSave} onCheckedChange={setAutoSave} />
            </div>
            <div className="space-y-2 rounded-lg border p-4">
              <Label className="text-base">Data Management</Label>
              <p className="text-sm text-muted-foreground mb-4">Export or delete your therapy session data</p>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  Export Data
                </Button>
                <Button variant="destructive" size="sm" className="flex items-center gap-1">
                  <Trash2 className="h-4 w-4" />
                  Delete All Data
                </Button>
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <Label className="text-base">Data Retention</Label>
              <p className="text-sm text-muted-foreground mb-4">Choose how long to keep your session data</p>
              <Select defaultValue="1year">
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3months">3 months</SelectItem>
                  <SelectItem value="6months">6 months</SelectItem>
                  <SelectItem value="1year">1 year</SelectItem>
                  <SelectItem value="forever">Forever</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
