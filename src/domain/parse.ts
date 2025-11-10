import { InvalidRuleError } from "./errors";
import type { Rule, Priority } from "./types";

const DAYS = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"] as const;

export function parseSchedule(input?: string | null): Rule | null {
  if (!input) return null;
  const rule: Rule = {};
  for (const part of input.split(";")) {
    const [rawKey, rawVal] = part.split("=");
    const key = rawKey?.trim().toUpperCase();
    const val = rawVal?.trim();
    if (!key || val == null) continue;
    switch (key) {
      case "FREQ":
        if (!["DAILY", "WEEKLY", "MONTHLY"].includes(val))
          throw new InvalidRuleError(`Bad FREQ ${val}`);
        rule.freq = val as Rule["freq"];
        break;
      case "COUNT": {
        const n = Number(val);
        if (!Number.isInteger(n) || n < 1)
          throw new InvalidRuleError("COUNT must be positive integer");
        rule.count = n;
        break;
      }
      case "BYDAY": {
        const list = val
          .split(",")
          .map((v) => v.trim().toUpperCase())
          .filter(Boolean);
        if (!list.every((d) => (DAYS as readonly string[]).includes(d)))
          throw new InvalidRuleError("Bad BYDAY");
        rule.byDay = list as Rule["byDay"];
        break;
      }
      case "PRIO":
        if (!["L", "M", "H"].includes(val))
          throw new InvalidRuleError("Bad PRIO");
        rule.prio = val as Priority;
        break;
      default:
        if (key.startsWith("WIP")) {
          const m = val.match(/^(<=)?(\d+)$/);
          if (!m) throw new InvalidRuleError("Bad WIP");
          rule.wipMax = parseInt(m[2] ?? "0", 10);
        }
    }
  }
  return rule;
}