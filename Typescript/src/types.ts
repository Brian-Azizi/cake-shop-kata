import { Clock } from "./clock";

export type Size = "small" | "big";

export type WeekDay =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export interface CalendarDate {
  day: WeekDay;
  date: number;
  month: number;
  year: number;
}
