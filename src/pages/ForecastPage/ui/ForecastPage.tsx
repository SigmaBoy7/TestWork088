import { Suspense } from "react";
import ForecastInfo from "./ForecastInfo";

export default function ForecastPage() {
  return (
    <div>
      <p className="text-center fs-1">Detailed weather forecast</p>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <ForecastInfo />;
        </Suspense>
      </div>
    </div>
  );
}
