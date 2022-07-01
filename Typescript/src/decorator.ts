import { Clock } from "./clock";
import { WeekDay } from "./types";
import { Worker } from "./worker";

export class Decorator extends Worker {
  private static WORK_DAYS: WeekDay[] = [
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  private static DAYS_TO_ADD_FROSTIC = 2;

  constructor() {
    super(Decorator.WORK_DAYS);
  }

  public decorate(startDay: Clock, hasCustomFrosting?: boolean): Clock {
    if (!hasCustomFrosting) return startDay;
    const daysToDoWork = this.calculateDaysToDoWork(
      startDay.day,
      Decorator.DAYS_TO_ADD_FROSTIC
    );
    return startDay.add(daysToDoWork);
  }
}
