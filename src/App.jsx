import Clock from "./components/Clock";
import GoogleApps from "./components/GoogleApps";
import SearchBar from "./components/SearchBar";
import Shortcuts from "./components/Shortcuts";
import Weather from "./components/Weather";
import Welcome from "./components/Welcome";
import "./index.css";

function App() {
  return (
    <div className="h-screen w-screen bg-zinc-950 relative overflow-hidden selection:bg-white selection:text-black font-mono flex flex-col">
      {/* Background Texture */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "radial-gradient(#3f3f46 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      ></div>

      {/* Fixed Widgets */}
      <Weather />
      <GoogleApps />

      {/* Main Content: Flex Column centered vertically */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 gap-6 h-full">
        {/* TOP SECTION: Tighter grouping of Clock & Welcome */}
        <div className="flex flex-col items-center gap-4 shrink-0">
          <Clock />
          <Welcome />
        </div>

        {/* CENTER SECTION: Search Bar */}
        <div className="w-full max-w-2xl shrink-0 z-50">
          <SearchBar />
        </div>

        {/* BOTTOM SECTION: Shortcuts (Allows internal scrolling if absolutely needed, but tries to fit) */}
        <div className="w-full max-w-5xl shrink-1 min-h-0">
          <Shortcuts />
        </div>
      </main>

      {/* Vignette */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(9,9,11,0.5)_100%)] pointer-events-none z-0"></div>
    </div>
  );
}

export default App;
