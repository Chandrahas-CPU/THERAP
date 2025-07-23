"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ProfilePage() {
  const [personalInfo, setPersonalInfo] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "(555) 123-4567",
    dateOfBirth: "1990-05-15",
  })

  const [healthInfo, setHealthInfo] = useState({
    currentMedications: "Lexapro 10mg daily",
    allergies: "None",
    emergencyContact: "Sarah Johnson, (555) 987-6543",
    therapyGoals: "Manage anxiety, improve work-life balance, develop better communication skills",
    previousTherapy: "CBT with Dr. Smith (2020-2021)",
  })

  const [passwordInfo, setPasswordInfo] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalInfo({
      ...personalInfo,
      [e.target.name]: e.target.value,
    })
  }

  const handleHealthInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setHealthInfo({
      ...healthInfo,
      [e.target.name]: e.target.value,
    })
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInfo({
      ...passwordInfo,
      [e.target.name]: e.target.value,
    })
  }

  const savePersonalInfo = () => {
    // In a real app, this would save to a database
    console.log("Saving personal info:", personalInfo)
  }

  const saveHealthInfo = () => {
    // In a real app, this would save to a database
    console.log("Saving health info:", healthInfo)
  }

  const changePassword = () => {
    // In a real app, this would validate and update password
    console.log("Changing password:", passwordInfo)
  }

  const deleteAccount = () => {
    // In a real app, this would show a confirmation dialog and delete the account
    console.log("Deleting account")
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold md:text-3xl">Your Profile</h1>
        <p className="text-muted-foreground">Manage your personal information and account settings</p>
      </div>

      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="health">Health Details</TabsTrigger>
          <TabsTrigger value="account">Account Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details and contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" value={personalInfo.name} onChange={handlePersonalInfoChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={personalInfo.email}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" value={personalInfo.phone} onChange={handlePersonalInfoChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={personalInfo.dateOfBirth}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={savePersonalInfo}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="health">
          <Card>
            <CardHeader>
              <CardTitle>Health Information</CardTitle>
              <CardDescription>
                This information helps us provide better support during your therapy sessions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentMedications">Current Medications</Label>
                <Input
                  id="currentMedications"
                  name="currentMedications"
                  value={healthInfo.currentMedications}
                  onChange={handleHealthInfoChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="allergies">Allergies</Label>
                <Input id="allergies" name="allergies" value={healthInfo.allergies} onChange={handleHealthInfoChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input
                  id="emergencyContact"
                  name="emergencyContact"
                  value={healthInfo.emergencyContact}
                  onChange={handleHealthInfoChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="therapyGoals">Therapy Goals</Label>
                <Textarea
                  id="therapyGoals"
                  name="therapyGoals"
                  value={healthInfo.therapyGoals}
                  onChange={handleHealthInfoChange}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="previousTherapy">Previous Therapy Experience</Label>
                <Textarea
                  id="previousTherapy"
                  name="previousTherapy"
                  value={healthInfo.previousTherapy}
                  onChange={handleHealthInfoChange}
                  rows={2}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveHealthInfo}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="account">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your password to keep your account secure</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    value={passwordInfo.currentPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={passwordInfo.newPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={passwordInfo.confirmPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={changePassword}>Update Password</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Management</CardTitle>
                <CardDescription>Manage your account settings and data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">Data Privacy</Label>
                    <p className="text-sm text-muted-foreground">Allow us to use session data for improving our AI</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Delete Account</AlertTitle>
                  <AlertDescription>
                    This action cannot be undone. This will permanently delete your account and remove all your data
                    from our servers.
                  </AlertDescription>
                </Alert>
              </CardContent>
              <CardFooter>
                <Button variant="destructive" onClick={deleteAccount}>
                  Delete Account
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
