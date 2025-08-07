import { useEffect, useState } from "react";

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // const getGreeting = () => {
  //   const hour = time.getHours();
  //   if (hour < 12) return "Good Morning";
  //   if (hour < 17) return "Good Afternoon";
  //   return "Good Evening";
  // };

  return (
    <div className="row-span-2 flex items-center justify-center p-8">
      <div className="relative">
        {/* Background blur effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-3xl blur-xl transform rotate-1"></div>

        {/* Main clock container */}
        <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 backdrop-blur-sm rounded-3xl shadow-2xl border border-slate-700/50 p-12 min-w-96">
          {/* Greeting
          <div className="text-center mb-8">
            <p className="text-slate-400 text-lg font-light tracking-wide">
              {getGreeting()}
            </p>
          </div> */}

          {/* Time display */}
          <div className="text-center mb-6">
            <div className="font-mono text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-wider">
              {formatTime(time)}
            </div>

            {/* Subtle animation dots */}
            <div className="flex justify-center mt-4 space-x-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-75"></div>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-150"></div>
            </div>
          </div>

          {/* Date display */}
          <div className="text-center">
            <p className="text-slate-300 text-lg font-medium tracking-wide">
              {formatDate(time)}
            </p>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full opacity-60"></div>
          <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full opacity-40"></div>

          {/* Subtle glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur opacity-50"></div>
        </div>
      </div>
    </div>
  );
}

export default Clock;
