import React, { useState } from "react";
import CurrentWeatherResults from "../../components/CurrentWeatherResults/CurrentWeatherResults";
import LocationSearchForm from "../../components/LocationSearchForm/LocationSearchForm";
import { formatResponseData } from "../../helpers/helpers";
import { getWeatherByLocation } from "../../services/weatherService";
import { formattedCurrentWeather } from "../../types/formattedCurrentWeather";

const Home = () => {
  const [searchLocation, setSearchLocation] = useState<string>("");
  const [currentWeather, setCurrentWeather] = useState<formattedCurrentWeather | null>(null);
  const [currentWeatherPastSearches, setCurrentWeatherPastSearches] = useState<Array<formattedCurrentWeather>>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data, status } = await getWeatherByLocation(searchLocation, false);

      if (status !== 200) {
        throw new Error();
      }

      const formattedWeather = formatResponseData(data);

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
    if (index !== undefined) {
      // We want it to work with 0s too.
      searches.splice(index, 1);
      return;
    } else {
      let sortedSearches = searches.sort(
        (a: formattedCurrentWeather, b: formattedCurrentWeather) => a.resultsDate - b.resultsDate
      );

      console.log(sortedSearches);
      sortedSearches.shift();
      searches = sortedSearches;
    }

    return searches;
  };

  // We are saying that if the item searches is defined it should always (! symbol) parseable.
  const _getSearchesFromStorage = () =>
    localStorage.getItem("searches") ? JSON.parse(localStorage.getItem("searches")!) : undefined;

  return (
    <div>
      <LocationSearchForm
        searchLocation={searchLocation}
        setSearchLocation={setSearchLocation}
        handleSubmit={handleSubmit}
      />
      {currentWeather && <CurrentWeatherResults currentWeather={currentWeather} />}
    </div>
  );
};

export default Home;
