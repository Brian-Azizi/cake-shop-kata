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
    let fullDaysOfWorkRequired = size === "big" ? 3 : 2;
    if (!isMorningOrder) fullDaysOfWorkRequired++;

    const daysToDoWork = this.calculateDaysToDoWork(
      startDay.day,
      fullDaysOfWorkRequired
    );
    return Clock.from(startDay).add(daysToDoWork).toCalendar();
  }
}
