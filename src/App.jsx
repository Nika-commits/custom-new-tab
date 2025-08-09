import Clock from "./components/Clock";
import GoogleApps from "./components/GoogleApps";
import SearchBar from "./components/SearchBar";
import Shortcuts from "./components/Shortcuts";
import Weather from "./components/Weather";
import Welcome from "./components/Welcome";
import "./index.css";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background decorative elements */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-purple-900/10 to-pink-900/5"></div> */}

      {/* Floating background orbs */}
      {/* <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-pink-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 rounded-full blur-3xl animate-pulse delay-500"></div> */}

      {/* Subtle grid pattern overlay */}
      {/* <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      ></div> */}

      {/* Main content grid */}
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
