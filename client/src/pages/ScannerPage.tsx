"use client"
import { useState } from "react"
import QrScanner from "react-qr-barcode-scanner"
import { useNavigate } from "react-router-dom"
import { DashboardLayout } from "@/components/organizer/DashboardLayout"
import { verifyTicket } from "@/services/api"
export function ScannerPage() {
  const [scannedResult, setScannedResult] = useState<string | null>(null)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState<string>("")
  const navigate = useNavigate()

  // Handle QR Scan
  const handleScan = async (text: string) => {
    if (scannedResult) return
    try {
      setScannedResult(text)
      setStatus("loading")

      const parsed = JSON.parse(text)
      console.log("parsedData",parsed)
      const result = await verifyTicket({eventId: parsed.eventId, personId: parsed.personId})
      
      setStatus("success")
      setMessage(`Ticket verified for person: ${result.personName}`)
      setTimeout(() => navigate("/dashboard"), 2000)
    } catch (err: any) {
      setStatus("error")
      setMessage(err.message || "Ticket verification failed")
      setTimeout(() => navigate("/dashboard"), 2000)
    }
  }
  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Ticket Scanner</h1>

        {/* QR Scanner */}
        <div className="w-full max-w-md mx-auto" style={{ width: "100%" }}>
          <QrScanner
            onUpdate={(_, result) => {
              if (result) {
                handleScan(result.getText())
              }
            }}
          />
        </div>
        <div className="mt-6 flex justify-center">
          {status === "loading" && (
            <div className="px-6 py-4 bg-blue-100 border border-blue-400 text-blue-700 rounded-lg">
              ⏳ Verifying ticket...
            </div>
          )}
          {status === "success" && (
            <div className="px-6 py-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              ✅ {message}
            </div>
          )}
          {status === "error" && (
            <div className="px-6 py-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              ❌ {message}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
