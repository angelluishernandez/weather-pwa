import { formattedCurrentWeather } from "../../types/formattedCurrentWeather";

type Props = {
  currentWeather: formattedCurrentWeather;
  isCelsius: boolean;
  formatDate: (date: number) => string;
};

const CurrentWeatherResults = ({ currentWeather, isCelsius = true, formatDate }: Props) => {
  const {
    feelsLike,
    isDay,
    humidity,
    conditionPicture,
    windSpeed,
    resultsDate,
    locationName,
    temperature,
    conditionText,
    windDirection,
  } = currentWeather;

  return (
    <div className="container-fluid col-md-6 rounded mt-3 border border-1 d-flex flex-column py-3">
      <div className="row">
        <div className="col text-center">
          <span className="mx-auto">
            {locationName} {formatDate(resultsDate)}
          </span>
        </div>
      </div>

      <div className="col d-flex justify-content-center">
        <img src={conditionPicture} alt={conditionText} />
      </div>
      <div className="row">
        <div className="col">
          <ul className="list-group">
            <li className="list-group-item">{conditionText}</li>
            <li className="list-group-item">
              {temperature}
              {isCelsius ? "º" : "F"}
            </li>
            <li className="list-group-item">Feels like: {feelsLike}</li>
          </ul>
        </div>
        <div className="col">
          <ul className="list-group">
            <li className="list-group-item">Wind direction: {windDirection}</li>
            <li className="list-group-item">Wind speed: {windSpeed}</li>
            <li className="list-group-item">Humidity: {humidity}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherResults;
