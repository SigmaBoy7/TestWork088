"use client";
import ForecardDetailedInfoTable from "@/widgets/ui/ForecastDetailedInfo/ForecardDetailedInfoTable";
import { useEffect, useState } from "react";
import { WeatherForecastResponse } from "@/shared/types";
import weatherClient from "@/shared/api";
import { useSearchParams } from "next/navigation";

export default function ForecastInfo() {
  const [forecastInfo, setForecastInfo] =
    useState<WeatherForecastResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams?.get("city")) {
      (async function fetchData() {
        await weatherClient
          .getDailytWeatherByCity(searchParams?.get("city"))
          .then((res) => {
            setForecastInfo(res);
            setLoading(false);
          });
      })();
    }
  }, [searchParams]);

  if (!searchParams?.get("city")) {
    return (
      <div className="alert alert-danger" role="alert">
        No data
      </div>
    );
  }

  if (loading) {
    return (
      <div className="spinner-border m-5" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return <ForecardDetailedInfoTable forecastData={forecastInfo} />;
}
