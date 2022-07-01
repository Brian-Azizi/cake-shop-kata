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
  const startDate = Clock.from(orderDate);

  const boxArrival = maybeOrderBox(startDate, withFancyBox);
  const baked = new Baker().bake(startDate, size, isMorningOrder);
  const decorated = new Decorator().decorate(baked, hasCustomFrosting);
  const finished = new Baker().addNuts(decorated, withNuts);

  if (boxArrival.isAfter(finished)) {
    return boxArrival.toCalendar();
  }

  return finished.toCalendar();
}

interface OrderOptions {
  orderDate: CalendarDate;
  size: Size;
  isMorningOrder?: boolean;
  hasCustomFrosting?: boolean;
  withFancyBox?: boolean;
  withNuts?: boolean;
}

function maybeOrderBox(orderDate: Clock, withFancyBox?: boolean): Clock {
  if (!withFancyBox) return orderDate;
  const deliveryTime = 2;
  return orderDate.add(deliveryTime);
}
