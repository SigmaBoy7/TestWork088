"use client";
import weatherClient from "@/shared/api";
import useWeatherForecastStore from "@/shared/store";
import { IWeatherData } from "@/shared/types";
import { FavoriteCityForecastCard } from "@/widgets";
import { useEffect, useState } from "react";

export default function FavoritesList() {
  const [loading, setLoading] = useState<boolean>(true);
  const [favoriteData, setFavoriteData] = useState<IWeatherData[] | null>(null);
  const favoritesWeather = useWeatherForecastStore(
    (state) => state.favoriteCitiesWeather
  );
  const removeFavorite = useWeatherForecastStore(
    (state) => state.removeFavorite
  );

  function handleRemoveFavoriteButton(favoriteData: IWeatherData) {
    removeFavorite(favoriteData);
  }

  useEffect(() => {
    (async function fetchData() {
      await weatherClient
        .getWeatherForFavorites(favoritesWeather)
        .then((res) => {
          setLoading(false);
          setFavoriteData(res);
        });
    })();
  }, [favoritesWeather]);

  if (loading) {
    return (
      <div className="spinner-border m-5" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  if (!favoriteData?.length) {
    return (
      <div className="alert alert-info mt-5" role="info">
        You dont have any favorites
      </div>
    );
  }

  const favoritesCard = favoriteData?.map((data) => {
    return (
      <div key={data.name}>
        <FavoriteCityForecastCard
          handleRemoveFavoriteButton={handleRemoveFavoriteButton}
          weatherForecastData={data}
        />
      </div>
    );
  });

  return (
    <div className="mt-5">
      <div className="d-flex">
        <div className="flex-fill">{favoritesCard}</div>
      </div>
    </div>
  );
}
