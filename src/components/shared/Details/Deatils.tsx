'use client'

import WeatherIcon from '@/components/ui/weatherIcon/WeatherIcon'
import styles from './details.module.css'
import { useActiveCityStore } from '@/store/activeCity'
import { useUserStore } from '@/store/user'
import Spinner from '@/components/ui/spinner/Spinner'
import ForecastList from '../ForecastList/ForecastList'
import { useLoadingStore } from '@/store/loading'
import Button from '@/components/ui/button/Button'
import { usePathname, useRouter } from 'next/navigation'

export default function Deatils() {
  const { activeIndex } = useActiveCityStore(state => state)
  const city = useUserStore(state => state.citiesList[activeIndex])
  const loading = useLoadingStore(state => state.loading)

  const router = useRouter()
  const currentPath = usePathname()

  return (
    <div className={styles.container}>
      {
        city && !loading ? 
          <>
            <Button icon={{src: '/icons/btns/info.svg', position: "after", width: 24, height: 24}} onClick={() => router.push(`${currentPath}/forecast`)} additionalStyles={{padding: "5px", borderRadius: "50%", position: "absolute", right: "0", top: "0", border: "none"}} />
            <div className={styles.currentWeather}>
              <div className={styles.currentInfo}>
                <span className={styles.curentCityName}>
                  { city.name ? city.name : null }
                  { city.state ? `, ${city.state}` : null }
                  { city.country ? `, ${city.country}` : null }
                </span>
                <span className={styles.curentChanceofRain}>Chance of rain: {city.weather?.daily?.[0].pop && city.weather?.daily?.[0].pop * 100}%</span>
                <span className={styles.curentTemp}>{ city.weather?.current?.temp ? Math.round(city.weather.current.temp) : '-' }&deg;</span>
              </div>
              <div className={styles.currentIcon}>
                <WeatherIcon iconCode={city.weather?.current?.weather?.[0].icon ?? "not-avalaible"} width={250} height={200} priority={true} />
              </div>
            </div>
            <div className={styles.hourlyForecast}>
              <h3>hourly forecast</h3>
              { city.weather?.hourly ? <ForecastList type="HourlyWeather" weather={city.weather.hourly} /> : null }
            </div>
            <div className={styles.dailyForecast}>
              <h3>4-days forecast</h3>
              { city.weather?.daily ? <ForecastList type="DailyWeather" weather={city.weather.daily} /> : null }
            </div>

          </> : <Spinner width={250} height={250} />
      }
    </div>
  )
}