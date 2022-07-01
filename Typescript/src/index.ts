import { Clock } from "./clock";

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

type OrderTime = "Morning" | "Afternoon";

interface OrderOptions {
  orderDate: OrderDate;
  size: Size;
  isMorningOrder?: boolean;
  hasCustomFrosting?: boolean;
}

function bakeCake(
  size: "small" | "big",
  orderDate: Calendar,
  isMorningOrder: boolean | undefined
) {
  let leadTime = size === "small" ? 2 : 3;
  if (isMorningOrder) {
    leadTime -= 1;
  }
  return new Clock(orderDate).add(leadTime).toCalendar();
}

function decorate(
  bakeFinishedDate: Calendar,
  hasCustomFrosting: boolean | undefined
) {
  if (!hasCustomFrosting) return bakeFinishedDate;
  return new Clock(bakeFinishedDate).add(1).toCalendar();
}

export function order({
  orderDate,
  size,
  hasCustomFrosting,
  isMorningOrder,
}: OrderOptions): DeliveryDate {
  const bakeFinishedDate = bakeCake(size, orderDate, isMorningOrder);
  const decorationFinishedDate = decorate(bakeFinishedDate, hasCustomFrosting);
  return decorationFinishedDate;
}
