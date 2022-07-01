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

interface OrderOptions {
  orderDate: OrderDate;
  size: Size;
  morningOrder?: boolean;
  customFrosting?: boolean;
}

export function order({
  orderDate,
  size,
  customFrosting,
  morningOrder,
}: OrderOptions): DeliveryDate {
  const clock = new Clock(orderDate);
  let leadTime = size === "small" ? 2 : 3;
  if (morningOrder) {
    leadTime -= 1;
  }
  if (customFrosting) {
    leadTime += 1;
  }
  const deliveryDate = clock.add(leadTime);
  return deliveryDate.toCalendar();
}
