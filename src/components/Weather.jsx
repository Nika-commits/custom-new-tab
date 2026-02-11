import { useEffect, useState } from "react";

function Weather() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
        const CITY = "Kathmandu";

        if (!API_KEY) return; // Fail silently if no key

        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`,
        );
        const data = await res.json();

        setWeather({
          temp: Math.round(data.main.temp),
          condition: data.weather[0].main.toUpperCase(),
          location: data.name.toUpperCase(),
        });
      } catch (error) {
        console.error(error);
      }
    }
    fetchWeather();
  }, []);

  if (!weather) return null;

  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col items-end text-right pointer-events-none">
      <div className="text-4xl font-black text-white leading-none mix-blend-difference">
        {weather.temp}°
      </div>
      <div className="flex gap-2 text-[10px] font-bold tracking-widest text-zinc-600 uppercase mt-1">
        <span>{weather.condition}</span>
        <span className="text-zinc-800">/</span>
        <span>{weather.location}</span>
      </div>
    </div>
  );
}

export default Weather;
