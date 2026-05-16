import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  const dayTime = weatherData.isDay ? "day" : "night";

  return (
    <section
      className={`weather-card weather-card_condition_${weatherData.condition} weather-card_time_${dayTime}`}
    >
      <p className="weather-card__temp">{weatherData.temperature.F}&deg;F</p>
      <div className="weather-card__scene" aria-hidden="true">
        <span className="weather-card__sun-moon" />
        <span className="weather-card__cloud weather-card__cloud_front" />
        <span className="weather-card__cloud weather-card__cloud_back" />
        <span className="weather-card__rain" />
        <span className="weather-card__snow" />
        <span className="weather-card__fog" />
        <span className="weather-card__lightning" />
      </div>
    </section>
  );
}

export default WeatherCard;
