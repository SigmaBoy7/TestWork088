"use client";
import { redirect, useSearchParams } from "next/navigation";
import ForecastInfo from "./ForecastInfo";

export default function ForecastPage() {
  const searchParams = useSearchParams();

  if (!searchParams?.get("city")) {
    redirect("/");
  }

  return (
    <div>
      <p className="text-center fs-1">Detailed weather forecast</p>
      <div>
        <ForecastInfo city={searchParams?.get("city")} />;
      </div>
    </div>
  );
}
