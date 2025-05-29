'use client'

import WeatherIcon from '@/components/ui/weatherIcon/WeatherIcon'
import styles from './details.module.css'
import { useActiveCityStore } from '@/store/activeCity'
import { useUserStore } from '@/store/user'
import Spinner from '@/components/ui/spinner/Spinner'
import ForecastList from '../ForecastList/ForecastList'

export default function Deatils() {
  const { activeIndex } = useActiveCityStore(state => state)
  const city = useUserStore(state => state.citiesList[activeIndex])

  return (
    <div className={styles.container}>
      {
        city ? 
          <>
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
                <WeatherIcon weatherId={city.weather?.current?.weather?.[0].id ?? 404} iconCode={city.weather?.current?.weather?.[0].icon ?? "d"} width={250} height={200} priority={true} />
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

          </> : <Spinner width={250} height={250} styles={{position: 'absolute', left: "50%", top: "100px", transform: "translateX(-50%)"}} />
      }
    </div>
  )
}