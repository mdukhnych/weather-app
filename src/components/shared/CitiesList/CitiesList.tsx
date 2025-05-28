'use client'

import { useUserStore } from '@/store/user'
import styles from './citiesList.module.css'
import Card from '../Card/Card'
import { useActiveCityStore } from '@/store/activeCity'

export default function CitiesList() {
  const citiesList = useUserStore(state => state.citiesList)
  const { activeIndex, setActiveIndex } = useActiveCityStore(state => state)

  return (
    <div className={styles.container}>
      <ul>
        {
          citiesList.map((city, i) => (
            <Card 
              key={i} 
              city={city} 
              isActive={activeIndex === i}
              onClick={() => setActiveIndex(i)} 
            />
          ))
        }
      </ul>
    </div>
  )
}
