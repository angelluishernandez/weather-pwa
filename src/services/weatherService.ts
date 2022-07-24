import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

const baseUrl = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}`;

async function getWeatherByLocation(location: string, shouldShowAirQuality: boolean): Promise<any> {
  try {
    const res = axios.get(`${baseUrl}`, {
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

export { getWeatherByLocation };
