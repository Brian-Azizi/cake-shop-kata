import { order } from ".";
import { Clock } from "./clock";
import { CalendarDate, WeekDay } from "./types";

const calendarDay = (day: WeekDay, week = 0): CalendarDate =>
  Clock.from({
    // 1/1/2018 was a Monday
    day,
    date: Clock.DAYS.indexOf(day) + 1 + week * 7,
    month: 1,
    year: 2018,
  }).toCalendar();

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

  test("An order for a small cake with custom frosting, received on Monday afternoon, has a delivery date of Friday.", () => {
    const result = order({
      size: "small",
      orderDate: calendarDay("Monday"),
      hasCustomFrosting: true,
      isMorningOrder: true,
    });
    expect(result).toStrictEqual(calendarDay("Thursday"));
  });

  test("An order for a small cake with custom frosting, received on Monday morning, has a delivery date of Thursday.", () => {
    const result = order({
      size: "small",
      orderDate: calendarDay("Monday"),
      hasCustomFrosting: true,
      isMorningOrder: true,
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

  test("An order for a small cake with frosting received on Friday has a delivery date of Thursday", () => {
    const result = order({
      size: "small",
      orderDate: calendarDay("Friday"),
      hasCustomFrosting: true,
    });
    expect(result).toStrictEqual(calendarDay("Thursday", 1));
  });

  test("An order for a small cake with a fancy box, placed on Monday morning, has a delivery date of Wednesday", () => {
    const result = order({
      size: "small",
      orderDate: calendarDay("Monday"),
      isMorningOrder: true,
      withFancyBox: true,
    });
    expect(result).toStrictEqual(calendarDay("Wednesday"));
  });

  test("An order for a big cake with a fancy box, placed on Monday morning, has a delivery date of Wednesday", () => {
    const result = order({
      size: "big",
      orderDate: calendarDay("Monday"),
      isMorningOrder: true,
      withFancyBox: true,
    });
    expect(result).toStrictEqual(calendarDay("Wednesday"));
  });

  test("An order for a big cake with a fancy box, placed on Monday afternoon, has a delivery date of Thursday", () => {
    const result = order({
      size: "big",
      orderDate: calendarDay("Monday"),
      withFancyBox: true,
    });
    expect(result).toStrictEqual(calendarDay("Thursday"));
  });

  test("An order for a small cake with nuts placed on Monday morning has a delivery date of Wednesday", () => {
    const result = order({
      size: "small",
      orderDate: calendarDay("Monday"),
      isMorningOrder: true,
      withNuts: true,
    });
    expect(result).toStrictEqual(calendarDay("Wednesday"));
  });

  test("An order for a small cake with frosting placed on Monday morning has a delivery date of Friday", () => {
    const result = order({
      size: "small",
      orderDate: calendarDay("Monday"),
      isMorningOrder: true,
      withNuts: true,
    });
    expect(result).toStrictEqual(calendarDay("Wednesday"));
  });

  test("An order for a small cake with frosting, in a fancy box, placed on Tuesday morning, has a delivery date of Monday", () => {
    const result = order({
      size: "small",
      orderDate: calendarDay("Tuesday"),
      hasCustomFrosting: true,
      withFancyBox: true,
      isMorningOrder: true,
      withNuts: true,
    });
    expect(result).toStrictEqual(calendarDay("Monday", 1));
  });

  test("Ordering a small cake on Monday 31/01 has a delivery date of Wednesday 02/02", () => {
    const result = order({
      size: "small",
      orderDate: { date: 31, month: 1, year: 2022, day: "Monday" },
    });

    expect(result).toStrictEqual({
      date: 2,
      month: 2,
      year: 2022,
      day: "Wednesday",
    });
  });
});
