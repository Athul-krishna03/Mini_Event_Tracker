import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Crown, UserCheck, Plus } from "lucide-react"
import { PeopleTable } from "./PeopleTable"
import type { Person } from "@/types/person.types"

export function EventTabs({ 
    eventId, 
    onPersonClick, 
    onAddPerson 
}: { 
    eventId: string, 
    onPersonClick: (p: Person) => void,
    onAddPerson: (role: "attendee" | "judge" | "guest") => void
}) {
    return (
        <Tabs defaultValue="attendee" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="attendee">
            <Users className="h-4 w-4" /> Attendee
            </TabsTrigger>
            <TabsTrigger value="judge">
            <Crown className="h-4 w-4" /> Judge
            </TabsTrigger>
            <TabsTrigger value="guest">
            <UserCheck className="h-4 w-4" /> Guest
            </TabsTrigger>
        </TabsList>

        <TabsContent value="attendee">
            <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Attendees</h2>
            <button
                onClick={() => onAddPerson("attendee")}
                className="flex items-center gap-1 rounded bg-blue-600 text-white px-3 py-1 text-sm"
            >
                <Plus className="h-4 w-4" /> Add Attendee
            </button>
            </div>
            <PeopleTable role="attendee" eventId={eventId} onPersonClick={onPersonClick} />
        </TabsContent>

        <TabsContent value="judge">
            <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Judges</h2>
            <button
                onClick={() => onAddPerson("judge")}
                className="flex items-center gap-1 rounded bg-blue-600 text-white px-3 py-1 text-sm"
            >
                <Plus className="h-4 w-4" /> Add Judge
            </button>
            </div>
            <PeopleTable role="judge" eventId={eventId} onPersonClick={onPersonClick} />
        </TabsContent>

        <TabsContent value="guest">
            <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Guests</h2>
            <button
                onClick={() => onAddPerson("guest")}
                className="flex items-center gap-1 rounded bg-blue-600 text-white px-3 py-1 text-sm"
            >
                <Plus className="h-4 w-4" /> Add Guest
            </button>
            </div>
            <PeopleTable role="guest" eventId={eventId} onPersonClick={onPersonClick} />
        </TabsContent>
        </Tabs>
    )
}
