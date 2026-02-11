import { useEffect, useState } from "react";

// 1. Optimization: Move logic to a custom hook to keep the UI component pure
const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
        const CITY = "Kathmandu";

        // Brutalist error handling: Check for missing key
        if (!API_KEY) throw new Error("NO_API_KEY");

        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`,
        );

        if (!res.ok) throw new Error("FETCH_ERR");

        const data = await res.json();

        setWeather({
          temp: Math.round(data.main.temp),
          condition: data.weather[0].main.toUpperCase(), // Uppercase for style
          location: data.name.toUpperCase(),
          id: data.weather[0].id, // Useful for icon mapping
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, []);

  return { weather, loading, error };
};

// 2. Helper for Brutalist Icons (Sharp lines, no curves where possible)
const WeatherIcon = ({ conditionId }) => {
  // Simple mapping based on OpenWeatherMap condition codes
  // 800: Clear, 80x: Clouds, 5xx: Rain, 6xx: Snow, etc.

  if (conditionId === 800) {
    // SUN (Clear)
    return (
      <svg
        className="w-8 h-8 text-zinc-100"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="square"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    );
  } else if (conditionId >= 801) {
    // CLOUDS
    return (
      <svg
        className="w-8 h-8 text-zinc-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="square"
          d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
        />
      </svg>
    );
  } else if (conditionId >= 500 && conditionId < 600) {
    // RAIN
    return (
      <svg
        className="w-8 h-8 text-blue-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="square"
          d="M20 16.2A4.5 4.5 0 0017.5 8h-1.8c-.7-2.1-2.9-3.5-5.2-3.3-3.6.3-5.9 3.5-5.3 7H5a4 4 0 000 8h12"
        />
        <path strokeLinecap="square" d="M8 22v-2m4 2v-4m4 4v-2" />
      </svg>
    );
  }

  // Default / Mist / Snow
  return (
    <svg
      className="w-8 h-8 text-zinc-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="square" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    </svg>
  );
};

function Weather() {
  const { weather, loading, error } = useWeather();

  if (loading) {
    return (
      <div className="animate-pulse bg-zinc-900 border border-zinc-700 p-4 w-32 h-20 shadow-[4px_4px_0px_0px_#000]">
        <div className="h-4 bg-zinc-800 w-full mb-2"></div>
        <div className="h-4 bg-zinc-800 w-1/2"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-800 p-2 text-red-500 font-mono text-xs">
        ERR: {error}
      </div>
    );
  }

  if (!weather) return null;

  return (
    // Positioning: Using absolute to stick to top-right as requested,
    // but formatted as a widget card.
    <div className="absolute top-4 right-4 z-50">
      {/* Brutalist Container */}
      <div className="flex flex-col bg-zinc-900 border-2 border-zinc-700 shadow-[6px_6px_0px_0px_#000] p-4 min-w-[160px]">
        {/* Top Row: Location & Icon */}
        <div className="flex justify-between items-start mb-4 border-b border-zinc-800 pb-2">
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-500 font-mono font-bold tracking-widest">
              LOC
            </span>
            <span className="text-sm text-zinc-300 font-mono font-bold tracking-tight">
              {weather.location}
            </span>
          </div>
          <div className="ml-2">
            <WeatherIcon conditionId={weather.id} />
          </div>
        </div>

        {/* Bottom Row: Temperature & Status */}
        <div className="flex flex-col">
          <div className="flex items-baseline">
            <span className="text-4xl font-mono font-black text-zinc-100 leading-none">
              {weather.temp}
            </span>
            <span className="text-lg text-zinc-500 font-mono ml-1">°C</span>
          </div>

          <div className="mt-2 bg-zinc-800 px-2 py-1 self-start border-l-2 border-zinc-500">
            <span className="text-[10px] text-zinc-400 font-mono tracking-[0.2em] uppercase">
              {weather.condition}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
