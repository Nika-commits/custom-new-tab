import { useEffect, useState } from "react";

function Weather() {
  const [weather, setWeather] = useState({
    location: "Kathmandu",
    temp: "--°C",
    condition: "Loading...",
    icon: "☁️",
  });

  const API_KEY = "89579bffd3dcd527a65fb7e73cb1d5b9"; // your API key
  const CITY = "Kathmandu";

  useEffect(() => {
    async function fetchWeatherData() {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();

        if (data.cod !== 200) {
          throw new Error(data.message);
        }

        const weatherIcon = getWeatherEmoji(data.weather[0].main);

        setWeather({
          location: data.name,
          temp: `${Math.round(data.main.temp)}°C`,
          condition: data.weather[0].description,
          icon: weatherIcon,
        });
      } catch (error) {
        console.error("Error fetching weather:", error);
        setWeather({
          location: "Error",
          temp: "--°C",
          condition: "Unable to fetch",
          icon: "⚠️",
        });
      }
    }

    fetchWeatherData();
  }, []);

  function getWeatherEmoji(condition) {
    switch (condition.toLowerCase()) {
      case "clear":
        return "☀️";
      case "clouds":
        return "☁️";
      case "rain":
        return "🌧️";
      case "thunderstorm":
        return "⛈️";
      case "snow":
        return "❄️";
      case "mist":
      case "fog":
        return "🌫️";
      default:
        return "🌤️";
    }
  }

  return (
    <div className="absolute top-4 right-4 z-20">
      <div className="text-center bg-slate-900/60 rounded-xl p-3 shadow-lg backdrop-blur-md border border-slate-700/40">
        <div className="text-4xl mb-3">{weather.icon}</div>
        <div className="text-3xl font-bold text-slate-300 mb-2">
          {weather.temp}
        </div>
        <div className="text-slate-400 text-sm mb-1">{weather.condition}</div>
        <div className="text-slate-500 text-sm">{weather.location}</div>
      </div>
    </div>
  );
}

export default Weather;
