import { DateTime } from 'luxon'

export function readableDate(date: string, format?: string) {
  return DateTime
    .fromJSDate(new Date(date))
    .toFormat(format ? format : 'dd LLL yyyy')
}
