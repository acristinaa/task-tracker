import type { Priority } from "./types";

export function cmpPriority(a: Priority, b: Priority): number {
  return score(b) - score(a);
}

export function agingFactor(daysWaiting: number): number {
  if (daysWaiting <= 0) return 1;
  return Math.min(3, 1 + Math.floor(daysWaiting / 3));
}

function score(p: Priority): number {
  return p === "H" ? 3 : p === "M" ? 2 : 1;
}