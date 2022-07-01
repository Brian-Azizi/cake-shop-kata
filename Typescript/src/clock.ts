import { Calendar, WeekDay } from "./index";

export class Clock {
  private day: WeekDay;
  private date: number;
  private month: number;
  private year: number;

  static DAYS: WeekDay[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  constructor({ day, date, month, year }: Calendar) {
    this.day = day;
    this.date = date;
    this.month = month;
    this.year = year;
  }

  public toCalendar(): Calendar {
    return {
      day: this.day,
      date: this.date,
      month: this.month,
      year: this.year,
    };
  }

  public add(leadTime: number): Clock {
    const day = Clock.mapToDay(Clock.mapToNumber(this.day) + leadTime);
    const date = this.date + leadTime;
    return new Clock({ day, date, month: this.month, year: this.year });
  }

  private static mapToNumber(day: WeekDay): number {
    return Clock.DAYS.indexOf(day);
  }

  private static mapToDay(number: number): WeekDay {
    return Clock.DAYS[number % 7];
  }
}
