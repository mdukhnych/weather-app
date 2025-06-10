'use client'
import { useModalStore } from '@/store/modal'
import styles from './modal.module.css'
import WeatherIcon from '@/components/ui/weatherIcon/WeatherIcon'
import { generateDate } from '@/services/date'

export default function Modal() {
  const { weather, setModal, type } = useModalStore()

  return (
    <>
      {
        weather ?
          <div className={styles.modal} onClick={() => setModal({showModal: false, type: null, weather: null})}>
            <div className={styles.modalInner}>
              <button className={styles.closeBtn} onClick={() => setModal({showModal: false, type: null, weather: null})}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
              <h3>
                { type === "CurrentWeather" && "Current Weather" }
                { type === "HourlyWeather" && `${generateDate(weather.dt, "hourly")}` }
                { type === "DailyWeather" && `${generateDate(weather.dt, "daily")}` }
              </h3>
              <div className={styles.weather}>
                <WeatherIcon iconCode={weather.weather[0].icon} width={150} height={150}  />
                <div className={styles.weatherInfo}>
                  {
                    typeof weather.temp === "number" && typeof weather.feels_like === "number" ?
                      <>
                        <span style={{fontSize: 30, fontWeight: 1000}}>{Math.round(weather.temp)}&deg;</span>
                        <span>Feels like: {weather.feels_like}&deg;. {weather.weather[0].description}</span>
                      </>
                    : <>
                      <span style={{fontWeight: 1000}}>{weather.weather[0].main}, {weather.weather[0].description}</span>
                      <span style={{fontSize: 14}}>The high will be: {(weather as DailyWeather).temp.max}&deg;, the low will be {(weather as DailyWeather).temp.min}&deg;.</span>
                      <span>{(weather as DailyWeather).summary}</span>
                    </>
                  }
                </div>
              </div>

              <div className={styles.details}>
                <span>Wind: {weather.wind_speed} m/s</span>
                <span>Pressure: {weather.pressure}hPa</span>
                <span>Humidity: {weather.humidity}%</span>
                <span>UVI: {weather.uvi}</span>
                <span>Dew point: {weather.dew_point}&deg;</span>
                {(type === "CurrentWeather" || type === "HourlyWeather") && (
                  <span>
                      Visibility: {((weather as CurrentWeather | HourlyWeather).visibility / 1000).toFixed(1)}km
                    </span>
                )}
              </div>

            </div>
          </div>
        : null
      }
    </>
  )
}
