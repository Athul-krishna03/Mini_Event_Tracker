"use client"

import type React from "react"
import { useState } from "react"
import { Calendar, MapPin, Users, FileText, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface IEvent {
    id: string
    title: string
    venue: string
    description: string
    date: Date
    createdBy: string
    capacity: number
    programs: string[]
}

interface AddEventModalProps {
   onAddEvent: (event: Omit<IEvent, "id" | "createdBy">) => void
}

export function AddEventModal({ onAddEvent }: AddEventModalProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    venue: "",
    description: "",
    date: "",
    time: "",
    capacity: "",
    programs: [] as string[],
    newProgram: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Combine date and time
    const eventDate = new Date(`${formData.date}T${formData.time}`)

    const newEvent = {
      title: formData.title,
      venue: formData.venue,
      description: formData.description,
      date: eventDate,
      capacity: Number.parseInt(formData.capacity),
      programs: formData.programs,
    }

    onAddEvent(newEvent)

    // Reset form
    setFormData({
      title: "",
      venue: "",
      description: "",
      date: "",
      time: "",
      capacity: "",
      programs: [],
      newProgram: "",
    })

    setOpen(false)
  }

  const addProgram = () => {
    if (formData.newProgram.trim() && !formData.programs.includes(formData.newProgram.trim())) {
      setFormData((prev) => ({
        ...prev,
        programs: [...prev.programs, prev.newProgram.trim()],
        newProgram: "",
      }))
    }
  }

  const removeProgram = (program: string) => {
    setFormData((prev) => ({
      ...prev,
      programs: prev.programs.filter((p) => p !== program),
    }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-sans text-xl font-bold">Create New Event</DialogTitle>
          <DialogDescription>Fill in the details below to create a new event.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Event Title
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Enter event title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="venue" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Venue
              </Label>
              <Input
                id="venue"
                value={formData.venue}
                onChange={(e) => setFormData((prev) => ({ ...prev, venue: e.target.value }))}
                placeholder="Enter venue location"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData((prev) => ({ ...prev, time: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacity" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Capacity
              </Label>
              <Input
                id="capacity"
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData((prev) => ({ ...prev, capacity: e.target.value }))}
                placeholder="Maximum number of attendees"
                min="1"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your event..."
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Programs</Label>
              <div className="flex gap-2">
                <Input
                  value={formData.newProgram}
                  onChange={(e) => setFormData((prev) => ({ ...prev, newProgram: e.target.value }))}
                  placeholder="Add a program"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addProgram())}
                />
                <Button type="button" onClick={addProgram} variant="outline" size="sm">
                  Add
                </Button>
              </div>
              {formData.programs.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.programs.map((program, index) => (
                    <div key={index} className="bg-muted px-3 py-1 rounded-md text-sm flex items-center gap-2">
                      {program}
                      <button
                        type="button"
                        onClick={() => removeProgram(program)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-accent hover:bg-accent/90">
              Create Event
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
