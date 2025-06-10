import { useActiveCityStore } from "@/store/activeCity";
import { useLoadingStore } from "@/store/loading";
import { useUserStore } from "@/store/user";

interface IGetWeatherProps {
  city: ICity;
  units?: "metric" | "imperial",
  exclude?: "current" | "minutely" | "hourly" | "daily" | "alerts" | null
}

export default function useWeather() {
  const activeIndex = useActiveCityStore(state => state.activeIndex)
  const { citiesList, setCitiesList, setWeatherToStore } = useUserStore(state => state)
  const setLoading = useLoadingStore(state => state.setLoading)

  const getWeather = async ({
    city,
    units = "metric",
    exclude = null
  }: IGetWeatherProps) => {
    const weather = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${city.lat}&lon=${city.lon}${exclude ? `&exclude=${exclude}` : ''}&units=${units}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`)
    return await weather.json()
  }

  const refreshWeather = async () => {
    const weather = await getWeather({city: citiesList[activeIndex], units: "metric"})
    setWeatherToStore(activeIndex, weather)
  }
  const refreshWeatherToAll = async () => {
    setLoading(true)
    const newCitiesList: ICity[] = []
    for (let i = 0; i < citiesList.length; i++){
      const weather = await getWeather({city: citiesList[i], units: "metric"})
      newCitiesList.push({...citiesList[i], weather: weather})
    }
    setCitiesList(newCitiesList)
    setLoading(false)
  }

  return ({
    getWeather,
    refreshWeather,
    refreshWeatherToAll
  })
}
