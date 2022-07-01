import { Baker } from "./baker";
import { Decorator } from "./decorator";

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

interface OrderOptions {
  orderDate: CalendarDate;
  size: Size;
  isMorningOrder?: boolean;
  hasCustomFrosting?: boolean;
}

export function order({
  orderDate,
  size,
  hasCustomFrosting,
  isMorningOrder,
}: OrderOptions): CalendarDate {
  const bakedDate = new Baker().bake(orderDate, size, isMorningOrder);
  const decoratedDate = new Decorator().decorate(bakedDate, hasCustomFrosting);
  return decoratedDate;
}
