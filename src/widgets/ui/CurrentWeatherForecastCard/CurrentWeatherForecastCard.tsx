import Image from "next/image";
import styles from "./styles.module.scss";
import { IWeatherData } from "@/shared/types";
import Link from "next/link";

interface IProps {
  weatherForecastData: IWeatherData;
  handleFavoriteButton: (newFavoriteData: IWeatherData) => void;
}

export default function CurrentWeatherForecastCard({
  weatherForecastData,
  handleFavoriteButton,
}: IProps) {
  return (
    <div className={"card mb-3 " + styles.weatherCard}>
      <div className="row g-0">
        <div className="col-md-4 d-flex justify-content-center">
          <Image
            src={`https://openweathermap.org/img/wn/${weatherForecastData.weather[0].icon}.png`}
            className="img-fluid rounded-start"
            alt="weather-ico"
            width={150}
            height={150}
          />
        </div>

        <div className="col-md-8">
          <div className="card-body text-md-end">
            <h5 className="card-title text-xxl-start fs-1">
              {weatherForecastData.main.temp}&deg;C
            </h5>
            <p className="card-text">{weatherForecastData.name}</p>
            <div className="d-flex justify-content-between">
              <button
                className="btn btn-outline-success"
                type="button"
                id="button-addon1"
                onClick={() => handleFavoriteButton(weatherForecastData)}
              >
                Add to favorite
              </button>
              <Link
                href={`/forecast?city=${weatherForecastData.name}`}
                className="btn btn-outline-info"
                type="button"
                id="button-addon1"
              >
                More details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
