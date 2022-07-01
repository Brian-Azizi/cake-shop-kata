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

  test("An order for a small cake, placed on Monday morning, has a delivery date of Tuesday", () => {
    const result = order("small", calendarDay("Monday"), "Morning");
    expect(result).toStrictEqual(calendarDay("Tuesday"));
  });

  test("An order for a small cake with custom frosting, received on Monday morning, has a delivery date of Thursday.", () => {
    const result = order("small", calendarDay("Monday"), "Afternoon", true);
    expect(result).toStrictEqual(calendarDay("Thursday"));
  });
});
