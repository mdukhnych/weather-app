import { ReactElement } from 'react';
import styles from './forecastList.module.css'
import ForecastListItem from './ForecastListItem';
import clsx from 'clsx';


interface DailyForecast {
  type: "DailyWeather";
  weather: DailyWeather[];
  itemsCount?: number,
  direction?: "row" | "column",
  clickable?: boolean
}

interface HourlyForecast {
  type: "HourlyWeather";
  weather: HourlyWeather[];
  itemsCount?: number,
  direction?: "row" | "column",
  clickable?: boolean
}

interface CurrentForecast {
  type: "CurrentWeather";
  weather: CurrentWeather;
  itemsCount?: number,
  direction?: "row" | "column",
  clickable?: boolean
}

type IForecastListProps = DailyForecast | HourlyForecast | CurrentForecast;

export default function ForecastList({
  type, weather, itemsCount = 4, direction = "row", clickable = false
}: IForecastListProps) {
  const generateListItems = () => {
    const listItems: ReactElement[] = []
    if (type === "HourlyWeather") {
      for (let i = 0; i < itemsCount; i++) {
        const index: number = (i + 1) * 3
        listItems.push(
          <ForecastListItem key={i} type={type} weather={weather[index]} direction={direction} clickable={clickable} />
        )
      } 
    } else if (type === "DailyWeather") {
      for (let i = 0; i < itemsCount; i++) {
        listItems.push(
          <ForecastListItem key={i} type={type} weather={weather[i]} direction={direction} clickable={clickable} />
        )
      }
    }

    return listItems
  }


  return (
    <ul className={clsx(styles.forecastList, direction === "row" ? styles.row : styles.column)}>
      {
        generateListItems()
      }
    </ul>
  )
}
