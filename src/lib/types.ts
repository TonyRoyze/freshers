export interface Event {
    id: string
    event_id?: number
    faculty_id?: number
    name: string
    time: string
    points?: number
    heat?: number
    lane?: number
}

export interface Points {
    rank: number;
    name: string,
    points: number
}

