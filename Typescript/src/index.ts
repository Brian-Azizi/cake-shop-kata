import { Baker } from "./baker";
import { Clock } from "./clock";
import { Decorator } from "./decorator";
import { CalendarDate, Size } from "./types";

interface OrderOptions {
  orderDate: CalendarDate;
  size: Size;
  isMorningOrder?: boolean;
  hasCustomFrosting?: boolean;
  withFancyBox?: boolean;
  withNuts?: boolean;
}

export function order(orderOptions: OrderOptions): CalendarDate {
  const startDate = Clock.from(orderOptions.orderDate);

  let finished = calculateFinishDate(orderOptions);
  if (isDuringChristmas(finished)) {
    finished = calculateFinishDate({
      ...orderOptions,
      orderDate: Clock.from({ date: 2, month: 1, year: startDate.year + 1 }),
      isMorningOrder: true,
      withFancyBox: false,
    });
  }

  const boxArrival = maybeOrderBox(startDate, orderOptions.withFancyBox);
  if (boxArrival.isAfter(finished)) {
    return boxArrival.toCalendar();
  }

  return finished.toCalendar();
}

function calculateFinishDate({
  orderDate,
  isMorningOrder,
  withFancyBox,
  withNuts,
  hasCustomFrosting,
  size,
}: OrderOptions): Clock {
  const startDate = Clock.from(orderDate);
  const boxArrival = maybeOrderBox(startDate, withFancyBox);
  const baked = new Baker().bake(startDate, size, isMorningOrder);
  const decorated = new Decorator().decorate(baked, hasCustomFrosting);
  const finished = new Baker().addNuts(decorated, withNuts);
  if (boxArrival.isAfter(finished)) {
    return boxArrival;
  }
  return finished;
}

function isDuringChristmas(finishedDate: CalendarDate): boolean {
  const lastOpenDayOfTheYear = Clock.from({
    date: 22,
    month: 12,
    year: finishedDate.year,
  });

  const firstOpenDayOfTheYear = Clock.from({
    date: 2,
    month: 1,
    year: finishedDate.year + 1,
  });

  const finished = Clock.from(finishedDate);

  return (
    finished.isAfter(lastOpenDayOfTheYear) &&
    firstOpenDayOfTheYear.isAfter(finished)
  );
}

function maybeOrderBox(orderDate: Clock, withFancyBox?: boolean): Clock {
  if (!withFancyBox) return orderDate;
  const deliveryTime = 2;
  return orderDate.add(deliveryTime);
}
