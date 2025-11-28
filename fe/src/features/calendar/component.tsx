// components.tsx
// Chứa WeekView, ListView, SearchView, AddView và helpers liên quan trực tiếp đến UI component

import React, { useState } from "react";

// ---------------------- Types ----------------------
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

// ---------------------- WeekView ----------------------
export function WeekView({ events }: { events: EventItem[] }) {
  const grid = buildGridMap(events);

  return (
    <div className="p-6">
      <div className="overflow-auto max-h-[600px]">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border w-[120px]">Ca học</th>
              {DAY_LABELS.map((d) => (
                <th key={d} className="border p-3">{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SECTIONS.map((sec) => (
              <tr key={sec} className="h-[120px]">
                <td className="border p-3 font-semibold bg-gray-50">{sec}</td>
                {Array.from({ length: 7 }).map((_, d) => (
                  <td key={d} className="border align-top p-2 min-h-[120px]">
                    {grid[d][sec].length ? (
                      grid[d][sec].map((ev) => (
                        <div
                          key={ev._id}
                          className="mb-2 p-2 border rounded bg-white shadow-sm"
                        >
                          <div className="font-bold text-sm">{ev.subject}</div>
                          <div className="text-xs text-gray-600">{ev.teacher} • {ev.className}</div>
                          <div className="text-xs text-gray-500">{ev.period} {ev.room && `• ${ev.room}`}</div>
                        </div>
                      ))
                    ) : (
                      <div className="text-gray-400 text-xs">—</div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---------------------- ListView ----------------------
export function ListView({ events, onDelete }: { events: EventItem[]; onDelete: (id?: string) => void }) {
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">Danh sách TKB</h3>

      <div className="border rounded-lg overflow-hidden">
        {events.length === 0 && (
          <div className="p-3 text-gray-500">Chưa có dữ liệu</div>
        )}

        {events.map((e) => (
          <div
            key={e._id}
            className="flex justify-between items-center p-3 border-b hover:bg-gray-50"
          >
            <div>
              <div className="font-semibold">{e.subject}</div>
              <div className="text-sm text-gray-500">
                {DAY_LABELS[e.day]} • {e.section}
              </div>
            </div>

            <button
              onClick={() => onDelete(e._id)}
              className="text-red-600 hover:underline"
            >
              Xóa
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------- SearchView ----------------------
export function SearchView({ onSearch, events }: { onSearch: (q: any) => void; events: EventItem[] }) {
  const [q, setQ] = useState("");

  return (
    <div className="p-4">
      <div className="flex gap-2 mb-3">
        <input
          className="border p-2 rounded w-64"
          placeholder="Tìm môn/giáo viên"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button
          onClick={() => onSearch({ q })}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Tìm
        </button>
      </div>

      <WeekView events={events} />
    </div>
  );
}

// ---------------------- AddView ----------------------
export function AddView({ onAdd }: { onAdd: (payload: Partial<EventItem>) => Promise<void> }) {
  const [form, setForm] = useState<Partial<EventItem>>({ day: 0, section: "SÁNG", period: "1-1" });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    await onAdd(form);
    setForm({ day: 0, section: "SÁNG", period: "1-1" });
    alert("Đã thêm");
  }

  return (
    <form onSubmit={submit} className="p-4">
      <div className="grid grid-cols-2 gap-3">
        <input className="border p-2" placeholder="Môn" value={form.subject || ""} onChange={(e) => setForm({ ...form, subject: e.target.value })} />

        <input className="border p-2" placeholder="Giáo viên" value={form.teacher || ""} onChange={(e) => setForm({ ...form, teacher: e.target.value })} />

        <select className="border p-2" value={String(form.day)} onChange={(e) => setForm({ ...form, day: Number(e.target.value) })}>
          {DAY_LABELS.map((d, i) => (
            <option key={i} value={i}>{d}</option>
          ))}
        </select>

        <select className="border p-2" value={form.section} onChange={(e) => setForm({ ...form, section: e.target.value as any })}>
          {SECTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <input type="date" className="border p-2" value={form.startDate as any || ""} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />

        <input type="date" className="border p-2" value={form.endDate as any || ""} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
      </div>

      <div className="mt-4">
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Thêm</button>
      </div>
    </form>
  );
}
