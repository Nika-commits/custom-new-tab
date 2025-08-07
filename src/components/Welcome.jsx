import { useEffect, useState } from "react";

function Welcome({ name = "Pranish" }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Trigger entrance animation
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

  // const getMotivationalMessage = () => {
  //   const messages = [
  //     "Ready to make today amazing?",
  //     "Let's turn ideas into reality!",
  //     "Your potential is limitless today!",
  //     "Every moment is a fresh start!",
  //     "Today is full of possibilities!",
  //   ];
  //   const hour = currentTime.getHours();
  //   return messages[hour % messages.length];
  // };

  // const getTimeBasedEmoji = () => {
  //   const hour = currentTime.getHours();
  //   if (hour < 6) return "🌙";
  //   if (hour < 12) return "🌅";
  //   if (hour < 17) return "☀️";
  //   if (hour < 20) return "🌆";
  //   return "✨";
  // };

  return (
    <div className="col-span-3 row-span-2 flex items-center justify-center p-8">
      <div className="relative w-full max-w-4xl">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-blue-500/10 to-purple-500/10 rounded-3xl blur-xl"></div>
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-blue-500/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-2xl"></div>

        {/* Main welcome container */}
        <div
          className={`relative bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-slate-700/50 p-12 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-8"
          }`}
        >
          {/* Header section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              {/* <span className="text-4xl animate-bounce">
                {getTimeBasedEmoji()}
              </span> */}
              <h2 className="text-2xl font-light text-slate-400 tracking-wide">
                {getGreeting()}
              </h2>
            </div>
          </div>

          {/* Main welcome message */}
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold mb-2">
              <span className="text-slate-300">Welcome back, </span>
              <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                {name}
              </span>
            </h1>

            {/* Animated underline */}
            <div className="flex justify-center mt-4">
              <div className="h-1 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 rounded-full animate-pulse w-32"></div>
            </div>
          </div>

          {/* Motivational message */}
          {/* <div className="text-center mb-8">
            <p className="text-xl text-slate-300 font-medium tracking-wide">
              {getMotivationalMessage()}
            </p>
          </div> */}

          {/* Status indicators
          <div className="flex justify-center items-center gap-8 mt-8">
            <div className="flex items-center gap-2 text-emerald-400">
              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">All Systems Ready</span>
            </div>
            <div className="flex items-center gap-2 text-blue-400">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-75"></div>
              <span className="text-sm font-medium">Connected</span>
            </div>
            <div className="flex items-center gap-2 text-purple-400">
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-150"></div>
              <span className="text-sm font-medium">Ready to Go</span>
            </div>
          </div> */}

          {/* Floating elements */}
          <div className="absolute top-6 right-6 w-12 h-12 bg-gradient-to-br from-emerald-500/30 to-blue-500/30 rounded-2xl rotate-12 animate-pulse"></div>
          <div className="absolute bottom-6 left-6 w-8 h-8 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-xl rotate-45 animate-pulse delay-300"></div>

          {/* Subtle particles */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-400/60 rounded-full animate-ping"></div>
          <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-blue-400/60 rounded-full animate-ping delay-1000"></div>
          <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-purple-400/60 rounded-full animate-ping delay-500"></div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
