import { Clock } from "./clock";
import { CalendarDate, WeekDay } from "./types";
import { Worker } from "./worker";

export class Decorator extends Worker {
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

  public decorate(
    startDay: CalendarDate,
    hasCustomFrosting?: boolean
  ): CalendarDate {
    if (!hasCustomFrosting) return startDay;
    const daysToDoWork = this.calculateDaysToDoWork(startDay.day, 2);
    return Clock.from(startDay).add(daysToDoWork).toCalendar();
  }
}
