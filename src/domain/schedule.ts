import {
  addDays,
  addWeeks,
  addMonths,
  startOfDay,
  isWithinInterval,
} from "date-fns";
import type { Rule } from "./types";

export interface Occurrence {
  date: Date;
}

export function expandOccurrences(
  rule: Rule | null,
  windowStart: Date,
  windowEnd: Date,
  seed = new Date()
): Occurrence[] {
  if (!rule || !rule.freq) return [];
  const out: Occurrence[] = [];
  let current = startOfUnit(seed, rule);
  let produced = 0;
  const max = rule.count ?? 50;

  while (produced < max && current <= windowEnd) {
    if (
      isWithinInterval(current, { start: windowStart, end: windowEnd }) &&
      matchesByDay(current, rule)
    ) {
      out.push({ date: current });
      produced++;
    }
    current = nextTick(current, rule);
  }
  return out;
}

function startOfUnit(d: Date, _r: Rule): Date {
  return startOfDay(d);
}

function nextTick(d: Date, r: Rule): Date {
  if (!r.freq) throw new Error("No frequency");
  switch (r.freq) {
    case "DAILY":
      return addDays(d, 1);
    case "WEEKLY":
      return addWeeks(d, 1);
    case "MONTHLY":
      return addMonths(d, 1);
  }
}

function matchesByDay(d: Date, r: Rule): boolean {
  if (!r.byDay || r.byDay.length === 0) return true;
  const map = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"] as const;
  const day = map[d.getDay()];
  return r.byDay.includes(
    day as "MO" | "TU" | "WE" | "TH" | "FR" | "SA" | "SU"
  );
}
