import { useEffect, useState } from "react";

function Clock() {
  const [time, setTime] = useState(new Date());
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Smooth entrance animation
    const timer = setTimeout(() => setIsVisible(true), 100);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  const getHours = (date) => {
    let hours = date.getHours();
    if (hours === 0) return 12;
    if (hours > 12) return hours - 12;
    return hours;
  };

  const getMinutes = (date) => {
    return date.getMinutes().toString().padStart(2, "0");
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  const formatYear = (date) => {
    return date.getFullYear();
  };

  return (
    <div className="row-span-2 flex items-center justify-center p-4">
      <div
        className={`text-center transition-all duration-700 ${
          isVisible
            ? "opacity-100 transform translate-y-0"
            : "opacity-0 transform translate-y-4"
        }`}
      >
        {/* Vertical time display */}
        <div className="mb-6">
          {/* Hours */}
          <div className="font-mono text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight leading-none mb-2">
            {getHours(time)}
          </div>

          {/* Minutes */}
          <div className="font-mono text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight leading-none">
            {getMinutes(time)}
          </div>
        </div>

        {/* Date display */}
        <div className="space-y-2">
          <div className="text-slate-300 text-base font-medium tracking-wide">
            {formatDate(time)}
          </div>
          <div className="text-slate-500 text-sm font-light">
            {formatYear(time)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Clock;
