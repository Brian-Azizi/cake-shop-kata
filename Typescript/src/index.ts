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
  const boxArrival = maybeOrderBox(orderDate, withFancyBox);
  const baked = new Baker().bake(orderDate, size, isMorningOrder);
  const finished = new Decorator().decorate(baked, hasCustomFrosting);

  if (Clock.from(boxArrival).isAfter(finished)) {
    return boxArrival;
  }
  return finished;
}

function maybeOrderBox(
  orderDate: CalendarDate,
  withFancyBox?: boolean
): CalendarDate {
  if (!withFancyBox) return orderDate;
  return Clock.from(orderDate).add(2).toCalendar();
}
