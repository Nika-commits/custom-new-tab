import { useSyncExternalStore } from "react";

let timeSnapshot = new Date();
const listeners = new Set();

setInterval(() => {
  timeSnapshot = new Date();
  listeners.forEach((l) => l());
}, 1000);

const subscribe = (cb) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

const getSnapshot = () => timeSnapshot;

function Clock() {
  const time = useSyncExternalStore(subscribe, getSnapshot);

  const formatTime = (n) => n.toString().padStart(2, "0");

  const getHours = (d) => {
    const h = d.getHours();
    return h === 0 ? 12 : h > 12 ? h - 12 : h;
  };

  const dateStr = time
    .toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })
    .toUpperCase();

  return (
    <div className="flex flex-col items-center select-none">
      {/* Huge Time Display */}
      <div className="flex items-center text-6xl md:text-9xl font-black tracking-tighter leading-none mix-blend-difference text-white">
        <span>{getHours(time)}</span>
        <span className="animate-[pulse_2s_steps(120)_infinite] -mt-2 mx-1 text-zinc-600">
          :
        </span>
        <span>{formatTime(time.getMinutes())}</span>
      </div>

      {/* Minimal Date Label */}
      <div className="mt-4 flex items-center gap-4">
        <span className="h-px w-12 bg-zinc-800"></span>
        <span className="text-xs font-bold text-zinc-500 tracking-[0.3em] uppercase">
          {dateStr}
        </span>
        <span className="h-px w-12 bg-zinc-800"></span>
      </div>
    </div>
  );
}

export default Clock;
