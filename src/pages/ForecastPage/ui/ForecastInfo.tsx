"use client";
import ForecardDetailedInfoTable from "@/widgets/ui/ForecastDetailedInfo/ForecardDetailedInfoTable";
import { useEffect, useState } from "react";
import { WeatherForecastResponse } from "@/shared/types";
import weatherClient from "@/shared/api";

export default function ForecastInfo({
  city,
}: {
  city: string | null | undefined;
}) {
  const [forecastInfo, setForecastInfo] =
    useState<WeatherForecastResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async function fetchData() {
      await weatherClient.getDailytWeatherByCity(city).then((res) => {
        setForecastInfo(res);
        setLoading(false);
      });
    })();
  }, [city]);

  if (loading) {
    return (
      <div className="spinner-border m-5" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return <ForecardDetailedInfoTable forecastData={forecastInfo} />;
}
