// Timetable.tsx - hiển thị thời khóa biểu theo tuần
import React from "react";
import {type EventItem,type DayEvents } from "./types";

interface TimetableProps {
  events: EventItem[];
}

export default function Timetable({ events }: TimetableProps) {
  const grouped: Record<string, DayEvents[]> = {};

  events.forEach((ev) => {
    if (!grouped[ev.weekRange]) grouped[ev.weekRange] = [];
    if (!grouped[ev.weekRange][ev.day]) grouped[ev.weekRange][ev.day] = { day: ev.day, items: [] };
    grouped[ev.weekRange][ev.day].items.push(ev);
  });

  return (
    <div className="p-4 space-y-6">
      {Object.keys(grouped).map((range) => (
        <div key={range} className="border p-4 rounded-xl shadow bg-white">
          <h2 className="text-xl font-bold mb-3">Tuần: {range}</h2>
          <div className="grid grid-cols-7 gap-3">
            {grouped[range].map((day, idx) => (
              <div key={idx} className="border rounded-xl p-3 min-h-[160px] bg-gray-50">
                <div className="font-semibold mb-2">Ngày {day.day}</div>
                {day.items.map((item, j) => (
                  <div key={j} className="p-2 bg-white border rounded-lg shadow-sm mb-2">
                    <div className="font-bold">{item.subject}</div>
                    <div className="text-sm opacity-80">{item.teacher}</div>
                    <div className="text-sm">Tiết: {item.period}</div>
                    <div className="text-sm">Buổi: {item.section}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}