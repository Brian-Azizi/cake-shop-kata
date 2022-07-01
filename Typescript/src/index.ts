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

interface OrderOptions {
  orderDate: OrderDate;
  size: Size;
  isMorningOrder?: boolean;
  hasCustomFrosting?: boolean;
}

class Worker {
  private readonly workDays: WeekDay[];
  constructor(workDays: WeekDay[]) {
    this.workDays = workDays;
  }

  private isWorkday(day: WeekDay) {
    return this.workDays.includes(day);
  }

  calculateDaysToDoWork(startDay: WeekDay, fullDaysRequired: number): number {
    let remainingDaysOfWork = fullDaysRequired;
    let today = startDay;
    let daysPassed = 0;

    while (remainingDaysOfWork > 0) {
      if (this.isWorkday(today)) {
        remainingDaysOfWork--;
      }
      if (remainingDaysOfWork === 0) {
        break;
      }
      today = Clock.incrementDayByN(today, 1);
      daysPassed++;
    }

    return daysPassed;
  }
}

class Decorator extends Worker {
  private readonly hasCustomFrosting?: boolean;
  static WORK_DAYS: WeekDay[] = [
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  constructor(hasCustomFrosting?: boolean) {
    super(Decorator.WORK_DAYS);
    this.hasCustomFrosting = hasCustomFrosting;
  }

  calculateDaysToDoWork(startDay: WeekDay): number {
    if (!this.hasCustomFrosting) return 0;
    return super.calculateDaysToDoWork(startDay, 2);
  }
}

class Baker extends Worker {
  private readonly isMorningOrder?: boolean;
  private readonly size: Size;

  static WORK_DAYS: WeekDay[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  constructor(size: Size, isMorningOrder?: boolean) {
    super(Baker.WORK_DAYS);
    this.isMorningOrder = isMorningOrder;
    this.size = size;
  }

  calculateDaysToDoWork(startDay: WeekDay): number {
    let fullDaysOfWorkRequired = this.size === "big" ? 3 : 2;
    if (!this.isMorningOrder) fullDaysOfWorkRequired++;

    return super.calculateDaysToDoWork(startDay, fullDaysOfWorkRequired);
  }
}

export function order({
  orderDate,
  size,
  hasCustomFrosting,
  isMorningOrder,
}: OrderOptions): DeliveryDate {
  const baker = new Baker(size, isMorningOrder);
  const b = baker.calculateDaysToDoWork(orderDate.day);
  const decorator = new Decorator(hasCustomFrosting);
  const d = decorator.calculateDaysToDoWork(
    Clock.incrementDayByN(orderDate.day, b)
  );
  return new Clock(orderDate).add(b + d).toCalendar();
}
