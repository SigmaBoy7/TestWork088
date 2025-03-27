import { create } from "zustand";
import { IWeatherData } from "@/shared/types";
import weatherClient from "@/shared/api";
import { persist, createJSONStorage } from "zustand/middleware";

type weatherStoreState = {
  lastSearchInput: string;
  isFetchFaild: boolean;
  searchResult: IWeatherData | null;
  favoriteCitiesWeather: Set<string>;
};

type weatherStoreActions = {
  getWeather: (city: string) => Promise<void>;
  addFavorites: (citiesData: IWeatherData) => void;
  removeFavorite: (cityData: IWeatherData) => void;
};

type FavoritesStore = weatherStoreActions & weatherStoreState;

export const useWeatherForecastStore = create<FavoritesStore>()(
  persist(
    (set) => ({
      lastSearchInput: "",
      searchResult: null,
      isFetchFaild: false,
      favoriteCitiesWeather: new Set(),

      addFavorites: (citiesData) => {
        set((state) => {
          const updated = new Set(state.favoriteCitiesWeather);
          updated.add(citiesData.name);
          return { favoriteCitiesWeather: updated };
        });
      },

      removeFavorite: (cityData) => {
        set((state) => ({
          favoriteCitiesWeather: new Set(
            [...state.favoriteCitiesWeather].filter(
              (cityName) => cityName !== cityData.name
            )
          ),
        }));
      },

      getWeather: async (city) => {
        set({ lastSearchInput: city, isFetchFaild: false });
        try {
          const weatherData = await weatherClient.getWeatherByCity(city);
          set({
            searchResult: weatherData || null,
          });
        } catch {
          set({ searchResult: null, isFetchFaild: true });
        }
      },
    }),
    {
      name: "weatherForecast-storage",
      storage: createJSONStorage(() => localStorage, {
        reviver: (key, value) => {
          if (key === "favoriteCitiesWeather" && Array.isArray(value)) {
            return new Set(value);
          }

          return value;
        },
        replacer: (key, value) => {
          if (key === "favoriteCitiesWeather" && Array.isArray(value)) {
            return [...value];
          }
          return value;
        },
      }),
      partialize: (state) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { isFetchFaild, ...rest } = state;
        return rest;
      },
    }
  )
);
