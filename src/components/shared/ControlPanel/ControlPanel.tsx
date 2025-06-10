'use client'

import Button from '@/components/ui/button/Button'
import styles from './controlPanel.module.css'
import { useRouter } from 'next/navigation'
import useSearch from '@/hooks/useSearch'
import useWeather from '@/hooks/useWeather'

export default function ControlPanel() {

  const router = useRouter()
  const { deleteCity } = useSearch()
  const { refreshWeather,refreshWeatherToAll } = useWeather()

  return (
    <div className={styles.panel}>
      <Button 
        text={'Delete'} 
        icon={{
          src: '/icons/btns/delete.svg',
          position: "after",
          width: 20,
          height: 20
        }} 
        onClick={deleteCity}
      />
      <Button 
        text={'Refresh'} 
        icon={{
          src: '/icons/btns/refresh.svg',
          position: "after",
          width: 20,
          height: 20
        }} 
        onClick={refreshWeather}
      />
      <Button 
        text={'Refresh All'} 
        icon={{
          src: '/icons/btns/refreshAll.svg',
          position: "after",
          width: 20,
          height: 20
        }} 
        onClick={refreshWeatherToAll}
      />
      <Button 
        text={'Settings'} 
        icon={{
          src: '/icons/btns/settings.svg',
          position: "after",
          width: 20,
          height: 20
        }} 
        onClick={() => router.push('/settings')}
      />
    </div>
  )
}
