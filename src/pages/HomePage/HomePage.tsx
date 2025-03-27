import styles from "./styles.module.scss";
import { WeatherForecastSearch } from "@/features";

export default function HomePage(): React.ReactNode {
  return (
    <main className="d-flex justify-content-center">
      <div className={styles.mainContainer}>
        <WeatherForecastSearch />
        <div className={styles.weatherCard}></div>
      </div>
    </main>
  );
}
