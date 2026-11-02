/**
 * فصلِ الان بر اساس ماه شمسی به وقت تهران.
 * فروردین–خرداد بهار، تیر–شهریور تابستان، مهر–آذر پاییز، دی–اسفند زمستان.
 */

export type Season = "spring" | "summer" | "autumn" | "winter";

export function currentSeason(date: Date = new Date()): Season {
  const month = Number(
    new Intl.DateTimeFormat("en-US-u-ca-persian-nu-latn", {
      timeZone: "Asia/Tehran",
      month: "numeric",
    }).format(date),
  );
  if (month <= 3) return "spring";
  if (month <= 6) return "summer";
  if (month <= 9) return "autumn";
  return "winter";
}
