import { dayNumberToNameMap } from '@/constants/dayMap'
import { monthsNumberToNameMap } from '@/constants/monthsMap'

export function generateDate(d: number, format: "full" | "hourly" | "daily" = "full")  {
  const date: Date = new Date(d * 1000)
  const dayName: string = dayNumberToNameMap[date.getDay()].short
  const dayDate: string = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate().toString()
  const monthName: string = monthsNumberToNameMap[date.getMonth()].short
  const year: number = date.getFullYear()
  const time: string = date.getHours() < 10 ? `0${date.getHours()}:00:00` : `${date.getHours()}:00:00`

  if (format === "full") return date
  if (format === "hourly") return `${dayName} ${dayDate} ${monthName} ${year} ${time}`
  if (format === "daily") return `${dayName} ${dayDate} ${monthName} ${year}`
}