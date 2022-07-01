import { CalendarDate, WeekDay } from "./types";

export class Clock implements CalendarDate {
  static DAYS: WeekDay[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  public static from(calendarDate: CalendarDate): Clock {
    return new Clock(calendarDate);
  }

  static incrementDay(day: WeekDay): WeekDay {
    return Clock.mapToDay(Clock.mapToNumber(day) + 1);
  }

  get day(): WeekDay {
    return Clock.mapToDay(this.jsDate.getDay() + 6);
  }

  get date(): number {
    return this.jsDate.getDate();
  }

  get month(): number {
    return this.jsDate.getMonth() + 1;
  }

  get year(): number {
    return this.jsDate.getFullYear();
  }

  public toCalendar(): CalendarDate {
    return Clock.jsDateToCalendar(this.jsDate);
  }

  public isAfter({ date, year, month }: CalendarDate) {
    return this.jsDate.valueOf() > new Date(year, month - 1, date).valueOf();
  }

  public add(numberOfDays: number): Clock {
    const date = new Date(this.jsDate.valueOf());
    date.setDate(date.getDate() + numberOfDays);
    return Clock.fromJsDate(date);
  }

  private jsDate: Date;

  private constructor({ date, month, year, day }: CalendarDate) {
    this.jsDate = new Date(year, month - 1, date);
    if (day !== this.day) {
      throw new Error(
        `${date}/${month}/${year} was a ${this.day}, not a ${day}`
      );
    }
  }

  private static fromJsDate(date: Date): Clock {
    return new Clock(Clock.jsDateToCalendar(date));
  }

  private static jsDateToCalendar(date: Date): CalendarDate {
    return {
      day: Clock.mapToDay(date.getDay() + 6),
      date: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    };
  }

  private static mapToNumber(day: WeekDay): number {
    return Clock.DAYS.indexOf(day);
  }

  private static mapToDay(number: number): WeekDay {
    return Clock.DAYS[number % 7];
  }
}
