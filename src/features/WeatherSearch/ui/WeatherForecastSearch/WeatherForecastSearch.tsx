"use client";
import WeatherSearchInput from "../WeatherSearchInput/AppInput";
import useWeatherForecastStore from "@/shared/store";
import { IWeatherData } from "@/shared/types";
import { CurrentWeatherForecastCard } from "@/widgets";

export default function WeatherForecastSearch(): React.ReactNode {
  const lastSearch = useWeatherForecastStore((state) => state.lastSearchInput);
  const fetchWeather: (city: string) => Promise<void> = useWeatherForecastStore(
    (state) => state.getWeather
  );
  const searchResult = useWeatherForecastStore((state) => state.searchResult);
  const isFetchFaild = useWeatherForecastStore((state) => state.isFetchFaild);
  const addFavorite = useWeatherForecastStore((state) => state.addFavorites);

  function handleSearchButton(city: string) {
    fetchWeather(city);
  }
  function handleFavoriteButton(newFavoriteData: IWeatherData) {
    addFavorite(newFavoriteData);
  }

  return (
    <div>
      <h1>Hi, its weather app</h1>
      <p>Please enter city name</p>
      <WeatherSearchInput
        handleSearchButton={handleSearchButton}
        lastSearch={lastSearch}
      />
      {searchResult ? (
        <div className="mt-5">
          <CurrentWeatherForecastCard
            weatherForecastData={searchResult}
            handleFavoriteButton={handleFavoriteButton}
          />
        </div>
      ) : null}
      {isFetchFaild ? (
        <div className="alert alert-danger mt-5" role="alert">
          Something went wrong
        </div>
      ) : null}
    </div>
  );
}
