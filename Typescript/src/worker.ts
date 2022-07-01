import { Clock } from "./clock";
import { WeekDay } from "./index";

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
      today = Clock.incrementDay(today);
      daysPassed++;
    }

    return daysPassed;
  }
}
