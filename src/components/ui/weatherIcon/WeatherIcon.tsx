import Image from "next/image";

interface IWeatherIconProps {
  iconCode: string | null | undefined,
  width?: number,
  height?: number,
  priority?: boolean
}

export default function WeatherIcon({ iconCode, width = 64, height = 64, priority = false }: IWeatherIconProps) {
  return <Image src={`/icons/weather/${iconCode}.svg`} alt="Weather Icon" width={width} height={height} priority={priority} />;
}
