import { Calendar, WeekDay } from "./index";

export class Clock {
  public readonly day: WeekDay;
  private readonly date: number;
  private readonly month: number;
  private readonly year: number;
  private readonly daysOff: WeekDay[];

  static DAYS: WeekDay[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  constructor({ day, date, month, year }: Calendar, daysOff: WeekDay[] = []) {
    this.day = day;
    this.date = date;
    this.month = month;
    this.year = year;
    this.daysOff = daysOff;
  }

  public toCalendar(): Calendar {
    return {
      day: this.day,
      date: this.date,
      month: this.month,
      year: this.year,
    };
  }

  public withDaysOff(daysOff: WeekDay[]): Clock {
    return new Clock(this.toCalendar(), daysOff);
  }

  public add(leadTime: number): Clock {
    let dayNumber = Clock.mapToNumber(this.day);
    let date = this.date;
    while (leadTime > 0) {
      dayNumber += 1;
      date += 1;
      if (!this.daysOff.includes(Clock.mapToDay(dayNumber))) {
        leadTime--;
      }
    }

    const day = Clock.mapToDay(dayNumber);
    return new Clock(
      {
        day,
        date,
        month: this.month,
        year: this.year,
      },
      this.daysOff
    );
  }

  private static mapToNumber(day: WeekDay): number {
    return Clock.DAYS.indexOf(day);
  }

  private static mapToDay(number: number): WeekDay {
    return Clock.DAYS[number % 7];
  }
}
