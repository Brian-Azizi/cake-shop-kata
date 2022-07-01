import { Clock } from "./clock";

type Size = "small" | "big";

export type WeekDay =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export interface Calendar {
  day: WeekDay;
  date: number;
  month: number;
  year: number;
}

type OrderDate = Calendar;
type DeliveryDate = Calendar;

export function order(size: Size, orderDate: OrderDate): DeliveryDate {
  const clock = new Clock(orderDate);
  const leadTime = size === "small" ? 2 : 3;
  clock.add(leadTime);
  return clock.toCalendar();
}
