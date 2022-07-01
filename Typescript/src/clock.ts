import { CalendarDate, WeekDay } from "./types";

export class Clock {
  private jsDate: Date;

  static DAYS: WeekDay[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  private constructor({ date, month, year }: CalendarDate) {
    this.jsDate = new Date(year, month - 1, date);
  }

  public static from(calendarDate: CalendarDate): Clock {
    return new Clock(calendarDate);
  }

  private static fromJsDate(date: Date): Clock {
    return new Clock(Clock.jsDateToCalendar(date));
  }

  public toCalendar(): CalendarDate {
    return Clock.jsDateToCalendar(this.jsDate);
  }

  private static jsDateToCalendar(date: Date): CalendarDate {
    return {
      day: Clock.mapToDay(date.getDay() + 6),
      date: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    };
  }

  public add(numberOfDays: number): Clock {
    const date = new Date(this.jsDate.valueOf());
    date.setDate(date.getDate() + numberOfDays);
    return Clock.fromJsDate(date);
  }

  private static mapToNumber(day: WeekDay): number {
    return Clock.DAYS.indexOf(day);
  }

  private static mapToDay(number: number): WeekDay {
    return Clock.DAYS[number % 7];
  }

  static incrementDay(day: WeekDay): WeekDay {
    return Clock.mapToDay(Clock.mapToNumber(day) + 1);
  }

  public isAfter({ date, year, month }: CalendarDate) {
    return this.jsDate.valueOf() > new Date(year, month - 1, date).valueOf();
  }
}
