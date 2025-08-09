import { useEffect, useState } from "react";

function Welcome({ name = "Pranish" }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const timer = setTimeout(() => setIsVisible(true), 100);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="col-span-3 row-span-2 flex items-center justify-center p-2">
      <div
        className={`transition-all duration-700 ${
          isVisible
            ? "opacity-100 transform translate-y-0"
            : "opacity-0 transform translate-y-4"
        }`}
      >
        {/* Header section */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-light text-slate-400 tracking-wide">
            {getGreeting()}
          </h2>
        </div>

        {/* Main welcome message */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="text-slate-300">Welcome back, </span>
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {name}
            </span>
          </h1>

          {/* Animated underline */}
          <div className="flex justify-center">
            <div className="h-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full w-24"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
