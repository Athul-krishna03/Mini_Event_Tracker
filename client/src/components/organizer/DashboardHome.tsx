"use client";
import { Calendar,MapPin,Users,Clock,ArrowRight} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { AddEventModal } from "./AddEventModal";
import { useEvents } from "@/hooks/useEvents";
import { useCreateEvent } from "@/hooks/useCreateEvent";

interface IEvent {
    _id: string;
    title: string;
    venue: string;
    description: string;
    date: Date;
    createdBy: string;
    capacity: number;
    programs: string[];
}

interface DisplayEvent extends IEvent {
  status: "upcoming" | "ongoing" | "past";
  attendees: number;
}

function EventCard({ event }: { event: DisplayEvent }) {
  console.log("event ",event)
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 border-border/50 hover:border-accent/20">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="font-sans text-lg font-bold text-foreground group-hover:text-accent transition-colors">
            {event.title}
          </CardTitle>
        </div>
        {event.description && (
          <p className="text-sm text-muted-foreground mt-1">
            {event.description}
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{formatTime(event.date)}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{event.venue}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>
              {event.attendees}/{event.capacity}
            </span>
          </div>
        </div>

        {event.programs.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {event.programs.slice(0, 2).map((program, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {program}
              </Badge>
            ))}
            {event.programs.length > 2 && (
              <Badge variant="secondary" className="text-xs">
                +{event.programs.length - 2} more
              </Badge>
            )}
          </div>
        )}

        <div className="pt-2">
          <Link to={`/event/${event._id}`}>
            <Button
              variant="outline"
              size="sm"
              className="w-full group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent transition-all bg-transparent"
            >
              View Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}


function EventTabContent({ status, title }: { status: "upcoming" | "ongoing" | "past"; title: string }) {
    const { data, isLoading, error } = useEvents(status);

    if (isLoading) {
        return (
        <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
        </div>
        );
    }

    if (error) {
        return <div className="text-red-500">Failed to load events</div>;
    }

    if (!data?.events || data.events.length === 0) {
        return (
        <Card className="border-dashed border-2 border-border/50">
            <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
                <p className="text-muted-foreground mb-2">
                No {title.toLowerCase()} found
                </p>
                <p className="text-sm text-muted-foreground">
                Events will appear here when available
                </p>
            </div>
            </CardContent>
        </Card>
        );
    }

    return (
        <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h2 className="font-sans text-xl font-bold text-foreground">{title}</h2>
            <Badge variant="secondary" className="bg-muted text-muted-foreground">
            {data.totalEvents} {data.totalEvents === 1 ? "event" : "events"}
            </Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.events.map((event: any) => (
            <EventCard key={event._id} event={event} />
            ))}
        </div>
        </div>
    );
}

export function DashboardHome() {
    const { mutate: addEvent } = useCreateEvent();
    const handleAddEvent = (eventData: Omit<IEvent, "_id" | "createdBy">) => {
        addEvent(eventData);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
            <div className="flex items-center justify-between">
            <div>
                <h1 className="font-sans text-3xl font-bold text-foreground mb-2">
                Event Dashboard
                </h1>
                <p className="text-muted-foreground">
                Manage and track all your events in one place
                </p>
            </div>
            <AddEventModal onAddEvent={handleAddEvent} />
            </div>
        </div>

        <Tabs defaultValue="ongoing" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger
                value="ongoing"
                className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
            >
                Ongoing
            </TabsTrigger>
            <TabsTrigger
                value="upcoming"
                className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
            >
                Upcoming
            </TabsTrigger>
            <TabsTrigger
                value="past"
                className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
            >
                Past
            </TabsTrigger>
            </TabsList>

            <TabsContent value="ongoing">
            <EventTabContent status="ongoing" title="Ongoing Events" />
            </TabsContent>

            <TabsContent value="upcoming">
            <EventTabContent status="upcoming" title="Upcoming Events" />
            </TabsContent>

            <TabsContent value="past">
            <EventTabContent status="past" title="Past Events" />
            </TabsContent>
        </Tabs>
        </div>
    );
}
