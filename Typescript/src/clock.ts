import { CalendarDate, WeekDay } from "./index";

export class Clock {
  public readonly day: WeekDay;
  private readonly date: number;
  private readonly month: number;
  private readonly year: number;

  static DAYS: WeekDay[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  private constructor({ day, date, month, year }: CalendarDate) {
    this.day = day;
    this.date = date;
    this.month = month;
    this.year = year;
  }

  public static from(calendarDate: CalendarDate): Clock {
    return new Clock(calendarDate);
  }

  public toCalendar(): CalendarDate {
    return {
      day: this.day,
      date: this.date,
      month: this.month,
      year: this.year,
    };
  }

  public add(numberOfDays: number): Clock {
    return new Clock({
      day: Clock.mapToDay(Clock.mapToNumber(this.day) + numberOfDays),
      date: this.date + numberOfDays,
      month: this.month,
      year: this.year,
    });
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

  public isAfter({ date }: CalendarDate) {
    return this.date > date;
  }
}
