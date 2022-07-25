import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { WeatherContext } from "../../context/weatherContext";
import { formatForecastData } from "../../helpers/helpers";
import { getWeatherForecast } from "../../services/weatherService";

const LocationForecast = () => {
  const { locationName } = useParams<{ locationName: string }>();
  const [numberOfDays, setNumberOfDays] = useState<number>(3); // Three days are the max allowed by the API
  const [shouldShowAirQuality, setShouldShowAirQuality] = useState<boolean>(false);
  const [shouldShowAlerts, setShouldShowAlerts] = useState<boolean>(false);
  const [locationForecast, setLocationForecast] = useState<any>({});
  const weatherContext = useContext(WeatherContext);

  useEffect(() => {
    if (locationName) {
      const forecast = fetchWeatherForecast(locationName);
      const formattedForecastData = formatForecastData(forecast, weatherContext?.isCelsius || false);
      setLocationForecast(formattedForecastData);
    }
  }, []);

  const fetchWeatherForecast = async (location: string): Promise<any> => {
    try {
      const {
        data: { forecast },
      } = await getWeatherForecast(location, numberOfDays, shouldShowAirQuality, shouldShowAlerts);
      return Object.values(forecast);
    } catch (error) {
      console.log(error);
    }
  };

  return <div>LocationForecast</div>;
};

export default LocationForecast;
