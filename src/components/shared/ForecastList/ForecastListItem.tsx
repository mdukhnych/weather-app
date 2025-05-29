import WeatherIcon from '@/components/ui/weatherIcon/WeatherIcon'
import styles from './forecastList.module.css'

export default function ForecastListItem({
  heading, icon, temp
}: {
  heading: string, 
  icon: Weather,
  temp: Temperature | number
}) {
  return (
    <li className={styles.forecastListItem}>
      <span className={styles.heading}>{heading}</span>
      <WeatherIcon iconCode={icon.icon} weatherId={icon.id} />
      {
        typeof temp === "number" ?
          <span className={styles.temp}>{temp.toFixed(1)}&deg;</span> 
        : <div>
          <span className={styles.temp}>{Math.round(temp.max)}&deg;</span>/<span className={styles.min}>{Math.round(temp.min)}&deg;</span>
        </div>
      }
    </li>
  )
}
