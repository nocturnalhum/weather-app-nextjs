import { formatInTimeZone } from 'date-fns-tz';
import timezones from './timezones';

const MILLISECONDS = 1000;

export default function getTime(timestamp, data) {
  let date = timestamp === 0 ? new Date() : timestamp * MILLISECONDS;
  date = formatInTimeZone(date, timezones[data.timezone], 'h:mm a');

  return date;
}
