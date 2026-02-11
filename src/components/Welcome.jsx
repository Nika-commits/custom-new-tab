import { useSyncExternalStore } from "react";

// Store logic remains the same...
let welcomeTime = new Date();
const listeners = new Set();
setInterval(() => { welcomeTime = new Date(); listeners.forEach((l) => l()); }, 60000);
const subscribe = (cb) => { listeners.add(cb); return () => listeners.delete(cb); };
const getSnapshot = () => welcomeTime;

function Welcome({ name = "Pranish" }) {
  const currentTime = useSyncExternalStore(subscribe, getSnapshot);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 5) return "LATE_NIGHT";
    if (hour < 12) return "MORNING";
    if (hour < 17) return "AFTERNOON";
    return "EVENING";
  };

  return (
    // Sleek single-line design
    <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-700 px-4 py-2 shadow-[2px_2px_0px_0px_#000]">
      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      <span className="text-zinc-500 text-xs font-mono font-bold uppercase tracking-wider">
        STATUS: {getGreeting()}
      </span>
      <div className="w-px h-4 bg-zinc-700 mx-1"></div>
      <span className="text-zinc-200 text-xs font-mono font-bold uppercase tracking-wider">
        USER: {name}
      </span>
    </div>
  );
}

export default Welcome;
