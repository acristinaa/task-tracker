export type UUID = string;
export type Priority = "L" | "M" | "H";

export interface Task {
  id: UUID;
  user_id: UUID;
  title: string;
  description?: string | null;
  status: "todo" | "doing" | "done";
  priority: Priority;
  rule?: string | null;
  depends_on?: UUID | null;
  due_date?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Rule {
  freq?: "DAILY" | "WEEKLY" | "MONTHLY";
  count?: number;
  byDay?: Array<"MO" | "TU" | "WE" | "TH" | "FR" | "SA" | "SU">;
  prio?: Priority;
  wipMax?: number;
}