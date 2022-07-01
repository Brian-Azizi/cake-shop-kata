import { Calendar, order, WeekDay } from ".";
import { Clock } from "./clock";

const calendarDay = (day: WeekDay): Calendar => ({
  day,
  date: Clock.DAYS.indexOf(day) + 1,
  month: 1,
  year: 2020,
});

describe("Cake Shop", () => {
  test("A small cake, ordered on Monday, is delivered on Wednesday", () => {
    const result = order({ size: "small", orderDate: calendarDay("Monday") });
    expect(result).toStrictEqual(calendarDay("Wednesday"));
  });

  test("A small cake, ordered on Tuesday, is delivered on Thursday", () => {
    const result = order({ size: "small", orderDate: calendarDay("Tuesday") });
    expect(result).toStrictEqual(calendarDay("Thursday"));
  });

  test("A big cake, ordered on Monday, is delivered on Thursday", () => {
    const result = order({ size: "big", orderDate: calendarDay("Monday") });
    expect(result).toStrictEqual(calendarDay("Thursday"));
  });

  test("A big cake, ordered on Tuesday, is delivered on Friday", () => {
    const result = order({ size: "big", orderDate: calendarDay("Tuesday") });
    expect(result).toStrictEqual(calendarDay("Friday"));
  });

  test("An order for a small cake, placed on Monday morning, has a delivery date of Tuesday", () => {
    const result = order({
      size: "small",
      orderDate: calendarDay("Monday"),
      isMorningOrder: true,
    });
    expect(result).toStrictEqual(calendarDay("Tuesday"));
  });

  test("An order for a small cake with custom frosting, received on Monday morning, has a delivery date of Thursday.", () => {
    const result = order({
      size: "small",
      orderDate: calendarDay("Monday"),
      hasCustomFrosting: true,
    });
    expect(result).toStrictEqual(calendarDay("Thursday"));
  });
});
