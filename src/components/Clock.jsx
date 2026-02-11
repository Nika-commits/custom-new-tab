import { useSyncExternalStore } from "react";

// Store logic remains the same...
let timeSnapshot = new Date();
const listeners = new Set();
setInterval(() => {
  timeSnapshot = new Date();
  listeners.forEach((listener) => listener());
}, 1000);
const subscribe = (cb) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};
const getSnapshot = () => timeSnapshot;

function Clock() {
  const time = useSyncExternalStore(subscribe, getSnapshot);

  // Helper functions remain the same...
  const getHours = (d) => {
    let h = d.getHours();
    return h === 0 ? 12 : h > 12 ? h - 12 : h;
  };
  const getMinutes = (d) => d.getMinutes().toString().padStart(2, "0");
  const formatDate = (d) =>
    d
      .toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
      .toUpperCase();

  return (
    // Reduced padding and margin
    <div className="relative border-2 border-zinc-700 bg-zinc-900 shadow-[4px_4px_0px_0px_#000] p-5 min-w-[260px]">
      {/* Screws */}
      <div className="absolute top-1.5 left-1.5 w-1 h-1 bg-zinc-600 rounded-full" />
      <div className="absolute top-1.5 right-1.5 w-1 h-1 bg-zinc-600 rounded-full" />
      <div className="absolute bottom-1.5 left-1.5 w-1 h-1 bg-zinc-600 rounded-full" />
      <div className="absolute bottom-1.5 right-1.5 w-1 h-1 bg-zinc-600 rounded-full" />

      {/* Time Display - Reduced Text Size */}
      <div className="flex items-baseline justify-center gap-1 mb-2 border-b border-zinc-800 pb-2">
        <div className="font-mono text-5xl md:text-6xl font-black text-zinc-100 leading-none">
          {getHours(time)}
        </div>
        <div className="font-mono text-4xl md:text-5xl font-bold text-zinc-600 animate-pulse pb-1">
          :
        </div>
        <div className="font-mono text-5xl md:text-6xl font-black text-zinc-100 leading-none">
          {getMinutes(time)}
        </div>
      </div>

      {/* Date Display - Compact */}
      <div className="flex justify-between items-center bg-zinc-800/50 px-3 py-1 border border-zinc-700/50">
        <span className="text-zinc-400 text-xs font-mono font-bold tracking-widest">
          {formatDate(time)}
        </span>
        <span className="text-[10px] text-zinc-600 font-mono">UTC+0</span>
      </div>
    </div>
  );
}

export default Clock;
