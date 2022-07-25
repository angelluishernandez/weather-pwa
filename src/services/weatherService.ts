import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

const baseUrl = "http://api.weatherapi.com/v1/";

async function getWeatherByLocation(location: string, shouldShowAirQuality: boolean): Promise<any> {
  try {
    const res = axios.get(`${baseUrl}current.json?key=${API_KEY}`, {
      params: {
        q: location,
        aqi: shouldShowAirQuality,
      },
    });
    return res;
  } catch (error) {
    console.error(error);
  }
}

async function getWeatherForecast(
  location: string,
  numberOfDays: number,
  shouldShowAirQuality: boolean,
  shouldShowAlerts: boolean
): Promise<any> {
  try {
    const res = axios.get(`${baseUrl}forecast.json?key=${API_KEY}`, {
      params: {
        q: location,
        days: numberOfDays,
        aqi: shouldShowAirQuality,
        alerts: shouldShowAlerts,
      },
    });

    return res;
  } catch (error) {
    console.error(error);
  }
}

export { getWeatherByLocation, getWeatherForecast };
