import { Calendar, order, WeekDay } from ".";

const calendarDay = (day: WeekDay): Calendar => ({
  day,
});

test("A small cake, ordered on Monday, is delivered on Wednesday", () => {
  const result = order("small", calendarDay("Monday"));
  expect(result).toStrictEqual(calendarDay("Wednesday"));
});
