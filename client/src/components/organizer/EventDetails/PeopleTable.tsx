import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { usePersons } from "@/hooks/usePersons"
import type { Person } from "@/types/person.types"

interface Props {
    role: "attendee" | "judge" | "guest"
    eventId: string
    onPersonClick: (person: Person) => void
}

export function PeopleTable({ role, eventId, onPersonClick }: Props) {
    const { data = [], isLoading } = usePersons(role, eventId)
    console.log("data",data);
    
    const getStatusBadge = (status: Person["ticketStatus"]) => {
        const colors = {
        valid: "bg-green-100 text-green-800",
        used: "bg-gray-100 text-gray-800",
        invalid: "bg-red-100 text-red-800",
        }
        return <Badge className={colors[status]}>{status}</Badge>
    }

    if (isLoading) {
        return (
        <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
        )
    }

    return (
        <Card>
        <CardContent className="p-0">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Ticket Status</TableHead>
                <TableHead>Registered</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((person: Person) => (
                <TableRow key={person.id} className="cursor-pointer hover:bg-muted/50"
                    onClick={() => onPersonClick(person)}>
                    <TableCell className="font-medium">{person.name}</TableCell>
                    <TableCell>{person.email}</TableCell>
                    <TableCell><Badge variant="outline">{person.role}</Badge></TableCell>
                    <TableCell>{getStatusBadge(person.ticketStatus)}</TableCell>
                    <TableCell>{new Date(person.createdAt).toLocaleDateString()}</TableCell>
                </TableRow>
                ))}
                {data.length === 0 && (
                <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No {role} registered yet
                    </TableCell>
                </TableRow>
                )}
            </TableBody>
            </Table>
        </CardContent>
        </Card>
    )
}
