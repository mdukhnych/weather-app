interface IGetWeatherProps {
  city: ICity;
  units?: "metric" | "imperial",
  exclude?: "current" | "minutely" | "hourly" | "daily" | "alerts" | null
}

export const getWeather = async ({
  city,
  units = "metric",
  exclude = null
}: IGetWeatherProps) => {
  // const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=${units}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`)
  const weather = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${city.lat}&lon=${city.lon}${exclude ? `&exclude=${exclude}` : ''}&units=${units}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`)
  return await weather.json()
}
