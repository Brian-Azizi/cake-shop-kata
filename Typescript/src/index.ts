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
}

type OrderDate = Calendar;
type DeliveryDate = Calendar;

function add(date: Calendar, leadTime: number): Calendar {
  const DAYS: WeekDay[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  function mapToNumber(date: Calendar): number {
    return DAYS.indexOf(date.day);
  }

  function mapToDay(number: number): Calendar {
    return { day: DAYS[number % 7] };
  }

  return mapToDay(mapToNumber(date) + leadTime);
}

export function order(size: Size, orderDate: OrderDate): DeliveryDate {
  const leadTime = size === "small" ? 2 : 3;
  return add(orderDate, leadTime);
}
