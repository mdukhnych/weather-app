import WeatherIcon from '@/components/ui/weatherIcon/WeatherIcon'
import styles from './forecastList.module.css'
import { useModalStore } from '@/store/modal'
import clsx from 'clsx'
import { dayNumberToNameMap } from '@/constants/dayMap'

export default function ForecastListItem({
  type, weather, direction = "row", clickable = false
}: {
  type: string,
  direction?: "row" | "column",
  weather: HourlyWeather | DailyWeather,
  clickable?: boolean
}) {

  const { setModal } = useModalStore()

  const date: Date = new Date(weather.dt * 1000)

  const time: string = date.getHours() > 9 ? `${date.getHours()}:00` : `0${date.getHours()}:00`
  const day: string = String(date.getDate()).padStart(2, '0');
  const month: string = String(date.getMonth() + 1).padStart(2, '0');
  const dayNumber: number = date.getDay()
  const dayName: string = date.getDate() == new Date().getDate() ? "Today" : `${dayNumberToNameMap[dayNumber].short} (${day}.${month})`

  const heading = type === "HourlyWeather" ?
    <span className={styles.heading}>{time}</span>
  : type === "DailyWeather" ?
    <span className={styles.heading}>{dayName}</span>
  : null

  const icon = <div className={styles.icon}><WeatherIcon iconCode={weather.weather[0].icon} /> { direction === 'column' && type === "DailyWeather" ? weather.weather[0].main : null }</div>

  const temp = typeof weather.temp === "number" ?
    <span className={styles.temp}>{weather.temp.toFixed(1)}&deg;</span> 
  : <div>
      <span className={styles.temp}>{Math.round(weather.temp.max)}&deg;</span>/<span className={styles.min}>{Math.round(weather.temp.min)}&deg;</span>
    </div>

  return (
    <li className={clsx(styles.forecastListItem, clickable && styles.clickable)} onClick={() => clickable ? setModal({showModal: true, type: type, weather: weather}) : null} >
      { heading }
      { icon }
      { temp }
    </li>
  )
}