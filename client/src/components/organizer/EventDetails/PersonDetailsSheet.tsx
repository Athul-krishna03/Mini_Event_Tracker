import { useRef } from "react"
import { toPng } from "html-to-image"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { User, Download } from "lucide-react"

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
  const ticketRef = useRef<HTMLDivElement>(null)

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


  
const handleDownload = async () => {
  if (ticketRef.current) {
    const dataUrl = await toPng(ticketRef.current, { cacheBust: true })
    const link = document.createElement("a")
    link.href = dataUrl
    link.download = `${person.name}-ticket.png`
    link.click()
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
          {/* Ticket Layout (hidden for download but also shown here) */}
          <div
            ref={ticketRef}
            className="relative w-full max-w-sm mx-auto border rounded-xl p-4 bg-gradient-to-br from-white to-gray-50 shadow-lg"
          >
            <h3 className="text-lg font-bold text-center mb-2">🎟 Event Ticket</h3>
            <p className="text-sm text-center text-muted-foreground mb-4">
              {person.name} • {person.role}
            </p>
            <div className="flex flex-col items-center">
              <img
                src={person.ticketUrl}
                alt={`QR for ${person.name}`}
                crossOrigin="anonymous"
                className="w-32 h-32 rounded-lg mb-3"
              />
              <Badge className={getStatusColor(person.ticketStatus)}>
                {person.ticketStatus}
              </Badge>
            </div>
            <p className="text-xs text-center text-muted-foreground mt-2">
              Registered on {new Date(person.createdAt).toLocaleDateString()}
            </p>
            <p className="text-[10px] text-center text-gray-400">ID: {person.id}</p>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <Button className="w-full" variant="outline" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download Ticket
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
