type Size = "small" | "big";

export type WeekDay =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export interface Calendar {
  day: WeekDay;
  date: number;
  month: number;
  year: number;
}

type OrderDate = Calendar;
type DeliveryDate = Calendar;

function add({ day, date, year, month }: Calendar, leadTime: number): Calendar {
  const DAYS: WeekDay[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  function mapToNumber(day: WeekDay): number {
    return DAYS.indexOf(day);
  }

  function mapToDay(number: number): WeekDay {
    return DAYS[number % 7];
  }

  return {
    day: mapToDay(mapToNumber(day) + leadTime),
    year,
    month,
    date: date + leadTime,
  };
}

export function order(size: Size, orderDate: OrderDate): DeliveryDate {
  const leadTime = size === "small" ? 2 : 3;
  return add(orderDate, leadTime);
}
