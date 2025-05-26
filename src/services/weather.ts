export const getWeather = async (city: ICity, units: string = "metric") => {
  const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=${units}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`)
  return await weather.json()
}
