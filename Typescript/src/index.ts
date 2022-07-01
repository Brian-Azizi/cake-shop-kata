import { Baker } from "./baker";
import { Clock } from "./clock";
import { Decorator } from "./decorator";
import { CalendarDate, Size } from "./types";

export function order({
  orderDate,
  size,
  hasCustomFrosting,
  isMorningOrder,
  withFancyBox,
  withNuts,
}: OrderOptions): CalendarDate {
  const boxArrival = maybeOrderBox(orderDate, withFancyBox);
  const baked = new Baker().bake(orderDate, size, isMorningOrder);
  const decorated = new Decorator().decorate(baked, hasCustomFrosting);
  const finished = new Baker().addNuts(decorated, withNuts);

  if (Clock.from(boxArrival).isAfter(finished)) {
    return boxArrival;
  }
  return finished;
}

interface OrderOptions {
  orderDate: CalendarDate;
  size: Size;
  isMorningOrder?: boolean;
  hasCustomFrosting?: boolean;
  withFancyBox?: boolean;
  withNuts?: boolean;
}

function maybeOrderBox(
  orderDate: CalendarDate,
  withFancyBox?: boolean
): CalendarDate {
  if (!withFancyBox) return orderDate;
  return Clock.from(orderDate).add(2).toCalendar();
}
