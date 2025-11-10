import React from "react";
import { parseSchedule } from "@/domain/parse";
import { expandOccurrences } from "@/domain/schedule";

export default async function Home() {
  // No DB yet
  const rule = parseSchedule("FREQ=WEEKLY;BYDAY=MO,WE;COUNT=6");
  const now = new Date();
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 21);
  const plan = expandOccurrences(rule, now, end, now);

  return (
    <main className="space-y-6">
      <section className="rounded-xl border bg-white p-4">
        <h2 className="text-lg font-semibold mb-2">Planned (next 3 weeks)</h2>
        <ul className="space-y-2">
          {plan.map((o, idx) => (
            <li
              key={idx}
              className="flex items-center justify-between border rounded p-2">
              <span>Occurrence #{idx + 1}</span>
              <span className="text-sm text-zinc-600">
                {o.date.toDateString()}
              </span>
            </li>
          ))}
          {plan.length === 0 && (
            <li className="text-sm text-zinc-500">No occurrences</li>
          )}
        </ul>
      </section>
    </main>
  );
}
