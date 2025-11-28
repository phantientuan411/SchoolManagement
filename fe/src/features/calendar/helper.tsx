// helpers.ts

// ---------------------- Types & constants ----------------------
export type EventItem = {
  _id?: string;
  subject?: string;
  day: number; // 0 = Mon ... 6 = Sun
  section: "SÁNG" | "CHIỀU" | "TỐI";
  period?: string;
  className?: string;
  teacher?: string;
  semester?: string;
  major?: string;
  room?: string;
  type?: "study" | "exam";
  note?: string;
  startDate?: string | Date;
  endDate?: string | Date;
};

export const SECTIONS = ["SÁNG", "CHIỀU", "TỐI"] as const;
export const DAY_LABELS = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "CN"];

// ---------------------- Helpers ----------------------
export function getISOWeek(date: Date) {
  const tmp = new Date(date.getTime());
  tmp.setHours(0, 0, 0, 0);
  tmp.setDate(tmp.getDate() + 3 - ((tmp.getDay() + 6) % 7));
  const week1 = new Date(tmp.getFullYear(), 0, 4);
  return (
    1 +
    Math.round(
      ((tmp.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7
    )
  );
}

export function getWeekRangeFromDate(date: Date) {
  const tmp = new Date(date.getTime());
  const day = tmp.getDay() === 0 ? 7 : tmp.getDay();
  const monday = new Date(tmp);
  monday.setDate(tmp.getDate() - (day - 1));
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  return { weekStart: monday, weekEnd: sunday };
}

export function filterEventsByWeek(events: EventItem[], year: number, week: number) {
  return events.filter((ev) => {
    if (!ev.startDate || !ev.endDate) return false;
    const start = new Date(ev.startDate);
    const end = new Date(ev.endDate);

    const startWeek = getISOWeek(start);
    const endWeek = getISOWeek(end);
    const startYear = start.getFullYear();
    const endYear = end.getFullYear();

    const targetIndex = year * 100 + week;
    const startIndex = startYear * 100 + startWeek;
    const endIndex = endYear * 100 + endWeek;

    return targetIndex >= startIndex && targetIndex <= endIndex;
  });
}

// ---------------------- Grid builder ----------------------
export function buildGridMap(events: EventItem[]) {
  const map: Record<number, Record<string, EventItem[]>> = {} as any;
  for (let d = 0; d < 7; d++) map[d] = { SÁNG: [], CHIỀU: [], TỐI: [] } as any;

  events.forEach((e) => {
    if (e.day == null) return;
    const sec = e.section || "SÁNG";
    if (!map[e.day]) map[e.day] = { SÁNG: [], CHIỀU: [], TỐI: [] } as any;
    (map[e.day][sec] = map[e.day][sec] || []).push(e);
  });

  return map;
}
