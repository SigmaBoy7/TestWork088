import axios, { AxiosResponse } from "axios";

import {
  IWeatherData,
  IGeocodingResponse,
  WeatherForecastResponse,
} from "../../types";

export default class weatherClient {
  readonly baseUrl: string;
  readonly apiKey: string;

  constructor(
    apiKey: string,
    baseUrl: string = "https://api.openweathermap.org/"
  ) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async #geocoding(city: string) {
    try {
      const response: AxiosResponse<IGeocodingResponse[]> = await axios({
        method: "get",
        url: this.baseUrl + "geo/1.0/direct",
        params: {
          q: city,
          appid: this.apiKey,
        },
      });
      return response.data[0];
    } catch (error) {
      throw error;
    }
  }

  async getWeatherForFavorites(
    favorites: Set<string>
  ): Promise<IWeatherData[]> {
    try {
      const requests = [...favorites].map(async (city) => {
        try {
          const weather = await this.getWeatherByCity(city);
          return weather;
        } catch (error) {
          console.error(`Failed to get weather for ${city}:`, error);
          return null;
        }
      });

      const results = await Promise.all(requests);

      return results.filter(
        (result): result is IWeatherData => result !== null
      );
    } catch (error) {
      console.error("Critical error in favorites processing:", error);
      throw new Error("Failed to process favorite cities");
    }
  }
  async getWeatherByCity(city: string) {
    try {
      const cityGeocode: IGeocodingResponse = await this.#geocoding(city);
      const response: AxiosResponse<IWeatherData> = await axios({
        method: "get",
        url: this.baseUrl + "data/2.5/weather",
        params: {
          lat: cityGeocode.lat,
          lon: cityGeocode.lon,
          appid: this.apiKey,
          lang: "ru",
          units: "metric",
        },
        timeout: 5000,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(`Axios error for ${city}:`, error.code);
      }
      throw new Error(`Weather request failed for ${city}`);
    }
  }
  async getDailytWeatherByCity(city: string | null | undefined) {
    if (!city) {
      throw new Error("No city");
    }

    try {
      const cityGeocode: IGeocodingResponse = await this.#geocoding(city);
      const response: AxiosResponse<WeatherForecastResponse> = await axios({
        method: "get",
        url: this.baseUrl + "data/2.5/forecast",
        params: {
          lat: cityGeocode.lat,
          lon: cityGeocode.lon,
          appid: this.apiKey,
          units: "metric",
        },
        timeout: 5000,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(`Axios error for ${city}:`, error.code);
      }
      throw new Error(`Weather request failed for ${city}`);
    }
  }
}
