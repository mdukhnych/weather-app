import { ReactElement } from 'react';
import styles from './forecastList.module.css'
import ForecastListItem from './ForecastListItem';

const dayNumberToNameMap: {short: string, full: string}[] = [
  {short: "Sun", full: "Sunday"},
  {short: "Mon", full: "Monday"},
  {short: "Tue", full: "Tuesday"},
  {short: "Wed", full: "Wednesday"},
  {short: "Thu", full: "Thursday"},
  {short: "Fri", full: "Friday"},
  {short: "Sat", full: "Saturday"},
]

interface DailyForecast {
  type: "DailyWeather";
  weather: DailyWeather[];
}

interface HourlyForecast {
  type: "HourlyWeather";
  weather: HourlyWeather[];
}

interface CurrentForecast {
  type: "CurrentWeather";
  weather: CurrentWeather;
}

type IForecastListProps = DailyForecast | HourlyForecast | CurrentForecast;

export default function ForecastList({
  type, weather
}: IForecastListProps) {
  const generateListItems = () => {
    const listItems: ReactElement[] = []
    if (type === "HourlyWeather") {
      for (let i = 0; i < 4; i++) {
        const index: number = (i + 1) * 3
        const time = new Date(weather[index].dt * 1000).getHours() > 9 ? `${new Date(weather[index].dt * 1000).getHours()}:00` : `0${new Date(weather[index].dt * 1000).getHours()}:00`
        listItems.push(
          <ForecastListItem key={i} heading={time} icon={weather[index].weather[0]} temp={weather[index].temp} />
        )
      } 
    } else if (type === "DailyWeather") {
      for (let i = 0; i < 4; i++) {
        const dayNumber: number = new Date(weather[i].dt * 1000).getDay()
        const dayName: string = dayNumber === new Date().getDay() ? "Today" : dayNumberToNameMap[dayNumber].short
        listItems.push(
          <ForecastListItem key={i} heading={dayName} icon={weather[i].weather[0]} temp={weather[i].temp} />
        )
      }
    }

    return listItems
  }


  return (
    <ul className={styles.forecastList}>
      {
        generateListItems()
      }
    </ul>
  )
}
