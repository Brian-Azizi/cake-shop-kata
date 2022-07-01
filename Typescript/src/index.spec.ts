import { CalendarDate, order, WeekDay } from ".";
import { Clock } from "./clock";

const calendarDay = (day: WeekDay, week = 0): CalendarDate => ({
  day,
  date: Clock.DAYS.indexOf(day) + 1 + week * 7,
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

  test("An order for a small cake received on Friday morning has a delivery date of Monday", () => {
    const result = order({
      size: "small",
      orderDate: calendarDay("Friday"),
      isMorningOrder: true,
    });
    expect(result).toStrictEqual(calendarDay("Monday", 1));
  });

  test("An order for a small cake with frosting received on Friday morning has a delivery date of Wednesday", () => {
    const result = order({
      size: "small",
      orderDate: calendarDay("Friday"),
      isMorningOrder: true,
      hasCustomFrosting: true,
    });
    expect(result).toStrictEqual(calendarDay("Wednesday", 1));
  });
});
