type Size = "small" | "big";

export type WeekDay = "Monday" | "Tuesday" | "Wednesday";

export interface Calendar {
  day: WeekDay;
}

type OrderDate = Calendar;
type DeliveryDate = Calendar;

export function order(size: Size, orderDate: OrderDate): DeliveryDate {
  return { day: "Wednesday" };
}
