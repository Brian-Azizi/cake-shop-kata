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

const bakeCake =
  (clock: Clock) => (size: "small" | "big", isMorningOrder?: boolean) => {
    let leadTime = size === "small" ? 2 : 3;
    if (isMorningOrder) {
      leadTime -= 1;
    }
    return clock.withDaysOff(["Saturday", "Sunday"]).add(leadTime);
  };

const decorate = (clock: Clock) => (hasCustomFrosting?: boolean) => {
  if (!hasCustomFrosting) return clock;
  return clock.add(1);
};

export function order({
  orderDate,
  size,
  hasCustomFrosting,
  isMorningOrder,
}: OrderOptions): DeliveryDate {
  const ordered = new Clock(orderDate);
  const baked = bakeCake(ordered)(size, isMorningOrder);
  const decorated = decorate(baked)(hasCustomFrosting);
  return decorated.toCalendar();
}
