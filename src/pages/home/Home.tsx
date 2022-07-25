import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CurrentWeatherResults from "../../components/CurrentWeatherResults/CurrentWeatherResults";
import LocationSearchForm from "../../components/LocationSearchForm/LocationSearchForm";
import PastWeatherItem from "../../components/PastWeatherItem/PastWeatherItem";
import { WeatherContext } from "../../context/weatherContext";
import { formatLocationWeather } from "../../helpers/helpers";
import { getWeatherByLocation } from "../../services/weatherService";
import { formattedCurrentWeather } from "../../types/formattedCurrentWeather";

const Home = () => {
  const [searchLocation, setSearchLocation] = useState<string>("");
  const [currentWeather, setCurrentWeather] = useState<formattedCurrentWeather | null>(null);
  const [currentWeatherPastSearches, setCurrentWeatherPastSearches] = useState<Array<formattedCurrentWeather>>([]);
  const weatherContext = useContext(WeatherContext);
  const navigate = useNavigate();

  useEffect(() => {
    const searches = _getSearchesFromStorage();
    setCurrentWeatherPastSearches(searches);
    if (!currentWeather) {
      setCurrentWeather(searches[searches.length - 1]);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data, status } = await getWeatherByLocation(searchLocation, weatherContext?.isCelsius || false);

      if (status !== 200) {
        throw new Error();
      }

      const formattedWeather = formatLocationWeather(data);

      // Add to storage and local state
      addSearchResultsToStorage(formattedWeather);
      setCurrentWeatherPastSearches(_getSearchesFromStorage());
      setCurrentWeather(formattedWeather);
      setSearchLocation("");
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const addSearchResultsToStorage = (formattedWeather: formattedCurrentWeather) => {
    let searchesInStorage = _getSearchesFromStorage();
    if (!searchesInStorage) {
      localStorage.setItem("searches", JSON.stringify([formattedWeather]));
      console.log(_getSearchesFromStorage());

      return;
    }

    if (searchesInStorage.length >= 5) {
      searchesInStorage = clearedSearches();
    }

    // Update local storage and overwrite other locations with the most recent data
    const updatedSearches = [...searchesInStorage, formattedWeather];

    localStorage.setItem("searches", JSON.stringify(updatedSearches));
  };

  /**
   * We are only going to process 5 locations at the same time.
   * If at a given point that number is exceeded, the oldest item should be removed.
   * If a location name is provided delete the element.
   */
  const clearedSearches = (index: number | undefined = undefined): Array<formattedCurrentWeather> | void => {
    let searches = _getSearchesFromStorage();
    let sortedSearches = searches.sort(
      (a: formattedCurrentWeather, b: formattedCurrentWeather) => a.resultsDate - b.resultsDate
    );

    sortedSearches.shift();
    searches = sortedSearches;

    return searches;
  };

  const handleWeatherItemDelete = (index: number) => {
    let searches = _getSearchesFromStorage();
    searches.splice(index, 1);
    console.log(searches);
    setCurrentWeatherPastSearches(searches);
    setCurrentWeather(searches[searches.length - 1]);
    localStorage.setItem("searches", JSON.stringify(searches));
  };

  // const handleWeatherItemSelect = (index: number) => navigate(`/${currentWeatherPastSearches[index].locationName}`);

  const handleWeatherItemSelect = (index: number) => setCurrentWeather(currentWeatherPastSearches[index]);

  // We are saying that if the item searches is defined it should always (! symbol) parseable.
  const _getSearchesFromStorage = () =>
    localStorage.getItem("searches") ? JSON.parse(localStorage.getItem("searches")!) : undefined;

  const formatDate = (dateInMs: number): string => {
    const date = new Date(dateInMs);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${day}-${month}-${year}`;
  };

  return (
    <div>
      <LocationSearchForm
        searchLocation={searchLocation}
        setSearchLocation={setSearchLocation}
        handleSubmit={handleSubmit}
      />
      {currentWeather && (
        <CurrentWeatherResults currentWeather={currentWeather} isCelsius={true} formatDate={formatDate} />
      )}
      {currentWeatherPastSearches && (
        <ul className="list-group mt-3 col-md-6 mx-auto">
          {currentWeatherPastSearches.map((pastWeatherItem: formattedCurrentWeather, index: number) => (
            <PastWeatherItem
              index={index}
              handleWeatherItemDelete={handleWeatherItemDelete}
              pastWeatherItem={pastWeatherItem}
              handleWeatherItemSelect={handleWeatherItemSelect}
              key={index}
              formatDate={(date: number) => formatDate(date)}
              isCelsius={weatherContext?.isCelsius || true}
              isActive={currentWeather?.locationName === currentWeatherPastSearches[index].locationName}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
