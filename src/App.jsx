import Clock from "./components/Clock";
import GoogleApps from "./components/GoogleApps";
import SearchBar from "./components/SearchBar";
import Shortcuts from "./components/Shortcuts";
import Weather from "./components/Weather";
import Welcome from "./components/Welcome";
import "./index.css";

function App() {
  return (
    <div className="h-screen w-screen bg-black relative overflow-hidden selection:bg-white selection:text-black font-mono flex flex-col items-center justify-center text-zinc-100">
      {/* 1. Subtle Texture (Blueprint Grid) */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "radial-gradient(#52525b 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      {/* 2. Fixed Widgets (Anchors) */}
      <Weather />
      <GoogleApps />

      {/* 3. Main Totem (Centered Stack) */}
      <main className="relative z-10 w-full max-w-4xl flex flex-col items-center gap-16 p-6">
        {/* HEADER: Clock & Welcome (Grouped for impact) */}
        <div className="flex flex-col items-center gap-4">
          <Clock />
          <Welcome />
        </div>

        {/* INPUT: Search Bar */}
        <div className="w-full max-w-xl z-50">
          <SearchBar />
        </div>

        {/* GRID: Shortcuts */}
        <div className="w-full z-10">
          <Shortcuts />
        </div>
      </main>
    </div>
  );
}

export default App;
