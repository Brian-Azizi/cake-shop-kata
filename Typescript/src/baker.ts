import { Clock } from "./clock";
import { Size, WeekDay } from "./types";
import { Worker } from "./worker";

export class Baker extends Worker {
  static WORK_DAYS: WeekDay[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  private static DAYS_FOR_SMALL_CAKE = 2;
  private static DAYS_FOR_BIG_CAKE = 3;
  private static DAYS_TO_ADD_NUTS = 1;

  constructor() {
    super(Baker.WORK_DAYS);
  }

  public bake(startDay: Clock, size: Size, isMorningOrder?: boolean): Clock {
    const fullDaysOfWorkRequired =
      size === "big" ? Baker.DAYS_FOR_BIG_CAKE : Baker.DAYS_FOR_SMALL_CAKE;

    const daysToDoWork = this.calculateDaysToDoWork(
      startDay.day,
      fullDaysOfWorkRequired,
      isMorningOrder
    );

    return startDay.add(daysToDoWork);
  }

  addNuts(orderDate: Clock, withNuts?: boolean): Clock {
    if (!withNuts) return orderDate;
    const daysToDoWork = this.calculateDaysToDoWork(
      orderDate.day,
      Baker.DAYS_TO_ADD_NUTS
    );
    return orderDate.add(daysToDoWork);
  }
}
