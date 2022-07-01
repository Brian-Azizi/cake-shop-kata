import { Baker } from "./baker";
import { Clock } from "./clock";
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
  withFancyBox?: boolean;
}

export function order({
  orderDate,
  size,
  hasCustomFrosting,
  isMorningOrder,
  withFancyBox,
}: OrderOptions): CalendarDate {
  const boxArrivalDate = withFancyBox
    ? getBoxArrivalDate(orderDate)
    : orderDate;
  const bakedDate = new Baker().bake(orderDate, size, isMorningOrder);
  const decoratedDate = new Decorator().decorate(bakedDate, hasCustomFrosting);
  if (new Clock(boxArrivalDate).greaterThan(decoratedDate)) {
    return boxArrivalDate;
  }
  return decoratedDate;
}

function getBoxArrivalDate(orderDate: CalendarDate): CalendarDate {
  return new Clock(orderDate).add(2).toCalendar();
}
