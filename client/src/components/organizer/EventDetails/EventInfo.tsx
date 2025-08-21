import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { IEvent } from "@/types/event.types"
import { Calendar, MapPin, Users2, ListChecks } from "lucide-react"

export function EventInfo({ event }: { event: IEvent }) {
    return (
        <Card className="shadow-md border">
        <CardHeader>
            <h1 className="text-2xl font-bold">{event.title}</h1>
            <p className="text-muted-foreground text-sm mt-1">{event.description}</p>
        </CardHeader>

        <CardContent className="space-y-6">
            {/* Date & Venue */}
            <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground mt-1" />
            <div>
                <p className="font-medium">Date</p>
                <p className="text-sm text-muted-foreground">
                {new Date(event.date).toLocaleDateString(undefined, {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })}
                </p>
                <p className="mt-2 font-medium">Venue</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="h-4 w-4" /> {event.venue}
                </p>
            </div>
            </div>

            {/* Capacity */}
            <div className="flex items-start gap-3">
            <Users2 className="h-5 w-5 text-muted-foreground mt-1" />
            <div>
                <p className="font-medium">Capacity</p>
                <p className="text-sm text-muted-foreground">
                {event.capacity} participants
                </p>
            </div>
            </div>

            {/* Programs List */}
            {event?.programs && event.programs.length > 0 && (
            <div className="flex items-start gap-3">
                <ListChecks className="h-5 w-5 text-muted-foreground mt-1" />
                <div>
                <p className="font-medium">Programs</p>
                <ul className="mt-2 list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {event.programs.map((program, idx) => (
                    <li key={idx}>{program}</li>
                    ))}
                </ul>
                </div>
            </div>
            )}
        </CardContent>
        </Card>
    )
}
