import { Baker } from "./baker";
import { Clock } from "./clock";
import { Decorator } from "./decorator";
import { CalendarDate, Size } from "./types";

function calculateFinishDate(
  startDate: Clock,
  size: "small" | "big",
  isMorningOrder: boolean | undefined,
  hasCustomFrosting: boolean | undefined,
  withNuts: boolean | undefined,
  withFancyBox: boolean | undefined
) {
  const boxArrival = maybeOrderBox(startDate, withFancyBox);
  const baked = new Baker().bake(startDate, size, isMorningOrder);
  const decorated = new Decorator().decorate(baked, hasCustomFrosting);
  const finished = new Baker().addNuts(decorated, withNuts);
  if (boxArrival.isAfter(finished)) {
    return boxArrival;
  }
  return finished;
}

function isDuringChristmas(finished: Clock): boolean {
  const lastOpenDayOfTheYear = Clock.from({
    date: 22,
    month: 12,
    year: finished.year,
  });

  const firstOpenDayOfTheYear = Clock.from({
    date: 2,
    month: 1,
    year: finished.year + 1,
  });

  return (
    finished.isAfter(lastOpenDayOfTheYear) &&
    firstOpenDayOfTheYear.isAfter(finished)
  );
}

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
  let finished = calculateFinishDate(
    startDate,
    size,
    isMorningOrder,
    hasCustomFrosting,
    withNuts,
    withFancyBox
  );

  if (isDuringChristmas(finished)) {
    finished = calculateFinishDate(
      Clock.from({ date: 2, month: 1, year: startDate.year + 1 }),
      size,
      true,
      hasCustomFrosting,
      withNuts,
      false
    );
  }

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
