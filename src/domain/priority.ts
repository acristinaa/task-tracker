import type { Priority } from "./types";

export function cmpPriority(a: Priority, b: Priority): number {
  return score(b) - score(a);
}

export function agingFactor(_daysWaiting: number): number {
  throw new Error("Not done yet");
}

function score(p: Priority): number {
  return p === "H" ? 3 : p === "M" ? 2 : 1;
}