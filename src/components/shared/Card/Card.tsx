import clsx from 'clsx'
import styles from './card.module.css'
import Spinner from '@/components/ui/spinner/Spinner'
import { useLoadingStore } from '@/store/loading'

interface ICardProps {
  city: ICity,
  isActive: boolean,
  onClick: () => void
}

export default function Card({ city, isActive, onClick }: ICardProps) {
  const loading = useLoadingStore(state => state.loading)

  return (
    <li className={clsx(styles.card, isActive && styles.active)} onClick={onClick}>
      <span className={styles.cityName}>
        {city.name && `${city.name}`}
        {city.state && `, ${city.state}`}
        {city.country && `, ${city.country}`}
      </span>
      {
        city && !loading ?
          <span className={styles.cityTemp}>{city.weather?.current?.temp ? Math.round(city.weather.current.temp) : '-'}&deg;</span>
        : <span><Spinner width={20} height={20}/></span>
      }
    </li>
  )
}
