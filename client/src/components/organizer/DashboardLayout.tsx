import type React from "react"
import { Navigation } from "@/components/organizer/Navigation"

interface DashboardLayoutProps {
    children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="min-h-screen bg-background">
        <Navigation />
        <main>{children}</main>
        </div>
    )
}
