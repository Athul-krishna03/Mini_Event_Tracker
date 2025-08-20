import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {  Mail, User, Calendar, Download } from "lucide-react"

interface Person {
    id: string
    name: string
    email: string
    role: string
    ticketStatus: "valid" | "used" | "invalid"
    ticketUrl: string
    createdAt: string
}

interface PersonDetailsSheetProps {
    person: Person | null
    isOpen: boolean
    onClose: () => void
}

export function PersonDetailsSheet({ person, isOpen, onClose }: PersonDetailsSheetProps) {
  console.log(person)
  if (!person) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case "valid":
        return "bg-green-100 text-green-800"
      case "used":
        return "bg-gray-100 text-gray-800"
      case "invalid":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "judge":
        return "bg-purple-100 text-purple-800"
      case "guest":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Person Details
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">{person.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{person.email}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Badge className={getRoleColor(person.role)}>
                {person.role.charAt(0).toUpperCase() + person.role.slice(1)}
              </Badge>
              <Badge className={getStatusColor(person.ticketStatus)}>
                {person.ticketStatus.charAt(0).toUpperCase() + person.ticketStatus.slice(1)}
              </Badge>
            </div>
          </div>

          {/* Registration Info */}
          <div className="space-y-2">
            <h4 className="font-medium">Registration Details</h4>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Registered on {new Date(person.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          {/* QR Code */}
          <div className="space-y-3">
            <h4 className="font-medium">Event Ticket</h4>
            <div className="flex flex-col items-center p-6 border rounded-lg bg-white">
              <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                <img src={person.ticketUrl} alt={`QR Code for ${person.name}`} className="w-full h-full object-cover rounded-lg" />
              </div>
              <p className="text-sm text-muted-foreground text-center">QR Code for {person.name}</p>
              <p className="text-xs text-muted-foreground">ID: {person.id}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <Button className="w-full bg-transparent" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download Ticket
            </Button>
            <Button className="w-full bg-transparent" variant="outline">
              Send Email Reminder
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
