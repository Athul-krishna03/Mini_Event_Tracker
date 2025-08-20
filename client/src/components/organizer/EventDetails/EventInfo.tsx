import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { IEvent } from "@/types/event.types"
import { Calendar, MapPin, Users2 } from "lucide-react"

export function EventInfo({ event }: { event: IEvent }) {
    return (
        <div className="space-y-4">
        <div className="flex items-start justify-between">
            <div>
            <h1 className="text-3xl font-bold">{event.title}</h1>
            <p className="text-muted-foreground mt-1">{event.description}</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Date & Venue</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-sm">
                <p className="font-medium">{new Date(event.date).toLocaleDateString()}</p>
                <p className="text-muted-foreground flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3" />
                    {event.venue}
                </p>
                </div>
            </CardContent>
            </Card>

            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Capacity</CardTitle>
                <Users2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{event.capacity}</div>
                <p className="text-xs text-muted-foreground">Total capacity</p>
            </CardContent>
            </Card>

            <Card>
            <CardHeader>
                <CardTitle className="text-sm font-medium">Programs</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{event?.programs?.length}</div>
                <p className="text-xs text-muted-foreground">Active programs</p>
            </CardContent>
            </Card>
        </div>
        </div>
    )
}
