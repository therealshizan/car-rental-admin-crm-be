import {
  addDays,
  differenceInDays,
  format,
  fromUnixTime,
  getUnixTime,
  subDays,
} from 'date-fns';

// Convert Unix timestamp to formatted date string
export function formatUnix(
  unixTimestamp: number,
  dateFormat = 'yyyy-MM-dd HH:mm:ss',
) {
  const date = fromUnixTime(unixTimestamp);
  return format(date, dateFormat);
}

// Get current Unix timestamp
export function getCurrentUnix() {
  return getUnixTime(new Date());
}

// Add days to a Unix timestamp
export function addDaysToUnix(unixTimestamp: number, days: number) {
  const date = fromUnixTime(unixTimestamp);
  const newDate = addDays(date, days);
  return getUnixTime(newDate);
}

// Subtract days from a Unix timestamp
export function subtractDaysFromUnix(unixTimestamp: number, days: number) {
  const date = fromUnixTime(unixTimestamp);
  const newDate = subDays(date, days);
  return getUnixTime(newDate);
}

// Calculate the difference in days between two Unix timestamps
export function differenceInDaysBetweenUnix(
  unixTimestamp1: number,
  unixTimestamp2: number,
) {
  const date1 = fromUnixTime(unixTimestamp1);
  const date2 = fromUnixTime(unixTimestamp2);
  return differenceInDays(date1, date2);
}
