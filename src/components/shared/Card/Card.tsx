import clsx from 'clsx'
import styles from './card.module.css'

interface ICardProps {
  city: ICity,
  isActive: boolean,
  onClick: () => void
}

export default function Card({ city, isActive, onClick }: ICardProps) {
  return (
    <li className={clsx(styles.card, isActive && styles.active)} onClick={onClick}>
      <span className={styles.cityName}>
        {city.name && `${city.name}`}
        {city.state && `, ${city.state}`}
        {city.country && `, ${city.country}`}
      </span>
      <span className={styles.cityTemp}>{city.weather?.main?.temp ? Math.round(city.weather.main.temp) : '-'}&deg;</span>
    </li>
  )
}
