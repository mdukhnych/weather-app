'use client'

import { useUserStore } from '@/store/user'
import styles from './citiesList.module.css'

export default function CitiesList() {

  const citiesList = useUserStore(state => state.citiesList)

  return (
    <div className={styles.container}>
      <ul>
        {
          citiesList.map((city, i) => <li key={i}>{city.name}</li>)
        }
      </ul>
    </div>
  )
}
