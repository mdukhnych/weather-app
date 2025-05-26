'use client'

import { useUserStore } from '@/store/user'
import styles from './citiesList.module.css'
import Card from '../Card/Card'
import { useState } from 'react'

export default function CitiesList() {
  const [active, setActive] = useState<number>(0)
  const citiesList = useUserStore(state => state.citiesList)

  return (
    <div className={styles.container}>
      <ul>
        {
          citiesList.map((city, i) => (
            <Card 
              key={i} 
              city={city} 
              isActive={active === i}
              onClick={() => setActive(i)} 
            />
          ))
        }
      </ul>
    </div>
  )
}
