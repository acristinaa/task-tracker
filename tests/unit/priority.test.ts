import { describe, it, expect } from "vitest";
import { agingFactor, cmpPriority } from "@/domain/priority";

describe("priority", () => {
  it("cmpPriority orders H > M > L", () => {
    expect(cmpPriority("H", "M")).toBeLessThan(0);
    expect(cmpPriority("M", "L")).toBeLessThan(0);
  });

  it("agingFactor grows every 3 days and caps at 3", () => {
    expect(agingFactor(0)).toBe(1);
    expect(agingFactor(1)).toBe(1);
    expect(agingFactor(3)).toBe(2);
    expect(agingFactor(4)).toBe(2);
    expect(agingFactor(9)).toBe(3);
    expect(agingFactor(99)).toBe(3);
  });
});