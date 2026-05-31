import { apiKey, coordinates } from "./constants";
import { checkResponse } from "./api";

export function getWeatherCondition(temperature) {
  if (temperature >= 86) {
    return "hot";
  }

  if (temperature >= 66) {
    return "warm";
  }

  return "cold";
}

function getWeatherCardCondition(weatherId) {
  if (weatherId >= 200 && weatherId < 300) {
    return "storm";
  }

  if (weatherId >= 300 && weatherId < 600) {
    return "rain";
  }

  if (weatherId >= 600 && weatherId < 700) {
    return "snow";
  }

  if (weatherId >= 700 && weatherId < 800) {
    return "fog";
  }

  if (weatherId === 800) {
    return "sunny";
  }

  return "cloudy";
}

function parseWeatherData(data) {
  const temperature = Math.round(data.main.temp);
  const weatherId = data.weather[0].id;
  const currentTime = Date.now() / 1000;
  const isDay = currentTime > data.sys.sunrise && currentTime < data.sys.sunset;

  return {
    temperature: {
      F: temperature,
      C: Math.round((temperature - 32) * (5 / 9)),
    },
    city: data.name,
    type: getWeatherCondition(temperature),
    condition: getWeatherCardCondition(weatherId),
    isDay,
  };
}

export function getWeather() {
  if (!apiKey) {
    return Promise.reject(
      new Error("Add an OpenWeather API key in src/utils/constants.js"),
    );
  }

  const { latitude, longitude } = coordinates;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;

  return fetch(url).then(checkResponse).then(parseWeatherData);
}
