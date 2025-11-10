import { describe, it, expect } from "vitest";
import { parseSchedule } from "@/domain/parse";

describe("parseSchedule", () => {
  it("parses weekly with BYDAY and COUNT", () => {
    const r = parseSchedule("FREQ=WEEKLY;BYDAY=MO,WE;COUNT=5;PRIO=H;WIP<=3");
    expect(r).toMatchObject({
      freq: "WEEKLY",
      byDay: ["MO", "WE"],
      count: 5,
      prio: "H",
      wipMax: 3,
    });
  });

  it("throws on bad day code", () => {
    expect(() => parseSchedule("FREQ=WEEKLY;BYDAY=XX")).toThrow();
  });
});