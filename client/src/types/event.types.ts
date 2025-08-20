export interface IEvent {
    id: string
    title: string
    venue: string
    description: string
    date: Date
    capacity: number
    programs?: string[]
}