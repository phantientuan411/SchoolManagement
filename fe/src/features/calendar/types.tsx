// types.ts

export type Section = "SÁNG" | "CHIỀU" | "TỐI";

export interface EventItem {
  _id: string;
  subject: string;
  teacher: string;
  room: string;
  type: string;
  note?: string;
  period: string; // e.g., "1-3"
  section: Section;
  weekRange:any
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  day?: number;      // 0-6 (Thứ Hai → Chủ Nhật)
}

export interface DayEvents {
  day: number;            // 0-6
  events: EventItem[];    // list of events for that day
}