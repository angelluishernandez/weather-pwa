import { formattedCurrentWeather } from "../types/formattedCurrentWeather";
import { formattedForecastData } from "../types/formattedForecastData";

export function formatLocationWeather(
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

export function formatForecastData(forecastData: any, isCelsius: boolean): [formattedForecastData] {
  return forecastData.map((forecastDay: any) => {
    const { day } = forecastDay;
    return {
      temperatureAvg: isCelsius ? day.avgtemp_c : day.avgtemp_f,
      temperatureMax: isCelsius ? day.maxtemp_c : day.maxtemp_f,
      temperatureMin: isCelsius ? day.mintemp_c : day.mintemp_f,
      changeOfRain: day.daily_chance_of_rain,
      conditionText: day.condition.text,
      conditionPicture: day.condition.icon,
    };
  });
}
