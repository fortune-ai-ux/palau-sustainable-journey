import type { TripDay, CheckItem } from "../types";

// Activity IDs identify the activity, not its current calendar date.
// Keep their placeId and personal edits when moving the day's programme.
export const contentRevision = 2;
export function swapWeatherDays(days: TripDay[]): TripDay[] {
  const first = days.find((d) => d.date === "2027-08-06")!;
  const second = days.find((d) => d.date === "2027-08-10")!;
  return days.map((day) => {
    const source = day === first ? second : day === second ? first : null;
    return source
      ? {
          ...day,
          title: source.title,
          description: source.description,
          sdgs: source.sdgs,
          activities: source.activities,
        }
      : day;
  });
}
export function addRainItem(items: CheckItem[]): CheckItem[] {
  if (
    items.some(
      (item) => item.id === "check-rain-2027" || item.title === "雨衣／防水袋",
    )
  )
    return items;
  return [
    ...items,
    {
      id: "check-rain-2027",
      title: "雨衣／防水袋",
      category: "個人用品",
      checked: false,
      isCustom: false,
    },
  ];
}
