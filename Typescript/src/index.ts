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
  isMorningOrder?: boolean;
  hasCustomFrosting?: boolean;
}

const bake = (
  size: Size,
  orderDay: WeekDay,
  isMorningOrder?: boolean
): number => {
  function isWorkday(day: WeekDay): boolean {
    const WORK_DAYS: WeekDay[] = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
    ];
    return WORK_DAYS.includes(day);
  }

  let remainingDaysOfWork = size === "big" ? 3 : 2;
  let today = orderDay;
  let daysPassed = 0;

  if (isWorkday(today) && isMorningOrder) {
    remainingDaysOfWork--;
    today = Clock.incrementDayByN(today, 1);
  }
  while (remainingDaysOfWork > 0) {
    if (isWorkday(today)) {
      remainingDaysOfWork--;
    }
    today = Clock.incrementDayByN(today, 1);
    daysPassed++;
  }

  return daysPassed;
};

const decorate = (orderDay: WeekDay, hasCustomFrosting?: boolean): number => {
  function isWorkday(day: WeekDay): boolean {
    const WORK_DAYS: WeekDay[] = [
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return WORK_DAYS.includes(day);
  }
  if (!hasCustomFrosting) {
    return 0;
  }

  let remainingDaysOfWork = 1;
  let today = orderDay;
  let daysPassed = 0;

  if (!isWorkday(today)) {
    today = Clock.incrementDayByN(today, 1);
    daysPassed++;
  }

  while (remainingDaysOfWork > 0) {
    if (isWorkday(today)) {
      remainingDaysOfWork--;
    }
    today = Clock.incrementDayByN(today, 1);
    daysPassed++;
  }

  return daysPassed;
};

export function order({
  orderDate,
  size,
  hasCustomFrosting,
  isMorningOrder,
}: OrderOptions): DeliveryDate {
  const b = bake(size, orderDate.day, isMorningOrder);
  const d = decorate(
    Clock.incrementDayByN(orderDate.day, b),
    hasCustomFrosting
  );
  return new Clock(orderDate).add(b + d).toCalendar();
}
