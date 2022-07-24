import { formattedCurrentWeather } from "../types/formattedCurrentWeather";

export function formatResponseData(
  responseData: any,
  isCelsius: boolean = true,
  isMetric: boolean = true
): formattedCurrentWeather {
  const { current, location } = responseData;

  return {
    feelsLike: isCelsius ? current.feelslike_c : current.feelslike_f,
    humidity: current.humidity,
    isDay: !current.is_day,
    temperature: isCelsius ? current.temp_c : current.temp_f,
    windDirection: current.wind_dir,
    windSpeed: isMetric ? current.wind_kph : current.wind_mph,
    conditionText: current.condition.text,
    conditionPicture: current.condition.icon,
    locationName: location.name,
    time: new Date(location.localtime),
    resultsDate: new Date().getTime(),
  };
}
