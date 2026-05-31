import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import ItemCard from "../ItemCard/ItemCard";
import WeatherCard from "../WeatherCard/WeatherCard";
import "./Main.css";

function Main({ weatherData, clothingItems, onCardClick }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const filteredItems = clothingItems.filter(
    (item) => item.weather.toLowerCase() === weatherData.type,
  );

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <section className="main__items">
        <p className="main__text">
          Today is {weatherData.temperature[currentTemperatureUnit]}&deg;
          {currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="main__cards">
          {filteredItems.map((item) => (
            <ItemCard
              key={item._id ?? item.id}
              item={item}
              onCardClick={onCardClick}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
