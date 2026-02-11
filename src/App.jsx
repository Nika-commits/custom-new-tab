import Clock from "./components/Clock";
import GoogleApps from "./components/GoogleApps";
import SearchBar from "./components/SearchBar";
import Shortcuts from "./components/Shortcuts";
import Weather from "./components/Weather";
import Welcome from "./components/Welcome";
import "./index.css";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-500 via-slate-900 to-black relative overflow-hidden">
      <div className="relative z-10 grid grid-cols-5 gap-4 p-4 min-h-screen">
        <Clock />
        <Welcome />
        <SearchBar />
        <Shortcuts />
        <GoogleApps />
      </div>
      <Weather />

      {/* Subtle vignette effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/20 via-transparent to-slate-950/20 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/10 via-transparent to-slate-950/30 pointer-events-none"></div>
    </div>
  );
}

export default App;
