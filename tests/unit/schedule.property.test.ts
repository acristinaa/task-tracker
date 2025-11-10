import { describe, it, expect } from "vitest";
import { parseSchedule } from "@/domain/parse";
import { addDays } from "date-fns";
import { expandOccurrences } from "@/domain/schedule";

function rndInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

describe("expandOccurrences monotonicity", () => {
  it("non-decreasing with larger window", () => {
    for (let i = 0; i < 20; i++) {
      const by = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];
      const pick = by.slice(0, rndInt(0, 7)).join(",");
      const count = rndInt(1, 8);
      const r = parseSchedule(`FREQ=WEEKLY;BYDAY=${pick};COUNT=${count}`)!;
      const start = new Date(2025, 0, 1);
      const a = expandOccurrences(r, start, addDays(start, 7));
      const b = expandOccurrences(r, start, addDays(start, 30));
      expect(b.length).toBeGreaterThanOrEqual(a.length);
    }
  });
});