import { useSyncExternalStore } from "react";

let welcomeTime = new Date();
const listeners = new Set();

setInterval(() => {
  welcomeTime = new Date();
  listeners.forEach((l) => l());
}, 60000);

const subscribe = (cb) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

const getSnapshot = () => welcomeTime;

function Welcome({ name = "PRANISH" }) {
  const time = useSyncExternalStore(subscribe, getSnapshot);
  const hour = time.getHours();

  const greeting =
    hour < 5
      ? "LATE NIGHT"
      : hour < 12
        ? "GOOD MORNING"
        : hour < 17
          ? "GOOD AFTERNOON"
          : "GOOD EVENING";

  return (
    <div className="text-center">
      <h2 className="text-sm md:text-base font-medium text-zinc-500 tracking-widest uppercase">
        {greeting} /{" "}
        <span className="text-white font-bold hover:bg-white hover:text-black transition-colors cursor-default px-1">
          {name}
        </span>
      </h2>
    </div>
  );
}

export default Welcome;
