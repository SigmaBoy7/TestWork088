import React from "react";
import styles from "./styles.module.scss";
import { WeatherForecastResponse } from "@/shared/types";
import Image from "next/image";

const ForecardDetailedInfoTable = ({
  forecastData,
}: {
  forecastData: WeatherForecastResponse | null;
}) => {
  if (!forecastData) {
    return (
      <div className="alert alert-danger" role="alert">
        No data
      </div>
    );
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString("ru-RU", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const groupByDay = () => {
    const days: { [key: string]: typeof forecastData.list } = {};
    forecastData?.list.forEach((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!days[date]) days[date] = [];
      days[date].push(item);
    });
    return Object.entries(days).slice(0, 4);
  };

  const dailyForecast = groupByDay();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Weather forecast for {forecastData?.city.name}
      </h2>

      <div className="row g-4">
        {dailyForecast.map(([date, items]) => (
          <div key={date} className="col-12 col-md-6 col-xl-3">
            <div className={`card ${styles.dayCard}`}>
              <div className="card-body">
                <h3 className={styles.dayTitle}>{formatDate(items[0].dt)}</h3>

                <div className={styles.hourlyList}>
                  {items.map((item) => (
                    <div key={item.dt} className={styles.hourlyItem}>
                      <div className="row align-items-center">
                        <div className="col-4">
                          <span className={styles.time}>
                            {formatTime(item.dt)}
                          </span>
                        </div>

                        <div className="col-4 text-center">
                          <Image
                            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                            alt={item.weather[0].description}
                            className={styles.weatherIcon}
                            width={100}
                            height={100}
                          />
                          <div className={styles.weatherDescription}>
                            {item.weather[0].description}
                          </div>
                        </div>

                        <div className="col-4 text-end">
                          <span className={styles.temperature}>
                            {Math.round(item.main.temp)}°C
                          </span>
                          <div className={styles.details}>
                            <small>
                              <i className="bi bi-droplet"></i>{" "}
                              {item.main.humidity}%
                            </small>
                            <small>
                              <i className="bi bi-wind"></i> {item.wind.speed}{" "}
                              м/с
                            </small>
                          </div>
                        </div>
                      </div>

                      {(item.rain || item.snow) && (
                        <div className={styles.precipitation}>
                          {item.rain && (
                            <span>Дождь: {item.rain["3h"]} мм</span>
                          )}
                          {item.snow && <span>Снег: {item.snow["3h"]} мм</span>}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecardDetailedInfoTable;
