'use client'

import { useActiveCityStore } from '@/store/activeCity'
import styles from './forecast.module.css'
import { useUserStore } from '@/store/user'
import Spinner from '@/components/ui/spinner/Spinner'
import WeatherIcon from '@/components/ui/weatherIcon/WeatherIcon'
import Button from '@/components/ui/button/Button'
import { useRouter } from 'next/navigation'
import ForecastList from '@/components/shared/ForecastList/ForecastList'
import Image from 'next/image'
import { useModalStore } from '@/store/modal'
import Modal from '@/components/shared/Modal/Modal'

export default function Forecast() {
  const index = useActiveCityStore(state => state.activeIndex)
  const city = useUserStore(state => state.citiesList[index])

  const router = useRouter()
  const { showModal, setModal } = useModalStore(state => state)

  return (
    <div className={styles.container}>
      {
        city ? 
          <>
            <div className={styles.today}>
              <div className={styles.current}>
                <Button text={"Back"} onClick={() => router.back()} additionalStyles={{position: "absolute", top: "0", left: "0"}} />
                <div className={styles.currentInfo}>
                  <div>
                    <h3 className={styles.cityName}>
                      { city.name ? city.name : null }
                      { city.state ? `, ${city.state}` : null }
                      { city.country ? `, ${city.country}` : null }
                    </h3>
                    <span>Chance of rain: {city.weather?.daily?.[0].pop && city.weather?.daily?.[0].pop * 100}%</span>
                  </div>
                  <h3 className={styles.currentTemp}>{ city.weather?.current?.temp ? Math.round(city.weather.current.temp) : '-' }&deg;</h3>
                </div>
                <div className={styles.currenrtIcon}>
                  <WeatherIcon iconCode={city.weather?.current.weather[0].icon ? city.weather?.current.weather[0].icon : '/icons/weather/not-available.svg'} width={300} height={300} />
                </div>
              </div>
              <div className={styles.airConditions}>
                <Button text={"See more"} onClick={() => setModal({showModal: true, weather: city.weather?.current, type: "CurrentWeather"})} additionalStyles={{position: "absolute", top: "15px", right: "10px"}} />
                <h3>Air Conditions</h3>
                <ul className={styles.airConditionsList}>
                  <li className={styles.airConditionsListItem}>
                    <span><Image src={'/icons/thermometer.svg'} alt='thermometer' width={40} height={40}/>Feels like: { city.weather?.current.feels_like ? Math.round(city.weather.current.feels_like) : "-" }&deg;</span>
                  </li>
                  <li className={styles.airConditionsListItem}>
                    <span><Image src={'/icons/wind.svg'} alt='thermometer' width={40} height={40}/>Wind: { city.weather?.current.wind_speed ? city.weather.current.wind_speed : "-" } m/s</span>
                  </li>
                  <li className={styles.airConditionsListItem}>
                    <span><Image src={'/icons/raindrops.svg'} alt='thermometer' width={40} height={40}/>Chance of rain: {city.weather?.daily?.[0].pop && city.weather?.daily?.[0].pop * 100}%</span>
                  </li>
                  <li className={styles.airConditionsListItem}>
                    <span><Image src={'/icons/uv-index.svg'} alt='thermometer' width={40} height={40}/>UV-index: {city.weather?.current.uvi}</span>
                  </li>
                </ul>
              </div>
              <div className={styles.hourly}>
                <h3>Hourly Forecast</h3>
                { city.weather?.hourly ? <ForecastList type="HourlyWeather" weather={city.weather?.hourly} itemsCount={8} clickable={true} /> : null }
              </div>
              
            </div>
            <div className={styles.daily}>
              <h3>8-Days Forecast</h3>
              {
                city.weather?.daily ? <ForecastList type="DailyWeather" weather={city.weather.daily} direction='column' itemsCount={8} clickable={true} /> : null
              }
            </div>
          </>
        : <Spinner width={50} height={50} />
      }
      { showModal ? <Modal /> : null }
    </div>
  )
}
