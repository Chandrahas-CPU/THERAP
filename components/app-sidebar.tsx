"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import { Home, MessageSquare, History, User, Settings, LogOut, Menu, PanelLeft } from "lucide-react"
import { FeedbackDialog } from "@/components/feedback-dialog"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  const pathname = usePathname()
  const [feedbackOpen, setFeedbackOpen] = useState(false)
  const { toggleSidebar } = useSidebar()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <>
      <Sidebar variant="inset" collapsible="icon">
        <SidebarHeader className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <span className="text-lg font-bold text-primary-foreground">T</span>
            </div>
            <span className="text-xl font-bold group-data-[collapsible=icon]:hidden">THERAP</span>
          </div>
          <button
            onClick={toggleSidebar}
            className="hidden md:flex h-8 w-8 items-center justify-center rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <PanelLeft className="h-5 w-5" />
          </button>
          <button className="md:hidden h-8 w-8 flex items-center justify-center" onClick={toggleSidebar}>
            <Menu className="h-5 w-5" />
          </button>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/")} tooltip="Home">
                <Link href="/">
                  <Home />
                  <span>Home</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={feedbackOpen} onClick={() => setFeedbackOpen(true)} tooltip="Feedback">
                <MessageSquare />
                <span>Feedback</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/session-history")} tooltip="Session History">
                <Link href="/session-history">
                  <History />
                  <span>Session History</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/profile")} tooltip="Profile">
                <Link href="/profile">
                  <User />
                  <span>Profile</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/settings")} tooltip="Settings">
                <Link href="/settings">
                  <Settings />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Sign Out">
                <LogOut />
                <span>Sign Out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <FeedbackDialog open={feedbackOpen} onOpenChange={setFeedbackOpen} />
    </>
  )
}
