import { useEffect, useState } from "react";

function Weather() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    async function fetchWeather() {
      const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
      const CITY = "Kathmandu";

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`,
      );

      const data = await res.json();

      setWeather({
        temp: Math.round(data.main.temp) + "°C",
        condition: data.weather[0].main,
        location: data.name,
        // icon: getWeatherEmoji(data.weather[0].main),
      });
    }

    fetchWeather();
  }, []);

  if (!weather) return null;

  return (
    <div className="absolute top-4 right-4">
      <div className="text-center p-6">
        <div className="text-3xl font-bold text-slate-300 mb-2">
          {weather.temp}
        </div>
        <div className="text-slate-400 text-sm mb-1">{weather.condition}</div>
        <div className="text-gray-300 text-sm">{weather.location}</div>
      </div>
    </div>
  );
}

export default Weather;
