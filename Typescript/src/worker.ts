import { Clock } from "./clock";
import { WeekDay } from "./types";

export class Worker {
  private readonly workDays: WeekDay[];

  constructor(workDays: WeekDay[]) {
    this.workDays = workDays;
  }

  private isWorkday(day: WeekDay) {
    return this.workDays.includes(day);
  }

  protected calculateDaysToDoWork(
    startDay: WeekDay,
    fullDaysRequired: number,
    startWorkOnSameDay?: boolean
  ): number {
    let remainingDaysOfWork = fullDaysRequired;
    let today = startDay;
    let daysPassed = 0;

    if (this.isWorkday(today) && startWorkOnSameDay) {
      remainingDaysOfWork--;
      today = Clock.incrementDay(today);
    }

    while (remainingDaysOfWork > 0) {
      if (this.isWorkday(today)) {
        remainingDaysOfWork--;
        daysPassed++;
      }
      if (remainingDaysOfWork === 0) {
        break;
      }
      today = Clock.incrementDay(today);
    }

    return daysPassed;
  }
}
