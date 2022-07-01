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

type OrderTime = "Morning" | "Afternoon";

export function order(
  size: Size,
  orderDate: OrderDate,
  orderTime: OrderTime = "Afternoon"
): DeliveryDate {
  const clock = new Clock(orderDate);
  let leadTime = size === "small" ? 2 : 3;
  if (orderTime === "Morning") {
    leadTime -= 1;
  }
  clock.add(leadTime);
  return clock.toCalendar();
}
