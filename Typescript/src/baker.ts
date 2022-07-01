import { Clock } from "./clock";
import { CalendarDate, Size, WeekDay } from "./types";
import { Worker } from "./worker";

export class Baker extends Worker {
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
    startDay: CalendarDate,
    size: Size,
    isMorningOrder?: boolean
  ): CalendarDate {
    const fullDaysOfWorkRequired = size === "big" ? 3 : 2;

    const daysToDoWork = this.calculateDaysToDoWork(
      startDay.day,
      fullDaysOfWorkRequired,
      isMorningOrder
    );
    return Clock.from(startDay).add(daysToDoWork).toCalendar();
  }

  addNuts(orderDate: CalendarDate, withNuts?: boolean): CalendarDate {
    if (!withNuts) return orderDate;
    const daysToDoWork = this.calculateDaysToDoWork(orderDate.day, 1);
    return Clock.from(orderDate).add(daysToDoWork).toCalendar();
  }
}
