import Image from "next/image";

interface IWeatherIconProps {
  weatherId: number,
  iconCode: string,
  width?: number,
  height?: number,
  priority?: boolean
}

const weatherIdToIconMap: Record<number, { day: string; night: string }> = {
  // Thunderstorm
  200: { day: '/icons/weather/thunderstorms-rain.svg', night: '/icons/weather/thunderstorms-rain.svg' }, // thunderstorm with light rain
  201: { day: '/icons/weather/thunderstorms-rain.svg', night: '/icons/weather/thunderstorms-rain.svg' }, // thunderstorm with rain
  202: { day: '/icons/weather/thunderstorms-rain.svg', night: '/icons/weather/thunderstorms-rain.svg' }, // thunderstorm with heavy rain
  210: { day: '/icons/weather/thunderstorms.svg', night: '/icons/weather/thunderstorms.svg' }, // light thunderstorm
  211: { day: '/icons/weather/thunderstorms.svg', night: '/icons/weather/thunderstorms.svg' },
  212: { day: '/icons/weather/thunderstorms.svg', night: '/icons/weather/thunderstorms.svg' },
  221: { day: '/icons/weather/thunderstorms.svg', night: '/icons/weather/thunderstorms.svg' },
  230: { day: '/icons/weather/thunderstorms-rain.svg', night: '/icons/weather/thunderstorms-rain.svg' }, // thunderstorm with light drizzle
  231: { day: '/icons/weather/thunderstorms-rain.svg', night: '/icons/weather/thunderstorms-rain.svg' },
  232: { day: '/icons/weather/thunderstorms-rain.svg', night: '/icons/weather/thunderstorms-rain.svg' },

  // Drizzle
  300: { day: '/icons/weather/drizzle.svg', night: '/icons/weather/drizzle.svg' },
  301: { day: '/icons/weather/drizzle.svg', night: '/icons/weather/drizzle.svg' },
  302: { day: '/icons/weather/drizzle.svg', night: '/icons/weather/drizzle.svg' },
  310: { day: '/icons/weather/drizzle.svg', night: '/icons/weather/drizzle.svg' },
  311: { day: '/icons/weather/drizzle.svg', night: '/icons/weather/drizzle.svg' },
  312: { day: '/icons/weather/drizzle.svg', night: '/icons/weather/drizzle.svg' },
  313: { day: '/icons/weather/drizzle.svg', night: '/icons/weather/drizzle.svg' },
  314: { day: '/icons/weather/drizzle.svg', night: '/icons/weather/drizzle.svg' },
  321: { day: '/icons/weather/drizzle.svg', night: '/icons/weather/drizzle.svg' },

  // Rain
  500: { day: '/icons/weather/rain.svg', night: '/icons/weather/rain.svg' }, // light rain
  501: { day: '/icons/weather/rain.svg', night: '/icons/weather/rain.svg' }, // moderate rain
  502: { day: '/icons/weather/rain.svg', night: '/icons/weather/rain.svg' },
  503: { day: '/icons/weather/rain.svg', night: '/icons/weather/rain.svg' },
  504: { day: '/icons/weather/rain.svg', night: '/icons/weather/rain.svg' },
  511: { day: '/icons/weather/rain.svg', night: '/icons/weather/rain.svg' }, // freezing rain
  520: { day: '/icons/weather/rain.svg', night: '/icons/weather/rain.svg' }, // light shower rain
  521: { day: '/icons/weather/rain.svg', night: '/icons/weather/rain.svg' },
  522: { day: '/icons/weather/rain.svg', night: '/icons/weather/rain.svg' },
  531: { day: '/icons/weather/rain.svg', night: '/icons/weather/rain.svg' },

  // Snow
  600: { day: '/icons/weather/snow.svg', night: '/icons/weather/snow.svg' },
  601: { day: '/icons/weather/snow.svg', night: '/icons/weather/snow.svg' },
  602: { day: '/icons/weather/snow.svg', night: '/icons/weather/snow.svg' },
  611: { day: '/icons/weather/snow.svg', night: '/icons/weather/snow.svg' }, // sleet
  612: { day: '/icons/weather/snow.svg', night: '/icons/weather/snow.svg' },
  613: { day: '/icons/weather/snow.svg', night: '/icons/weather/snow.svg' },
  615: { day: '/icons/weather/snow.svg', night: '/icons/weather/snow.svg' },
  616: { day: '/icons/weather/snow.svg', night: '/icons/weather/snow.svg' },
  620: { day: '/icons/weather/snow.svg', night: '/icons/weather/snow.svg' },
  621: { day: '/icons/weather/snow.svg', night: '/icons/weather/snow.svg' },
  622: { day: '/icons/weather/snow.svg', night: '/icons/weather/snow.svg' },

  // Atmosphere
  701: { day: '/icons/weather/mist.svg', night: '/icons/weather/mist.svg' }, // mist
  711: { day: '/icons/weather/smoke.svg', night: '/icons/weather/smoke.svg' }, // smoke
  721: { day: '/icons/weather/haze.svg', night: '/icons/weather/haze.svg' }, // haze
  731: { day: '/icons/weather/dust.svg', night: '/icons/weather/dust.svg' }, // dust
  741: { day: '/icons/weather/fog.svg', night: '/icons/weather/fog.svg' }, // fog
  751: { day: '/icons/weather/dust.svg', night: '/icons/weather/dust.svg' }, // sand
  761: { day: '/icons/weather/dust.svg', night: '/icons/weather/dust.svg' },
  762: { day: '/icons/weather/dust.svg', night: '/icons/weather/dust.svg' },
  771: { day: '/icons/weather/dust.svg', night: '/icons/weather/dust.svg' }, // squalls
  781: { day: '/icons/weather/tornado.svg', night: '/icons/weather/tornado.svg' }, // tornado

  // Clear
  800: { day: '/icons/weather/clear-day.svg', night: '/icons/weather/clear-night.svg' },

  // Clouds
  801: { day: '/icons/weather/partly-cloudy-day.svg', night: '/icons/weather/partly-cloudy-day.svg' }, // few clouds
  802: { day: '/icons/weather/cloudy.svg', night: '/icons/weather/cloudy.svg' }, // scattered clouds
  803: { day: '/icons/weather/overcast.svg', night: '/icons/weather/overcast.svg' }, // broken clouds
  804: { day: '/icons/weather/overcast.svg', night: '/icons/weather/overcast.svg' }, // overcast clouds

  //Not found
  404: { day: '/icons/weather/not-available.svg', night: '/icons/weather/not-available.svg' }
};

const getPartOfDay = (iconCode: string): 'day' | 'night' =>
  iconCode.includes('d') ? 'day' : 'night';

export default function WeatherIcon({ weatherId, iconCode, width = 64, height = 64, priority = false }: IWeatherIconProps) {
  const part = getPartOfDay(iconCode);
  const iconId = weatherIdToIconMap[weatherId]?.[part];
  return <Image src={`${iconId}`} alt="Weather Icon" width={width} height={height} priority={priority} />;
}
