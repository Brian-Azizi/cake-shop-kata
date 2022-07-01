import { Calendar, order, WeekDay } from ".";

const calendarDay = (day: WeekDay): Calendar => {
  const DAYS: WeekDay[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return {
    day,
    date: DAYS.indexOf(day) + 1,
    month: 1,
    year: 2020,
  };
};

describe("Cake Shop", () => {
  test("A small cake, ordered on Monday, is delivered on Wednesday", () => {
    const result = order("small", calendarDay("Monday"));
    expect(result).toStrictEqual(calendarDay("Wednesday"));
  });

  test("A small cake, ordered on Tuesday, is delivered on Thursday", () => {
    const result = order("small", calendarDay("Tuesday"));
    expect(result).toStrictEqual(calendarDay("Thursday"));
  });

  test("A big cake, ordered on Monday, is delivered on Thursday", () => {
    const result = order("big", calendarDay("Monday"));
    expect(result).toStrictEqual(calendarDay("Thursday"));
  });

  test("A big cake, ordered on Tuesday, is delivered on Friday", () => {
    const result = order("big", calendarDay("Tuesday"));
    expect(result).toStrictEqual(calendarDay("Friday"));
  });
});
