import { addDays, startOfDay, isWithinInterval } from "date-fns";
import type { Rule } from "@/domain/types";

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
  let current = startOfDay(seed);
  const max = rule.count ?? 10;

  for (let i = 0; i < max; i++) {
    if (isWithinInterval(current, { start: windowStart, end: windowEnd })) {
    }
    current = addDays(
      current,
      rule.freq === "DAILY" ? 1 : rule.freq === "WEEKLY" ? 7 : 30
    );
  }
  return out;
}
