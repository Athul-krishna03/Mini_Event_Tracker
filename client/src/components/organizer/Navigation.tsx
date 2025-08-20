"use client"

import { Link, useLocation, useNavigate } from "react-router-dom"
import { Calendar, Home, QrCode } from "lucide-react"
import { cn } from "@/lib/utils"
import { logoutUser } from "@/services/api"
import { toast } from "sonner"


const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/scanner", label: "Scanner", icon: QrCode },
]

export function Navigation() {
  const location = useLocation()
  const navigate = useNavigate()
  const handleLogout = async () => {
    await logoutUser()
    localStorage.removeItem("user")
    toast.success("Logged out successfully")
    navigate("/login")  
  }

  return (
    <nav className="bg-background border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <Calendar className="h-6 w-6 text-primary" />
              <span className="font-sans text-xl font-bold text-foreground">EventManager</span>
            </Link>

            <div className="hidden md:flex space-x-6">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href

                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={handleLogout}
            >
              Logout
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
