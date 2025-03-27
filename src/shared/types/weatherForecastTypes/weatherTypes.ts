export interface IGeocodingResponse {
  name: string;
  local_names: string[];
  lat: number;
  lon: number;
  country?: string;
  state?: string;
}

interface IWeatherDescription {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface IWeatherMain {
  feels_like: number;
  grnd_level: number;
  humidity: number;
  pressure: number;
  sea_level: number;
  temp: number;
  temp_max: number;
  temp_min: number;
}

export interface IWeatherData {
  dt: number;
  sunrise: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: IWeatherDescription[];
  rain: number;
  snow: number;
  main: IWeatherMain;
  name: string;
}
interface Coord {
  lat: number;
  lon: number;
}

interface City {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

interface MainForecast {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level?: number;
  grnd_level?: number;
  humidity: number;
  temp_kf: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Clouds {
  all: number;
}

interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

interface Rain {
  "3h": number;
}

interface Snow {
  "3h": number;
}

interface SysForecast {
  pod: "d" | "n";
}

interface ForecastItem {
  dt: number;
  main: MainForecast;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  rain?: Rain;
  snow?: Snow;
  sys: SysForecast;
  dt_txt: string;
}

export interface WeatherForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
  city: City;
}
