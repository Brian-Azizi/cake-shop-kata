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

  protected calculateDaysToDoWork(
    startDay: WeekDay,
    fullDaysRequired: number
  ): number {
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
  private static WORK_DAYS: WeekDay[] = [
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  constructor() {
    super(Decorator.WORK_DAYS);
  }

  public decorate(startDay: Calendar, hasCustomFrosting?: boolean): Calendar {
    if (!hasCustomFrosting) return startDay;
    const daysToDoWork = this.calculateDaysToDoWork(startDay.day, 2);
    return new Clock(startDay).add(daysToDoWork).toCalendar();
  }
}

class Baker extends Worker {
  static WORK_DAYS: WeekDay[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  constructor() {
    super(Baker.WORK_DAYS);
  }

  public bake(
    startDay: Calendar,
    size: Size,
    isMorningOrder?: boolean
  ): Calendar {
    let fullDaysOfWorkRequired = size === "big" ? 3 : 2;
    if (!isMorningOrder) fullDaysOfWorkRequired++;

    const daysToDoWork = this.calculateDaysToDoWork(
      startDay.day,
      fullDaysOfWorkRequired
    );
    return new Clock(startDay).add(daysToDoWork).toCalendar();
  }
}

export function order({
  orderDate,
  size,
  hasCustomFrosting,
  isMorningOrder,
}: OrderOptions): DeliveryDate {
  const bakedDate = new Baker().bake(orderDate, size, isMorningOrder);
  const decoratedDate = new Decorator().decorate(bakedDate, hasCustomFrosting);
  return decoratedDate;
}
