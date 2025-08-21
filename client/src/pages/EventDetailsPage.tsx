import { DashboardLayout } from "@/components/organizer/DashboardLayout"
import { AddPersonModal } from "@/components/organizer/EventDetails/AddPersonModal"
import { EventInfo } from "@/components/organizer/EventDetails/EventInfo"
import { EventTabs } from "@/components/organizer/EventDetails/EventTabs"
import { PersonDetailsSheet } from "@/components/organizer/EventDetails/PersonDetailsSheet"
import { useAddPerson } from "@/hooks/useAddPerson"
import { fetchEventById } from "@/services/api"
import type { IEvent } from "@/types/event.types"
import type { Person } from "@/types/person.types"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export function EventDetailsPage() {
  const { id } = useParams()
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)
  const [isPersonSheetOpen, setIsPersonSheetOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [event, setEvent] = useState<IEvent | null>(null)
  const {mutate:addPerson} = useAddPerson();

  useEffect(() => {
    if (id) {
      fetchEventById(id).then(setEvent)
    }
  }, [id])

  const handlePersonClick = (person: Person) => {
    setSelectedPerson(person)
    setIsPersonSheetOpen(true)
  }
  if (!event) return <div>Loading...</div>

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8 space-y-6">
        <EventInfo event={event} />
        <EventTabs eventId={id || ""} onPersonClick={handlePersonClick} onAddPerson={() => setIsAddModalOpen(true)}/>

        <AddPersonModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={(data) => {
            addPerson({ ...data, eventId: id || "" })
          }}
          eventId={id || ""}
          defaultRole="attendee"
        />
        <PersonDetailsSheet
          person={selectedPerson}
          isOpen={isPersonSheetOpen}
          onClose={() => setIsPersonSheetOpen(false)}
        />
      </div>
    </DashboardLayout>
  )
}
